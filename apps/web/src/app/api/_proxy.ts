import { NextRequest, NextResponse } from 'next/server';

export const BACKEND = 'http://localhost:8000';

export async function proxyRequest(
  req: NextRequest,
  backendPath: string,
  method: string,
  body?: any
) {
  const cookie = req.headers.get('cookie') || '';

  console.log(`[PROXY] ${method} ${backendPath}`);
  console.log(`[PROXY] Cookie header: "${cookie}"`);

  const options: RequestInit = {
    method,
    headers: {
      'Cookie': cookie,
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BACKEND}${backendPath}`, options);
  
  console.log(`[PROXY] Response status: ${response.status}`);
  console.log(`[PROXY] set-cookie: ${response.headers.get('set-cookie')}`);

  const data = await response.json();
  const res = NextResponse.json(data, { status: response.status });

  const setCookie = response.headers.get('set-cookie');
  if (setCookie) res.headers.set('set-cookie', setCookie);

  return res;
}
