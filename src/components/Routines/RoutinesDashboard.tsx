import React, { useState } from 'react';
import { useWorkout } from '../../context/WorkoutContext';
import { WorkoutRoutine } from '../../types/workout';
import { RoutineDetailModal } from './RoutineDetailModal';
import { RoutineGeneratorModal } from './RoutineGeneratorModal';
import { CustomRoutineBuilderModal } from './CustomRoutineBuilderModal';
import {
  Sparkles,
  Plus,
  Play,
  Clock,
  Flame,
  Calendar,
  Layers,
  Dumbbell,
  Home,
  CheckCircle,
  Filter,
} from 'lucide-react';

export const RoutinesDashboard: React.FC = () => {
  const { profile, routines, startWorkout } = useWorkout();

  const [selectedRoutine, setSelectedRoutine] = useState<WorkoutRoutine | null>(null);
  const [showGenerator, setShowGenerator] = useState<boolean>(false);
  const [showCustomBuilder, setShowCustomBuilder] = useState<boolean>(false);
  const [locationFilter, setLocationFilter] = useState<'all' | 'home' | 'gym'>('all');
  const [goalFilter, setGoalFilter] = useState<'all' | 'hypertrophy' | 'fat-loss' | 'strength'>('all');

  const filteredRoutines = routines.filter((r) => {
    if (locationFilter !== 'all' && r.location !== locationFilter && r.location !== 'hybrid') {
      return false;
    }
    if (goalFilter !== 'all' && r.goal !== goalFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner: Personalized Routine Callout */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/15 via-zinc-900 to-zinc-900 border border-amber-500/30 p-6 md:p-8">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>Target Goal: {profile.fitnessGoal.toUpperCase()}</span>
            <span>·</span>
            <span className="text-zinc-400">{profile.preferredLocation.toUpperCase()}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Tailored Training Protocols
          </h2>

          <p className="text-sm text-zinc-300 leading-relaxed">
            Science-backed exercise programming tailored to your body weight, available equipment, and target session duration. Calorie burn is calculated dynamically using certified MET scores.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setShowGenerator(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-xl shadow-lg shadow-amber-400/20 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Personalized Program</span>
            </button>

            <button
              onClick={() => setShowCustomBuilder(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl border border-zinc-700 transition-colors"
            >
              <Plus className="w-4 h-4 text-zinc-400" />
              <span>Build Custom Routine</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 -bottom-10 w-96 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={() => setLocationFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              locationFilter === 'all'
                ? 'bg-zinc-200 text-black font-bold'
                : 'text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800'
            }`}
          >
            All Locations
          </button>
          <button
            onClick={() => setLocationFilter('home')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-colors ${
              locationFilter === 'home'
                ? 'bg-emerald-400 text-black font-bold'
                : 'text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home Only</span>
          </button>
          <button
            onClick={() => setLocationFilter('gym')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-colors ${
              locationFilter === 'gym'
                ? 'bg-amber-400 text-black font-bold'
                : 'text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Gym Routines</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[11px] text-zinc-500 font-mono uppercase">Goal:</span>
          {(['all', 'hypertrophy', 'fat-loss', 'strength'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGoalFilter(g)}
              className={`px-2.5 py-1 rounded-md text-[11px] capitalize transition-colors ${
                goalFilter === g
                  ? 'bg-zinc-100 text-black font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 bg-zinc-950 border border-zinc-800'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Routine Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRoutines.map((routine) => {
          const isMatchedGoal = routine.goal === profile.fitnessGoal;

          return (
            <div
              key={routine.id}
              className={`group flex flex-col justify-between bg-zinc-900/90 rounded-2xl border transition-all duration-200 hover:shadow-xl hover:shadow-black/40 overflow-hidden ${
                isMatchedGoal ? 'border-amber-500/40' : 'border-zinc-800/90 hover:border-zinc-700'
              }`}
            >
              {/* Card Header */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-zinc-950 font-mono text-[10px] text-zinc-300 uppercase border border-zinc-800">
                      {routine.location}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-zinc-950 font-mono text-[10px] text-zinc-300 capitalize border border-zinc-800">
                      {routine.goal}
                    </span>
                  </div>

                  {isMatchedGoal && (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400 font-semibold">
                      <Sparkles className="w-3 h-3" />
                      Goal Match
                    </span>
                  )}
                </div>

                <div>
                  <h3
                    onClick={() => setSelectedRoutine(routine)}
                    className="text-lg font-bold text-white hover:text-amber-400 cursor-pointer transition-colors leading-snug"
                  >
                    {routine.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {routine.description}
                  </p>
                </div>

                {/* Metrics ribbon */}
                <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-zinc-950/70 rounded-xl border border-zinc-800/80 text-center">
                  <div>
                    <span className="text-[10px] text-zinc-500 block uppercase">Duration</span>
                    <span className="text-xs font-bold text-white font-mono flex items-center justify-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {routine.durationMin}m
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block uppercase">Est. Burn</span>
                    <span className="text-xs font-bold text-amber-400 font-mono flex items-center justify-center gap-1 mt-0.5">
                      <Flame className="w-3 h-3 text-amber-400" />
                      ~{routine.estimatedCalories} kcal
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block uppercase">Movements</span>
                    <span className="text-xs font-bold text-white font-mono flex items-center justify-center gap-1 mt-0.5">
                      <Layers className="w-3 h-3 text-emerald-400" />
                      {routine.exercises.length}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {routine.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] text-zinc-400 bg-zinc-950/40 px-2 py-0.5 rounded border border-zinc-800/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 pt-3 border-t border-zinc-800/80 bg-zinc-950/40 flex items-center justify-between">
                <button
                  onClick={() => setSelectedRoutine(routine)}
                  className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  View Details
                </button>

                <button
                  onClick={() => startWorkout(routine)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-lg shadow-sm transition-all hover:scale-105"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>Start Session</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Routine Detail Modal */}
      {selectedRoutine && (
        <RoutineDetailModal
          routine={selectedRoutine}
          onClose={() => setSelectedRoutine(null)}
        />
      )}

      {/* Generator Questionnaire Modal */}
      {showGenerator && (
        <RoutineGeneratorModal
          onClose={() => setShowGenerator(false)}
          onRoutineGenerated={(newRoutine) => setSelectedRoutine(newRoutine)}
        />
      )}

      {/* Custom Routine Builder Modal */}
      {showCustomBuilder && (
        <CustomRoutineBuilderModal
          onClose={() => setShowCustomBuilder(false)}
          onSaved={(newRoutine) => setSelectedRoutine(newRoutine)}
        />
      )}
    </div>
  );
};
