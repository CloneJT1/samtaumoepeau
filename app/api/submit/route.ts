import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { readFileSync } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName, lastName, school, position, classYear,
      heightFeet, heightInches, weight, xHandle, hudlLink, maxPrepsLink, otherFilmLink,
      gpa, additionalInfo, submitterName, submitterEmail,
    } = body;

    if (!firstName || !lastName || !school || !position || !classYear || !submitterName || !submitterEmail) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Detect if player already exists
    let isUpdate = false;
    let existingInfo = '';
    try {
      const playersPath = path.join(process.cwd(), 'data', 'players.json');
      const players = JSON.parse(readFileSync(playersPath, 'utf-8'));
      const match = players.find((p: { firstName: string; lastName: string; classYear: number }) =>
        p.firstName?.toLowerCase() === String(firstName).toLowerCase().trim() &&
        p.lastName?.toLowerCase() === String(lastName).toLowerCase().trim() &&
        p.classYear === parseInt(String(classYear))
      );
      if (match) {
        isUpdate = true;
        existingInfo = `[EXISTING: ${match.school}, ${match.position}, Rank #${match.rank || '?'}, ${match.totalScore || 0}pts]`;
      }
    } catch { /* non-blocking */ }

    const sb = getSupabase();
    const { data, error } = await sb
      .from('submissions')
      .insert([{
        first_name: String(firstName).trim(),
        last_name: String(lastName).trim(),
        school: String(school).trim(),
        position: String(position).trim(),
        class_year: parseInt(String(classYear)),
        height_feet: heightFeet ? String(heightFeet).trim() : null,
        height_inches: heightInches ? String(heightInches).trim() : null,
        weight: weight ? String(weight).trim() : null,
        x_handle: xHandle ? String(xHandle).trim() : null,
        hudl_link: hudlLink ? String(hudlLink).trim() : null,
        max_preps_link: maxPrepsLink ? String(maxPrepsLink).trim() : null,
        other_film_link: otherFilmLink ? String(otherFilmLink).trim() : null,
        gpa: gpa ? String(gpa).trim() : null,
        additional_info: isUpdate
          ? `⚠️ UPDATE SUBMISSION ${existingInfo}${additionalInfo ? '\n' + String(additionalInfo).trim() : ''}`
          : (additionalInfo ? String(additionalInfo).trim() : null),
        submitter_name: String(submitterName).trim(),
        submitter_email: String(submitterEmail).trim(),
        status: 'pending',
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save submission.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch (err) {
    console.error('Submit error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
