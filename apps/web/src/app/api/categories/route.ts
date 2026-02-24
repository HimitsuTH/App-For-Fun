import { NextRequest } from 'next/server';
import { proxyRequest } from '../_proxy';

// GET /api/categories → Express GET /categories
export async function GET(req: NextRequest) {
  return proxyRequest(req, '/categories', 'GET');
}

// POST /api/categories → Express POST /categories  (create)
export async function POST(req: NextRequest) {
  const body = await req.json();
  return proxyRequest(req, '/categories', 'POST', body);
}
