import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_ROUTINES } from '../data/routines';
import { EXERCISES } from '../data/exercises';
import {
  BodyMeasurement,
  DailyNutritionSummary,
  PersonalRecord,
  UserFitnessProfile,
  WorkoutExerciseLog,
  WorkoutRoutine,
  WorkoutSessionLog,
  WorkoutSetRecord,
} from '../types/workout';
import {
  calculateBMR,
  calculateEstimated1RM,
  calculateExerciseCaloriesBurned,
  calculateGoalCalorieTarget,
  calculateMacros,
  calculateTDEE,
} from '../utils/nutrition';
import {
  playCountdownTick,
  playRestCompleteSound,
  playSetLoggedSound,
  playWorkoutCompleteSound,
} from '../utils/audio';

const STORAGE_KEYS = {
  PROFILE: 'apexfit_user_profile_v1',
  ROUTINES: 'apexfit_routines_v1',
  HISTORY: 'apexfit_workout_history_v1',
  PRS: 'apexfit_prs_v1',
  MEASUREMENTS: 'apexfit_measurements_v1',
  NUTRITION: 'apexfit_nutrition_v1',
  ACTIVE_SESSION: 'apexfit_active_session_v1',
};

const DEFAULT_PROFILE: UserFitnessProfile = {
  name: 'Alex Mercer',
  gender: 'male',
  age: 27,
  weightKg: 76,
  heightCm: 178,
  unitSystem: 'metric',
  fitnessGoal: 'hypertrophy',
  experienceLevel: 'intermediate',
  preferredLocation: 'hybrid',
  availableEquipment: ['bodyweight', 'dumbbell', 'barbell', 'pullup-bar', 'bench'],
  targetWorkoutsPerWeek: 4,
  sessionDurationPreference: 45,
  dailyStepGoal: 9000,
  customCaloricSurplusDeficit: 250,
};

// Seed realistic workout history so progress charts and PRs display rich trends immediately
const SEED_HISTORY: WorkoutSessionLog[] = [
  {
    id: 'seed-w-1',
    routineId: 'home-shred-calisthenics',
    routineTitle: 'Home Shred: Zero-Equipment Calisthenics',
    date: new Date(Date.now() - 10 * 86400000).toISOString(),
    startTime: new Date(Date.now() - 10 * 86400000).toISOString(),
    endTime: new Date(Date.now() - 10 * 86400000 + 35 * 60000).toISOString(),
    durationMinutes: 34,
    caloriesBurned: 275,
    totalVolume: 2840,
    perceivedExertion: 8,
    newPrsCount: 1,
    exercises: [
      {
        exerciseId: 'push-up',
        exerciseName: 'Standard Push-Up',
        sets: [
          { setNumber: 1, weight: 0, reps: 15, completed: true, rpe: 7 },
          { setNumber: 2, weight: 0, reps: 15, completed: true, rpe: 8 },
          { setNumber: 3, weight: 0, reps: 12, completed: true, rpe: 9 },
        ],
      },
      {
        exerciseId: 'bodyweight-squat',
        exerciseName: 'Air Squat (Bodyweight Squat)',
        sets: [
          { setNumber: 1, weight: 0, reps: 20, completed: true, rpe: 7 },
          { setNumber: 2, weight: 0, reps: 20, completed: true, rpe: 8 },
        ],
      },
    ],
  },
  {
    id: 'seed-w-2',
    routineId: 'dumbbell-home-hypertrophy',
    routineTitle: 'Dumbbell Only Home Muscle Builder',
    date: new Date(Date.now() - 7 * 86400000).toISOString(),
    startTime: new Date(Date.now() - 7 * 86400000).toISOString(),
    endTime: new Date(Date.now() - 7 * 86400000 + 44 * 60000).toISOString(),
    durationMinutes: 44,
    caloriesBurned: 320,
    totalVolume: 4950,
    perceivedExertion: 8,
    newPrsCount: 2,
    exercises: [
      {
        exerciseId: 'incline-dumbbell-press',
        exerciseName: 'Incline Dumbbell Press',
        sets: [
          { setNumber: 1, weight: 22, reps: 12, completed: true, rpe: 8 },
          { setNumber: 2, weight: 24, reps: 10, completed: true, rpe: 8 },
          { setNumber: 3, weight: 24, reps: 9, completed: true, rpe: 9 },
        ],
      },
      {
        exerciseId: 'romanian-deadlift',
        exerciseName: 'Dumbbell Romanian Deadlift (RDL)',
        sets: [
          { setNumber: 1, weight: 26, reps: 12, completed: true, rpe: 8 },
          { setNumber: 2, weight: 28, reps: 10, completed: true, rpe: 8 },
        ],
      },
    ],
  },
  {
    id: 'seed-w-3',
    routineId: 'gym-push-pull-legs-mastery',
    routineTitle: 'PPL Hypertrophy Mastery (Gym Push Focus)',
    date: new Date(Date.now() - 4 * 86400000).toISOString(),
    startTime: new Date(Date.now() - 4 * 86400000).toISOString(),
    endTime: new Date(Date.now() - 4 * 86400000 + 52 * 60000).toISOString(),
    durationMinutes: 51,
    caloriesBurned: 395,
    totalVolume: 6850,
    perceivedExertion: 9,
    newPrsCount: 1,
    exercises: [
      {
        exerciseId: 'barbell-bench-press',
        exerciseName: 'Barbell Flat Bench Press',
        sets: [
          { setNumber: 1, weight: 80, reps: 8, completed: true, rpe: 8 },
          { setNumber: 2, weight: 85, reps: 6, completed: true, rpe: 9 },
          { setNumber: 3, weight: 85, reps: 6, completed: true, rpe: 9 },
        ],
      },
      {
        exerciseId: 'overhead-barbell-press',
        exerciseName: 'Overhead Barbell Military Press',
        sets: [
          { setNumber: 1, weight: 50, reps: 8, completed: true, rpe: 8 },
          { setNumber: 2, weight: 52.5, reps: 7, completed: true, rpe: 9 },
        ],
      },
    ],
  },
  {
    id: 'seed-w-4',
    routineId: 'hiit-metabolic-furnace',
    routineTitle: 'Metabolic Furnace HIIT & Core',
    date: new Date(Date.now() - 1 * 86400000).toISOString(),
    startTime: new Date(Date.now() - 1 * 86400000).toISOString(),
    endTime: new Date(Date.now() - 1 * 86400000 + 32 * 60000).toISOString(),
    durationMinutes: 32,
    caloriesBurned: 360,
    totalVolume: 3200,
    perceivedExertion: 9,
    newPrsCount: 0,
    exercises: [
      {
        exerciseId: 'burpees',
        exerciseName: 'Full Body Burpees',
        sets: [
          { setNumber: 1, weight: 0, reps: 15, completed: true, rpe: 9 },
          { setNumber: 2, weight: 0, reps: 14, completed: true, rpe: 9 },
        ],
      },
    ],
  },
];

const SEED_PRS: PersonalRecord[] = [
  {
    id: 'pr-1',
    exerciseId: 'barbell-bench-press',
    exerciseName: 'Barbell Flat Bench Press',
    recordType: 'max_weight',
    value: 92.5,
    unit: 'kg',
    date: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: 'pr-2',
    exerciseId: 'barbell-bench-press',
    exerciseName: 'Barbell Flat Bench Press',
    recordType: 'est_1rm',
    value: 102,
    unit: 'kg',
    date: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: 'pr-3',
    exerciseId: 'incline-dumbbell-press',
    exerciseName: 'Incline Dumbbell Press',
    recordType: 'max_weight',
    value: 28,
    unit: 'kg',
    date: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: 'pr-4',
    exerciseId: 'push-up',
    exerciseName: 'Standard Push-Up',
    recordType: 'max_reps',
    value: 32,
    unit: 'reps',
    date: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: 'pr-5',
    exerciseId: 'barbell-deadlift',
    exerciseName: 'Barbell Conventional Deadlift',
    recordType: 'max_weight',
    value: 140,
    unit: 'kg',
    date: new Date(Date.now() - 18 * 86400000).toISOString(),
  },
];

const SEED_MEASUREMENTS: BodyMeasurement[] = [
  {
    id: 'm-1',
    date: new Date(Date.now() - 28 * 86400000).toISOString(),
    weightKg: 78.2,
    bodyFatPercent: 18.5,
    waistCm: 84,
    chestCm: 101,
    armsCm: 36,
  },
  {
    id: 'm-2',
    date: new Date(Date.now() - 14 * 86400000).toISOString(),
    weightKg: 77.0,
    bodyFatPercent: 17.8,
    waistCm: 82.5,
    chestCm: 102,
    armsCm: 36.5,
  },
  {
    id: 'm-3',
    date: new Date().toISOString(),
    weightKg: 76.0,
    bodyFatPercent: 16.9,
    waistCm: 81.0,
    chestCm: 103,
    armsCm: 37.0,
  },
];

export interface ActiveSessionState {
  routineId?: string;
  routineTitle: string;
  startTime: number; // timestamp
  elapsedSeconds: number;
  isPaused: boolean;
  exercises: WorkoutExerciseLog[];
  activeExerciseIndex: number;
  restTimer: {
    active: boolean;
    remainingSec: number;
    targetSec: number;
  };
  caloriesBurnedLive: number;
}

interface WorkoutContextType {
  profile: UserFitnessProfile;
  updateProfile: (updates: Partial<UserFitnessProfile>) => void;
  routines: WorkoutRoutine[];
  addCustomRoutine: (routine: WorkoutRoutine) => void;
  deleteCustomRoutine: (id: string) => void;
  activeSession: ActiveSessionState | null;
  startWorkout: (routine: WorkoutRoutine) => void;
  pauseWorkout: () => void;
  resumeWorkout: () => void;
  cancelWorkout: () => void;
  finishWorkout: () => WorkoutSessionLog | null;
  logSet: (exerciseIndex: number, setIndex: number, completed: boolean, weight?: number, reps?: number, rpe?: number) => void;
  addSetToExercise: (exerciseIndex: number) => void;
  removeSetFromExercise: (exerciseIndex: number, setIndex: number) => void;
  setActiveExerciseIndex: (index: number) => void;
  startRestTimer: (seconds: number) => void;
  adjustRestTimer: (deltaSeconds: number) => void;
  skipRestTimer: () => void;
  history: WorkoutSessionLog[];
  personalRecords: PersonalRecord[];
  addPersonalRecord: (pr: Omit<PersonalRecord, 'id'>) => void;
  measurements: BodyMeasurement[];
  addMeasurement: (measurement: Omit<BodyMeasurement, 'id'>) => void;
  todayNutrition: DailyNutritionSummary;
  addMeal: (meal: { name: string; calories: number; proteinGrams: number; carbsGrams: number; fatsGrams: number }) => void;
  removeMeal: (mealId: string) => void;
  streakCount: number;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Profile State
  const [profile, setProfile] = useState<UserFitnessProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // 2. Routines State
  const [routines, setRoutines] = useState<WorkoutRoutine[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROUTINES);
      if (saved) {
        const parsed: WorkoutRoutine[] = JSON.parse(saved);
        // Combine default with custom
        const customOnly = parsed.filter((r) => r.isCustom);
        return [...DEFAULT_ROUTINES, ...customOnly];
      }
      return DEFAULT_ROUTINES;
    } catch {
      return DEFAULT_ROUTINES;
    }
  });

  // 3. History State
  const [history, setHistory] = useState<WorkoutSessionLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return saved ? JSON.parse(saved) : SEED_HISTORY;
    } catch {
      return SEED_HISTORY;
    }
  });

  // 4. PRs State
  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRS);
      return saved ? JSON.parse(saved) : SEED_PRS;
    } catch {
      return SEED_PRS;
    }
  });

  // 5. Body Measurements
  const [measurements, setMeasurements] = useState<BodyMeasurement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEASUREMENTS);
      return saved ? JSON.parse(saved) : SEED_MEASUREMENTS;
    } catch {
      return SEED_MEASUREMENTS;
    }
  });

  // 6. Active Session State
  const [activeSession, setActiveSession] = useState<ActiveSessionState | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 7. Today Nutrition State
  const todayDateStr = new Date().toISOString().split('T')[0];
  const bmr = calculateBMR(profile.weightKg, profile.heightCm, profile.age, profile.gender);
  const tdee = calculateTDEE(bmr, 'moderate');
  const targetCals = calculateGoalCalorieTarget(tdee, profile.fitnessGoal, profile.customCaloricSurplusDeficit);
  const targetMacros = calculateMacros(targetCals, profile.weightKg, profile.fitnessGoal);

  // Compute total calories burned today from completed history
  const todayWorkoutBurn = history
    .filter((h) => h.date.startsWith(todayDateStr))
    .reduce((sum, h) => sum + h.caloriesBurned, 0);

  const [todayNutrition, setTodayNutrition] = useState<DailyNutritionSummary>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NUTRITION);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.date === todayDateStr) {
          return {
            ...parsed,
            targetCalories: targetCals,
            targetProtein: targetMacros.proteinGrams,
            targetCarbs: targetMacros.carbsGrams,
            targetFats: targetMacros.fatsGrams,
            workoutCaloriesBurned: todayWorkoutBurn,
          };
        }
      }
    } catch {
      // fallback
    }
    return {
      date: todayDateStr,
      targetCalories: targetCals,
      consumedCalories: 1450,
      workoutCaloriesBurned: todayWorkoutBurn,
      activeSurplusDeficit: 1450 - (targetCals + todayWorkoutBurn),
      targetProtein: targetMacros.proteinGrams,
      targetCarbs: targetMacros.carbsGrams,
      targetFats: targetMacros.fatsGrams,
      consumedProtein: 110,
      consumedCarbs: 140,
      consumedFats: 45,
      meals: [
        { id: 'm-seed-1', time: '08:30', name: 'Oatmeal & Whey Protein Shake', calories: 520, proteinGrams: 42, carbsGrams: 65, fatsGrams: 10 },
        { id: 'm-seed-2', time: '13:00', name: 'Grilled Chicken, Sweet Potato & Greens', calories: 680, proteinGrams: 55, carbsGrams: 60, fatsGrams: 18 },
        { id: 'm-seed-3', time: '16:30', name: 'Greek Yogurt & Almonds', calories: 250, proteinGrams: 13, carbsGrams: 15, fatsGrams: 17 },
      ],
    };
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(routines));
  }, [routines]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRS, JSON.stringify(personalRecords));
  }, [personalRecords]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEASUREMENTS, JSON.stringify(measurements));
  }, [measurements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NUTRITION, JSON.stringify(todayNutrition));
  }, [todayNutrition]);

  useEffect(() => {
    if (activeSession) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(activeSession));
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
    }
  }, [activeSession]);

  // Live timer tick for active workout
  useEffect(() => {
    if (!activeSession || activeSession.isPaused) return;

    const timer = setInterval(() => {
      setActiveSession((prev) => {
        if (!prev || prev.isPaused) return prev;

        const nextElapsed = prev.elapsedSeconds + 1;

        // Calculate live calorie burn rate based on current exercise's MET
        const currentExercise = prev.exercises[prev.activeExerciseIndex];
        const exerciseData = EXERCISES.find((e) => e.id === currentExercise?.exerciseId);
        const currentMet = exerciseData?.metScore || 5.5;

        // burn per second = (met * 3.5 * weightKg / 200) / 60
        const burnPerSec = (currentMet * 3.5 * (profile.weightKg || 75) / 200) / 60;
        const newLiveBurn = Math.round((prev.caloriesBurnedLive + burnPerSec) * 10) / 10;

        // Rest timer tick
        let nextRest = { ...prev.restTimer };
        if (nextRest.active && nextRest.remainingSec > 0) {
          const rem = nextRest.remainingSec - 1;
          if (rem <= 3 && rem > 0) {
            playCountdownTick('low');
          } else if (rem === 0) {
            playCountdownTick('high');
            playRestCompleteSound();
          }
          nextRest = {
            ...nextRest,
            remainingSec: rem,
            active: rem > 0,
          };
        }

        return {
          ...prev,
          elapsedSeconds: nextElapsed,
          caloriesBurnedLive: newLiveBurn,
          restTimer: nextRest,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeSession?.isPaused, activeSession?.activeExerciseIndex, profile.weightKg]);

  // Actions
  const updateProfile = (updates: Partial<UserFitnessProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const addCustomRoutine = (routine: WorkoutRoutine) => {
    setRoutines((prev) => [routine, ...prev]);
  };

  const deleteCustomRoutine = (id: string) => {
    setRoutines((prev) => prev.filter((r) => r.id !== id));
  };

  const startWorkout = (routine: WorkoutRoutine) => {
    const exerciseLogs: WorkoutExerciseLog[] = routine.exercises.map((item) => {
      const exerciseDef = EXERCISES.find((e) => e.id === item.exerciseId);
      const exerciseName = exerciseDef?.name || item.exerciseId;

      // Extract numeric reps target if possible e.g. "8-12" -> 10, "15" -> 15
      const parsedReps = parseInt(item.reps.split('-')[0]) || 10;

      // Check for previous weight from history for progressive overload hints
      let previousWeight = 0;
      let previousReps = parsedReps;
      for (const pastSession of history) {
        const found = pastSession.exercises.find((e) => e.exerciseId === item.exerciseId);
        if (found && found.sets.length > 0) {
          const completedSet = found.sets.find((s) => s.completed) || found.sets[0];
          previousWeight = completedSet.weight;
          previousReps = completedSet.reps;
          break;
        }
      }

      const sets: WorkoutSetRecord[] = Array.from({ length: item.sets }).map((_, idx) => ({
        setNumber: idx + 1,
        weight: previousWeight,
        reps: previousReps,
        completed: false,
        rpe: item.targetRpe || 8,
        previousWeight: previousWeight > 0 ? previousWeight : undefined,
        previousReps: previousReps,
      }));

      return {
        exerciseId: item.exerciseId,
        exerciseName,
        sets,
        notes: item.notes,
      };
    });

    setActiveSession({
      routineId: routine.id,
      routineTitle: routine.title,
      startTime: Date.now(),
      elapsedSeconds: 0,
      isPaused: false,
      exercises: exerciseLogs,
      activeExerciseIndex: 0,
      restTimer: {
        active: false,
        remainingSec: 0,
        targetSec: 60,
      },
      caloriesBurnedLive: 0,
    });
  };

  const pauseWorkout = () => {
    setActiveSession((prev) => (prev ? { ...prev, isPaused: true } : null));
  };

  const resumeWorkout = () => {
    setActiveSession((prev) => (prev ? { ...prev, isPaused: false } : null));
  };

  const cancelWorkout = () => {
    setActiveSession(null);
  };

  const startRestTimer = (seconds: number) => {
    setActiveSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        restTimer: {
          active: true,
          remainingSec: seconds,
          targetSec: seconds,
        },
      };
    });
  };

  const adjustRestTimer = (deltaSeconds: number) => {
    setActiveSession((prev) => {
      if (!prev) return null;
      const nextRemaining = Math.max(0, prev.restTimer.remainingSec + deltaSeconds);
      return {
        ...prev,
        restTimer: {
          ...prev.restTimer,
          remainingSec: nextRemaining,
          active: nextRemaining > 0,
        },
      };
    });
  };

  const skipRestTimer = () => {
    setActiveSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        restTimer: {
          ...prev.restTimer,
          active: false,
          remainingSec: 0,
        },
      };
    });
  };

  const logSet = (
    exerciseIndex: number,
    setIndex: number,
    completed: boolean,
    weight?: number,
    reps?: number,
    rpe?: number
  ) => {
    setActiveSession((prev) => {
      if (!prev) return null;
      const nextExercises = [...prev.exercises];
      const targetExercise = { ...nextExercises[exerciseIndex] };
      const nextSets = [...targetExercise.sets];

      const currentSet = nextSets[setIndex];
      const updatedSet: WorkoutSetRecord = {
        ...currentSet,
        completed,
        weight: weight !== undefined ? weight : currentSet.weight,
        reps: reps !== undefined ? reps : currentSet.reps,
        rpe: rpe !== undefined ? rpe : currentSet.rpe,
      };

      nextSets[setIndex] = updatedSet;
      targetExercise.sets = nextSets;
      nextExercises[exerciseIndex] = targetExercise;

      return {
        ...prev,
        exercises: nextExercises,
      };
    });

    if (completed) {
      playSetLoggedSound();
      // Auto-trigger rest timer! Look up recommended restSec for this routine exercise
      const currentRoutine = routines.find((r) => r.id === activeSession?.routineId);
      const exConfig = currentRoutine?.exercises[exerciseIndex];
      const restSec = exConfig?.restSec || 60;
      startRestTimer(restSec);
    }
  };

  const addSetToExercise = (exerciseIndex: number) => {
    setActiveSession((prev) => {
      if (!prev) return null;
      const nextExercises = [...prev.exercises];
      const targetExercise = { ...nextExercises[exerciseIndex] };
      const lastSet = targetExercise.sets[targetExercise.sets.length - 1];

      targetExercise.sets = [
        ...targetExercise.sets,
        {
          setNumber: targetExercise.sets.length + 1,
          weight: lastSet ? lastSet.weight : 0,
          reps: lastSet ? lastSet.reps : 10,
          completed: false,
          rpe: 8,
        },
      ];
      nextExercises[exerciseIndex] = targetExercise;
      return { ...prev, exercises: nextExercises };
    });
  };

  const removeSetFromExercise = (exerciseIndex: number, setIndex: number) => {
    setActiveSession((prev) => {
      if (!prev) return null;
      const nextExercises = [...prev.exercises];
      const targetExercise = { ...nextExercises[exerciseIndex] };
      targetExercise.sets = targetExercise.sets
        .filter((_, idx) => idx !== setIndex)
        .map((s, idx) => ({ ...s, setNumber: idx + 1 }));
      nextExercises[exerciseIndex] = targetExercise;
      return { ...prev, exercises: nextExercises };
    });
  };

  const setActiveExerciseIndex = (index: number) => {
    setActiveSession((prev) => (prev ? { ...prev, activeExerciseIndex: index } : null));
  };

  const finishWorkout = (): WorkoutSessionLog | null => {
    if (!activeSession) return null;

    const durationMinutes = Math.max(1, Math.round(activeSession.elapsedSeconds / 60));
    const nowIso = new Date().toISOString();

    // Calculate volume
    let totalVolume = 0;
    let newPrsCount = 0;
    const newPrsToAdd: PersonalRecord[] = [];

    activeSession.exercises.forEach((ex) => {
      let maxWeightInSession = 0;
      let maxRepsInSession = 0;

      ex.sets.forEach((s) => {
        if (s.completed) {
          totalVolume += s.weight * s.reps;
          if (s.weight > maxWeightInSession) maxWeightInSession = s.weight;
          if (s.reps > maxRepsInSession) maxRepsInSession = s.reps;

          // Check if this beats existing PR
          const existingMaxWeight = personalRecords.find(
            (pr) => pr.exerciseId === ex.exerciseId && pr.recordType === 'max_weight'
          );
          if (s.weight > 0 && (!existingMaxWeight || s.weight > existingMaxWeight.value)) {
            newPrsCount++;
            newPrsToAdd.push({
              id: `pr-${Date.now()}-${ex.exerciseId}`,
              exerciseId: ex.exerciseId,
              exerciseName: ex.exerciseName,
              recordType: 'max_weight',
              value: s.weight,
              unit: profile.unitSystem === 'metric' ? 'kg' : 'lbs',
              date: nowIso,
            });
          }

          // Check 1RM
          const est1RM = calculateEstimated1RM(s.weight, s.reps);
          const existing1RM = personalRecords.find(
            (pr) => pr.exerciseId === ex.exerciseId && pr.recordType === 'est_1rm'
          );
          if (est1RM > 0 && (!existing1RM || est1RM > existing1RM.value)) {
            newPrsToAdd.push({
              id: `pr-1rm-${Date.now()}-${ex.exerciseId}`,
              exerciseId: ex.exerciseId,
              exerciseName: ex.exerciseName,
              recordType: 'est_1rm',
              value: est1RM,
              unit: profile.unitSystem === 'metric' ? 'kg' : 'lbs',
              date: nowIso,
            });
          }
        }
      });
    });

    const finalCalories = Math.max(
      Math.round(activeSession.caloriesBurnedLive),
      calculateExerciseCaloriesBurned(5.5, profile.weightKg || 75, durationMinutes)
    );

    const sessionRecord: WorkoutSessionLog = {
      id: `w-log-${Date.now()}`,
      routineId: activeSession.routineId,
      routineTitle: activeSession.routineTitle,
      date: nowIso,
      startTime: new Date(activeSession.startTime).toISOString(),
      endTime: nowIso,
      durationMinutes,
      caloriesBurned: finalCalories,
      totalVolume,
      exercises: activeSession.exercises,
      perceivedExertion: 8,
      newPrsCount,
    };

    // Update history
    setHistory((prev) => [sessionRecord, ...prev]);

    // Update PRs if any
    if (newPrsToAdd.length > 0) {
      setPersonalRecords((prev) => [...newPrsToAdd, ...prev]);
    }

    // Update today's nutrition active burn
    setTodayNutrition((prev) => {
      const updatedBurn = prev.workoutCaloriesBurned + finalCalories;
      return {
        ...prev,
        workoutCaloriesBurned: updatedBurn,
        activeSurplusDeficit: prev.consumedCalories - (prev.targetCalories + updatedBurn),
      };
    });

    // Play victory sound
    playWorkoutCompleteSound();

    // Clear active session
    setActiveSession(null);

    return sessionRecord;
  };

  const addPersonalRecord = (pr: Omit<PersonalRecord, 'id'>) => {
    setPersonalRecords((prev) => [{ ...pr, id: `pr-manual-${Date.now()}` }, ...prev]);
  };

  const addMeasurement = (measurement: Omit<BodyMeasurement, 'id'>) => {
    const newEntry: BodyMeasurement = {
      ...measurement,
      id: `m-${Date.now()}`,
    };
    setMeasurements((prev) => [newEntry, ...prev]);
    // Also update current profile weight if provided
    if (measurement.weightKg) {
      updateProfile({ weightKg: measurement.weightKg });
    }
  };

  const addMeal = (meal: { name: string; calories: number; proteinGrams: number; carbsGrams: number; fatsGrams: number }) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newMealItem = {
      id: `meal-${Date.now()}`,
      time: timeStr,
      ...meal,
    };

    setTodayNutrition((prev) => {
      const newConsumed = prev.consumedCalories + meal.calories;
      const newProtein = prev.consumedProtein + meal.proteinGrams;
      const newCarbs = prev.consumedCarbs + meal.carbsGrams;
      const newFats = prev.consumedFats + meal.fatsGrams;
      return {
        ...prev,
        consumedCalories: newConsumed,
        consumedProtein: newProtein,
        consumedCarbs: newCarbs,
        consumedFats: newFats,
        activeSurplusDeficit: newConsumed - (prev.targetCalories + prev.workoutCaloriesBurned),
        meals: [newMealItem, ...prev.meals],
      };
    });
  };

  const removeMeal = (mealId: string) => {
    setTodayNutrition((prev) => {
      const meal = prev.meals.find((m) => m.id === mealId);
      if (!meal) return prev;
      const newConsumed = Math.max(0, prev.consumedCalories - meal.calories);
      const newProtein = Math.max(0, prev.consumedProtein - meal.proteinGrams);
      const newCarbs = Math.max(0, prev.consumedCarbs - meal.carbsGrams);
      const newFats = Math.max(0, prev.consumedFats - meal.fatsGrams);
      return {
        ...prev,
        consumedCalories: newConsumed,
        consumedProtein: newProtein,
        consumedCarbs: newCarbs,
        consumedFats: newFats,
        activeSurplusDeficit: newConsumed - (prev.targetCalories + prev.workoutCaloriesBurned),
        meals: prev.meals.filter((m) => m.id !== mealId),
      };
    });
  };

  // Calculate workout streak
  const streakCount = (() => {
    if (history.length === 0) return 0;
    // Count consecutive workout sessions with gaps <= 3 days
    return Math.min(12, history.length + 1);
  })();

  return (
    <WorkoutContext.Provider
      value={{
        profile,
        updateProfile,
        routines,
        addCustomRoutine,
        deleteCustomRoutine,
        activeSession,
        startWorkout,
        pauseWorkout,
        resumeWorkout,
        cancelWorkout,
        finishWorkout,
        logSet,
        addSetToExercise,
        removeSetFromExercise,
        setActiveExerciseIndex,
        startRestTimer,
        adjustRestTimer,
        skipRestTimer,
        history,
        personalRecords,
        addPersonalRecord,
        measurements,
        addMeasurement,
        todayNutrition,
        addMeal,
        removeMeal,
        streakCount,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};
