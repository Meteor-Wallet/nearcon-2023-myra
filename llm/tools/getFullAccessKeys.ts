import { Tool } from '../types';

export const getFullAccessKeysTool: Tool = {
    chatCompletionTools: {
        type: 'function',
        function: {
            name: 'getFullAccessKeys',
            description: 'Get the list of full access keys for an account',
            parameters: {
                type: 'object',
                properties: {
                    account_id: {
                        type: 'string',
                        description: 'The account to get full access keys for',
                    },
                },
            },
        },
    },
    handler: async ({
        account_id,
    }: {
        account_id: string;
    }): Promise<string> => {
        const userKeyQuery = await fetch(
            `https://api.nearblocks.io/v1/account/${account_id}/keys?order=desc`
        ).then((res) => res.json());

        const keys = userKeyQuery.keys as any[];

        const fullAccessKeys: string[] = [];

        keys.forEach((key) => {
            if (
                key.permission_kind === 'FULL_ACCESS' &&
                key.deleted.block_timestamp === null
            ) {
                fullAccessKeys.push(key.public_key);
            }
        });

        return JSON.stringify(fullAccessKeys);
    },
};
