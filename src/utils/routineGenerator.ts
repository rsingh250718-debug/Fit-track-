import { EXERCISES } from '../data/exercises';
import {
  DifficultyLevel,
  EquipmentType,
  FitnessGoal,
  RoutineExercise,
  WorkoutLocation,
  WorkoutRoutine,
} from '../types/workout';
import { calculateExerciseCaloriesBurned } from './nutrition';

export interface RoutineGeneratorParams {
  goal: FitnessGoal;
  location: WorkoutLocation;
  availableEquipment: EquipmentType[];
  experienceLevel: DifficultyLevel;
  daysPerWeek: number;
  durationMin: number;
  userWeightKg: number;
  focusMuscles?: string[];
}

export function generatePersonalizedRoutine(params: RoutineGeneratorParams): WorkoutRoutine {
  const {
    goal,
    location,
    availableEquipment,
    experienceLevel,
    daysPerWeek,
    durationMin,
    userWeightKg,
  } = params;

  // Filter available exercises according to location & equipment
  const eligibleExercises = EXERCISES.filter((ex) => {
    // Check location
    if (location === 'home' && !ex.homeFriendly) return false;

    // Check equipment
    if (ex.equipment === 'bodyweight') return true;
    if (availableEquipment.length > 0 && !availableEquipment.includes(ex.equipment)) {
      return false;
    }
    return true;
  });

  // Calculate target exercise count based on duration
  // Approx 6-8 mins per exercise including rest and sets
  const exerciseCount = Math.max(4, Math.min(8, Math.round(durationMin / 7)));

  // Target rep ranges & rest intervals based on goal
  let repScheme = '8-12';
  let defaultRestSec = 60;
  let targetSets = 3;
  let targetRpe = 8;

  switch (goal) {
    case 'strength':
      repScheme = experienceLevel === 'advanced' ? '3-5' : '5-6';
      defaultRestSec = 120;
      targetSets = 4;
      targetRpe = 9;
      break;
    case 'fat-loss':
      repScheme = '12-15';
      defaultRestSec = 45;
      targetSets = 3;
      targetRpe = 8;
      break;
    case 'hypertrophy':
      repScheme = '8-12';
      defaultRestSec = 75;
      targetSets = 3;
      targetRpe = 8;
      break;
    case 'mobility':
    case 'home-tone':
    default:
      repScheme = '12-15';
      defaultRestSec = 45;
      targetSets = 3;
      targetRpe = 7;
      break;
  }

  // Select balanced distribution of exercises
  const selectedExercises: RoutineExercise[] = [];
  const chosenIds = new Set<string>();

  // Prioritize primary muscle buckets: Chest/Press, Back/Pull, Legs, Shoulders/Arms, Core/Cardio
  const buckets: { label: string; filter: (ex: typeof EXERCISES[0]) => boolean }[] = [
    { label: 'Legs', filter: (e) => ['quads', 'hamstrings', 'glutes'].includes(e.primaryMuscle) },
    { label: 'Push', filter: (e) => e.primaryMuscle === 'chest' || (e.primaryMuscle === 'shoulders' && e.equipment !== 'bodyweight') },
    { label: 'Pull', filter: (e) => e.primaryMuscle === 'back' },
    { label: 'Shoulders/Arms', filter: (e) => ['shoulders', 'biceps', 'triceps'].includes(e.primaryMuscle) },
    { label: 'Core', filter: (e) => e.primaryMuscle === 'core' },
    { label: 'Metabolic', filter: (e) => e.primaryMuscle === 'full-body' || e.metScore >= 7.5 },
  ];

  if (goal === 'fat-loss') {
    // Put metabolic and full body early
    buckets.unshift(buckets.pop()!);
  }

  for (const bucket of buckets) {
    if (selectedExercises.length >= exerciseCount) break;

    const candidates = eligibleExercises.filter((e) => bucket.filter(e) && !chosenIds.has(e.id));
    if (candidates.length > 0) {
      // Pick best candidate matching difficulty
      const matched = candidates.find((e) => e.difficulty === experienceLevel) || candidates[0];
      chosenIds.add(matched.id);
      selectedExercises.push({
        exerciseId: matched.id,
        sets: targetSets,
        reps: matched.tempo === 'Isometric' ? '45s' : repScheme,
        restSec: defaultRestSec,
        targetRpe,
        notes: `Focus on progressive tension & form cues.`
      });
    }
  }

  // Fill remaining slots if any
  for (const ex of eligibleExercises) {
    if (selectedExercises.length >= exerciseCount) break;
    if (!chosenIds.has(ex.id)) {
      chosenIds.add(ex.id);
      selectedExercises.push({
        exerciseId: ex.id,
        sets: targetSets,
        reps: ex.tempo === 'Isometric' ? '45s' : repScheme,
        restSec: defaultRestSec,
        targetRpe,
      });
    }
  }

  // Fallback if very few matches
  if (selectedExercises.length === 0) {
    selectedExercises.push(
      { exerciseId: 'push-up', sets: 3, reps: '12', restSec: 60, targetRpe: 7 },
      { exerciseId: 'bodyweight-squat', sets: 3, reps: '15', restSec: 60, targetRpe: 7 },
      { exerciseId: 'plank', sets: 3, reps: '45s', restSec: 45, targetRpe: 7 }
    );
  }

  // Calculate estimated total session calories using average MET
  let totalMet = 0;
  selectedExercises.forEach((item) => {
    const ex = EXERCISES.find((e) => e.id === item.exerciseId);
    totalMet += ex?.metScore || 5.5;
  });
  const avgMet = totalMet / selectedExercises.length;
  const estimatedCalories = calculateExerciseCaloriesBurned(avgMet, userWeightKg || 75, durationMin);

  const goalTitles: Record<FitnessGoal, string> = {
    hypertrophy: 'Hypertrophy Power & Mass',
    'fat-loss': 'Metabolic Shred & Calorie Burn',
    strength: 'Max Compound Strength 5x5',
    'home-tone': 'Dynamic Home Definition & Tone',
    mobility: 'Functional Mobility & Core',
    endurance: 'Athletic Conditioning & Stamina',
  };

  const id = `custom-routine-${Date.now()}`;

  return {
    id,
    title: `${location === 'home' ? 'Home' : 'Gym'} ${goalTitles[goal] || 'Custom Training'}`,
    description: `Personalized ${daysPerWeek}-day regimen tailored for ${goal} at ${location}. Programmed for ${durationMin} minutes with ${exerciseCount} targeted movements.`,
    goal,
    difficulty: experienceLevel,
    location,
    daysPerWeek,
    durationMin,
    estimatedCalories,
    equipmentNeeded: availableEquipment.length > 0 ? availableEquipment : ['bodyweight'],
    exercises: selectedExercises,
    isCustom: true,
    tags: [
      location === 'home' ? 'Home Program' : 'Gym Program',
      `${durationMin} Min Session`,
      `${experienceLevel.toUpperCase()}`,
      `~${estimatedCalories} kcal`,
    ],
  };
}
