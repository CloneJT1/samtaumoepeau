import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

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
        additional_info: additionalInfo ? String(additionalInfo).trim() : null,
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
