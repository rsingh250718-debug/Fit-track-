import React, { useState } from 'react';
import { useWorkout } from '../../context/WorkoutContext';
import {
  calculateBMR,
  calculateGoalCalorieTarget,
  calculateMacros,
  calculateTDEE,
} from '../../utils/nutrition';
import {
  Flame,
  Utensils,
  Target,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Info,
  X,
  PieChart,
} from 'lucide-react';

export const NutritionalAlignmentDashboard: React.FC = () => {
  const { profile, todayNutrition, addMeal, removeMeal } = useWorkout();

  const [showAddMealModal, setShowAddMealModal] = useState<boolean>(false);
  const [mealName, setMealName] = useState<string>('');
  const [mealCalories, setMealCalories] = useState<number>(450);
  const [mealProtein, setMealProtein] = useState<number>(35);
  const [mealCarbs, setMealCarbs] = useState<number>(45);
  const [mealFats, setMealFats] = useState<number>(12);

  // Compute BMR & TDEE
  const bmr = calculateBMR(profile.weightKg, profile.heightCm, profile.age, profile.gender);
  const tdee = calculateTDEE(bmr, 'moderate');
  const targetCalories = calculateGoalCalorieTarget(
    tdee,
    profile.fitnessGoal,
    profile.customCaloricSurplusDeficit
  );
  const targetMacros = calculateMacros(targetCalories, profile.weightKg, profile.fitnessGoal);

  // Energy expenditure today: TDEE baseline + active workout burn
  const totalBurnToday = tdee + todayNutrition.workoutCaloriesBurned;
  const netEnergyBalance = todayNutrition.consumedCalories - totalBurnToday;

  // Calorie budget remaining
  // If cutting/hypertrophy target: Remaining = targetCalories - consumedCalories
  const remainingCaloriesToTarget = targetCalories - todayNutrition.consumedCalories;

  const handleAddMealSubmit = () => {
    if (!mealName.trim() || mealCalories <= 0) return;

    addMeal({
      name: mealName.trim(),
      calories: mealCalories,
      proteinGrams: mealProtein,
      carbsGrams: mealCarbs,
      fatsGrams: mealFats,
    });

    setMealName('');
    setShowAddMealModal(false);
  };

  // Quick preset meals
  const presets = [
    { name: 'Post-Workout Whey Protein & Banana', cals: 320, p: 35, c: 38, f: 3 },
    { name: 'Grilled Chicken Breast & White Rice Bowl', cals: 580, p: 48, c: 65, f: 10 },
    { name: 'Egg White Omelet & Avocado Toast', cals: 420, p: 28, c: 30, f: 20 },
    { name: 'Greek Yogurt & Mixed Berries', cals: 220, p: 20, c: 24, f: 4 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Goal Alignment Status */}
      <div className="relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400">
              <Target className="w-4 h-4" />
              <span>Nutritional Alignment Engine</span>
              <span>·</span>
              <span className="capitalize">{profile.fitnessGoal} Target</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">Daily Energy Balance</h2>
          </div>

          <button
            onClick={() => setShowAddMealModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-xl shadow-md shadow-amber-400/20 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Log Meal / Fuel</span>
          </button>
        </div>

        {/* 3 Pillars Grid: Goal Target vs Burned vs Consumed */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Target Intake */}
          <div className="p-4 bg-zinc-950/70 border border-zinc-800/80 rounded-xl">
            <span className="text-[10px] uppercase font-mono text-zinc-400 block">
              Goal Calorie Target
            </span>
            <div className="text-2xl font-black text-white font-mono mt-1">
              {targetCalories}{' '}
              <span className="text-xs font-normal text-zinc-500">kcal</span>
            </div>
            <span className="text-xs text-zinc-400 block mt-0.5">
              TDEE {tdee} {profile.fitnessGoal === 'fat-loss' ? '- 500 deficit' : profile.fitnessGoal === 'hypertrophy' ? '+ 275 surplus' : 'balanced'}
            </span>
          </div>

          {/* Session Burned */}
          <div className="p-4 bg-zinc-950/70 border border-zinc-800/80 rounded-xl">
            <span className="text-[10px] uppercase font-mono text-zinc-400 block flex items-center justify-between">
              <span>Workouts Burned Today</span>
              <Flame className="w-3.5 h-3.5 text-amber-400" />
            </span>
            <div className="text-2xl font-black text-amber-400 font-mono mt-1">
              {todayNutrition.workoutCaloriesBurned}{' '}
              <span className="text-xs font-normal text-zinc-500">kcal</span>
            </div>
            <span className="text-xs text-zinc-400 block mt-0.5">
              Direct MET expenditure from training
            </span>
          </div>

          {/* Consumed */}
          <div className="p-4 bg-zinc-950/70 border border-zinc-800/80 rounded-xl">
            <span className="text-[10px] uppercase font-mono text-zinc-400 block flex items-center justify-between">
              <span>Consumed Today</span>
              <Utensils className="w-3.5 h-3.5 text-cyan-400" />
            </span>
            <div className="text-2xl font-black text-white font-mono mt-1">
              {todayNutrition.consumedCalories}{' '}
              <span className="text-xs font-normal text-zinc-500">kcal</span>
            </div>
            <span className="text-xs text-zinc-400 block mt-0.5 font-mono">
              {remainingCaloriesToTarget >= 0
                ? `${remainingCaloriesToTarget} kcal remaining`
                : `${Math.abs(remainingCaloriesToTarget)} kcal over target`}
            </span>
          </div>
        </div>

        {/* Nutritional Alignment Status Callout */}
        <div className="p-3.5 rounded-xl bg-zinc-950/90 border border-zinc-800/90 flex items-start gap-3 text-xs">
          {profile.fitnessGoal === 'fat-loss' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          ) : profile.fitnessGoal === 'hypertrophy' ? (
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          ) : (
            <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          )}
          <div className="text-zinc-300">
            <strong className="text-white capitalize">{profile.fitnessGoal} Alignment: </strong>
            {profile.fitnessGoal === 'fat-loss' &&
              `Your ${todayNutrition.workoutCaloriesBurned} kcal workout burn accelerates your fat loss rate while preserving lean mass through high protein.`}
            {profile.fitnessGoal === 'hypertrophy' &&
              `You need sufficient caloric substrate to recover and repair muscle fibers damaged during your workout sessions.`}
            {profile.fitnessGoal !== 'fat-loss' && profile.fitnessGoal !== 'hypertrophy' &&
              `Balanced caloric intake aligned with session exertion maintains strength and optimizes athletic conditioning.`}
          </div>
        </div>
      </div>

      {/* Macronutrient Tracking Bars */}
      <div className="p-6 bg-zinc-900/90 border border-zinc-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Target Macronutrient Distribution</h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Optimal macronutrient ratios tailored for muscle protein synthesis and training glycogen.
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            Protein Target: {(targetMacros.proteinGrams / profile.weightKg).toFixed(1)}g/kg
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Protein */}
          <div className="p-4 bg-zinc-950/70 border border-zinc-800/80 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Protein (Muscle Recovery)</span>
              <span className="font-mono text-amber-400 font-bold">
                {todayNutrition.consumedProtein}g / {targetMacros.proteinGrams}g
              </span>
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, (todayNutrition.consumedProtein / targetMacros.proteinGrams) * 100)}%`,
                }}
              />
            </div>
            <span className="text-[10px] text-zinc-500 block">
              {Math.max(0, targetMacros.proteinGrams - todayNutrition.consumedProtein)}g remaining
            </span>
          </div>

          {/* Carbs */}
          <div className="p-4 bg-zinc-950/70 border border-zinc-800/80 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Carbohydrates (Gym Energy)</span>
              <span className="font-mono text-cyan-400 font-bold">
                {todayNutrition.consumedCarbs}g / {targetMacros.carbsGrams}g
              </span>
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-cyan-400 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, (todayNutrition.consumedCarbs / targetMacros.carbsGrams) * 100)}%`,
                }}
              />
            </div>
            <span className="text-[10px] text-zinc-500 block">
              {Math.max(0, targetMacros.carbsGrams - todayNutrition.consumedCarbs)}g remaining
            </span>
          </div>

          {/* Fats */}
          <div className="p-4 bg-zinc-950/70 border border-zinc-800/80 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Healthy Dietary Fats</span>
              <span className="font-mono text-emerald-400 font-bold">
                {todayNutrition.consumedFats}g / {targetMacros.fatsGrams}g
              </span>
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, (todayNutrition.consumedFats / targetMacros.fatsGrams) * 100)}%`,
                }}
              />
            </div>
            <span className="text-[10px] text-zinc-500 block">
              {Math.max(0, targetMacros.fatsGrams - todayNutrition.consumedFats)}g remaining
            </span>
          </div>
        </div>
      </div>

      {/* Meals Logged Today */}
      <div className="p-6 bg-zinc-900/90 border border-zinc-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Meals & Nutrition Logs Today</h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Keep fuel and workout sessions in lockstep alignment.
            </p>
          </div>
          <button
            onClick={() => setShowAddMealModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-semibold border border-zinc-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Add Item</span>
          </button>
        </div>

        <div className="space-y-2">
          {todayNutrition.meals.map((meal) => (
            <div
              key={meal.id}
              className="p-3.5 bg-zinc-950/70 border border-zinc-800/80 rounded-xl flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-zinc-500">{meal.time}</span>
                <div>
                  <h4 className="font-semibold text-white text-sm">{meal.name}</h4>
                  <div className="flex items-center gap-2 text-zinc-400 text-[11px] mt-0.5 font-mono">
                    <span className="text-amber-400">{meal.proteinGrams}g P</span>
                    <span>·</span>
                    <span className="text-cyan-400">{meal.carbsGrams}g C</span>
                    <span>·</span>
                    <span className="text-emerald-400">{meal.fatsGrams}g F</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-white text-sm">
                  {meal.calories} <span className="text-xs font-normal text-zinc-500">kcal</span>
                </span>
                <button
                  onClick={() => removeMeal(meal.id)}
                  className="p-1.5 text-zinc-600 hover:text-rose-400 transition-colors rounded hover:bg-zinc-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Meal Modal */}
      {showAddMealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white">Log Meal / Fuel Entry</h3>
              <button
                onClick={() => setShowAddMealModal(false)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Presets */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-zinc-400">Quick Presets:</span>
              <div className="grid grid-cols-2 gap-1.5">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setMealName(p.name);
                      setMealCalories(p.cals);
                      setMealProtein(p.p);
                      setMealCarbs(p.c);
                      setMealFats(p.f);
                    }}
                    className="p-2 text-left bg-zinc-950/60 hover:bg-zinc-800/80 border border-zinc-800 rounded-lg text-[11px] text-zinc-300 truncate"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Meal / Food Description *</label>
                <input
                  type="text"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  placeholder="e.g. Steak, Rice & Broccoli"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Total Calories (kcal) *</label>
                <input
                  type="number"
                  value={mealCalories}
                  onChange={(e) => setMealCalories(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-zinc-400 block mb-1">Protein (g)</label>
                  <input
                    type="number"
                    value={mealProtein}
                    onChange={(e) => setMealProtein(parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-white text-center"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 block mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    value={mealCarbs}
                    onChange={(e) => setMealCarbs(parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-white text-center"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 block mb-1">Fats (g)</label>
                  <input
                    type="number"
                    value={mealFats}
                    onChange={(e) => setMealFats(parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-white text-center"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
              <button
                onClick={() => setShowAddMealModal(false)}
                className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMealSubmit}
                disabled={!mealName.trim()}
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black text-xs font-bold rounded-lg transition-all"
              >
                Save Meal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
