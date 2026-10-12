/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { WorkoutProvider } from './context/WorkoutContext';
import { Navbar, ActiveTab } from './components/Navbar';
import { RoutinesDashboard } from './components/Routines/RoutinesDashboard';
import { ExerciseList } from './components/ExerciseLibrary/ExerciseList';
import { ProgressDashboard } from './components/Progress/ProgressDashboard';
import { NutritionalAlignmentDashboard } from './components/Nutrition/NutritionalAlignmentDashboard';
import { ActiveWorkoutModal } from './components/ActiveWorkout/ActiveWorkoutModal';
import { Zap, Shield, Flame, Activity } from 'lucide-react';

function WorkoutApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('routines');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content View Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'routines' && <RoutinesDashboard />}
        {activeTab === 'exercises' && <ExerciseList />}
        {activeTab === 'progress' && <ProgressDashboard />}
        {activeTab === 'nutrition' && <NutritionalAlignmentDashboard />}
      </main>

      {/* Active Workout Overlay / Companion (Mounts when workout is started) */}
      <ActiveWorkoutModal />

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/80 py-8 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-300">ApexFit</span>
            <span>·</span>
            <span>Gym Training & Home Workout Engine</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-zinc-400">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span>Scientific MET Calorie Modeling</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-zinc-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Form-Certified Tutorials</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <WorkoutProvider>
      <WorkoutApp />
    </WorkoutProvider>
  );
}
