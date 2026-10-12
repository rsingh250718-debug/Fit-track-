import React from 'react';
import { WorkoutSessionLog } from '../../types/workout';
import { useWorkout } from '../../context/WorkoutContext';
import {
  Trophy,
  Flame,
  Clock,
  Dumbbell,
  CheckCircle2,
  X,
  Share2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface Props {
  sessionLog: WorkoutSessionLog;
  onClose: () => void;
}

export const WorkoutSummaryModal: React.FC<Props> = ({ sessionLog, onClose }) => {
  const { profile } = useWorkout();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-amber-400/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Top Trophy Banner */}
        <div className="relative p-6 text-center bg-gradient-to-b from-amber-500/20 via-zinc-900 to-zinc-900 border-b border-zinc-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-400/10">
            <Trophy className="w-8 h-8" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
            Session Completed
          </span>
          <h2 className="text-2xl font-black text-white mt-0.5">{sessionLog.routineTitle}</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Phenomenal effort! Your workout has been saved to your progress history.
          </p>
        </div>

        {/* Big Metrics Grid */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3.5 bg-zinc-950/80 rounded-xl border border-zinc-800">
              <span className="text-[10px] text-zinc-500 block uppercase font-mono">Duration</span>
              <div className="text-lg font-bold text-white font-mono mt-1 flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {sessionLog.durationMinutes}m
              </div>
            </div>

            <div className="p-3.5 bg-zinc-950/80 rounded-xl border border-zinc-800">
              <span className="text-[10px] text-zinc-500 block uppercase font-mono">Active Burn</span>
              <div className="text-lg font-bold text-amber-400 font-mono mt-1 flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                {sessionLog.caloriesBurned}
              </div>
              <span className="text-[10px] text-zinc-500">kcal</span>
            </div>

            <div className="p-3.5 bg-zinc-950/80 rounded-xl border border-zinc-800">
              <span className="text-[10px] text-zinc-500 block uppercase font-mono">Total Volume</span>
              <div className="text-lg font-bold text-white font-mono mt-1 flex items-center justify-center gap-1">
                <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
                {sessionLog.totalVolume.toLocaleString()}
              </div>
              <span className="text-[10px] text-zinc-500">{profile.unitSystem === 'metric' ? 'kg' : 'lbs'}</span>
            </div>
          </div>

          {/* Calorie & Nutrition Alignment Notice */}
          <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold text-amber-300 block">
                Nutritional Alignment Updated
              </span>
              <p className="text-zinc-300 mt-0.5 leading-relaxed">
                You burned <strong className="text-white">{sessionLog.caloriesBurned} kcal</strong> in this session. This active expenditure has been factored into your daily energy balance and goal deficit/surplus.
              </p>
            </div>
          </div>

          {/* Exercise Overview */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-zinc-400">Exercise Recap</span>
            <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
              {sessionLog.exercises.map((ex, idx) => {
                const completedSets = ex.sets.filter((s) => s.completed).length;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-zinc-950/60 rounded-lg border border-zinc-800 text-xs"
                  >
                    <span className="text-white font-medium">{ex.exerciseName}</span>
                    <span className="text-zinc-400 font-mono">
                      {completedSets} / {ex.sets.length} sets completed
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-xl shadow-lg shadow-amber-400/20 transition-all hover:scale-[1.02]"
          >
            <span>Back to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
