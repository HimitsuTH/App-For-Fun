import { NextRequest } from 'next/server';
import { proxyRequest } from '../../_proxy';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  return proxyRequest(req, `/expense/${params.id}`, 'PUT', body);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return proxyRequest(req, `/expense/${params.id}`, 'DELETE');
}
