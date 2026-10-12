import React, { useState } from 'react';
import { useWorkout } from '../../context/WorkoutContext';
import {
  DifficultyLevel,
  EquipmentType,
  FitnessGoal,
  WorkoutLocation,
} from '../../types/workout';
import { X, User, Scale, Dumbbell, Target, Check } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const ProfileModal: React.FC<Props> = ({ onClose }) => {
  const { profile, updateProfile } = useWorkout();

  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [weightKg, setWeightKg] = useState(profile.weightKg);
  const [heightCm, setHeightCm] = useState(profile.heightCm);
  const [gender, setGender] = useState(profile.gender);
  const [goal, setGoal] = useState<FitnessGoal>(profile.fitnessGoal);
  const [location, setLocation] = useState<WorkoutLocation>(profile.preferredLocation);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>(profile.unitSystem);
  const [equipment, setEquipment] = useState<EquipmentType[]>(profile.availableEquipment);

  const toggleEquipment = (eq: EquipmentType) => {
    if (equipment.includes(eq)) {
      setEquipment(equipment.filter((e) => e !== eq));
    } else {
      setEquipment([...equipment, eq]);
    }
  };

  const handleSave = () => {
    updateProfile({
      name,
      age,
      weightKg,
      heightCm,
      gender,
      fitnessGoal: goal,
      preferredLocation: location,
      unitSystem,
      availableEquipment: equipment,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5 shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Athlete Profile & Preferences</h3>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Name & Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">Sex</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Biometrics */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 25)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})</label>
              <input
                type="number"
                step="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value) || 75)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">Height ({unitSystem === 'metric' ? 'cm' : 'in'})</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(parseInt(e.target.value) || 175)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Unit System */}
          <div>
            <label className="text-xs text-zinc-400 block mb-1">Units</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setUnitSystem('metric')}
                className={`py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                  unitSystem === 'metric'
                    ? 'bg-amber-400 text-black border-amber-400'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                Metric (kg / cm)
              </button>
              <button
                type="button"
                onClick={() => setUnitSystem('imperial')}
                className={`py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                  unitSystem === 'imperial'
                    ? 'bg-amber-400 text-black border-amber-400'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                Imperial (lbs / in)
              </button>
            </div>
          </div>

          {/* Fitness Goal */}
          <div>
            <label className="text-xs text-zinc-400 block mb-1">Primary Fitness Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as FitnessGoal)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-xs focus:outline-none focus:border-amber-400 capitalize"
            >
              <option value="hypertrophy">Muscle Hypertrophy (Muscle Gain)</option>
              <option value="fat-loss">Fat Loss & Conditioning (Deficit)</option>
              <option value="strength">Raw Strength & Power (Heavy Compound)</option>
              <option value="home-tone">Home Calisthenics & Tone</option>
              <option value="mobility">Functional Mobility & Joint Health</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="text-xs text-zinc-400 block mb-1">Training Location Preference</label>
            <div className="grid grid-cols-3 gap-2">
              {(['home', 'gym', 'hybrid'] as WorkoutLocation[]).map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setLocation(loc)}
                  className={`py-1.5 text-xs font-semibold capitalize rounded-lg border transition-colors ${
                    location === loc
                      ? 'bg-amber-400 text-black border-amber-400'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Equipment Gear Checklist */}
          <div>
            <label className="text-xs text-zinc-400 block mb-1">Available Gear</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {[
                { id: 'bodyweight', label: 'Bodyweight' },
                { id: 'dumbbell', label: 'Dumbbells' },
                { id: 'barbell', label: 'Barbell' },
                { id: 'pullup-bar', label: 'Pull-up Bar' },
                { id: 'resistance-band', label: 'Bands' },
                { id: 'kettlebell', label: 'Kettlebells' },
                { id: 'cable', label: 'Cables' },
                { id: 'bench', label: 'Bench' },
              ].map((eq) => {
                const active = equipment.includes(eq.id as EquipmentType);
                return (
                  <button
                    key={eq.id}
                    type="button"
                    onClick={() => toggleEquipment(eq.id as EquipmentType)}
                    className={`py-1 px-2 rounded border text-[11px] text-left transition-colors ${
                      active
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                    }`}
                  >
                    {eq.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-lg transition-all"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Save Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};
