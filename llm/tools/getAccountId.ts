import { Tool } from '../types';
import { cookies } from 'next/headers';
import { getPrisma } from '@/global/prisma';

export const getAccountIdTool: Tool = {
    chatCompletionTools: {
        type: 'function',
        function: {
            name: 'getAccountId',
            description:
                "If you don't know what is the user's account id, you can try to query this tool. This tool will only return the account id if " +
                'you have previously save it using saveAccountId.',
            parameters: {
                type: 'object',
                properties: {},
            },
        },
    },
    handler: async ({}: {}): Promise<string> => {
        const session_id = cookies().get('session_id')?.value;

        if (!session_id) {
            return 'no value is stored';
        }

        const result = await getPrisma().session.findFirst({
            where: {
                session_id,
            },
        });

        if (result?.account_id) {
            return result.account_id;
        } else {
            return 'no value is stored';
        }
    },
};
