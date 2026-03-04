import { NextRequest, NextResponse } from 'next/server';

const BACKEND = 'http://localhost:8000';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log('[LOGIN] Sending to Express without cookie...');

    const response = await fetch(`${BACKEND}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('[LOGIN] Express status:', response.status);

    const setCookie = response.headers.get('set-cookie');
    console.log('[LOGIN] set-cookie from Express:', setCookie);

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    const res = NextResponse.json(data, { status: 200 });

    if (setCookie) {
      // strip Domain ออกเพื่อให้ browser เก็บเป็น cookie ของ localhost:3000
      const cleanCookie = setCookie
        .split(';')
        .filter(part => !part.trim().toLowerCase().startsWith('domain'))
        .join(';');
      console.log('[LOGIN] Clean cookie to set:', cleanCookie);
      res.headers.set('set-cookie', cleanCookie);
    }

    return res;
  } catch (err: any) {
    console.error('[LOGIN] Error:', err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
