import { NextRequest } from 'next/server';
import { proxyRequest } from '../_proxy';

// POST /api/wallet → Express POST /wallet
export async function POST(req: NextRequest) {
  const body = await req.json();
  return proxyRequest(req, '/wallet', 'POST', body);
}
