import React, { useState } from 'react';
import { Exercise, WorkoutRoutine } from '../../types/workout';
import { EXERCISES } from '../../data/exercises';
import { useWorkout } from '../../context/WorkoutContext';
import { ExerciseDetailModal } from '../ExerciseLibrary/ExerciseDetailModal';
import {
  X,
  Play,
  Flame,
  Clock,
  Dumbbell,
  Calendar,
  Layers,
  ChevronRight,
  Info,
} from 'lucide-react';

interface Props {
  routine: WorkoutRoutine;
  onClose: () => void;
}

export const RoutineDetailModal: React.FC<Props> = ({ routine, onClose }) => {
  const { startWorkout } = useWorkout();
  const [selectedExerciseForGuide, setSelectedExerciseForGuide] = useState<Exercise | null>(null);

  const handleStart = () => {
    startWorkout(routine);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/90">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
              <span className="uppercase">{routine.location}</span>
              <span>·</span>
              <span className="capitalize">{routine.goal}</span>
              <span>·</span>
              <span className="capitalize">{routine.difficulty}</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-0.5">{routine.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          {/* Summary Banner */}
          <div className="p-4 bg-zinc-950/60 border border-zinc-800 rounded-xl space-y-3">
            <p className="text-xs text-zinc-300 leading-relaxed">{routine.description}</p>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800/80 text-center">
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">Duration</span>
                <span className="text-sm font-bold text-white font-mono flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {routine.durationMin}m
                </span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">Estimated Burn</span>
                <span className="text-sm font-bold text-amber-400 font-mono flex items-center justify-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  ~{routine.estimatedCalories} kcal
                </span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">Frequency</span>
                <span className="text-sm font-bold text-white font-mono flex items-center justify-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  {routine.daysPerWeek}d / wk
                </span>
              </div>
            </div>
          </div>

          {/* Exercise Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase text-zinc-400">
                Exercise Schedule ({routine.exercises.length} Movements)
              </h3>
              <span className="text-[11px] text-zinc-500">Tap an exercise to view video guide</span>
            </div>

            <div className="space-y-2">
              {routine.exercises.map((item, idx) => {
                const exData = EXERCISES.find((e) => e.id === item.exerciseId);
                const exName = exData?.name || item.exerciseId.replace(/-/g, ' ');

                return (
                  <div
                    key={idx}
                    onClick={() => exData && setSelectedExerciseForGuide(exData)}
                    className="group flex items-center justify-between p-3.5 bg-zinc-950/60 hover:bg-zinc-800/60 border border-zinc-800 hover:border-zinc-700 rounded-xl cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-zinc-800 group-hover:bg-amber-400 group-hover:text-black flex items-center justify-center font-mono text-xs font-bold text-amber-400 transition-colors">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white text-sm group-hover:text-amber-400 transition-colors">
                            {exName}
                          </span>
                          {exData?.homeFriendly && (
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-900/30">
                              Home
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                          <span>Rest: {item.restSec}s</span>
                          {item.targetRpe && <span>· Target RPE {item.targetRpe}</span>}
                          {item.notes && <span>· {item.notes}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded text-xs">
                        {item.sets} × {item.reps}
                      </span>
                      <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-900/90">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleStart}
            className="flex items-center gap-2 px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-lg shadow-lg shadow-amber-400/20 transition-all hover:scale-105"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>Start This Workout Now</span>
          </button>
        </div>
      </div>

      {/* Video Guide Drawer if selected */}
      {selectedExerciseForGuide && (
        <ExerciseDetailModal
          exercise={selectedExerciseForGuide}
          onClose={() => setSelectedExerciseForGuide(null)}
        />
      )}
    </div>
  );
};
