import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { id, scoreSize, scoreProduction, scoreFilm, xHandle } = await req.json();
    if (!id) return NextResponse.json({ error: 'Missing ID.' }, { status: 400 });

    const total = (scoreSize || 0) + (scoreProduction || 0) + (scoreFilm || 0);
    const stars =
      total >= 90 ? 5 :
      total >= 80 ? 4 :
      total >= 65 ? 3 :
      total >= 57 ? 2 :
      total >= 50 ? 1 : 0;

    const sb = getSupabaseAdmin();
    const { error } = await sb.from('submissions').update({
      score_size: scoreSize ?? null,
      score_production: scoreProduction ?? null,
      score_film: scoreFilm ?? null,
      score_total: total,
      stars,
      x_handle: xHandle || null,
    }).eq('id', id);

    if (error) {
      console.error('Score save error:', error);
      return NextResponse.json({ error: 'Failed to save scores.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, total, stars });
  } catch (err) {
    console.error('Score error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
