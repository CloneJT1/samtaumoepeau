'use client';

import { useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'sdprospects2024';

interface Submission {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  school: string;
  position: string;
  classYear: number;
  heightFeet?: string;
  heightInches?: string;
  weight?: string;
  hudlLink?: string;
  maxPrepsLink?: string;
  otherFilmLink?: string;
  gpa?: string;
  additionalInfo?: string;
  submitterName: string;
  submitterEmail: string;
  additionalInfo?: string;
  status: string;
  scoreSize?: number;
  scoreProduction?: number;
  scoreFilm?: number;
  scoreTotal?: number;
  stars?: number;
  xHandle?: string;
}

// Size score formula based on position + height/weight
function calcSizeScore(position: string, heightFeet?: string, heightInches?: string, weight?: string): number {
  if (!heightFeet || !weight) return 0;
  const totalInches = parseInt(heightFeet) * 12 + parseInt(heightInches || '0');
  const lbs = parseInt(weight);
  if (!totalInches || !lbs) return 0;

  const pos = position.toUpperCase();

  // D1 thresholds by position group
  const thresholds: Record<string, { htD1: number; wtD1: number }> = {
    QB:  { htD1: 74, wtD1: 210 },
    RB:  { htD1: 70, wtD1: 195 },
    WR:  { htD1: 72, wtD1: 185 },
    TE:  { htD1: 76, wtD1: 240 },
    OL:  { htD1: 76, wtD1: 295 },
    DL:  { htD1: 74, wtD1: 270 },
    LB:  { htD1: 73, wtD1: 225 },
    CB:  { htD1: 71, wtD1: 175 },
    S:   { htD1: 72, wtD1: 195 },
    ATH: { htD1: 72, wtD1: 185 },
    'K/P': { htD1: 72, wtD1: 185 },
  };

  const t = thresholds[pos] || thresholds['ATH'];
  const htOk = totalInches >= t.htD1;
  const wtOk = lbs >= t.wtD1;
  const htClose = totalInches >= t.htD1 - 2;
  const wtClose = lbs >= t.wtD1 - 15;

  if (htOk && wtOk) return 40;
  if ((htOk || htClose) && (wtOk || wtClose)) return 28;
  if (htClose && wtClose) return 20;
  return 10;
}

function starsLabel(stars: number) {
  if (stars === 5) return '5★ Elite';
  if (stars === 4) return '4★ High Major';
  if (stars === 3) return '3★ Mid Major';
  if (stars === 2) return '2★ FCS/D2';
  if (stars === 1) return '1★ D3/NAIA';
  return 'Unrated';
}

function calcStars(total: number) {
  if (total >= 90) return 5;
  if (total >= 80) return 4;
  if (total >= 65) return 3;
  if (total >= 57) return 2;
  if (total >= 50) return 1;
  return 0;
}

function ScorePanel({ sub, onSaved }: { sub: Submission; onSaved: () => void }) {
  const autoSize = calcSizeScore(sub.position, sub.heightFeet, sub.heightInches, sub.weight);
  const initSize = sub.scoreSize != null ? String(sub.scoreSize) : autoSize ? String(autoSize) : '';
  const initProd = sub.scoreProduction != null ? String(sub.scoreProduction) : '';
  const initFilm = sub.scoreFilm != null ? String(sub.scoreFilm) : '';
  const [scoreSize, setScoreSize] = useState(initSize);
  const [scoreProd, setScoreProd] = useState(initProd);
  const [scoreFilm, setScoreFilm] = useState(initFilm);
  const [xHandle, setXHandle] = useState(sub.xHandle || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const sz = parseInt(scoreSize) || 0;
  const pr = parseInt(scoreProd) || 0;
  const fm = parseInt(scoreFilm) || 0;
  const total = sz + pr + fm;
  const stars = total > 0 ? calcStars(total) : 0;

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: sub.id,
          scoreSize: sz || null,
          scoreProduction: pr || null,
          scoreFilm: fm || null,
          xHandle: xHandle.trim() || null,
        }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => { setSaved(false); onSaved(); }, 1500);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-4 border-t border-gray-100 pt-4">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Scoring</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Size (0–40)</label>
          <input
            type="number" min="0" max="40"
            value={scoreSize}
            onChange={(e) => setScoreSize(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2"
            style={{ color: '#002147' }}
            placeholder={`Auto: ${autoSize}`}
          />
          {autoSize > 0 && (
            <div className="text-xs text-gray-400 mt-0.5">
              Auto: {autoSize} {scoreSize !== String(autoSize) && scoreSize !== '' ? '(overridden)' : ''}
            </div>
          )}
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Production (0–30)</label>
          <input
            type="number" min="0" max="30"
            value={scoreProd}
            onChange={(e) => setScoreProd(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2"
            style={{ color: '#002147' }}
            placeholder="0–30"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Film (0–30)</label>
          <input
            type="number" min="0" max="30"
            value={scoreFilm}
            onChange={(e) => setScoreFilm(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2"
            style={{ color: '#002147' }}
            placeholder="0–30"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Total / Stars</label>
          <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-black" style={{ color: '#002147' }}>
            {total > 0 ? `${total} — ${starsLabel(stars)}` : '—'}
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label className="block text-xs text-gray-400 mb-1">X Handle (optional)</label>
        <input
          type="text"
          value={xHandle}
          onChange={(e) => setXHandle(e.target.value)}
          placeholder="@handle"
          className="w-full sm:w-48 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
        />
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="px-5 py-2 rounded-lg font-bold text-sm transition-all hover:scale-105 disabled:opacity-60"
        style={{ backgroundColor: saved ? '#22c55e' : '#FFD700', color: '#002147' }}
      >
        {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Scores'}
      </button>
    </div>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState<'pending' | 'approved' | 'published' | 'rejected' | 'all'>('pending');

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) { setAuthenticated(true); setAuthError(''); }
    else setAuthError('Incorrect password.');
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/submissions');
      const data = await res.json();
      if (res.ok && data.submissions) {
        setSubmissions(data.submissions);
      } else {
        setMessage(`Error loading submissions: ${data.error || res.status}`);
      }
    } catch (err) {
      setMessage(`Fetch error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (authenticated) fetchSubmissions(); }, [authenticated]);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    setActionLoading(id + '-' + action);
    try {
      // Approve = publish to site via GitHub commit
      const endpoint = action === 'approve' ? '/api/admin/publish' : '/api/admin/reject';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok) {
        const msg = action === 'approve'
          ? `✓ Published! Rank #${data.rank || '?'} — Live in ~2 min.`
          : '✕ Rejected.';
        setMessage(msg);
        fetchSubmissions();
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } finally {
      setActionLoading(null);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const filtered = submissions.filter((s) =>
    filter === 'all' ? true : s.status === filter
  );

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full flex items-center justify-center font-black text-lg mx-auto mb-4"
              style={{ backgroundColor: '#002147', color: '#FFD700' }}>🔒</div>
            <h1 className="text-2xl font-black" style={{ color: '#002147' }}>Admin Access</h1>
            <p className="text-gray-500 text-sm mt-1">SD Prospects Dashboard</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                placeholder="Enter admin password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 bg-white" autoFocus />
            </div>
            {authError && <p className="text-red-600 text-sm">{authError}</p>}
            <button type="submit" className="w-full py-3 rounded-lg font-bold text-sm transition-all"
              style={{ backgroundColor: '#002147', color: '#FFD700' }}>Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  const pending = submissions.filter((s) => s.status === 'pending').length;
  const approved = submissions.filter((s) => s.status === 'approved').length;
  const published = submissions.filter((s) => s.status === 'published').length;
  const rejected = submissions.filter((s) => s.status === 'rejected').length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black" style={{ color: '#002147' }}>Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Review, score, and manage submissions</p>
        </div>
        <button onClick={() => setAuthenticated(false)}
          className="text-sm text-gray-400 hover:text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg">Sign Out</button>
      </div>

      {message && (
        <div className="mb-6 px-4 py-3 rounded-lg text-sm font-medium" style={{ backgroundColor: '#FFD700', color: '#002147' }}>
          {message}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Pending', value: pending, key: 'pending' as const },
          { label: 'Published', value: published, key: 'published' as const },
          { label: 'Approved', value: approved, key: 'approved' as const },
          { label: 'Rejected', value: rejected, key: 'rejected' as const },
        ].map(({ label, value, key }) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`rounded-xl border shadow-sm px-5 py-4 text-left transition-all ${filter === key ? 'border-yellow-400 ring-2 ring-yellow-300' : 'border-gray-100 bg-white'}`}>
            <div className="text-2xl font-black" style={{ color: '#002147' }}>{value}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">{label}</div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {(['pending', 'published', 'approved', 'rejected', 'all'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${filter === f ? 'text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
              style={filter === f ? { backgroundColor: '#002147' } : {}}>
              {f}
            </button>
          ))}
        </div>
        <button onClick={fetchSubmissions} className="text-sm font-semibold" style={{ color: '#002147' }}>🔄 Refresh</button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="font-bold text-gray-700">Nothing here.</h3>
          <p className="text-gray-400 text-sm mt-1">No {filter} submissions.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((sub) => (
            <div key={sub.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div style={{ backgroundColor: '#002147' }} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-white font-bold">{sub.firstName} {sub.lastName}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{ backgroundColor: sub.status === 'approved' ? '#22c55e' : sub.status === 'rejected' ? '#ef4444' : '#FFD700', color: sub.status === 'pending' ? '#002147' : 'white' }}>
                    {sub.status}
                  </span>
                  {sub.additionalInfo?.startsWith('⚠️ UPDATE') && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-black bg-orange-500 text-white">
                      ⚠️ UPDATE
                    </span>
                  )}
                  {sub.scoreTotal ? (
                    <span className="text-yellow-300 text-xs font-bold">{sub.scoreTotal}pts — {starsLabel(sub.stars || 0)}</span>
                  ) : null}
                </div>
                <span className="text-xs text-gray-400">{new Date(sub.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                  <div><div className="text-xs text-gray-400 uppercase tracking-wide">School</div><div className="font-medium text-gray-800 mt-0.5">{sub.school}</div></div>
                  <div><div className="text-xs text-gray-400 uppercase tracking-wide">Position</div><div className="font-medium text-gray-800 mt-0.5">{sub.position}</div></div>
                  <div><div className="text-xs text-gray-400 uppercase tracking-wide">Class</div><div className="font-medium text-gray-800 mt-0.5">{sub.classYear}</div></div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">Size</div>
                    <div className="font-medium text-gray-800 mt-0.5">
                      {sub.heightFeet ? `${sub.heightFeet}′${sub.heightInches || '0'}″` : '—'}{sub.weight ? ` / ${sub.weight} lbs` : ''}
                    </div>
                  </div>
                </div>

                {sub.xHandle && (
                  <div className="mb-3">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">X: </span>
                    <a href={`https://x.com/${sub.xHandle.replace('@','')}`} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-bold text-black hover:underline">{sub.xHandle}</a>
                  </div>
                )}
                {sub.hudlLink && (
                  <div className="mb-3">
                    <a href={sub.hudlLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-80"
                      style={{ backgroundColor: '#FF6B00' }}>
                      ▶ Watch Film (Hudl)
                    </a>
                  </div>
                )}
                {sub.maxPrepsLink && (
                  <div className="mb-3">
                    <a href={sub.maxPrepsLink} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline">📊 MaxPreps Stats</a>
                  </div>
                )}
                {sub.otherFilmLink && (
                  <div className="mb-3">
                    <a href={sub.otherFilmLink} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline">🎬 Other Film Link</a>
                  </div>
                )}
                {sub.additionalInfo && (
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 mb-3">{sub.additionalInfo}</p>
                )}
                <div className="text-xs text-gray-400 mb-4">Submitted by: {sub.submitterName} ({sub.submitterEmail})</div>

                <ScorePanel sub={sub} onSaved={fetchSubmissions} />

                {sub.status === 'pending' && (
                  <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                    <button onClick={() => handleAction(sub.id, 'approve')} disabled={actionLoading !== null}
                      className="flex-1 py-2.5 rounded-lg font-bold text-sm transition-all hover:scale-105 disabled:opacity-60"
                      style={{ backgroundColor: '#22c55e', color: 'white' }}>
                      {actionLoading === sub.id + '-approve' ? 'Approving...' : '✓ Approve'}
                    </button>
                    <button onClick={() => handleAction(sub.id, 'reject')} disabled={actionLoading !== null}
                      className="flex-1 py-2.5 rounded-lg font-bold text-sm transition-all hover:scale-105 disabled:opacity-60"
                      style={{ backgroundColor: '#ef4444', color: 'white' }}>
                      {actionLoading === sub.id + '-reject' ? 'Rejecting...' : '✕ Reject'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
