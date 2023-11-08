import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

export async function GET(request: Request, response: Response) {
    if (!cookies().has('session_id')) {
        cookies().set('session_id', uuid());
    }

    return NextResponse.json({
        status: 'success',
    });
}
