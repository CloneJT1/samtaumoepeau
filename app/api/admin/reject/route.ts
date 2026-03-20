import { NextRequest, NextResponse } from 'next/server';
import { rejectSubmission } from '@/lib/players';

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing submission ID.' }, { status: 400 });
    }

    const success = rejectSubmission(String(id));

    if (!success) {
      return NextResponse.json({ error: 'Submission not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Reject error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
