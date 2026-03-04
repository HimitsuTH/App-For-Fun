import { NextRequest } from 'next/server';
import { proxyRequest } from '../../_proxy';

// GET /api/categories/budget → budget summary เดือนนี้
export async function GET(req: NextRequest) {
  return proxyRequest(req, '/categories/budget', 'GET');
}
