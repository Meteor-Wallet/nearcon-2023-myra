import { getNearClient } from '@/global/near';
import bn from 'bn.js';
import { Tool } from '../types';

interface Token {
    symbol: string;
    amount: number;
}

export const getAccountTokensTool: Tool = {
    chatCompletionTools: {
        type: 'function',
        function: {
            name: 'getAccountTokens',
            description: 'Get tokens for an account',
            parameters: {
                type: 'object',
                properties: {
                    account_id: {
                        type: 'string',
                        description: 'The account to get tokens for',
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
        const near = await getNearClient();

        const account = await near.account(account_id);

        const tokens: Token[] = [];

        const userTokenQuery = await fetch(
            `https://api.nearblocks.io/v1/account/${account_id}/tokens`
        ).then((res) => res.json());

        const state = await account.state();

        const nearAmount =
            new bn(state.amount)
                .mul(new bn(1000))
                .div(new bn(10).pow(new bn(24)))
                .toNumber() / 1000;

        tokens.push({
            symbol: 'NEAR',
            amount: nearAmount,
        });

        const tokenContractList: string[] = userTokenQuery.tokens.fts;

        for (const tokenContract of tokenContractList) {
            const { symbol, decimals } = await account.viewFunction({
                contractId: tokenContract,
                methodName: 'ft_metadata',
                args: {},
            });

            const balance = await account.viewFunction({
                contractId: tokenContract,
                methodName: 'ft_balance_of',
                args: {
                    account_id,
                },
            });

            const amount =
                new bn(balance)
                    .mul(new bn(1000))
                    .div(new bn(10).pow(new bn(decimals)))
                    .toNumber() / 1000;

            if (amount > 0.001) {
                tokens.push({
                    symbol,
                    amount,
                });
            }
        }

        return JSON.stringify(tokens);
    },
};
