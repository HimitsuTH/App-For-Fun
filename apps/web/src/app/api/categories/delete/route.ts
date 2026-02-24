import { NextRequest } from 'next/server';
import { proxyRequest } from '../../_proxy';

// POST /api/categories/delete → Express POST /categories/delete
export async function POST(req: NextRequest) {
  const body = await req.json();
  return proxyRequest(req, '/categories/delete', 'POST', body);
}
