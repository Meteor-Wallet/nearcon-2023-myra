import { Tool } from '../types';
import { GraphQLClient, gql } from 'graphql-request';

interface NftTransaction {
    boughtFrom?: string;
    soldTo?: string;
    price?: string;
    mint?: boolean;
    nft_name: string;
    nft_image: string;
}

export const getAccountNftTransactionsTool: Tool = {
    chatCompletionTools: {
        type: 'function',
        function: {
            name: 'getAccountNftTransactions',
            description: 'Get recent nft transactions for an account',
            parameters: {
                type: 'object',
                properties: {
                    account_id: {
                        type: 'string',
                        description: 'The account of the nft transactions',
                    },
                    limit: {
                        type: 'number',
                        description:
                            'The number of transactions to return. Defaults to 10.',
                    },
                    offset: {
                        type: 'number',
                        description:
                            'The number of transactions to skip. Defaults to 0.',
                    },
                },
                required: ['account_id'],
            },
        },
    },
    handler: async ({
        account_id,
        limit,
        offset,
    }: {
        account_id: string;
        limit: number;
        offset: number;
    }): Promise<string> => {
        const client = new GraphQLClient('https://api.indexer.xyz/graphql', {
            headers: {
                'x-api-key': process.env.INDEXER_API_KEY as string,
                'x-api-user': process.env.INDEXER_API_USER as string,
            },
        });

        const accountNftTransactionsQuery: any = await client.request(
            gql`
                query fetchWalletActivity(
                    $account_id: String!
                    $limit: Int!
                    $offset: Int!
                ) {
                    near {
                        actions(
                            where: {
                                _or: [
                                    { sender: { _eq: $account_id } }
                                    { receiver: { _eq: $account_id } }
                                ]
                                type: { _in: ["buy", "mint"] }
                            }
                            order_by: { block_time: desc }
                            limit: $limit
                            offset: $offset
                        ) {
                            type
                            price
                            sender
                            receiver
                            nft {
                                name
                                media_url
                            }
                        }
                    }
                }
            `,
            {
                account_id,
                limit: limit || 10,
                offset: offset || 0,
            }
        );

        const nftTransactions: any[] = accountNftTransactionsQuery.near.actions;

        const nftTransactionsFormatted: NftTransaction[] = nftTransactions.map(
            (nftTransaction) => ({
                boughtFrom:
                    nftTransaction.type === 'buy' &&
                    nftTransaction.sender !== account_id
                        ? nftTransaction.sender
                        : undefined,
                soldTo:
                    nftTransaction.type === 'buy' &&
                    nftTransaction.receiver !== account_id
                        ? nftTransaction.receiver
                        : undefined,
                price:
                    nftTransaction.type === 'buy'
                        ? `${(nftTransaction.price / 1e24).toFixed(2)} NEAR`
                        : undefined,
                mint: nftTransaction.type === 'mint' ? true : undefined,
                nft_name: nftTransaction.nft.name,
                nft_image: nftTransaction.nft.media_url,
            })
        );

        return JSON.stringify(nftTransactionsFormatted);
    },
};
