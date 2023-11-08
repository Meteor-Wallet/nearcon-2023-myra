import {
    ChatCompletionMessageParam,
    ChatCompletionTool,
} from 'openai/resources/index.mjs';
import { Tool } from './types';
import { openai } from './openai';
import { getAccountTokensTool } from './tools/getAccountTokens';
import { getAccountNftsTool } from './tools/getAccountNfts';
import { getFullAccessKeysTool } from './tools/getFullAccessKeys';
import { saveAccountIdTool } from './tools/saveAccountId';
import { getAccountIdTool } from './tools/getAccountId';
import { topDefiListTool } from './tools/topDefiList';
import { getAccountNftTransactionsTool } from './tools/getAccountNftTransactions';
import { queryDatabaseTool } from './tools/queryDatabase';

/**
 * Register all the tools here.
 *
 * Restart the server after adding a new tool.
 */
const tools: Tool[] = [
    getAccountTokensTool,
    getAccountNftsTool,
    getFullAccessKeysTool,
    saveAccountIdTool,
    getAccountIdTool,
    topDefiListTool,
    getAccountNftTransactionsTool,
    queryDatabaseTool,
];

/**
 * Don't touch anything below this line
 */
export function getExecutableTools(): Record<string, Tool> {
    return tools.reduce((acc: Record<string, Tool>, tool) => {
        acc[tool.chatCompletionTools.function.name] = tool;
        return acc;
    }, {});
}

export function getTools(): ChatCompletionTool[] {
    return tools.map((tool) => tool.chatCompletionTools);
}

export function getSystemMessage(): ChatCompletionMessageParam {
    return {
        role: 'system',
        content:
            'You are a customer service agent that will help users with their issues on Near Protocol.\n' +
            'You can write response in markdown format if you want to display links or image to user.',
    };
}

export async function getResponse(
    chatHistory: ChatCompletionMessageParam[]
): Promise<ChatCompletionMessageParam[]> {
    const messages = [...chatHistory];

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-1106',
        messages: messages,
        tools: getTools(),
        tool_choice: 'auto', // auto is default, but we'll be explicit
    });

    const message = response.choices[0].message;

    messages.push(message);

    if (!message.tool_calls) {
        return messages;
    }

    const toolCalls = message.tool_calls;

    const executableTools = getExecutableTools();

    for (const toolCall of toolCalls) {
        const handler = executableTools[toolCall.function.name]?.handler;

        if (!handler) {
            continue;
        }

        const params = JSON.parse(toolCall.function.arguments);

        const toolResponse = await handler(params).catch((err) =>
            JSON.stringify({ error: err.message })
        );

        messages.push({
            tool_call_id: toolCall.id,
            role: 'tool',
            content: toolResponse,
        });
    }

    return getResponse(messages);
}
