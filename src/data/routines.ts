import { WorkoutRoutine } from '../types/workout';

export const DEFAULT_ROUTINES: WorkoutRoutine[] = [
  {
    id: 'home-shred-calisthenics',
    title: 'Home Shred: Zero-Equipment Calisthenics',
    description: 'High-density bodyweight program engineered for maximum fat burn, core tightness, and lean muscle definition with zero gym equipment.',
    goal: 'fat-loss',
    difficulty: 'beginner',
    location: 'home',
    daysPerWeek: 4,
    durationMin: 35,
    estimatedCalories: 280,
    equipmentNeeded: ['bodyweight'],
    tags: ['No Equipment', 'Home Friendly', 'High Calorie Burn', 'Full Body'],
    exercises: [
      { exerciseId: 'push-up', sets: 4, reps: '12-15', restSec: 60, targetRpe: 8, notes: 'Full range of motion, chest to deck' },
      { exerciseId: 'bodyweight-squat', sets: 4, reps: '20', restSec: 45, targetRpe: 7, notes: 'Deep parallel depth' },
      { exerciseId: 'pike-push-up', sets: 3, reps: '8-10', restSec: 60, targetRpe: 8, notes: 'Keep hips high in inverted V' },
      { exerciseId: 'mountain-climbers', sets: 3, reps: '45s', restSec: 45, targetRpe: 9, notes: 'Continuous rapid tempo' },
      { exerciseId: 'plank', sets: 3, reps: '60s', restSec: 45, targetRpe: 8, notes: 'Brace core and squeeze glutes tight' },
      { exerciseId: 'burpees', sets: 3, reps: '10-12', restSec: 60, targetRpe: 9, notes: 'Metabolic burnout finisher' }
    ]
  },
  {
    id: 'dumbbell-home-hypertrophy',
    title: 'Dumbbell Only Home Muscle Builder',
    description: 'Transform your physique from home with just a pair of dumbbells. Complete upper and lower body progressive overload system.',
    goal: 'hypertrophy',
    difficulty: 'intermediate',
    location: 'home',
    daysPerWeek: 4,
    durationMin: 45,
    estimatedCalories: 330,
    equipmentNeeded: ['dumbbell'],
    tags: ['Dumbbells Only', 'Hypertrophy', 'Home Friendly', 'Muscle Growth'],
    exercises: [
      { exerciseId: 'incline-dumbbell-press', sets: 4, reps: '8-12', restSec: 75, targetRpe: 8, notes: 'Slow 3-second descent' },
      { exerciseId: 'dumbbell-single-arm-row', sets: 4, reps: '10-12', restSec: 60, targetRpe: 8, notes: 'Pull elbow to hip pocket' },
      { exerciseId: 'bulgarian-split-squat', sets: 3, reps: '10-12 each', restSec: 75, targetRpe: 9, notes: '80% weight on front heel' },
      { exerciseId: 'romanian-deadlift', sets: 4, reps: '10-12', restSec: 75, targetRpe: 8, notes: 'Feel deep hamstring stretch' },
      { exerciseId: 'dumbbell-lateral-raise', sets: 4, reps: '12-15', restSec: 45, targetRpe: 9, notes: 'Lead with elbows' },
      { exerciseId: 'dumbbell-hammer-curl', sets: 3, reps: '10-12', restSec: 60, targetRpe: 8, notes: 'Strict control, no swinging' }
    ]
  },
  {
    id: 'gym-push-pull-legs-mastery',
    title: 'PPL Hypertrophy Mastery (Gym Push Focus)',
    description: 'The premier bodybuilding split for packing on serious muscle mass with barbell compound presses and targeted isolation.',
    goal: 'hypertrophy',
    difficulty: 'intermediate',
    location: 'gym',
    daysPerWeek: 5,
    durationMin: 55,
    estimatedCalories: 390,
    equipmentNeeded: ['barbell', 'dumbbell', 'cable'],
    tags: ['Gym', 'Barbell Compound', 'Mass Building', 'PPL Split'],
    exercises: [
      { exerciseId: 'barbell-bench-press', sets: 4, reps: '6-8', restSec: 120, targetRpe: 8, notes: 'Compound heavy foundation' },
      { exerciseId: 'incline-dumbbell-press', sets: 3, reps: '8-10', restSec: 90, targetRpe: 8, notes: 'Upper chest focus' },
      { exerciseId: 'overhead-barbell-press', sets: 3, reps: '8-10', restSec: 90, targetRpe: 8, notes: 'Strict overhead drive' },
      { exerciseId: 'dumbbell-lateral-raise', sets: 4, reps: '12-15', restSec: 60, targetRpe: 9, notes: 'Shoulder width builder' },
      { exerciseId: 'tricep-rope-pushdown', sets: 4, reps: '10-12', restSec: 60, targetRpe: 8, notes: 'Spread ropes at bottom' }
    ]
  },
  {
    id: 'gym-strength-power-5x5',
    title: 'Raw Strength & Power 5x5',
    description: 'Built on the proven principles of linear periodization and neurological strength gains via heavy compound movements.',
    goal: 'strength',
    difficulty: 'advanced',
    location: 'gym',
    daysPerWeek: 3,
    durationMin: 60,
    estimatedCalories: 410,
    equipmentNeeded: ['barbell'],
    tags: ['Max Strength', '5x5 Protocol', 'Barbell', 'CNS Power'],
    exercises: [
      { exerciseId: 'barbell-back-squat', sets: 5, reps: '5', restSec: 180, targetRpe: 9, notes: 'Full depth, pause for 1s' },
      { exerciseId: 'barbell-bench-press', sets: 5, reps: '5', restSec: 180, targetRpe: 9, notes: 'Explosive concentric drive' },
      { exerciseId: 'barbell-deadlift', sets: 3, reps: '5', restSec: 210, targetRpe: 9, notes: 'Heavy posterior chain pull' },
      { exerciseId: 'pull-up', sets: 4, reps: '6-8', restSec: 90, targetRpe: 8, notes: 'Full range dead-hang' }
    ]
  },
  {
    id: 'hiit-metabolic-furnace',
    title: 'Metabolic Furnace HIIT & Core',
    description: 'Interval-based high caloric burn protocol to elevate EPOC (afterburn effect), torch body fat, and carve functional core endurance.',
    goal: 'fat-loss',
    difficulty: 'intermediate',
    location: 'hybrid',
    daysPerWeek: 4,
    durationMin: 30,
    estimatedCalories: 340,
    equipmentNeeded: ['bodyweight', 'kettlebell'],
    tags: ['HIIT Intervals', 'Metabolic Burn', 'EPOC Afterburn', 'Core'],
    exercises: [
      { exerciseId: 'burpees', sets: 4, reps: '12', restSec: 45, targetRpe: 9, notes: 'Maximum explosive effort' },
      { exerciseId: 'kettlebell-swing', sets: 4, reps: '15-20', restSec: 45, targetRpe: 8, notes: 'Violent hip snap' },
      { exerciseId: 'mountain-climbers', sets: 4, reps: '45s', restSec: 30, targetRpe: 9, notes: 'Sprint cadence' },
      { exerciseId: 'jumping-jacks', sets: 3, reps: '60s', restSec: 30, targetRpe: 7, notes: 'Active aerobic recovery' },
      { exerciseId: 'bicycle-crunch', sets: 4, reps: '20', restSec: 45, targetRpe: 8, notes: 'Slow deliberate twist' },
      { exerciseId: 'plank', sets: 3, reps: '45s', restSec: 45, targetRpe: 8, notes: 'Finish strong with hollow body' }
    ]
  },
  {
    id: 'home-functional-mobility-tone',
    title: 'Functional Full-Body Mobility & Tone',
    description: 'Low-impact, joint-friendly routine targeting flexibility, postural alignment, core strength, and muscular endurance.',
    goal: 'mobility',
    difficulty: 'beginner',
    location: 'home',
    daysPerWeek: 3,
    durationMin: 30,
    estimatedCalories: 210,
    equipmentNeeded: ['bodyweight'],
    tags: ['Joint Health', 'Mobility', 'Beginner Friendly', 'Postural Care'],
    exercises: [
      { exerciseId: 'glute-bridge', sets: 4, reps: '15', restSec: 45, targetRpe: 6, notes: '2 second squeeze at top' },
      { exerciseId: 'bodyweight-squat', sets: 3, reps: '15', restSec: 45, targetRpe: 6, notes: 'Slow 3-second descent' },
      { exerciseId: 'push-up', sets: 3, reps: '8-10', restSec: 60, targetRpe: 7, notes: 'Elevate on knees if needed' },
      { exerciseId: 'plank', sets: 3, reps: '45s', restSec: 45, targetRpe: 6, notes: 'Focus on diaphragmatic breathing' },
      { exerciseId: 'face-pull', sets: 3, reps: '12', restSec: 45, targetRpe: 6, notes: 'Band anchored at eye level for posture' }
    ]
  }
];
