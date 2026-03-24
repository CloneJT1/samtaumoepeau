import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'Missing submission ID.' }, { status: 400 });

    const sb = getSupabaseAdmin();
    const { error } = await sb.from('submissions').update({ status: 'rejected' }).eq('id', id);

    if (error) {
      console.error('Supabase reject error:', error);
      return NextResponse.json({ error: 'Failed to reject submission.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Reject error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
