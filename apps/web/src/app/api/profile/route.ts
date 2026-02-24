import { NextRequest, NextResponse } from 'next/server';

const BACKEND = 'http://localhost:8000';

// GET /api/profile → proxy ไปที่ Express GET /profile
// Next.js server อยู่ฝั่ง server → ส่ง cookie header ต่อไปได้ (ไม่มีปัญหา cross-origin)
export async function GET(req: NextRequest) {
  try {
    const cookie = req.headers.get('cookie') || '';

    const response = await fetch(`${BACKEND}/profile`, {
      method: 'GET',
      headers: {
        'Cookie': cookie,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    // forward set-cookie header จาก Express กลับไปให้ browser ด้วย
    const res = NextResponse.json(data, { status: 200 });
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      res.headers.set('set-cookie', setCookie);
    }
    return res;

  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
