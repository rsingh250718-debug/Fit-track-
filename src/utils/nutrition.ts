import { FitnessGoal } from '../types/workout';

/**
 * Calculates Basal Metabolic Rate using the Mifflin-St Jeor Equation
 */
export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: 'male' | 'female' | 'other' = 'male'
): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === 'female') {
    return Math.round(base - 161);
  } else {
    // default and male
    return Math.round(base + 5);
  }
}

/**
 * Calculates Total Daily Energy Expenditure (TDEE) based on activity multiplier
 */
export function calculateTDEE(
  bmr: number,
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very_active' = 'moderate'
): number {
  const multipliers: Record<string, number> = {
    sedentary: 1.2, // desk job, little to no workout
    light: 1.375, // 1-3 workouts per week
    moderate: 1.55, // 3-5 workouts per week
    very_active: 1.725, // 6-7 hard workouts per week
  };
  return Math.round(bmr * (multipliers[activityLevel] || 1.55));
}

/**
 * Calculates recommended daily caloric target based on fitness goals
 */
export function calculateGoalCalorieTarget(
  tdee: number,
  goal: FitnessGoal,
  customDelta?: number
): number {
  if (typeof customDelta === 'number') {
    return Math.round(tdee + customDelta);
  }

  switch (goal) {
    case 'fat-loss':
      return Math.round(tdee - 500); // 500 kcal deficit ~ 0.5kg/1lb fat loss per week
    case 'hypertrophy':
      return Math.round(tdee + 275); // Lean surplus for optimal muscle protein synthesis with minimal fat gain
    case 'strength':
      return Math.round(tdee + 150); // Slight surplus to fuel heavy CNS recovery
    case 'home-tone':
    case 'mobility':
    case 'endurance':
    default:
      return Math.round(tdee); // Maintenance recomp
  }
}

export interface MacroSplit {
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  proteinCalories: number;
  carbsCalories: number;
  fatsCalories: number;
}

/**
 * Computes optimal macronutrient distribution based on target calories & bodyweight
 */
export function calculateMacros(
  calorieTarget: number,
  weightKg: number,
  goal: FitnessGoal
): MacroSplit {
  // Protein factor (g per kg bodyweight)
  let proteinFactor = 2.0;
  if (goal === 'fat-loss') proteinFactor = 2.2; // higher protein spares muscle in deficit
  if (goal === 'hypertrophy') proteinFactor = 2.0;
  if (goal === 'home-tone') proteinFactor = 1.8;

  const proteinGrams = Math.round(weightKg * proteinFactor);
  const proteinCalories = proteinGrams * 4;

  // Healthy dietary fat: 25% to 30% of total calories
  const fatCalories = Math.round(calorieTarget * 0.28);
  const fatsGrams = Math.round(fatCalories / 9);

  // Remainder to carbohydrates for athletic performance & glycogen replenishment
  const remainingCalories = Math.max(0, calorieTarget - proteinCalories - fatCalories);
  const carbsGrams = Math.round(remainingCalories / 4);
  const carbsCalories = carbsGrams * 4;

  return {
    proteinGrams,
    carbsGrams,
    fatsGrams,
    proteinCalories,
    carbsCalories,
    fatsCalories: fatCalories,
  };
}

/**
 * Calculates active exercise calories burned using the scientific MET formula:
 * Calories = (MET * 3.5 * weightKg / 200) * durationMinutes * intensityModifier
 */
export function calculateExerciseCaloriesBurned(
  metScore: number,
  weightKg: number,
  durationMinutes: number,
  intensityModifier: number = 1.0
): number {
  if (durationMinutes <= 0 || weightKg <= 0) return 0;
  const burned = (metScore * 3.5 * weightKg / 200) * durationMinutes * intensityModifier;
  return Math.round(Math.max(1, burned));
}

/**
 * Calculates estimated One-Rep Maximum (1RM) using Epley & Brzycki average
 */
export function calculateEstimated1RM(weight: number, reps: number): number {
  if (reps <= 0 || weight <= 0) return 0;
  if (reps === 1) return Math.round(weight);

  // Epley: weight * (1 + reps/30)
  const epley = weight * (1 + reps / 30);
  // Brzycki: weight * (36 / (37 - reps)) for reps < 37
  const brzycki = reps < 37 ? weight * (36 / (37 - reps)) : epley;

  return Math.round((epley + brzycki) / 2);
}

export function kgToLbs(kg: number): number {
  return Math.round(kg * 2.20462 * 10) / 10;
}

export function lbsToKg(lbs: number): number {
  return Math.round((lbs / 2.20462) * 10) / 10;
}

export function cmToInches(cm: number): number {
  return Math.round((cm / 2.54) * 10) / 10;
}

export function inchesToCm(inches: number): number {
  return Math.round(inches * 2.54 * 10) / 10;
}
