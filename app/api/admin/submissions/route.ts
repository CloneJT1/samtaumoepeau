import { NextResponse } from 'next/server';
import { getPendingSubmissions } from '@/lib/players';

export async function GET() {
  try {
    const submissions = getPendingSubmissions();
    return NextResponse.json({ submissions });
  } catch (err) {
    console.error('Error fetching submissions:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
