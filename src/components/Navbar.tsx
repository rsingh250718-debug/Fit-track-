import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { ProfileModal } from './Profile/ProfileModal';
import { PlayStoreModal } from './PlayStore/PlayStoreModal';
import { usePWAInstall } from '../hooks/usePWAInstall';
import {
  Dumbbell,
  Play,
  TrendingUp,
  Flame,
  User,
  Zap,
  Sparkles,
  Smartphone,
  Download,
} from 'lucide-react';

export type ActiveTab = 'routines' | 'exercises' | 'progress' | 'nutrition';

interface Props {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<Props> = ({ activeTab, onTabChange }) => {
  const { profile, streakCount, todayNutrition, activeSession } = useWorkout();
  const { isInstallable, isInstalled } = usePWAInstall();
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showPlayStore, setShowPlayStore] = useState<boolean>(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Branding */}
            <div className="flex items-center gap-3">
              <div
                onClick={() => onTabChange('routines')}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-black shadow-lg shadow-amber-400/20 group-hover:scale-105 transition-transform">
                  <Zap className="w-5 h-5 fill-black" />
                </div>
                <div>
                  <span className="text-lg font-black tracking-tight text-white flex items-center gap-1">
                    APEX<span className="text-amber-400">FIT</span>
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono tracking-wider block -mt-1 uppercase">
                    Gym & Home Trainer
                  </span>
                </div>
              </div>
            </div>

            {/* Center: Desktop Nav Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800/80">
              <button
                onClick={() => onTabChange('routines')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'routines'
                    ? 'bg-amber-400 text-black shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <Dumbbell className="w-3.5 h-3.5" />
                <span>Routines & Workouts</span>
              </button>

              <button
                onClick={() => onTabChange('exercises')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'exercises'
                    ? 'bg-amber-400 text-black shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Video Tutorials</span>
              </button>

              <button
                onClick={() => onTabChange('progress')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'progress'
                    ? 'bg-amber-400 text-black shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Progress & PRs</span>
              </button>

              <button
                onClick={() => onTabChange('nutrition')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'nutrition'
                    ? 'bg-amber-400 text-black shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Calorie & Nutrition</span>
              </button>
            </nav>

            {/* Right: Quick Stats & Profile */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Play Store & App Store Button */}
              <button
                onClick={() => setShowPlayStore(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-zinc-900 hover:from-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-all shadow-sm"
                title="Google Play Store & Mobile App Package"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Play Store</span>
                <span className="text-[10px] bg-emerald-400 text-black px-1 rounded font-bold uppercase">
                  AAB
                </span>
              </button>

              {/* Live Session Active Indicator */}
              {activeSession && (
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-semibold animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>SESSION ACTIVE</span>
                </div>
              )}

              {/* Streak badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-bold text-white">{streakCount}</span>
                <span className="text-zinc-500 hidden sm:inline">Streak</span>
              </div>

              {/* Athlete Profile button */}
              <button
                onClick={() => setShowProfile(true)}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
                title="Edit Athlete Profile"
              >
                <div className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                  {profile.name.charAt(0)}
                </div>
                <div className="text-left hidden lg:block">
                  <span className="text-xs font-semibold text-white block leading-tight">
                    {profile.name}
                  </span>
                  <span className="text-[10px] text-zinc-500 capitalize block leading-tight">
                    {profile.fitnessGoal}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Bottom Navigation Bar */}
          <div className="flex md:hidden items-center justify-around py-2 border-t border-zinc-800/80 text-[11px]">
            <button
              onClick={() => onTabChange('routines')}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg ${
                activeTab === 'routines' ? 'text-amber-400 font-bold' : 'text-zinc-400'
              }`}
            >
              <Dumbbell className="w-4 h-4" />
              <span>Routines</span>
            </button>
            <button
              onClick={() => onTabChange('exercises')}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg ${
                activeTab === 'exercises' ? 'text-amber-400 font-bold' : 'text-zinc-400'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>Tutorials</span>
            </button>
            <button
              onClick={() => onTabChange('progress')}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg ${
                activeTab === 'progress' ? 'text-amber-400 font-bold' : 'text-zinc-400'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Progress</span>
            </button>
            <button
              onClick={() => onTabChange('nutrition')}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg ${
                activeTab === 'nutrition' ? 'text-amber-400 font-bold' : 'text-zinc-400'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Nutrition</span>
            </button>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}

      {/* Play Store & Install Guide Modal */}
      {showPlayStore && <PlayStoreModal onClose={() => setShowPlayStore(false)} />}
    </>
  );
};
