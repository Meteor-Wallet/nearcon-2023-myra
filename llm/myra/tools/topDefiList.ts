import { Tool } from '../types';
import { cookies } from 'next/headers';
import { getPrisma } from '@/global/prisma';

export const topDefiListTool: Tool = {
    chatCompletionTools: {
        type: 'function',
        function: {
            name: 'topDefiList',
            description:
                'Get a list of defi(decentralized finance) projects that are currently trending.',
            parameters: {
                type: 'object',
                properties: {},
            },
        },
    },
    handler: async ({}: {}): Promise<string> => {
        return JSON.stringify([
            {
                name: 'Burrow',
                website: 'https://app.ref.finance/burrow',
                description: 'A decentralized lending protocol',
            },
            {
                name: 'PembRock Finance',
                website: 'https://pembrock.finance/',
                description: 'A decentralized lending protocol',
            },
            {
                name: 'Ref Finance',
                website: 'https://app.ref.finance/',
                description: 'A multi purpose Defi platform',
            },
        ]);
    },
};
