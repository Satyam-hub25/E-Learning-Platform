import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Tailwind setup test endpoint',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
}