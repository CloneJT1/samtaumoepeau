'use client';

import { useState, useEffect } from 'react';
import type { PendingSubmission } from '@/lib/players';

const ADMIN_PASSWORD = 'sdprospects2024';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [submissions, setSubmissions] = useState<PendingSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password.');
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/submissions');
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchSubmissions();
    }
  }, [authenticated]);

  const handleApprove = async (id: string) => {
    setActionLoading(id + '-approve');
    try {
      const res = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setMessage('Player approved and added to rankings!');
        fetchSubmissions();
      } else {
        const data = await res.json();
        setMessage(`Error: ${data.error}`);
      }
    } finally {
      setActionLoading(null);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleReject = async (id: string) => {
    setActionLoading(id + '-reject');
    try {
      const res = await fetch('/api/admin/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setMessage('Submission rejected and removed.');
        fetchSubmissions();
      } else {
        const data = await res.json();
        setMessage(`Error: ${data.error}`);
      }
    } finally {
      setActionLoading(null);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center font-black text-lg mx-auto mb-4"
              style={{ backgroundColor: '#002147', color: '#FFD700' }}
            >
              🔒
            </div>
            <h1 className="text-2xl font-black" style={{ color: '#002147' }}>
              Admin Access
            </h1>
            <p className="text-gray-500 text-sm mt-1">SD Prospects Dashboard</p>
          </div>

          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter admin password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 bg-white"
                autoFocus
              />
            </div>
            {authError && (
              <p className="text-red-600 text-sm">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-bold text-sm transition-all"
              style={{ backgroundColor: '#002147', color: '#FFD700' }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black" style={{ color: '#002147' }}>
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">Review and manage player submissions</p>
        </div>
        <button
          onClick={() => setAuthenticated(false)}
          className="text-sm text-gray-400 hover:text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Message Toast */}
      {message && (
        <div
          className="mb-6 px-4 py-3 rounded-lg text-sm font-medium"
          style={{ backgroundColor: '#FFD700', color: '#002147' }}
        >
          {message}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Pending Submissions', value: submissions.length, color: '#FFD700' },
          { label: 'Awaiting Review', value: submissions.length, color: '#002147' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
            <div className="text-2xl font-black" style={{ color: '#002147' }}>{value}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">{label}</div>
          </div>
        ))}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
          <button
            onClick={fetchSubmissions}
            className="text-sm font-semibold hover:underline"
            style={{ color: '#002147' }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Submissions */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading submissions...</div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="font-bold text-gray-700">All caught up!</h3>
          <p className="text-gray-400 text-sm mt-1">No pending submissions right now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div key={sub.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div style={{ backgroundColor: '#002147' }} className="px-5 py-3 flex items-center justify-between">
                <span className="text-white font-bold">
                  {sub.firstName} {sub.lastName}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(sub.submittedAt).toLocaleDateString()}
                </span>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">School</div>
                    <div className="font-medium text-gray-800 mt-0.5">{sub.school}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">Position</div>
                    <div className="font-medium text-gray-800 mt-0.5">{sub.position}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">Class</div>
                    <div className="font-medium text-gray-800 mt-0.5">{sub.classYear}</div>
                  </div>
                  {(sub.heightFeet || sub.heightInches) && (
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">Height</div>
                      <div className="font-medium text-gray-800 mt-0.5">
                        {sub.heightFeet}′{sub.heightInches}″
                      </div>
                    </div>
                  )}
                </div>

                {sub.hudlLink && (
                  <div className="mb-3">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Hudl: </span>
                    <a
                      href={sub.hudlLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline break-all"
                    >
                      {sub.hudlLink}
                    </a>
                  </div>
                )}

                {sub.additionalInfo && (
                  <div className="mb-3">
                    <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Additional Info</div>
                    <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{sub.additionalInfo}</p>
                  </div>
                )}

                <div className="text-xs text-gray-400 mb-4">
                  Submitted by: {sub.submitterName} ({sub.submitterEmail})
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(sub.id)}
                    disabled={actionLoading !== null}
                    className="flex-1 py-2.5 rounded-lg font-bold text-sm transition-all hover:scale-105 disabled:opacity-60"
                    style={{ backgroundColor: '#22c55e', color: 'white' }}
                  >
                    {actionLoading === sub.id + '-approve' ? 'Approving...' : '✓ Approve'}
                  </button>
                  <button
                    onClick={() => handleReject(sub.id)}
                    disabled={actionLoading !== null}
                    className="flex-1 py-2.5 rounded-lg font-bold text-sm transition-all hover:scale-105 disabled:opacity-60"
                    style={{ backgroundColor: '#ef4444', color: 'white' }}
                  >
                    {actionLoading === sub.id + '-reject' ? 'Rejecting...' : '✕ Reject'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
