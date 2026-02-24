import { NextRequest } from 'next/server';
import { proxyRequest } from '../_proxy';

// GET /api/profile → Express GET /profile
export async function GET(req: NextRequest) {
  return proxyRequest(req, '/profile', 'GET');
}
