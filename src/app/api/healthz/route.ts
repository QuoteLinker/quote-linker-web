import { NextResponse } from 'next/server';

/**
 * Health check endpoint for Cloud Run
 * Returns HTTP 200 OK when the service is running
 */
export async function GET() {
  return NextResponse.json(
    { status: 'ok', time: new Date().toISOString() },
    { status: 200 }
  );
}
