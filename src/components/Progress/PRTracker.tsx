import React, { useState } from 'react';
import { useWorkout } from '../../context/WorkoutContext';
import { EXERCISES } from '../../data/exercises';
import { calculateEstimated1RM } from '../../utils/nutrition';
import { Trophy, Calculator, Plus, X, Flame, Dumbbell, Calendar, Check } from 'lucide-react';

export const PRTracker: React.FC = () => {
  const { personalRecords, addPersonalRecord, profile } = useWorkout();

  // 1RM Calculator State
  const [calcWeight, setCalcWeight] = useState<number>(80);
  const [calcReps, setCalcReps] = useState<number>(5);

  // Manual PR Modal State
  const [showAddPrModal, setShowAddPrModal] = useState<boolean>(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>('barbell-bench-press');
  const [prType, setPrType] = useState<'max_weight' | 'est_1rm' | 'max_reps'>('max_weight');
  const [prValue, setPrValue] = useState<number>(90);

  const estimated1RM = calculateEstimated1RM(calcWeight, calcReps);

  // Generate percentage of 1RM breakdown (95%, 90%, 85%, 80%, 75%, 70%)
  const percentageTable = [
    { percent: 100, reps: '1 Rep (Max)', weight: estimated1RM },
    { percent: 95, reps: '2 Reps', weight: Math.round(estimated1RM * 0.95 * 10) / 10 },
    { percent: 90, reps: '3-4 Reps', weight: Math.round(estimated1RM * 0.90 * 10) / 10 },
    { percent: 85, reps: '5-6 Reps', weight: Math.round(estimated1RM * 0.85 * 10) / 10 },
    { percent: 80, reps: '7-8 Reps', weight: Math.round(estimated1RM * 0.80 * 10) / 10 },
    { percent: 75, reps: '9-10 Reps', weight: Math.round(estimated1RM * 0.75 * 10) / 10 },
    { percent: 70, reps: '11-12 Reps', weight: Math.round(estimated1RM * 0.70 * 10) / 10 },
  ];

  const handleSavePr = () => {
    const exData = EXERCISES.find((e) => e.id === selectedExerciseId);
    if (!exData || prValue <= 0) return;

    addPersonalRecord({
      exerciseId: exData.id,
      exerciseName: exData.name,
      recordType: prType,
      value: prValue,
      unit: prType === 'max_reps' ? 'reps' : profile.unitSystem === 'metric' ? 'kg' : 'lbs',
      date: new Date().toISOString(),
    });

    setShowAddPrModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Personal Records (PRs) & 1RM</h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Track your all-time peak weight, max repetitions, and theoretical one-rep maximums.
          </p>
        </div>

        <button
          onClick={() => setShowAddPrModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-xl transition-all shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Log New PR</span>
        </button>
      </div>

      {/* 1RM Interactive Calculator Widget */}
      <div className="p-5 bg-zinc-900/90 border border-zinc-800 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400">
          <Calculator className="w-4 h-4" />
          <span>Interactive 1RM (One-Rep Max) Predictor</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div>
            <label className="text-xs text-zinc-400 block mb-1">
              Weight Lifted ({profile.unitSystem === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              step="2.5"
              value={calcWeight}
              onChange={(e) => setCalcWeight(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-white text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-1">Repetitions Performed</label>
            <input
              type="number"
              min="1"
              max="20"
              value={calcReps}
              onChange={(e) => setCalcReps(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-white text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="p-3 bg-zinc-950 rounded-xl border border-amber-400/30 text-center">
            <span className="text-[10px] uppercase font-mono text-zinc-400 block">
              Estimated 1-Rep Max
            </span>
            <div className="text-2xl font-black text-amber-400 font-mono mt-0.5">
              {estimated1RM}{' '}
              <span className="text-xs font-normal text-zinc-400">
                {profile.unitSystem === 'metric' ? 'kg' : 'lbs'}
              </span>
            </div>
          </div>
        </div>

        {/* 1RM Percentage Training Zones Table */}
        <div className="pt-2 border-t border-zinc-800/80">
          <span className="text-[11px] font-mono uppercase text-zinc-400 block mb-2">
            Target Training Percentages:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {percentageTable.map((item, idx) => (
              <div
                key={idx}
                className="p-2 bg-zinc-950/60 rounded-lg border border-zinc-800/70 text-center"
              >
                <span className="text-[10px] text-zinc-500 block font-mono font-bold">
                  {item.percent}%
                </span>
                <span className="text-xs font-bold text-white font-mono block mt-0.5">
                  {item.weight}
                </span>
                <span className="text-[9px] text-zinc-400 block mt-0.5">{item.reps}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PR Cards Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase text-zinc-400">Personal Best Hall of Fame</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {personalRecords.map((pr) => {
            const formattedDate = new Date(pr.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <div
                key={pr.id}
                className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[10px] font-mono uppercase text-amber-400">
                      {pr.recordType === 'max_weight'
                        ? 'Heaviest Weight'
                        : pr.recordType === 'est_1rm'
                        ? 'Peak 1RM'
                        : 'Max Reps'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{pr.exerciseName}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-zinc-500">
                    <Calendar className="w-3 h-3" />
                    <span>{formattedDate}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-black text-amber-400 font-mono">
                    {pr.value}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">{pr.unit}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Manual PR Modal */}
      {showAddPrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Log Personal Record</h3>
              <button
                onClick={() => setShowAddPrModal(false)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Exercise</label>
                <select
                  value={selectedExerciseId}
                  onChange={(e) => setSelectedExerciseId(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-xs focus:outline-none focus:border-amber-400"
                >
                  {EXERCISES.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Record Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'max_weight', label: 'Max Weight' },
                    { id: 'est_1rm', label: 'Est. 1RM' },
                    { id: 'max_reps', label: 'Max Reps' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setPrType(t.id as any)}
                      className={`py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        prType === t.id
                          ? 'bg-amber-400 text-black border-amber-400 font-bold'
                          : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">
                  Value ({prType === 'max_reps' ? 'repetitions' : profile.unitSystem === 'metric' ? 'kg' : 'lbs'})
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={prValue}
                  onChange={(e) => setPrValue(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800">
              <button
                onClick={() => setShowAddPrModal(false)}
                className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePr}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-lg"
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
