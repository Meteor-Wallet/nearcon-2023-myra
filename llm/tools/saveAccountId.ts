import { Tool } from '../types';
import { cookies } from 'next/headers';
import { getPrisma } from '@/global/prisma';

export const saveAccountIdTool: Tool = {
    chatCompletionTools: {
        type: 'function',
        function: {
            name: 'saveAccountId',
            description:
                'Whenever you know what is the account_id of the user, please use this tool to save it. Doing so will save the account_id into a ' +
                'session table so that you can query it later using getAccountId tool the next time user uses the bot',
            parameters: {
                type: 'object',
                properties: {
                    account_id: {
                        type: 'string',
                        description: `The account_id that user provided.`,
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
        const session_id = cookies().get('session_id')?.value;

        if (!session_id) {
            return 'saving failed';
        }

        await getPrisma().session.upsert({
            where: {
                session_id,
            },
            update: {
                account_id,
            },
            create: {
                session_id,
                account_id,
            },
        });

        return 'saving done';
    },
};
