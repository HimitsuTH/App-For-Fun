import { NextRequest, NextResponse } from 'next/server';
import { proxyRequest } from '../../_proxy';

export async function POST(req: NextRequest) {
  return proxyRequest(req, '/auth/logout', 'POST', {});
}
