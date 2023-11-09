import { Tool } from '../types';

interface Nft {
    symbol: string;
    name: string;
    quantity: number;
}

export const getAccountNftsTool: Tool = {
    chatCompletionTools: {
        type: 'function',
        function: {
            name: 'getAccountNfts',
            description: 'Get nfts for an account',
            parameters: {
                type: 'object',
                properties: {
                    account_id: {
                        type: 'string',
                        description: 'The account to get nfts for',
                    },
                },
                required: ['account_id'],
            },
        },
    },
    handler: async ({
        account_id,
    }: {
        account_id: string;
    }): Promise<string> => {
        const userNftQuery = await fetch(
            `https://api.nearblocks.io/v1/account/${account_id}/inventory`
        ).then((res) => res.json());

        const nfts = userNftQuery.inventory.nfts as any[];

        return JSON.stringify(
            nfts.map(
                (nft: any): Nft => ({
                    name: nft.nft_meta.name,
                    symbol: nft.nft_meta.symbol,
                    quantity: nft.quantity,
                })
            )
        );
    },
};
