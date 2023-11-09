import {executeSql} from '@/llm/alexander/executeSql';
import {NextResponse} from 'next/server';

export async function POST(request: Request, response: Response) {
    const {sql} = await request.json();
    console.log("Executing SQL", sql);

    const result = await executeSql(sql);

    return NextResponse.json(result);
}
