import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const sb = getSupabaseAdmin();
    const { data, error } = await sb
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch submissions.' }, { status: 500 });
    }

    const submissions = (data || []).map((row) => ({
      id: row.id,
      createdAt: row.created_at,
      firstName: row.first_name,
      lastName: row.last_name,
      school: row.school,
      position: row.position,
      classYear: row.class_year,
      heightFeet: row.height_feet,
      heightInches: row.height_inches,
      weight: row.weight,
      hudlLink: row.hudl_link,
      otherFilmLink: row.other_film_link,
      gpa: row.gpa,
      additionalInfo: row.additional_info,
      submitterName: row.submitter_name,
      submitterEmail: row.submitter_email,
      status: row.status,
      adminNotes: row.admin_notes,
    }));

    return NextResponse.json({ submissions });
  } catch (err) {
    console.error('Error fetching submissions:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
