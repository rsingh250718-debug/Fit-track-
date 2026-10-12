import React, { useState, useMemo } from 'react';
import { EXERCISES, MUSCLE_GROUPS, EQUIPMENT_OPTIONS } from '../../data/exercises';
import { Exercise, MuscleGroup } from '../../types/workout';
import { ExerciseDetailModal } from './ExerciseDetailModal';
import { Search, Play, Filter, Flame, Home, Dumbbell, Sparkles } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext';

interface Props {
  onSelectExerciseToStart?: (exercise: Exercise) => void;
}

export const ExerciseList: React.FC<Props> = ({ onSelectExerciseToStart }) => {
  const { profile, startWorkout } = useWorkout();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');
  const [homeOnly, setHomeOnly] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filteredExercises = useMemo(() => {
    return EXERCISES.filter((ex) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = ex.name.toLowerCase().includes(q);
        const matchesMuscle = ex.primaryMuscle.toLowerCase().includes(q);
        const matchesEquip = ex.equipment.toLowerCase().includes(q);
        if (!matchesName && !matchesMuscle && !matchesEquip) return false;
      }

      // Muscle
      if (selectedMuscle !== 'all' && ex.primaryMuscle !== selectedMuscle) {
        if (!ex.secondaryMuscles.includes(selectedMuscle as MuscleGroup)) return false;
      }

      // Equipment
      if (selectedEquipment !== 'all' && ex.equipment !== selectedEquipment) {
        return false;
      }

      // Home friendly
      if (homeOnly && !ex.homeFriendly) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedMuscle, selectedEquipment, homeOnly]);

  const handleQuickPractice = (exercise: Exercise) => {
    // Generate a quick practice routine with this single exercise
    const quickRoutine = {
      id: `practice-${exercise.id}-${Date.now()}`,
      title: `${exercise.name} Technique Session`,
      description: `Targeted session focusing on ${exercise.name} form, tempo, and progressive overload.`,
      goal: profile.fitnessGoal,
      difficulty: exercise.difficulty,
      location: exercise.homeFriendly ? ('home' as const) : ('gym' as const),
      daysPerWeek: 3,
      durationMin: 15,
      estimatedCalories: Math.round(exercise.metScore * 15),
      equipmentNeeded: [exercise.equipment],
      exercises: [
        {
          exerciseId: exercise.id,
          sets: 3,
          reps: exercise.tempo === 'Isometric' ? '45s' : '10-12',
          restSec: 60,
          targetRpe: 8,
          notes: 'Focus on perfect form cues from tutorial',
        },
      ],
      tags: ['Practice Session', 'Technique Focus'],
    };

    startWorkout(quickRoutine);
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Exercise Video Library</h2>
          <p className="text-sm text-zinc-400 mt-0.5">
            Master exercise technique with step-by-step video tutorials, form cues, and MET calorie burn rates.
          </p>
        </div>

        {/* Quick Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHomeOnly(!homeOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              homeOnly
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home-Friendly Only</span>
          </button>
        </div>
      </div>

      {/* Search Bar & Muscle Filter Carousel */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exercises by name, muscle (e.g. chest, lats), or equipment..."
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
          />
        </div>

        {/* Muscle Filter Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {MUSCLE_GROUPS.map((mg) => (
            <button
              key={mg.id}
              onClick={() => setSelectedMuscle(mg.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedMuscle === mg.id
                  ? 'bg-amber-400 text-black font-bold'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80'
              }`}
            >
              {mg.label}
            </button>
          ))}
        </div>

        {/* Equipment Filter Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-[11px] text-zinc-500 font-mono uppercase px-1">Equip:</span>
          {EQUIPMENT_OPTIONS.map((eq) => (
            <button
              key={eq.id}
              onClick={() => setSelectedEquipment(eq.id)}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors text-[11px] ${
                selectedEquipment === eq.id
                  ? 'bg-zinc-200 text-black font-semibold'
                  : 'bg-zinc-950/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800/60'
              }`}
            >
              {eq.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count & Active filters */}
      <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-800/80 pb-2">
        <span>Showing {filteredExercises.length} movements</span>
        {(searchQuery || selectedMuscle !== 'all' || selectedEquipment !== 'all' || homeOnly) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedMuscle('all');
              setSelectedEquipment('all');
              setHomeOnly(false);
            }}
            className="text-amber-400 hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Grid of Exercises */}
      {filteredExercises.length === 0 ? (
        <div className="p-12 text-center bg-zinc-900/40 border border-zinc-800/80 rounded-2xl">
          <Dumbbell className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-zinc-300">No exercises found</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords or toggle off filter criteria to explore the rest of the database.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="group relative flex flex-col justify-between bg-zinc-900/80 border border-zinc-800/90 hover:border-zinc-700 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-xl hover:shadow-black/50"
            >
              {/* Image banner */}
              <div
                onClick={() => setSelectedExercise(exercise)}
                className="relative aspect-video w-full overflow-hidden bg-zinc-950 cursor-pointer"
              >
                <img
                  src={exercise.thumbnailUrl}
                  alt={exercise.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                {/* Video Play Overlay Badge */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-400 text-black text-xs font-bold rounded-full shadow-lg">
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>Watch Tutorial</span>
                  </div>
                </div>

                {/* Top tags */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono uppercase text-amber-400 border border-amber-400/20">
                    {exercise.primaryMuscle}
                  </span>
                  {exercise.homeFriendly && (
                    <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-emerald-400/20">
                      Home
                    </span>
                  )}
                </div>

                {/* MET Score */}
                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] text-zinc-300 font-mono">
                  <Flame className="w-3 h-3 text-amber-400" />
                  <span>MET {exercise.metScore}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <h3
                    onClick={() => setSelectedExercise(exercise)}
                    className="text-base font-bold text-white hover:text-amber-400 cursor-pointer transition-colors"
                  >
                    {exercise.name}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                    {exercise.description}
                  </p>
                </div>

                {/* Footer details & buttons */}
                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                    <span className="capitalize">{exercise.equipment}</span>
                    <span>·</span>
                    <span className="capitalize">{exercise.difficulty}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedExercise(exercise)}
                      className="px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white rounded bg-zinc-800/80 hover:bg-zinc-700 transition-colors"
                    >
                      Guide
                    </button>
                    <button
                      onClick={() => handleQuickPractice(exercise)}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-black rounded bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm"
                      title="Practice this exercise"
                    >
                      <Play className="w-3 h-3 fill-black" />
                      <span>Start</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal if selected */}
      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
          onQuickStart={handleQuickPractice}
        />
      )}
    </div>
  );
};
