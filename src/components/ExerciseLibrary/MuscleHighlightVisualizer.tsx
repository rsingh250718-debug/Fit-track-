import React from 'react';
import { MuscleGroup } from '../../types/workout';

interface Props {
  primaryMuscle: MuscleGroup;
  secondaryMuscles?: MuscleGroup[];
  className?: string;
}

export const MuscleHighlightVisualizer: React.FC<Props> = ({
  primaryMuscle,
  secondaryMuscles = [],
  className = '',
}) => {
  const isPrimary = (m: MuscleGroup) => primaryMuscle === m;
  const isSecondary = (m: MuscleGroup) => secondaryMuscles.includes(m);

  const getColor = (m: MuscleGroup) => {
    if (isPrimary(m)) return 'fill-amber-400 stroke-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]';
    if (isSecondary(m)) return 'fill-amber-700/60 stroke-amber-500/40';
    return 'fill-zinc-800/80 stroke-zinc-700/50';
  };

  return (
    <div className={`relative flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs ${className}`}>
      <div className="flex items-center justify-between w-full mb-2 px-1 text-[11px] text-zinc-400">
        <span className="font-mono uppercase tracking-wider text-zinc-300">Anatomy Focus</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span> Primary
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-700"></span> Secondary
          </span>
        </div>
      </div>

      {/* Stylized Human Anatomy SVG Silhouette */}
      <svg
        viewBox="0 0 200 240"
        className="w-36 h-44 transition-all duration-300 filter drop-shadow"
      >
        {/* Head */}
        <circle cx="100" cy="22" r="14" className="fill-zinc-800 stroke-zinc-700" strokeWidth="1.5" />
        {/* Neck */}
        <rect x="94" y="36" width="12" height="10" className="fill-zinc-800 stroke-zinc-700" strokeWidth="1" />

        {/* Shoulders / Deltoids */}
        <path
          d="M62 48 Q55 60 58 75 Q68 68 76 56 Z"
          className={`${getColor('shoulders')} transition-colors duration-300`}
          strokeWidth="1.5"
        />
        <path
          d="M138 48 Q145 60 142 75 Q132 68 124 56 Z"
          className={`${getColor('shoulders')} transition-colors duration-300`}
          strokeWidth="1.5"
        />

        {/* Chest / Pectorals */}
        <path
          d="M74 54 Q100 56 100 78 Q82 82 72 68 Z"
          className={`${getColor('chest')} transition-colors duration-300`}
          strokeWidth="1.5"
        />
        <path
          d="M126 54 Q100 56 100 78 Q118 82 128 68 Z"
          className={`${getColor('chest')} transition-colors duration-300`}
          strokeWidth="1.5"
        />

        {/* Biceps & Triceps / Upper Arms */}
        <path
          d="M56 76 Q52 95 56 112 Q65 108 67 85 Z"
          className={`${getColor('biceps')} ${getColor('triceps')} transition-colors duration-300`}
          strokeWidth="1.5"
        />
        <path
          d="M144 76 Q148 95 144 112 Q135 108 133 85 Z"
          className={`${getColor('biceps')} ${getColor('triceps')} transition-colors duration-300`}
          strokeWidth="1.5"
        />

        {/* Forearms */}
        <path
          d="M54 114 Q48 135 52 148 Q60 144 62 120 Z"
          className="fill-zinc-800 stroke-zinc-700"
          strokeWidth="1.5"
        />
        <path
          d="M146 114 Q152 135 148 148 Q140 144 138 120 Z"
          className="fill-zinc-800 stroke-zinc-700"
          strokeWidth="1.5"
        />

        {/* Core & Abdominals */}
        <path
          d="M80 84 Q100 84 100 120 Q82 122 78 100 Z"
          className={`${getColor('core')} transition-colors duration-300`}
          strokeWidth="1.5"
        />
        <path
          d="M120 84 Q100 84 100 120 Q118 122 122 100 Z"
          className={`${getColor('core')} transition-colors duration-300`}
          strokeWidth="1.5"
        />

        {/* Hips / Glutes */}
        <path
          d="M78 122 Q100 125 122 122 Q128 142 100 144 Q72 142 78 122 Z"
          className={`${getColor('glutes')} transition-colors duration-300`}
          strokeWidth="1.5"
        />

        {/* Upper Legs / Quads / Hamstrings */}
        <path
          d="M74 142 Q68 180 76 195 Q90 195 94 146 Z"
          className={`${getColor('quads')} ${getColor('hamstrings')} transition-colors duration-300`}
          strokeWidth="1.5"
        />
        <path
          d="M126 142 Q132 180 124 195 Q110 195 106 146 Z"
          className={`${getColor('quads')} ${getColor('hamstrings')} transition-colors duration-300`}
          strokeWidth="1.5"
        />

        {/* Calves / Lower Legs */}
        <path
          d="M76 198 Q72 222 76 235 Q86 235 88 200 Z"
          className={`${getColor('calves')} transition-colors duration-300`}
          strokeWidth="1.5"
        />
        <path
          d="M124 198 Q128 222 124 235 Q114 235 112 200 Z"
          className={`${getColor('calves')} transition-colors duration-300`}
          strokeWidth="1.5"
        />
      </svg>

      <div className="mt-2 text-center">
        <span className="font-semibold text-zinc-200 capitalize">
          {primaryMuscle.replace('-', ' ')}
        </span>
        {secondaryMuscles.length > 0 && (
          <span className="text-zinc-500 text-[11px] block mt-0.5">
            + {secondaryMuscles.map((m) => m.replace('-', ' ')).join(', ')}
          </span>
        )}
      </div>
    </div>
  );
};
