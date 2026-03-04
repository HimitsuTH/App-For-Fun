import { NextRequest } from 'next/server';
import { proxyRequest } from '../../../_proxy';

// PUT /api/categories/:id/budget → ตั้ง budget limit
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  return proxyRequest(req, `/categories/${params.id}/budget`, 'PUT', body);
}
