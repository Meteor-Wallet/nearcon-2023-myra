import {
    getResponse,
    getSystemMessage,
    getFewShotExamples,
} from '@/llm/alexander/engine';
import { executeSql } from '@/llm/alexander/executeSql';
import { NextResponse } from 'next/server';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

export async function POST(request: Request, response: Response) {
    const { chats } = (await request.json()) as {
        chats: ChatCompletionMessageParam[];
    };

    const chatHistory: ChatCompletionMessageParam[] = [
        getSystemMessage(),
        ...getFewShotExamples(),
        chats.pop(),
    ] as ChatCompletionMessageParam[];

    const result = await getResponse(chatHistory);

    const chatResult = result.pop() as ChatCompletionMessageParam;

    const sql = chatResult.content as string;

    const sqlResult = await executeSql(sql);

    return NextResponse.json({
        chatResult,
        sqlResult,
    });
}
