import React, { useState } from 'react';
import { useWorkout } from '../../context/WorkoutContext';
import { EXERCISES } from '../../data/exercises';
import { Exercise } from '../../types/workout';
import { ExerciseDetailModal } from '../ExerciseLibrary/ExerciseDetailModal';
import { WorkoutSummaryModal } from './WorkoutSummaryModal';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  Square,
  Check,
  Plus,
  Trash2,
  Clock,
  Flame,
  Dumbbell,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  RotateCcw,
  Zap,
} from 'lucide-react';

export const ActiveWorkoutModal: React.FC = () => {
  const {
    activeSession,
    profile,
    pauseWorkout,
    resumeWorkout,
    cancelWorkout,
    finishWorkout,
    logSet,
    addSetToExercise,
    removeSetFromExercise,
    setActiveExerciseIndex,
    adjustRestTimer,
    skipRestTimer,
  } = useWorkout();

  const [selectedExerciseForGuide, setSelectedExerciseForGuide] = useState<Exercise | null>(null);
  const [completedSummaryLog, setCompletedSummaryLog] = useState<any | null>(null);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  if (!activeSession && !completedSummaryLog) return null;

  if (completedSummaryLog) {
    return (
      <WorkoutSummaryModal
        sessionLog={completedSummaryLog}
        onClose={() => setCompletedSummaryLog(null)}
      />
    );
  }

  if (!activeSession) return null;

  const currentExerciseLog = activeSession.exercises[activeSession.activeExerciseIndex];
  const currentExerciseData = EXERCISES.find((e) => e.id === currentExerciseLog?.exerciseId);

  // Format elapsed time (MM:SS or HH:MM:SS)
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (mins >= 60) {
      const hrs = Math.floor(mins / 60);
      const remMins = mins % 60;
      return `${hrs}:${String(remMins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Format rest time
  const formatRest = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m > 0 ? `${m}:${String(s).padStart(2, '0')}` : `${s}s`;
  };

  const handleFinish = () => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#38bdf8', '#34d399', '#f43f5e'],
      });
    } catch {
      // ignore
    }

    const log = finishWorkout();
    if (log) {
      setCompletedSummaryLog(log);
    }
  };

  // Calculate live volume
  let liveTotalVolume = 0;
  activeSession.exercises.forEach((ex) => {
    ex.sets.forEach((s) => {
      if (s.completed) liveTotalVolume += s.weight * s.reps;
    });
  });

  // If minimized, render compact floating bottom bar
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-4 p-3.5 bg-zinc-900 border border-amber-400/40 rounded-2xl shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <div className="text-xs font-bold text-white leading-tight">
              {activeSession.routineTitle}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono mt-0.5">
              <span>{formatTime(activeSession.elapsedSeconds)}</span>
              <span>·</span>
              <span className="text-amber-400 font-semibold">
                {Math.round(activeSession.caloriesBurnedLive)} kcal
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsMinimized(false)}
          className="p-2 bg-amber-400 hover:bg-amber-300 text-black rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Expand</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[96vh] flex flex-col bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-zinc-800/80 bg-zinc-900/90">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider">
                Live Workout Session
              </span>
              <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md">
                {activeSession.routineTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              title="Minimize to floating widget"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to discard this workout session?')) {
                  cancelWorkout();
                }
              }}
              className="px-2.5 py-1 text-xs text-rose-400 hover:bg-rose-950/40 rounded border border-rose-900/40 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Live Metrics Ribbon: Timer, Active Burn, Volume */}
        <div className="grid grid-cols-3 divide-x divide-zinc-800 bg-zinc-900/60 border-b border-zinc-800 text-center py-2.5 px-4 text-xs">
          <div>
            <div className="text-[10px] text-zinc-400 uppercase font-mono flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" />
              <span>Session Time</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-white font-mono mt-0.5 flex items-center justify-center gap-2">
              <span>{formatTime(activeSession.elapsedSeconds)}</span>
              <button
                onClick={activeSession.isPaused ? resumeWorkout : pauseWorkout}
                className="p-1 text-zinc-400 hover:text-amber-400 transition-colors"
              >
                {activeSession.isPaused ? (
                  <Play className="w-3.5 h-3.5 fill-current" />
                ) : (
                  <Pause className="w-3.5 h-3.5 fill-current" />
                )}
              </button>
            </div>
          </div>

          <div>
            <div className="text-[10px] text-zinc-400 uppercase font-mono flex items-center justify-center gap-1">
              <Flame className="w-3 h-3 text-amber-400" />
              <span>Session Burn</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-amber-400 font-mono mt-0.5">
              {Math.round(activeSession.caloriesBurnedLive)}{' '}
              <span className="text-xs font-normal text-zinc-500">kcal</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] text-zinc-400 uppercase font-mono flex items-center justify-center gap-1">
              <Dumbbell className="w-3 h-3 text-emerald-400" />
              <span>Volume Load</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-white font-mono mt-0.5">
              {liveTotalVolume.toLocaleString()}{' '}
              <span className="text-xs font-normal text-zinc-500">
                {profile.unitSystem === 'metric' ? 'kg' : 'lbs'}
              </span>
            </div>
          </div>
        </div>

        {/* Rest Timer Banner (Active when rest timer is running) */}
        {activeSession.restTimer.active && (
          <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-amber-400/15 border-b border-amber-400/30 text-amber-300 text-xs animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="font-semibold">REST PERIOD:</span>
              <span className="font-mono text-base font-bold text-white">
                {formatRest(activeSession.restTimer.remainingSec)}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => adjustRestTimer(30)}
                className="px-2 py-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 rounded font-mono text-[11px] font-semibold"
              >
                +30s
              </button>
              <button
                onClick={() => adjustRestTimer(-15)}
                className="px-2 py-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 rounded font-mono text-[11px] font-semibold"
              >
                -15s
              </button>
              <button
                onClick={skipRestTimer}
                className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-[11px] font-semibold ml-1"
              >
                Skip
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-grow">
          {/* Exercise Stepper Carousel */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
            {activeSession.exercises.map((ex, idx) => {
              const isCurrent = idx === activeSession.activeExerciseIndex;
              const allSetsDone = ex.sets.length > 0 && ex.sets.every((s) => s.completed);

              return (
                <button
                  key={idx}
                  onClick={() => setActiveExerciseIndex(idx)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs whitespace-nowrap border transition-all ${
                    isCurrent
                      ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-md'
                      : allSetsDone
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/40'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  <span className="font-mono">{idx + 1}.</span>
                  <span className="truncate max-w-[130px]">{ex.exerciseName}</span>
                  {allSetsDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              );
            })}
          </div>

          {/* Current Exercise Header & Video Tutorial Button */}
          {currentExerciseLog && (
            <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
                    <span className="uppercase">{currentExerciseData?.primaryMuscle || 'Exercise'}</span>
                    <span>·</span>
                    <span className="text-zinc-400 capitalize">{currentExerciseData?.equipment || 'Gear'}</span>
                    <span>·</span>
                    <span className="text-zinc-400 font-mono">MET {currentExerciseData?.metScore || 5.5}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {currentExerciseLog.exerciseName}
                  </h3>
                </div>

                {currentExerciseData && (
                  <button
                    onClick={() => setSelectedExerciseForGuide(currentExerciseData)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-lg border border-zinc-700 transition-colors self-start sm:self-auto"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Tutorial & Form Guide</span>
                  </button>
                )}
              </div>

              {/* Set-by-Set Logging Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-zinc-500 uppercase font-mono text-[10px] border-b border-zinc-800/80">
                      <th className="py-2 px-2 w-12 text-center">Set</th>
                      <th className="py-2 px-3">Previous</th>
                      <th className="py-2 px-3">
                        Weight ({profile.unitSystem === 'metric' ? 'kg' : 'lbs'})
                      </th>
                      <th className="py-2 px-3">Reps</th>
                      <th className="py-2 px-3">RPE (1-10)</th>
                      <th className="py-2 px-3 text-center">Status</th>
                      <th className="py-2 px-2 w-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/40">
                    {currentExerciseLog.sets.map((setRecord, sIdx) => {
                      return (
                        <tr
                          key={sIdx}
                          className={`transition-colors ${
                            setRecord.completed ? 'bg-emerald-950/20 text-zinc-300' : 'text-zinc-100'
                          }`}
                        >
                          {/* Set # */}
                          <td className="py-2.5 px-2 text-center font-mono font-bold text-amber-400">
                            {setRecord.setNumber}
                          </td>

                          {/* Previous hint */}
                          <td className="py-2.5 px-3 font-mono text-zinc-500">
                            {setRecord.previousWeight !== undefined
                              ? `${setRecord.previousWeight}kg × ${setRecord.previousReps}`
                              : '—'}
                          </td>

                          {/* Weight Input */}
                          <td className="py-2.5 px-3">
                            <input
                              type="number"
                              step="2.5"
                              value={setRecord.weight || ''}
                              placeholder="0"
                              onChange={(e) =>
                                logSet(
                                  activeSession.activeExerciseIndex,
                                  sIdx,
                                  setRecord.completed,
                                  parseFloat(e.target.value) || 0,
                                  setRecord.reps,
                                  setRecord.rpe
                                )
                              }
                              className="w-20 px-2 py-1 bg-zinc-950 border border-zinc-800 rounded font-mono text-white text-xs focus:outline-none focus:border-amber-400"
                            />
                          </td>

                          {/* Reps Input */}
                          <td className="py-2.5 px-3">
                            <input
                              type="number"
                              min="1"
                              value={setRecord.reps || ''}
                              placeholder="10"
                              onChange={(e) =>
                                logSet(
                                  activeSession.activeExerciseIndex,
                                  sIdx,
                                  setRecord.completed,
                                  setRecord.weight,
                                  parseInt(e.target.value) || 0,
                                  setRecord.rpe
                                )
                              }
                              className="w-16 px-2 py-1 bg-zinc-950 border border-zinc-800 rounded font-mono text-white text-xs focus:outline-none focus:border-amber-400"
                            />
                          </td>

                          {/* RPE Selector */}
                          <td className="py-2.5 px-3">
                            <select
                              value={setRecord.rpe || 8}
                              onChange={(e) =>
                                logSet(
                                  activeSession.activeExerciseIndex,
                                  sIdx,
                                  setRecord.completed,
                                  setRecord.weight,
                                  setRecord.reps,
                                  parseInt(e.target.value) || 8
                                )
                              }
                              className="px-2 py-1 bg-zinc-950 border border-zinc-800 rounded font-mono text-zinc-300 text-xs focus:outline-none focus:border-amber-400"
                            >
                              {[6, 7, 8, 9, 10].map((rpe) => (
                                <option key={rpe} value={rpe}>
                                  {rpe}
                                </option>
                              ))}
                            </select>
                          </td>

                          {/* Complete Checkbox */}
                          <td className="py-2.5 px-3 text-center">
                            <button
                              onClick={() =>
                                logSet(
                                  activeSession.activeExerciseIndex,
                                  sIdx,
                                  !setRecord.completed,
                                  setRecord.weight,
                                  setRecord.reps,
                                  setRecord.rpe
                                )
                              }
                              className={`p-1.5 rounded-lg border transition-all ${
                                setRecord.completed
                                  ? 'bg-emerald-400 text-black border-emerald-400 shadow-sm'
                                  : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500'
                              }`}
                            >
                              <Check className="w-4 h-4 stroke-[3]" />
                            </button>
                          </td>

                          {/* Remove Set */}
                          <td className="py-2.5 px-2 text-center">
                            {currentExerciseLog.sets.length > 1 && (
                              <button
                                onClick={() =>
                                  removeSetFromExercise(activeSession.activeExerciseIndex, sIdx)
                                }
                                className="p-1 text-zinc-600 hover:text-rose-400 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Add Set button */}
              <button
                onClick={() => addSetToExercise(activeSession.activeExerciseIndex)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Add Set</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Actions: Previous / Next movement & Finish Workout */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-zinc-800 bg-zinc-900/90">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setActiveExerciseIndex(Math.max(0, activeSession.activeExerciseIndex - 1))
              }
              disabled={activeSession.activeExerciseIndex === 0}
              className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() =>
                setActiveExerciseIndex(
                  Math.min(activeSession.exercises.length - 1, activeSession.activeExerciseIndex + 1)
                )
              }
              disabled={activeSession.activeExerciseIndex === activeSession.exercises.length - 1}
              className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleFinish}
            className="flex items-center gap-2 px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-xl shadow-lg shadow-amber-400/20 transition-all hover:scale-105"
          >
            <Square className="w-3.5 h-3.5 fill-black" />
            <span>Finish & Log Workout</span>
          </button>
        </div>
      </div>

      {/* Exercise Video Tutorial Drawer */}
      {selectedExerciseForGuide && (
        <ExerciseDetailModal
          exercise={selectedExerciseForGuide}
          onClose={() => setSelectedExerciseForGuide(null)}
        />
      )}
    </div>
  );
};
