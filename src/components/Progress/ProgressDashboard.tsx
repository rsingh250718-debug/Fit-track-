import React, { useState } from 'react';
import { useWorkout } from '../../context/WorkoutContext';
import { PRTracker } from './PRTracker';
import { BodyMeasurementModal } from './BodyMeasurementModal';
import {
  TrendingUp,
  Flame,
  Dumbbell,
  Calendar,
  Trophy,
  Scale,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const ProgressDashboard: React.FC = () => {
  const { history, profile, measurements, streakCount, personalRecords } = useWorkout();

  const [activeSubTab, setActiveSubTab] = useState<'analytics' | 'prs' | 'measurements'>('analytics');
  const [showMeasureModal, setShowMeasureModal] = useState<boolean>(false);
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);

  // Compute aggregate stats
  const totalWorkouts = history.length;
  const totalVolume = history.reduce((sum, h) => sum + h.totalVolume, 0);
  const totalCaloriesBurned = history.reduce((sum, h) => sum + h.caloriesBurned, 0);

  // Volume progression data (last 7 workouts)
  const recentSessions = [...history].reverse().slice(-7);
  const maxVolumeInSessions = Math.max(1, ...recentSessions.map((s) => s.totalVolume));

  const toggleSessionExpand = (id: string) => {
    setExpandedSessionId(expandedSessionId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Top Aggregated Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 bg-zinc-900/90 border border-zinc-800 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>SESSIONS</span>
            <Calendar className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-2">
            {totalWorkouts}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mt-1">
            <Sparkles className="w-3 h-3" />
            <span>{streakCount} session streak</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-zinc-900/90 border border-zinc-800 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>TOTAL VOLUME</span>
            <Dumbbell className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono mt-2">
            {(totalVolume / 1000).toFixed(1)}k
          </div>
          <div className="text-xs text-zinc-500 mt-1">
            {profile.unitSystem === 'metric' ? 'kg' : 'lbs'} lifted overall
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-zinc-900/90 border border-zinc-800 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>CALORIES BURNED</span>
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-2">
            {totalCaloriesBurned.toLocaleString()}
          </div>
          <div className="text-xs text-zinc-500 mt-1">Active exercise burn</div>
        </div>

        <div className="p-4 sm:p-5 bg-zinc-900/90 border border-zinc-800 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>ALL-TIME PRS</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-2">
            {personalRecords.length}
          </div>
          <div className="text-xs text-amber-400 font-medium mt-1">Personal records</div>
        </div>
      </div>

      {/* Sub Tabs: Analytics & History, PRs, Body Measurements */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 text-xs">
        <button
          onClick={() => setActiveSubTab('analytics')}
          className={`px-3.5 py-2 rounded-lg font-semibold transition-colors ${
            activeSubTab === 'analytics'
              ? 'bg-amber-400 text-black font-bold'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          Volume & Session History
        </button>
        <button
          onClick={() => setActiveSubTab('prs')}
          className={`px-3.5 py-2 rounded-lg font-semibold transition-colors ${
            activeSubTab === 'prs'
              ? 'bg-amber-400 text-black font-bold'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          1RM & Personal Records ({personalRecords.length})
        </button>
        <button
          onClick={() => setActiveSubTab('measurements')}
          className={`px-3.5 py-2 rounded-lg font-semibold transition-colors ${
            activeSubTab === 'measurements'
              ? 'bg-amber-400 text-black font-bold'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          Body Weight & Composition ({measurements.length})
        </button>
      </div>

      {/* SUB-TAB 1: Analytics & History */}
      {activeSubTab === 'analytics' && (
        <div className="space-y-6">
          {/* Volume Progression Chart */}
          <div className="p-5 sm:p-6 bg-zinc-900/90 border border-zinc-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>Volume Overload Progression</span>
                </div>
                <h3 className="text-base font-bold text-white mt-0.5">
                  Tonnage per Session (Recent Workouts)
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-400">
                Peak: {Math.max(...recentSessions.map((s) => s.totalVolume), 0)}{' '}
                {profile.unitSystem === 'metric' ? 'kg' : 'lbs'}
              </span>
            </div>

            {/* Custom SVG / Bar Chart */}
            <div className="pt-4">
              <div className="flex items-end gap-3 sm:gap-6 h-48 border-b border-zinc-800 px-2 pb-2">
                {recentSessions.map((session, idx) => {
                  const heightPercent = Math.max(
                    15,
                    Math.round((session.totalVolume / maxVolumeInSessions) * 100)
                  );
                  const shortDate = new Date(session.date).toLocaleDateString('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                  });

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950 text-amber-400 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap border border-zinc-800 shadow">
                        {session.totalVolume.toLocaleString()}{profile.unitSystem === 'metric' ? 'kg' : 'lbs'}
                      </div>
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full max-w-[48px] rounded-t-lg bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 group-hover:brightness-110 transition-all duration-300 relative shadow-lg shadow-amber-500/10"
                      />
                      <span className="text-[10px] font-mono text-zinc-500 whitespace-nowrap">
                        {shortDate}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Workout History Log Timeline */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase text-zinc-400">Workout History Timeline</h3>
              <span className="text-xs text-zinc-500">{history.length} logged sessions</span>
            </div>

            <div className="space-y-3">
              {history.map((session) => {
                const isExpanded = expandedSessionId === session.id;
                const formattedDate = new Date(session.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={session.id}
                    className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-3 transition-colors"
                  >
                    <div
                      onClick={() => toggleSessionExpand(session.id)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <span className="font-mono">{formattedDate}</span>
                          {session.newPrsCount && session.newPrsCount > 0 && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                              <Trophy className="w-3 h-3" />
                              {session.newPrsCount} New PR
                            </span>
                          )}
                        </div>
                        <h4 className="text-base font-bold text-white mt-0.5">
                          {session.routineTitle}
                        </h4>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-right">
                          <div>
                            <span className="text-zinc-500 text-[10px] block">DURATION</span>
                            <span className="text-white font-bold">{session.durationMinutes}m</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 text-[10px] block">BURN</span>
                            <span className="text-amber-400 font-bold">{session.caloriesBurned} kcal</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 text-[10px] block">VOLUME</span>
                            <span className="text-white font-bold">{session.totalVolume} kg</span>
                          </div>
                        </div>

                        <button className="p-1 text-zinc-400 hover:text-white">
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Expandable set details */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-zinc-800/80 space-y-2 animate-in fade-in duration-200">
                        <span className="text-[11px] font-mono uppercase text-zinc-500 block">
                          Completed Movements & Sets:
                        </span>
                        <div className="space-y-1.5">
                          {session.exercises.map((ex, exIdx) => {
                            const completedSets = ex.sets.filter((s) => s.completed);
                            return (
                              <div
                                key={exIdx}
                                className="p-2.5 bg-zinc-950/60 rounded-lg border border-zinc-800/60 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                              >
                                <span className="font-semibold text-white">{ex.exerciseName}</span>
                                <div className="flex items-center gap-2 flex-wrap font-mono text-zinc-400">
                                  {completedSets.map((s, sIdx) => (
                                    <span
                                      key={sIdx}
                                      className="bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 text-[11px]"
                                    >
                                      {s.weight > 0 ? `${s.weight}kg × ` : ''}{s.reps} reps
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: PRs */}
      {activeSubTab === 'prs' && <PRTracker />}

      {/* SUB-TAB 3: Body Measurements */}
      {activeSubTab === 'measurements' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Body Weight & Circumference Tracking</h3>
              <p className="text-xs text-zinc-400">Track body composition changes alongside your workouts.</p>
            </div>
            <button
              onClick={() => setShowMeasureModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Log Measurement</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="text-zinc-500 uppercase font-mono text-[10px] border-b border-zinc-800 bg-zinc-950/60">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Weight ({profile.unitSystem === 'metric' ? 'kg' : 'lbs'})</th>
                  <th className="py-3 px-4">Body Fat %</th>
                  <th className="py-3 px-4">Waist (cm)</th>
                  <th className="py-3 px-4">Chest (cm)</th>
                  <th className="py-3 px-4">Arms (cm)</th>
                  <th className="py-3 px-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/40">
                {measurements.map((m) => {
                  const d = new Date(m.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });
                  return (
                    <tr key={m.id} className="text-zinc-200">
                      <td className="py-3 px-4 font-mono text-zinc-400">{d}</td>
                      <td className="py-3 px-4 font-mono font-bold text-amber-400">{m.weightKg}</td>
                      <td className="py-3 px-4 font-mono">{m.bodyFatPercent ? `${m.bodyFatPercent}%` : '—'}</td>
                      <td className="py-3 px-4 font-mono">{m.waistCm ? `${m.waistCm} cm` : '—'}</td>
                      <td className="py-3 px-4 font-mono">{m.chestCm ? `${m.chestCm} cm` : '—'}</td>
                      <td className="py-3 px-4 font-mono">{m.armsCm ? `${m.armsCm} cm` : '—'}</td>
                      <td className="py-3 px-4 text-zinc-500 italic">{m.notes || '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Body Measurement Modal */}
      {showMeasureModal && <BodyMeasurementModal onClose={() => setShowMeasureModal(false)} />}
    </div>
  );
};
