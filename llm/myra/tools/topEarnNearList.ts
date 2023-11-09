import { Tool } from '../types';
import { cookies } from 'next/headers';
import { getPrisma } from '@/global/prisma';

export const topEarnNearListTool: Tool = {
    chatCompletionTools: {
        type: 'function',
        function: {
            name: 'topEarnNearList',
            description:
                'Get a list of websites that user can earn some Near Protocol.',
            parameters: {
                type: 'object',
                properties: {},
            },
        },
    },
    handler: async ({}: {}): Promise<string> => {
        return JSON.stringify([
            {
                name: 'Meta Pool',
                url: 'https://near.org/near/widget/Search.IndexPage?term=meta-pool',
                description: 'Liquid Staking Protocol built on NEAR',
            },
            {
                name: 'LiNEAR Protocol',
                url: 'https://near.org/near/widget/Search.IndexPage?term=linear-protocol',
                description:
                    'LiNEAR is a decentralized synthetic asset issuance protocol built on NEAR Protocol.',
            },
            {
                name: 'Learn Near',
                url: 'https://learnnear.club/',
                description:
                    'Learn Near is a community of people who want to learn about Near Protocol.',
            },
        ]);
    },
};
