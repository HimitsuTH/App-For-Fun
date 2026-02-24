import { NextRequest } from 'next/server';
import { proxyRequest } from '../_proxy';

// GET /api/expense → Express GET /expense
export async function GET(req: NextRequest) {
  return proxyRequest(req, '/expense', 'GET');
}

// POST /api/expense → Express POST /expense  (create)
export async function POST(req: NextRequest) {
  const body = await req.json();
  return proxyRequest(req, '/expense', 'POST', body);
}
