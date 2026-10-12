import React, { useState } from 'react';
import { EXERCISES } from '../../data/exercises';
import {
  DifficultyLevel,
  EquipmentType,
  FitnessGoal,
  RoutineExercise,
  WorkoutLocation,
  WorkoutRoutine,
} from '../../types/workout';
import { useWorkout } from '../../context/WorkoutContext';
import { calculateExerciseCaloriesBurned } from '../../utils/nutrition';
import { X, Plus, Trash2, Dumbbell, Sparkles, Check, ChevronUp, ChevronDown } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSaved: (routine: WorkoutRoutine) => void;
}

export const CustomRoutineBuilderModal: React.FC<Props> = ({ onClose, onSaved }) => {
  const { profile, addCustomRoutine } = useWorkout();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState<FitnessGoal>('hypertrophy');
  const [location, setLocation] = useState<WorkoutLocation>('home');
  const [selectedExercises, setSelectedExercises] = useState<RoutineExercise[]>([
    { exerciseId: 'push-up', sets: 3, reps: '12', restSec: 60, targetRpe: 8 },
    { exerciseId: 'bodyweight-squat', sets: 3, reps: '15', restSec: 60, targetRpe: 8 },
  ]);
  const [availableSearch, setAvailableSearch] = useState('');

  const addExercise = (exerciseId: string) => {
    if (selectedExercises.some((e) => e.exerciseId === exerciseId)) return;
    setSelectedExercises([
      ...selectedExercises,
      { exerciseId, sets: 3, reps: '10', restSec: 60, targetRpe: 8 },
    ]);
  };

  const removeExercise = (index: number) => {
    setSelectedExercises(selectedExercises.filter((_, idx) => idx !== index));
  };

  const updateExercise = (index: number, updates: Partial<RoutineExercise>) => {
    const updated = [...selectedExercises];
    updated[index] = { ...updated[index], ...updates };
    setSelectedExercises(updated);
  };

  const handleSave = () => {
    if (!title.trim() || selectedExercises.length === 0) return;

    // Estimate duration
    const durationMin = Math.max(15, selectedExercises.length * 7);

    // Calculate calories
    let totalMet = 0;
    const equipmentSet = new Set<EquipmentType>();
    selectedExercises.forEach((item) => {
      const ex = EXERCISES.find((e) => e.id === item.exerciseId);
      totalMet += ex?.metScore || 5.5;
      if (ex?.equipment) equipmentSet.add(ex.equipment);
    });
    const avgMet = totalMet / selectedExercises.length;
    const estimatedCalories = calculateExerciseCaloriesBurned(avgMet, profile.weightKg || 75, durationMin);

    const newRoutine: WorkoutRoutine = {
      id: `custom-routine-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || 'Custom crafted workout regimen.',
      goal,
      difficulty: 'intermediate',
      location,
      daysPerWeek: 3,
      durationMin,
      estimatedCalories,
      equipmentNeeded: Array.from(equipmentSet),
      exercises: selectedExercises,
      isCustom: true,
      tags: ['Custom Routine', `${durationMin} Min`, `${location.toUpperCase()}`],
    };

    addCustomRoutine(newRoutine);
    onSaved(newRoutine);
    onClose();
  };

  const candidateExercises = EXERCISES.filter((ex) => {
    if (selectedExercises.some((s) => s.exerciseId === ex.id)) return false;
    if (availableSearch) {
      return (
        ex.name.toLowerCase().includes(availableSearch.toLowerCase()) ||
        ex.primaryMuscle.toLowerCase().includes(availableSearch.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Create Custom Routine</h2>
              <p className="text-xs text-zinc-400">Assemble your exercises, sets, reps, and rest periods</p>
            </div>
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
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Routine Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Upper Body Blast & Core"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Location</label>
              <div className="flex items-center gap-2">
                {(['home', 'gym', 'hybrid'] as WorkoutLocation[]).map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setLocation(loc)}
                    className={`flex-1 py-2 text-xs font-semibold capitalize rounded-lg border transition-colors ${
                      location === loc
                        ? 'bg-amber-400 text-black border-amber-400'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">Description (Optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Focus on chest pump, heavy rows, and finishing with core endurance"
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Selected Exercises Table / List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase text-zinc-400">
                Programmed Movements ({selectedExercises.length})
              </h3>
            </div>

            {selectedExercises.length === 0 ? (
              <div className="p-6 text-center bg-zinc-950/40 border border-dashed border-zinc-800 rounded-xl text-zinc-500 text-xs">
                No exercises added yet. Select movements from the catalog below.
              </div>
            ) : (
              <div className="space-y-2.5">
                {selectedExercises.map((item, idx) => {
                  const ex = EXERCISES.find((e) => e.id === item.exerciseId);
                  return (
                    <div
                      key={idx}
                      className="p-3 bg-zinc-950/70 border border-zinc-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center font-mono text-[10px] text-amber-400">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="font-semibold text-white block">
                            {ex?.name || item.exerciseId}
                          </span>
                          <span className="text-[11px] text-zinc-500 capitalize">
                            {ex?.primaryMuscle} · {ex?.equipment}
                          </span>
                        </div>
                      </div>

                      {/* Inputs: Sets, Reps, Rest */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <span className="text-[11px] text-zinc-400">Sets:</span>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={item.sets}
                            onChange={(e) => updateExercise(idx, { sets: parseInt(e.target.value) || 1 })}
                            className="w-12 px-1.5 py-1 bg-zinc-900 border border-zinc-700 rounded text-center text-white font-mono"
                          />
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="text-[11px] text-zinc-400">Reps:</span>
                          <input
                            type="text"
                            value={item.reps}
                            onChange={(e) => updateExercise(idx, { reps: e.target.value })}
                            className="w-16 px-1.5 py-1 bg-zinc-900 border border-zinc-700 rounded text-center text-white font-mono"
                          />
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="text-[11px] text-zinc-400">Rest(s):</span>
                          <input
                            type="number"
                            step="15"
                            value={item.restSec}
                            onChange={(e) => updateExercise(idx, { restSec: parseInt(e.target.value) || 30 })}
                            className="w-14 px-1.5 py-1 bg-zinc-900 border border-zinc-700 rounded text-center text-white font-mono"
                          />
                        </div>

                        <button
                          onClick={() => removeExercise(idx)}
                          className="p-1.5 text-zinc-500 hover:text-rose-400 rounded hover:bg-zinc-800 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Catalog Picker */}
          <div className="space-y-2 pt-2 border-t border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-zinc-400">Add Movements to Routine</span>
              <input
                type="text"
                placeholder="Search catalog..."
                value={availableSearch}
                onChange={(e) => setAvailableSearch(e.target.value)}
                className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1">
              {candidateExercises.slice(0, 10).map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => addExercise(ex.id)}
                  className="flex items-center justify-between p-2 rounded-lg bg-zinc-950/60 hover:bg-zinc-800/80 border border-zinc-800/80 text-left transition-colors text-xs"
                >
                  <div>
                    <span className="font-semibold text-white block">{ex.name}</span>
                    <span className="text-[10px] text-zinc-500 capitalize">
                      {ex.primaryMuscle} · {ex.equipment}
                    </span>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-900/90">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || selectedExercises.length === 0}
            className="flex items-center gap-2 px-6 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-black text-xs font-bold rounded-lg shadow-lg shadow-amber-400/20 transition-all"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Save Routine</span>
          </button>
        </div>
      </div>
    </div>
  );
};
