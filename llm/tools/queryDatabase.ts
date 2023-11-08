import { Tool } from '../types';

export const queryDatabaseTool: Tool = {
    chatCompletionTools: {
        type: 'function',
        function: {
            name: 'queryDatabase',
            description: 'Query the database with an sql statement',
            parameters: {
                type: 'object',
                properties: {
                    sql: {
                        type: 'string',
                        description: `The sql statement to run.`,
                    },
                },
                required: ['sql'],
            },
        },
    },
    handler: async ({ sql }: { sql: string }): Promise<string> => {
        return '{"error":"This tool is not yet implemented"}';
    },
};
