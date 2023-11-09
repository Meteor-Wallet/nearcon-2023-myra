import { executeSql } from '@/llm/alexander/executeSql';
import { NextResponse } from 'next/server';

export async function POST(request: Request, response: Response) {
    const { sql } = await request.json();

    const result = await executeSql(sql);

    return NextResponse.json(result);
}
