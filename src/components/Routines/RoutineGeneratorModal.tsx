import React, { useState } from 'react';
import {
  DifficultyLevel,
  EquipmentType,
  FitnessGoal,
  WorkoutLocation,
  WorkoutRoutine,
} from '../../types/workout';
import { useWorkout } from '../../context/WorkoutContext';
import { generatePersonalizedRoutine } from '../../utils/routineGenerator';
import {
  X,
  Sparkles,
  Flame,
  Dumbbell,
  Target,
  Clock,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Zap,
} from 'lucide-react';

interface Props {
  onClose: () => void;
  onRoutineGenerated: (routine: WorkoutRoutine) => void;
}

export const RoutineGeneratorModal: React.FC<Props> = ({ onClose, onRoutineGenerated }) => {
  const { profile, addCustomRoutine, startWorkout } = useWorkout();

  const [step, setStep] = useState<number>(1);
  const [goal, setGoal] = useState<FitnessGoal>(profile.fitnessGoal || 'hypertrophy');
  const [location, setLocation] = useState<WorkoutLocation>(profile.preferredLocation || 'hybrid');
  const [equipment, setEquipment] = useState<EquipmentType[]>(profile.availableEquipment || ['bodyweight', 'dumbbell']);
  const [experience, setExperience] = useState<DifficultyLevel>(profile.experienceLevel || 'intermediate');
  const [daysPerWeek, setDaysPerWeek] = useState<number>(profile.targetWorkoutsPerWeek || 4);
  const [durationMin, setDurationMin] = useState<number>(profile.sessionDurationPreference || 45);
  const [previewRoutine, setPreviewRoutine] = useState<WorkoutRoutine | null>(null);

  const toggleEquipment = (eq: EquipmentType) => {
    if (equipment.includes(eq)) {
      setEquipment(equipment.filter((e) => e !== eq));
    } else {
      setEquipment([...equipment, eq]);
    }
  };

  const handleGenerate = () => {
    const routine = generatePersonalizedRoutine({
      goal,
      location,
      availableEquipment: equipment,
      experienceLevel: experience,
      daysPerWeek,
      durationMin,
      userWeightKg: profile.weightKg || 75,
    });
    setPreviewRoutine(routine);
    setStep(5); // Show result preview step
  };

  const handleSaveAndStart = (shouldStartImmediately: boolean) => {
    if (previewRoutine) {
      addCustomRoutine(previewRoutine);
      onRoutineGenerated(previewRoutine);
      if (shouldStartImmediately) {
        startWorkout(previewRoutine);
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Personalized Routine Generator</h2>
              <p className="text-xs text-zinc-400">Step {step} of {step === 5 ? '5 (Summary)' : '4'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-800 h-1">
          <div
            className="bg-amber-400 h-1 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          {/* STEP 1: Fitness Goal */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white">What is your primary fitness goal?</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  We program exercise volume, rep ranges, and rest intervals specifically for this outcome.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'hypertrophy',
                    title: 'Muscle Hypertrophy',
                    desc: 'Maximize lean muscle mass & definition (8-12 reps, optimal hypertrophy volume)',
                    icon: Dumbbell,
                  },
                  {
                    id: 'fat-loss',
                    title: 'Fat Loss & Conditioning',
                    desc: 'Maximize caloric expenditure, metabolic burn & endurance (12-15 reps, active pace)',
                    icon: Flame,
                  },
                  {
                    id: 'strength',
                    title: 'Max Strength & Power',
                    desc: 'Build raw CNS power and 1RM compound strength (3-6 reps, heavy rest)',
                    icon: Zap,
                  },
                  {
                    id: 'home-tone',
                    title: 'Home Calisthenics & Tone',
                    desc: 'Functional athletic movement and core stability with minimal footprint',
                    icon: Target,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = goal === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setGoal(item.id as FitnessGoal)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-400/10 border-amber-400 shadow-md ring-1 ring-amber-400/50'
                          : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-zinc-400'}`} />
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                      </div>
                      <h4 className="font-semibold text-white text-sm mt-2">{item.title}</h4>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Location & Equipment */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white">Where do you train & what equipment is ready?</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  We will exclude exercises you do not have equipment for.
                </p>
              </div>

              {/* Location */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'home', label: 'Home Only' },
                  { id: 'gym', label: 'Commercial Gym' },
                  { id: 'hybrid', label: 'Hybrid / Both' },
                ].map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setLocation(loc.id as WorkoutLocation)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      location === loc.id
                        ? 'bg-amber-400 text-black border-amber-400 shadow-sm'
                        : 'bg-zinc-950/60 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {loc.label}
                  </button>
                ))}
              </div>

              {/* Equipment Checkboxes */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-zinc-400">Available Equipment:</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'bodyweight', label: 'Bodyweight Only' },
                    { id: 'dumbbell', label: 'Dumbbells' },
                    { id: 'barbell', label: 'Barbell & Rack' },
                    { id: 'pullup-bar', label: 'Pull-up Bar' },
                    { id: 'resistance-band', label: 'Resistance Bands' },
                    { id: 'kettlebell', label: 'Kettlebells' },
                    { id: 'cable', label: 'Cable Station' },
                    { id: 'bench', label: 'Flat / Incline Bench' },
                  ].map((eq) => {
                    const active = equipment.includes(eq.id as EquipmentType);
                    return (
                      <button
                        key={eq.id}
                        type="button"
                        onClick={() => toggleEquipment(eq.id as EquipmentType)}
                        className={`flex items-center justify-between p-2.5 rounded-lg border text-xs text-left transition-all ${
                          active
                            ? 'bg-amber-400/10 border-amber-400 text-white'
                            : 'bg-zinc-950/40 border-zinc-800/80 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <span>{eq.label}</span>
                        {active && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Experience Level */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white">What is your current fitness experience?</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Adjusts compound movement complexity, volume tolerances, and target RPE.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'beginner',
                    title: 'Beginner (< 1 year consistent training)',
                    desc: 'Focus on neuromuscular foundation, core motor control, simple technique, and gradual progression.',
                  },
                  {
                    id: 'intermediate',
                    title: 'Intermediate (1 - 3 years training)',
                    desc: 'Comfortable with standard compound lifts, ready for progressive overload and intensity techniques.',
                  },
                  {
                    id: 'advanced',
                    title: 'Advanced (3+ years training)',
                    desc: 'High work capacity, heavier intensity targets (RPE 9-10), demanding volume splits.',
                  },
                ].map((exp) => {
                  const isSelected = experience === exp.id;
                  return (
                    <div
                      key={exp.id}
                      onClick={() => setExperience(exp.id as DifficultyLevel)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-400/10 border-amber-400 ring-1 ring-amber-400/50'
                          : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white text-sm">{exp.title}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{exp.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Schedule & Duration */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">How much time do you want to commit?</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  We program exercise count to match your available time window perfectly.
                </p>
              </div>

              {/* Days Per Week */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5 font-semibold text-zinc-200">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Days Per Week:</span>
                  </span>
                  <span className="font-bold text-amber-400 font-mono text-sm">{daysPerWeek} days / week</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[2, 3, 4, 5, 6].map((days) => (
                    <button
                      key={days}
                      onClick={() => setDaysPerWeek(days)}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                        daysPerWeek === days
                          ? 'bg-amber-400 text-black border-amber-400'
                          : 'bg-zinc-950/60 text-zinc-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      {days} Days
                    </button>
                  ))}
                </div>
              </div>

              {/* Session Duration */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5 font-semibold text-zinc-200">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Target Session Duration:</span>
                  </span>
                  <span className="font-bold text-amber-400 font-mono text-sm">{durationMin} minutes</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[20, 30, 45, 60].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => setDurationMin(mins)}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                        durationMin === mins
                          ? 'bg-amber-400 text-black border-amber-400'
                          : 'bg-zinc-950/60 text-zinc-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      {mins} Min
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: PREVIEW OF GENERATED ROUTINE */}
          {step === 5 && previewRoutine && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/40">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Custom Program Generated</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">{previewRoutine.title}</h3>
                <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{previewRoutine.description}</p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-amber-400/20 text-center">
                  <div>
                    <span className="text-[10px] text-zinc-400 block">Est. Burn / Session</span>
                    <span className="text-sm font-bold text-amber-400 font-mono">
                      ~{previewRoutine.estimatedCalories} kcal
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block">Target Duration</span>
                    <span className="text-sm font-bold text-white font-mono">
                      {previewRoutine.durationMin} min
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block">Movements</span>
                    <span className="text-sm font-bold text-white font-mono">
                      {previewRoutine.exercises.length} Exercises
                    </span>
                  </div>
                </div>
              </div>

              {/* Exercise list preview */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-zinc-400">Included Movement Protocol:</h4>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {previewRoutine.exercises.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-zinc-950/60 border border-zinc-800/80 rounded-lg text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center font-mono text-[10px] text-amber-400">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="font-semibold text-white capitalize">
                            {item.exerciseId.replace(/-/g, ' ')}
                          </span>
                          <span className="text-zinc-500 block text-[11px]">
                            Rest: {item.restSec}s · Target RPE {item.targetRpe}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded">
                        {item.sets} × {item.reps}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-900/90">
          {step > 1 && step < 5 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1 px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 && (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-zinc-100 hover:bg-white text-black text-xs font-bold rounded-lg transition-all"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {step === 4 && (
            <button
              onClick={handleGenerate}
              className="flex items-center gap-2 px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-lg shadow-lg shadow-amber-400/20 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate My Program</span>
            </button>
          )}

          {step === 5 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSaveAndStart(false)}
                className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                Save to My Routines
              </button>
              <button
                onClick={() => handleSaveAndStart(true)}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-lg shadow-lg shadow-amber-400/20 transition-all hover:scale-105"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Start Session Now</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
