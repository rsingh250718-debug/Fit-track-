import React, { useState } from 'react';
import { useWorkout } from '../../context/WorkoutContext';
import { X, Scale, Ruler, Check } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const BodyMeasurementModal: React.FC<Props> = ({ onClose }) => {
  const { profile, addMeasurement } = useWorkout();

  const [weight, setWeight] = useState<number>(profile.weightKg || 75);
  const [bodyFat, setBodyFat] = useState<string>('17.5');
  const [waist, setWaist] = useState<string>('82');
  const [chest, setChest] = useState<string>('102');
  const [arms, setArms] = useState<string>('36.5');
  const [notes, setNotes] = useState<string>('');

  const handleSave = () => {
    addMeasurement({
      date: new Date().toISOString(),
      weightKg: weight,
      bodyFatPercent: bodyFat ? parseFloat(bodyFat) : undefined,
      waistCm: waist ? parseFloat(waist) : undefined,
      chestCm: chest ? parseFloat(chest) : undefined,
      armsCm: arms ? parseFloat(arms) : undefined,
      notes: notes.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Log Body Measurements</h3>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">
                Body Weight ({profile.unitSystem === 'metric' ? 'kg' : 'lbs'}) *
              </label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">Body Fat % (Optional)</label>
              <input
                type="number"
                step="0.1"
                value={bodyFat}
                onChange={(e) => setBodyFat(e.target.value)}
                placeholder="e.g. 15.5"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800/80">
            <span className="text-[11px] font-mono uppercase text-zinc-400 block mb-2">
              Circumference Metrics (cm):
            </span>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-zinc-500 block mb-1">Waist</label>
                <input
                  type="number"
                  step="0.5"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  placeholder="cm"
                  className="w-full px-2 py-1.5 bg-zinc-950 border border-zinc-800 rounded text-center text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-500 block mb-1">Chest</label>
                <input
                  type="number"
                  step="0.5"
                  value={chest}
                  onChange={(e) => setChest(e.target.value)}
                  placeholder="cm"
                  className="w-full px-2 py-1.5 bg-zinc-950 border border-zinc-800 rounded text-center text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-500 block mb-1">Arms</label>
                <input
                  type="number"
                  step="0.5"
                  value={arms}
                  onChange={(e) => setArms(e.target.value)}
                  placeholder="cm"
                  className="w-full px-2 py-1.5 bg-zinc-950 border border-zinc-800 rounded text-center text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-1">Notes / Conditions</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Weighed morning fasted"
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-xs focus:outline-none focus:border-amber-400"
            />
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
            <span>Save Measurement</span>
          </button>
        </div>
      </div>
    </div>
  );
};
