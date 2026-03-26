'use client';

import { useState, FormEvent } from 'react';

const POSITIONS = ['QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'CB', 'S', 'K/P', 'ATH'];
const CLASS_YEARS = ['2025', '2026', '2027', '2028', '2029'];
const FEET = ['5', '6', '7'];
const INCHES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

interface FormState {
  firstName: string;
  lastName: string;
  school: string;
  position: string;
  classYear: string;
  heightFeet: string;
  heightInches: string;
  weight: string;
  xHandle: string;
  hudlLink: string;
  maxPrepsLink: string;
  otherFilmLink: string;
  gpa: string;
  additionalInfo: string;
  submitterName: string;
  submitterEmail: string;
}

const defaultForm: FormState = {
  firstName: '',
  lastName: '',
  school: '',
  position: '',
  classYear: '',
  heightFeet: '',
  heightInches: '',
  weight: '',
  xHandle: '',
  hudlLink: '',
  maxPrepsLink: '',
  otherFilmLink: '',
  gpa: '',
  additionalInfo: '',
  submitterName: '',
  submitterEmail: '',
};

export default function SubmitPage() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }

      setSuccess(true);
      setForm(defaultForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="text-6xl mb-4">🏈</div>
        <h2 className="text-3xl font-black mb-3" style={{ color: '#002147' }}>
          Submission Received!
        </h2>
        <p className="text-gray-600 mb-6">
          Thanks for submitting a player! We&apos;ll review their info and film, and if approved,
          they&apos;ll appear in the rankings. We appreciate you helping build the SD Prospects database.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => setSuccess(false)}
            className="px-6 py-2.5 rounded-lg font-bold text-sm border-2 transition-colors"
            style={{ borderColor: '#002147', color: '#002147' }}
          >
            Submit Another Player
          </button>
          <a
            href="/rankings"
            className="px-6 py-2.5 rounded-lg font-bold text-sm text-white transition-all"
            style={{ backgroundColor: '#002147' }}
          >
            View Rankings
          </a>
        </div>
      </div>
    );
  }

  const inputClass =
    'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 bg-white placeholder-gray-400';
  const labelClass = 'block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5';

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 rounded-full" style={{ backgroundColor: '#FFD700' }} />
          <h1 className="text-3xl font-black" style={{ color: '#002147' }}>
            Submit a Player
          </h1>
        </div>
        <p className="text-gray-500 ml-4 pl-3">
          Know a San Diego County prospect who deserves to be ranked? Submit their info below.
          All submissions are reviewed before going live.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Player Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4">Player Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                placeholder="Marcus"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                placeholder="Johnson"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className={labelClass}>High School *</label>
            <input
              type="text"
              name="school"
              value={form.school}
              onChange={handleChange}
              required
              placeholder="Helix High School"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className={labelClass}>Position *</label>
              <select
                name="position"
                value={form.position}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Select position</option>
                {POSITIONS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Class Year *</label>
              <select
                name="classYear"
                value={form.classYear}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Select year</option>
                {CLASS_YEARS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Physical Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4">Physical Measurements</h2>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Feet</label>
              <select name="heightFeet" value={form.heightFeet} onChange={handleChange} className={inputClass}>
                <option value="">Ft</option>
                {FEET.map((f) => <option key={f} value={f}>{f}′</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Inches</label>
              <select name="heightInches" value={form.heightInches} onChange={handleChange} className={inputClass}>
                <option value="">In</option>
                {INCHES.map((i) => <option key={i} value={i}>{i}″</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Weight (lbs)</label>
              <input
                type="number"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                placeholder="185"
                min="100"
                max="400"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Film Links */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4">Film &amp; Links</h2>

          <div>
            <label className={labelClass}>X (Twitter) Handle</label>
            <input
              type="text"
              name="xHandle"
              value={form.xHandle}
              onChange={handleChange}
              placeholder="@PlayerHandle"
              className={inputClass}
            />
          </div>

          <div className="mt-4">
            <label className={labelClass}>Hudl Profile Link</label>
            <input
              type="text"
              name="hudlLink"
              value={form.hudlLink}
              onChange={handleChange}
              placeholder="https://www.hudl.com/profile/..."
              className={inputClass}
            />
          </div>

          <div className="mt-4">
            <label className={labelClass}>MaxPreps Stats Link</label>
            <input
              type="text"
              name="maxPrepsLink"
              value={form.maxPrepsLink}
              onChange={handleChange}
              placeholder="https://www.maxpreps.com/athlete/..."
              className={inputClass}
            />
          </div>

          <div className="mt-4">
            <label className={labelClass}>Other Film Link</label>
            <input
              type="text"
              name="otherFilmLink"
              value={form.otherFilmLink}
              onChange={handleChange}
              placeholder="YouTube, other highlight link, etc."
              className={inputClass}
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4">Additional Details</h2>

          <div>
            <label className={labelClass}>GPA (optional)</label>
            <input
              type="number"
              name="gpa"
              value={form.gpa}
              onChange={handleChange}
              placeholder="3.8"
              min="0"
              max="5"
              step="0.1"
              className={inputClass}
            />
          </div>

          <div className="mt-4">
            <label className={labelClass}>Stats &amp; Additional Info</label>
            <textarea
              name="additionalInfo"
              value={form.additionalInfo}
              onChange={handleChange}
              rows={4}
              placeholder="Season stats, awards, offers, anything else relevant..."
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        {/* Submitter Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4">Your Information</h2>
          <p className="text-sm text-gray-500 mb-4">
            We may follow up with you if we need more info. Not shown publicly.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Your Name *</label>
              <input
                type="text"
                name="submitterName"
                value={form.submitterName}
                onChange={handleChange}
                required
                placeholder="John Smith"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Your Email *</label>
              <input
                type="email"
                name="submitterEmail"
                value={form.submitterEmail}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
          style={{ backgroundColor: '#002147', color: '#FFD700' }}
        >
          {submitting ? 'Submitting...' : '🏈 Submit Player'}
        </button>
      </form>
    </div>
  );
}
