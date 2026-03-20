import { NextRequest, NextResponse } from 'next/server';
import { addPendingSubmission } from '@/lib/players';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      school,
      position,
      classYear,
      heightFeet,
      heightInches,
      weight,
      hudlLink,
      otherFilmLink,
      gpa,
      additionalInfo,
      submitterName,
      submitterEmail,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !school || !position || !classYear || !submitterName || !submitterEmail) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const submission = addPendingSubmission({
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      school: String(school).trim(),
      position: String(position).trim(),
      classYear: parseInt(String(classYear)),
      heightFeet: heightFeet ? String(heightFeet).trim() : undefined,
      heightInches: heightInches ? String(heightInches).trim() : undefined,
      weight: weight ? String(weight).trim() : undefined,
      hudlLink: hudlLink ? String(hudlLink).trim() : undefined,
      otherFilmLink: otherFilmLink ? String(otherFilmLink).trim() : undefined,
      gpa: gpa ? String(gpa).trim() : undefined,
      additionalInfo: additionalInfo ? String(additionalInfo).trim() : undefined,
      submitterName: String(submitterName).trim(),
      submitterEmail: String(submitterEmail).trim(),
    });

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch (err) {
    console.error('Submit error:', err);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
