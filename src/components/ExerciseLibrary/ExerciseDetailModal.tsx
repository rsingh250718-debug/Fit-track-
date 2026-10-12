import React, { useState } from 'react';
import { Exercise } from '../../types/workout';
import { MuscleHighlightVisualizer } from './MuscleHighlightVisualizer';
import { X, Play, AlertTriangle, CheckCircle2, Wind, Clock, Flame, Dumbbell, ShieldCheck } from 'lucide-react';
import { calculateExerciseCaloriesBurned } from '../../utils/nutrition';
import { useWorkout } from '../../context/WorkoutContext';

interface Props {
  exercise: Exercise;
  onClose: () => void;
  onQuickStart?: (exercise: Exercise) => void;
}

export const ExerciseDetailModal: React.FC<Props> = ({ exercise, onClose, onQuickStart }) => {
  const { profile } = useWorkout();
  const [activeTab, setActiveTab] = useState<'video' | 'cues' | 'mistakes'>('video');

  const caloriesPer10Min = calculateExerciseCaloriesBurned(
    exercise.metScore,
    profile.weightKg || 75,
    10
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/95 sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <span className="uppercase tracking-wider font-mono">{exercise.primaryMuscle}</span>
              <span>·</span>
              <span className="text-zinc-400 capitalize">{exercise.equipment}</span>
              <span>·</span>
              <span className="text-zinc-400 capitalize">{exercise.difficulty}</span>
              {exercise.homeFriendly && (
                <>
                  <span>·</span>
                  <span className="text-emerald-400">Home Friendly</span>
                </>
              )}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-0.5">{exercise.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Hero: Video Player & Anatomy visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player Column */}
            <div className="lg:col-span-2 space-y-3">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-zinc-800 shadow-inner group">
                {exercise.videoUrl ? (
                  <iframe
                    src={exercise.videoUrl}
                    title={`${exercise.name} Video Tutorial`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 p-6 text-center">
                    <img
                      src={exercise.thumbnailUrl}
                      alt={exercise.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                    <Play className="w-12 h-12 text-amber-400 mb-2 z-10" />
                    <span className="z-10 font-medium text-white">Technique Demonstration</span>
                  </div>
                )}
              </div>

              {/* Stat badges */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800/80">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>Burn Rate</span>
                  </div>
                  <div className="text-lg font-bold text-white font-mono">
                    ~{caloriesPer10Min} <span className="text-xs text-zinc-500 font-normal">kcal/10m</span>
                  </div>
                </div>

                <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800/80">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Tempo</span>
                  </div>
                  <div className="text-lg font-bold text-white font-mono">
                    {exercise.tempo}
                  </div>
                </div>

                <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800/80">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                    <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
                    <span>MET Score</span>
                  </div>
                  <div className="text-lg font-bold text-white font-mono">
                    {exercise.metScore} <span className="text-xs text-zinc-500 font-normal">intensity</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Muscle Anatomy Sidecard */}
            <div className="flex flex-col gap-3">
              <MuscleHighlightVisualizer
                primaryMuscle={exercise.primaryMuscle}
                secondaryMuscles={exercise.secondaryMuscles}
                className="w-full h-full min-h-[220px]"
              />

              <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                  <Wind className="w-3.5 h-3.5" />
                  <span>Breathing Pattern</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {exercise.breathingTip}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 bg-zinc-950/40 rounded-xl border border-zinc-800/60 text-sm text-zinc-300 leading-relaxed">
            {exercise.description}
          </div>

          {/* Tabs for Detailed Technique */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
              <button
                onClick={() => setActiveTab('video')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === 'video'
                    ? 'bg-amber-400 text-black font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                Step-by-Step Execution
              </button>
              <button
                onClick={() => setActiveTab('cues')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === 'cues'
                    ? 'bg-amber-400 text-black font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                Key Form Cues ({exercise.formCues.length})
              </button>
              <button
                onClick={() => setActiveTab('mistakes')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === 'mistakes'
                    ? 'bg-amber-400 text-black font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                Common Mistakes ({exercise.commonMistakes.length})
              </button>
            </div>

            {/* Tab: Instructions */}
            {activeTab === 'video' && (
              <div className="space-y-3">
                <ol className="space-y-2.5">
                  {exercise.instructions.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 bg-zinc-950/40 rounded-lg border border-zinc-800/60 text-sm text-zinc-200">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-amber-400/20 text-amber-400 font-mono text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="pt-0.5 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Tab: Form Cues */}
            {activeTab === 'cues' && (
              <div className="space-y-2.5">
                {exercise.formCues.map((cue, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-emerald-950/20 border border-emerald-900/40 rounded-lg text-sm text-emerald-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{cue}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Common Mistakes */}
            {activeTab === 'mistakes' && (
              <div className="space-y-2.5">
                {exercise.commonMistakes.map((mistake, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-rose-950/20 border border-rose-900/40 rounded-lg text-sm text-rose-200">
                    <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{mistake}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-900/90">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Form-checked certified technique</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Done
            </button>
            {onQuickStart && (
              <button
                onClick={() => {
                  onQuickStart(exercise);
                  onClose();
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-lg shadow-lg shadow-amber-400/20 transition-all hover:scale-105"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>Practice Exercise Now</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
