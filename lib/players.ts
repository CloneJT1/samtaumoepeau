import fs from 'fs';
import path from 'path';

export interface Player {
  id: string;
  rank: number;
  stars: number;
  firstName: string;
  lastName: string;
  school: string;
  position: string;
  classYear: number;
  height: string;
  weight: number;
  hudlLink?: string;
  xHandle?: string;
  gpa?: number;
  committed?: boolean | string | null;
  committedTo?: string | null;
  stats?: string;
  approved: boolean;
  createdAt: string;
  totalScore?: number;
  sizeScore?: number;
  productionScore?: number;
  filmScore?: number;
}

export interface PendingSubmission {
  id: string;
  firstName: string;
  lastName: string;
  school: string;
  position: string;
  classYear: number;
  heightFeet?: string;
  heightInches?: string;
  weight?: string;
  hudlLink?: string;
  otherFilmLink?: string;
  gpa?: string;
  additionalInfo?: string;
  submitterName: string;
  submitterEmail: string;
  submittedAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const PLAYERS_FILE = path.join(DATA_DIR, 'players.json');
const PENDING_FILE = path.join(DATA_DIR, 'pending.json');

export function getPlayers(): Player[] {
  try {
    const data = fs.readFileSync(PLAYERS_FILE, 'utf-8');
    const players: Player[] = JSON.parse(data);
    return players.filter((p) => p.approved);
  } catch {
    return [];
  }
}

export function getPlayerById(id: string): Player | null {
  try {
    const data = fs.readFileSync(PLAYERS_FILE, 'utf-8');
    const players: Player[] = JSON.parse(data);
    return players.find((p) => p.id === id) || null;
  } catch {
    return null;
  }
}

export function getAllPlayers(): Player[] {
  try {
    const data = fs.readFileSync(PLAYERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function savePlayers(players: Player[]): void {
  fs.writeFileSync(PLAYERS_FILE, JSON.stringify(players, null, 2));
}

export function getPendingSubmissions(): PendingSubmission[] {
  try {
    const data = fs.readFileSync(PENDING_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function savePendingSubmissions(submissions: PendingSubmission[]): void {
  fs.writeFileSync(PENDING_FILE, JSON.stringify(submissions, null, 2));
}

export function addPendingSubmission(submission: Omit<PendingSubmission, 'id' | 'submittedAt'>): PendingSubmission {
  const pending = getPendingSubmissions();
  const newSubmission: PendingSubmission = {
    ...submission,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
  };
  pending.push(newSubmission);
  savePendingSubmissions(pending);
  return newSubmission;
}

export function approveSubmission(submissionId: string): boolean {
  const pending = getPendingSubmissions();
  const submission = pending.find((s) => s.id === submissionId);
  if (!submission) return false;

  const players = getAllPlayers();
  const maxRank = players.reduce((max, p) => Math.max(max, p.rank), 0);

  const newPlayer: Player = {
    id: Date.now().toString(),
    rank: maxRank + 1,
    stars: 3,
    firstName: submission.firstName,
    lastName: submission.lastName,
    school: submission.school,
    position: submission.position,
    classYear: submission.classYear,
    height: submission.heightFeet && submission.heightInches
      ? `${submission.heightFeet}'${submission.heightInches}"`
      : '',
    weight: submission.weight ? parseInt(submission.weight) : 0,
    hudlLink: submission.hudlLink,
    gpa: submission.gpa ? parseFloat(submission.gpa) : undefined,
    committed: null,
    stats: submission.additionalInfo || '',
    approved: true,
    createdAt: new Date().toISOString().split('T')[0],
  };

  players.push(newPlayer);
  savePlayers(players);

  const updatedPending = pending.filter((s) => s.id !== submissionId);
  savePendingSubmissions(updatedPending);

  return true;
}

export function rejectSubmission(submissionId: string): boolean {
  const pending = getPendingSubmissions();
  const filtered = pending.filter((s) => s.id !== submissionId);
  if (filtered.length === pending.length) return false;
  savePendingSubmissions(filtered);
  return true;
}
