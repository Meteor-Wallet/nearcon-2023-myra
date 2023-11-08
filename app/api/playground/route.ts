import { getExecutableTools } from '@/llm/engine';
import { NextResponse } from 'next/server';

export async function POST(request: Request, response: Response) {
    const { functionName, params } = await request.json();

    const result = await getExecutableTools()[functionName].handler(params);

    return NextResponse.json(JSON.parse(result));
}
