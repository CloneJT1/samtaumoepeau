import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const REPO = 'CloneJT1/sandiegoprospects';
const FILE_PATH = 'data/players.json';

async function getPlayersFromGitHub() {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  const data = await res.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  return { players: JSON.parse(content), sha: data.sha };
}

async function commitPlayersToGitHub(players: unknown[], sha: string) {
  const content = Buffer.from(JSON.stringify(players, null, 2)).toString('base64');
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Auto-publish: approved submission',
      content,
      sha,
      committer: { name: 'CloneJT1', email: 'clonejt1@gmail.com' },
    }),
  });
  return res.ok;
}

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'Missing ID.' }, { status: 400 });

    // Get submission from Supabase
    const sb = getSupabaseAdmin();
    const { data: sub, error } = await sb
      .from('submissions')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !sub) {
      return NextResponse.json({ error: 'Submission not found.' }, { status: 404 });
    }

    if (!sub.score_total) {
      return NextResponse.json({ error: 'Please save scores before approving.' }, { status: 400 });
    }

    // Get current players.json from GitHub
    const { players, sha } = await getPlayersFromGitHub();

    // Generate next ID
    const maxId = Math.max(...(players as { id: number }[]).map((p) => Number(p.id) || 0), 0);
    const newId = maxId + 1;

    // Build height string
    const htFt = parseInt(sub.height_feet || '0');
    const htIn = parseInt(sub.height_inches || '0');
    const totalInches = htFt * 12 + htIn;
    const heightStr = htFt > 0 ? `${htFt}'${htIn}"` : '';

    // Build new player object
    const newPlayer = {
      id: newId,
      rank: null,
      stars: sub.stars || 0,
      firstName: sub.first_name,
      lastName: sub.last_name,
      school: sub.school,
      position: sub.position,
      classYear: sub.class_year,
      height: heightStr,
      heightInches: totalInches || null,
      weight: sub.weight ? parseInt(sub.weight) : null,
      hudlLink: sub.hudl_link || null,
      xHandle: sub.x_handle || null,
      gpa: sub.gpa ? parseFloat(sub.gpa) : null,
      committed: false,
      committedTo: null,
      stats: sub.additional_info || null,
      approved: true,
      createdAt: new Date().toISOString(),
      sizeScore: sub.score_size,
      productionScore: sub.score_production,
      filmScore: sub.score_film,
      totalScore: sub.score_total,
    };

    // Add to players array
    (players as unknown[]).push(newPlayer);

    // Commit to GitHub
    const committed = await commitPlayersToGitHub(players, sha);
    if (!committed) {
      return NextResponse.json({ error: 'Failed to commit to GitHub.' }, { status: 500 });
    }

    // Mark as published in Supabase
    await sb.from('submissions').update({ status: 'approved' }).eq('id', id);

    return NextResponse.json({ success: true, playerId: newId });
  } catch (err) {
    console.error('Publish error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
