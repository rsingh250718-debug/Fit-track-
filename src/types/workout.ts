export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'biceps'
  | 'triceps'
  | 'core'
  | 'calves'
  | 'full-body';

export type EquipmentType =
  | 'bodyweight'
  | 'dumbbell'
  | 'barbell'
  | 'cable'
  | 'machine'
  | 'resistance-band'
  | 'kettlebell'
  | 'bench'
  | 'pullup-bar';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type FitnessGoal =
  | 'hypertrophy'
  | 'fat-loss'
  | 'strength'
  | 'home-tone'
  | 'endurance'
  | 'mobility';

export type WorkoutLocation = 'home' | 'gym' | 'hybrid';

export interface Exercise {
  id: string;
  name: string;
  primaryMuscle: MuscleGroup;
  secondaryMuscles: MuscleGroup[];
  equipment: EquipmentType;
  difficulty: DifficultyLevel;
  metScore: number; // Metabolic Equivalent of Task (kcal calculation)
  homeFriendly: boolean;
  videoUrl?: string; // YouTube video embed ID or video stream
  thumbnailUrl: string;
  description: string;
  instructions: string[];
  formCues: string[];
  commonMistakes: string[];
  breathingTip: string;
  tempo: string; // e.g. "3-0-1-0" (eccentric-pause-concentric-pause)
}

export interface RoutineExercise {
  exerciseId: string;
  sets: number;
  reps: string; // e.g., "8-12" or "15" or "45s"
  restSec: number;
  targetRpe?: number; // Rate of Perceived Exertion (1-10)
  notes?: string;
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  description: string;
  goal: FitnessGoal;
  difficulty: DifficultyLevel;
  location: WorkoutLocation;
  daysPerWeek: number;
  durationMin: number;
  estimatedCalories: number;
  equipmentNeeded: EquipmentType[];
  exercises: RoutineExercise[];
  isCustom?: boolean;
  tags: string[];
}

export interface WorkoutSetRecord {
  setNumber: number;
  weight: number; // in kg or lbs depending on profile
  reps: number;
  completed: boolean;
  rpe?: number;
  isPr?: boolean;
  previousWeight?: number;
  previousReps?: number;
}

export interface WorkoutExerciseLog {
  exerciseId: string;
  exerciseName: string;
  sets: WorkoutSetRecord[];
  notes?: string;
}

export interface WorkoutSessionLog {
  id: string;
  routineId?: string;
  routineTitle: string;
  date: string; // ISO date string
  startTime: string;
  endTime: string;
  durationMinutes: number;
  caloriesBurned: number;
  totalVolume: number; // sum of (weight * reps)
  exercises: WorkoutExerciseLog[];
  perceivedExertion: number; // 1-10
  notes?: string;
  newPrsCount?: number;
}

export interface PersonalRecord {
  id: string;
  exerciseId: string;
  exerciseName: string;
  recordType: 'max_weight' | 'max_reps' | 'max_volume' | 'est_1rm';
  value: number;
  unit: string;
  date: string;
  workoutSessionId?: string;
}

export interface BodyMeasurement {
  id: string;
  date: string;
  weightKg: number;
  bodyFatPercent?: number;
  chestCm?: number;
  waistCm?: number;
  armsCm?: number;
  thighsCm?: number;
  notes?: string;
}

export interface MealLogItem {
  id: string;
  time: string;
  name: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
}

export interface DailyNutritionSummary {
  date: string; // YYYY-MM-DD
  targetCalories: number;
  consumedCalories: number;
  workoutCaloriesBurned: number;
  activeSurplusDeficit: number; // consumed - (bmr/activity + workout)
  targetProtein: number;
  targetCarbs: number;
  targetFats: number;
  consumedProtein: number;
  consumedCarbs: number;
  consumedFats: number;
  meals: MealLogItem[];
}

export interface UserFitnessProfile {
  name: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  weightKg: number;
  heightCm: number;
  unitSystem: 'metric' | 'imperial';
  fitnessGoal: FitnessGoal;
  experienceLevel: DifficultyLevel;
  preferredLocation: WorkoutLocation;
  availableEquipment: EquipmentType[];
  targetWorkoutsPerWeek: number;
  sessionDurationPreference: number; // in minutes
  dailyStepGoal: number;
  customCaloricSurplusDeficit?: number; // e.g. -500 for cut, +300 for bulk
}
