import { Exercise } from '../types/workout';

export const EXERCISES: Exercise[] = [
  // CHEST
  {
    id: 'push-up',
    name: 'Standard Push-Up',
    primaryMuscle: 'chest',
    secondaryMuscles: ['triceps', 'shoulders', 'core'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    metScore: 5.5,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/IODxDxX7oi4?autoplay=1&mute=1&loop=1&playlist=IODxDxX7oi4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80',
    description: 'The foundational upper-body bodyweight movement targeting pectorals, anterior deltoids, and core stability.',
    instructions: [
      'Start in a high plank position with hands slightly wider than shoulder-width, fingers spread.',
      'Engage your glutes and core to form a rigid, straight line from heels to crown.',
      'Lower your chest toward the floor by bending elbows back at a 45-degree angle.',
      'Descend until your chest is approximately one inch above the ground.',
      'Press forcefully through palms, maintaining neutral neck, back to full lockout.'
    ],
    formCues: [
      'Keep elbows tucked at 45 degrees, never flared 90 degrees.',
      'Screw your palms into the floor to activate external shoulder rotators.',
      'Brace abdominal wall like preparing for a punch.'
    ],
    commonMistakes: [
      'Sagging hips or hyperextending the lower back.',
      'Flaring elbows out laterally causing anterior shoulder impingement.',
      'Craning neck down to touch chin before chest reaches floor.'
    ],
    breathingTip: 'Inhale smoothly during the descent; exhale forcefully as you press upward.',
    tempo: '3-0-1-0'
  },
  {
    id: 'diamond-push-up',
    name: 'Diamond Push-Up',
    primaryMuscle: 'triceps',
    secondaryMuscles: ['chest', 'shoulders'],
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    metScore: 6.0,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/J0DnG1_S92I?autoplay=1&mute=1&loop=1&playlist=J0DnG1_S92I',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
    description: 'Close-grip pushup variation prioritizing triceps long head and inner pectoral fibers.',
    instructions: [
      'Assume a plank position and place index fingers and thumbs together under sternum, forming a diamond.',
      'Brace core and lower chest towards your hands, keeping elbows tracking tightly along your ribs.',
      'Pause for a fraction of a second at chest level, then push through hands until triceps lock out.'
    ],
    formCues: [
      'Keep forearms in close contact with ribs throughout range of motion.',
      'Maintain rigid hip alignment without piking upwards.'
    ],
    commonMistakes: [
      'Allowing elbows to flare outward wide.',
      'Resting chest on hands at the bottom.'
    ],
    breathingTip: 'Inhale on descent; exhale powerfully as triceps contract.',
    tempo: '2-1-1-0'
  },
  {
    id: 'barbell-bench-press',
    name: 'Barbell Flat Bench Press',
    primaryMuscle: 'chest',
    secondaryMuscles: ['triceps', 'shoulders'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    metScore: 6.0,
    homeFriendly: false,
    videoUrl: 'https://www.youtube-nocookie.com/embed/rT7DgCr-3pg?autoplay=1&mute=1&loop=1&playlist=rT7DgCr-3pg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    description: 'The classic compound pressing movement for developing maximal upper-body pressing strength and chest mass.',
    instructions: [
      'Lie supine on bench with eyes positioned directly below the racked barbell.',
      'Grip the bar just wider than shoulder-width with a full overhand grip.',
      'Retract scapulae firmly into the bench and plant feet flat on the floor.',
      'Unrack the bar and stabilize over chest with locked elbows.',
      'Lower the bar under control to the lower sternum / nipple line.',
      'Drive the bar up and slightly back toward eye level while pressing feet into the floor.'
    ],
    formCues: [
      'Pin shoulder blades together and down into your back pockets.',
      'Bend the bar in half with your hands to create torque in shoulders.',
      'Maintain steady leg drive without lifting hips off the bench.'
    ],
    commonMistakes: [
      'Bouncing the bar violently off the sternum.',
      'Allowing wrists to bend backwards under the load.',
      'Lifting glutes off the bench during heavy drive.'
    ],
    breathingTip: 'Take a deep breath and brace core before unracking, hold breath during descent, exhale past sticking point.',
    tempo: '3-1-1-0'
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    primaryMuscle: 'chest',
    secondaryMuscles: ['shoulders', 'triceps'],
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    metScore: 5.5,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/8iPEnn-ltC8?autoplay=1&mute=1&loop=1&playlist=8iPEnn-ltC8',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80',
    description: 'Emphasizes the clavicular head (upper chest) while allowing a natural wrist rotation and greater range of motion.',
    instructions: [
      'Set an incline bench between 30 and 45 degrees.',
      'Sit with dumbbells on thighs; kick them up to shoulder height as you lie back.',
      'Lower weights smoothly down beside upper chest, elbows angled at 45-60 degrees.',
      'Press dumbbells upward in a slight converging arc without banging them at top.'
    ],
    formCues: [
      'Keep chest elevated and shoulders pinned back.',
      'Keep wrists stacked directly over forearms.'
    ],
    commonMistakes: [
      'Setting bench too high (above 45 degrees turns it into a shoulder press).',
      'Clanking dumbbells together at the top, losing tension.'
    ],
    breathingTip: 'Inhale while expanding ribcage down; exhale while pushing up.',
    tempo: '3-0-1-0'
  },
  {
    id: 'chest-dips',
    name: 'Parallel Bar Chest Dips',
    primaryMuscle: 'chest',
    secondaryMuscles: ['triceps', 'shoulders'],
    equipment: 'pullup-bar',
    difficulty: 'advanced',
    metScore: 6.5,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/2z8JmcrW-As?autoplay=1&mute=1&loop=1&playlist=2z8JmcrW-As',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
    description: 'Bodyweight upper body squat for developing lower chest sweep, anterior delts, and triceps lockout power.',
    instructions: [
      'Mount the parallel bars with arms extended and torso tilted slightly forward (approx 20-30 degrees).',
      'Cross ankles and bend knees slightly if needed.',
      'Lower body by bending elbows until upper arms are parallel to the floor or slightly below 90 degrees.',
      'Drive upwards through palms to return to full arm extension.'
    ],
    formCues: [
      'Lean forward to shift maximum recruitment from triceps to chest.',
      'Do not allow shoulders to roll forward or shrug toward ears.'
    ],
    commonMistakes: [
      'Staying completely upright, which reduces chest activation.',
      'Dipping too deep with poor mobility, stressing the shoulder joint.'
    ],
    breathingTip: 'Inhale going down; exhale as you press out of the hole.',
    tempo: '3-0-1-0'
  },
  {
    id: 'dumbbell-flyes',
    name: 'Flat Dumbbell Chest Flyes',
    primaryMuscle: 'chest',
    secondaryMuscles: ['shoulders'],
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    metScore: 5.0,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/eozdVDA78K0?autoplay=1&mute=1&loop=1&playlist=eozdVDA78K0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80',
    description: 'Isolation chest exercise providing a deep stretch across pectoral muscle fibers under controlled load.',
    instructions: [
      'Lie flat on bench holding dumbbells directly above chest with palms facing each other.',
      'Maintain a slight 15-degree soft bend in elbows throughout the entire movement.',
      'Lower weights outwards in a wide arc until feeling a deep pectoral stretch.',
      'Bring dumbbells back together as if hugging a large barrel.'
    ],
    formCues: [
      'Maintain constant elbow bend; do not turn into a press.',
      'Focus on squeezing chest muscles together at peak contraction.'
    ],
    commonMistakes: [
      'Lowering dumbbells excessively low past horizontal line.',
      'Overloading weight and bending arms too much.'
    ],
    breathingTip: 'Inhale deep into chest during opening; exhale during the hug arc.',
    tempo: '3-1-1-0'
  },

  // BACK
  {
    id: 'pull-up',
    name: 'Wide-Grip Pull-Up',
    primaryMuscle: 'back',
    secondaryMuscles: ['biceps', 'shoulders', 'core'],
    equipment: 'pullup-bar',
    difficulty: 'intermediate',
    metScore: 7.0,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/eGo4IYlbE5g?autoplay=1&mute=1&loop=1&playlist=eGo4IYlbE5g',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=600&q=80',
    description: 'The gold standard bodyweight vertical pulling movement building back width (latissimus dorsi) and grip strength.',
    instructions: [
      'Grip the bar with overhand grip wider than shoulder width.',
      'Hang with full arm extension in active dead-hang position, core tight.',
      'Depress scapulae downward, then drive elbows down toward your hips.',
      'Pull until your chin clears the bar cleanly.',
      'Lower back down under strict control to full dead-hang extension.'
    ],
    formCues: [
      'Pull with your elbows, not your hands.',
      'Lead with your chest high toward the bar.',
      'Avoid swinging or kicking legs (kipping).'
    ],
    commonMistakes: [
      'Half-reps (not locking out at bottom or not clearing bar at top).',
      'Shrugging shoulders up around the ears.'
    ],
    breathingTip: 'Exhale as you pull your chest up to the bar; inhale slowly on the way down.',
    tempo: '2-1-1-0'
  },
  {
    id: 'barbell-deadlift',
    name: 'Barbell Conventional Deadlift',
    primaryMuscle: 'back',
    secondaryMuscles: ['hamstrings', 'glutes', 'core', 'quads'],
    equipment: 'barbell',
    difficulty: 'advanced',
    metScore: 7.5,
    homeFriendly: false,
    videoUrl: 'https://www.youtube-nocookie.com/embed/op9kVnSso6Q?autoplay=1&mute=1&loop=1&playlist=op9kVnSso6Q',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    description: 'The supreme full-body posterior chain compound lift for total body power, density, and back thickness.',
    instructions: [
      'Stand with feet hip-width apart, barbell cutting across mid-foot.',
      'Hinge at hips to grip the bar just outside your shins.',
      'Bring shins to touch the bar, drop hips slightly, and pull slack out of the barbell.',
      'Lock lats in place, keep chest proud, and brace your entire abdominal wall.',
      'Push the floor away through mid-foot and heels, extending hips and knees simultaneously.',
      'Lock out with hips tall and glutes squeezed; lower by hinging hips back.'
    ],
    formCues: [
      'Think of pressing the earth away rather than pulling the bar.',
      'Keep the bar in contact with your legs the entire ascent and descent.',
      'Pull all slack out of bar until you hear the click before liftoff.'
    ],
    commonMistakes: [
      'Rounding the lower lumbar spine under load.',
      'Hyperextending and leaning backwards at lockout.',
      'Letting the bar drift forward away from shins.'
    ],
    breathingTip: 'Valsalva maneuver: deep belly breath, expand ribs 360 degrees, hold breath through lift, exhale at top.',
    tempo: '2-0-1-1'
  },
  {
    id: 'dumbbell-single-arm-row',
    name: 'Single-Arm Dumbbell Row',
    primaryMuscle: 'back',
    secondaryMuscles: ['biceps', 'shoulders', 'core'],
    equipment: 'dumbbell',
    difficulty: 'beginner',
    metScore: 5.5,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/roCP6wCXPqo?autoplay=1&mute=1&loop=1&playlist=roCP6wCXPqo',
    thumbnailUrl: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=600&q=80',
    description: 'Unilateral horizontal pull building lat thickness, rhomboids, and correcting side-to-side asymmetries.',
    instructions: [
      'Place one knee and hand on flat bench or brace against a sturdy chair/table.',
      'Hold dumbbell with free arm hanging straight down with neutral spine.',
      'Initiate pull by retracting shoulder blade and driving elbow back toward the hip.',
      'Squeeze lat firmly at top, then lower dumbbell down to a full stretch.'
    ],
    formCues: [
      'Pull your elbow to your back pocket, not up to the ceiling.',
      'Keep torso parallel to the ground; prevent torso rotation.'
    ],
    commonMistakes: [
      'Jerking torso upward to heave heavy weight.',
      'Curling with bicep instead of driving with elbow.'
    ],
    breathingTip: 'Exhale as you row weight to hip; inhale smoothly on lowering.',
    tempo: '2-1-1-0'
  },
  {
    id: 'resistance-band-row',
    name: 'Seated / Standing Resistance Band Row',
    primaryMuscle: 'back',
    secondaryMuscles: ['biceps', 'shoulders'],
    equipment: 'resistance-band',
    difficulty: 'beginner',
    metScore: 4.5,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/U3MeqjA8a6E?autoplay=1&mute=1&loop=1&playlist=U3MeqjA8a6E',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    description: 'Home-friendly back builder using variable elastic resistance to maximize peak contraction of mid-back muscles.',
    instructions: [
      'Loop heavy resistance band around feet while seated or anchor to a secure post/door.',
      'Hold handles with arms extended and maintain an upright tall spine.',
      'Pull band toward ribs by squeezing shoulder blades together.',
      'Hold peak squeeze for 1 second, then slowly control band return.'
    ],
    formCues: [
      'Pinch a pencil between your shoulder blades at the peak.',
      'Resist the elastic recoil on the way back.'
    ],
    commonMistakes: [
      'Slumping shoulders forward.',
      'Letting band snap forward quickly without eccentric control.'
    ],
    breathingTip: 'Exhale on pull; inhale as band extends forward.',
    tempo: '2-1-1-0'
  },
  {
    id: 'lat-pulldown',
    name: 'Cable Lat Pulldown',
    primaryMuscle: 'back',
    secondaryMuscles: ['biceps', 'shoulders'],
    equipment: 'cable',
    difficulty: 'beginner',
    metScore: 5.0,
    homeFriendly: false,
    videoUrl: 'https://www.youtube-nocookie.com/embed/CAwf7n6Luuc?autoplay=1&mute=1&loop=1&playlist=CAwf7n6Luuc',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584824486539-53bb5644bcae?auto=format&fit=crop&w=600&q=80',
    description: 'Gym cable vertical pull isolating lats and upper back with adjustable load.',
    instructions: [
      'Sit comfortably at lat pulldown station with thighs secured under pads.',
      'Grip wide bar overhand; lean back very slightly (10-15 degrees).',
      'Pull bar down smoothly toward upper chest, driving elbows downward.',
      'Pause at collarbone, then slowly extend arms back to starting stretch.'
    ],
    formCues: [
      'Think elbows down and back.',
      'Do not swing torso aggressively backwards.'
    ],
    commonMistakes: [
      'Pulling bar behind the neck (dangerous for rotator cuffs).',
      'Using body momentum to swing weight down.'
    ],
    breathingTip: 'Exhale pulling down; inhale ascending.',
    tempo: '2-1-1-0'
  },

  // LEGS - QUADS, HAMSTRINGS, GLUTES
  {
    id: 'bodyweight-squat',
    name: 'Air Squat (Bodyweight Squat)',
    primaryMuscle: 'quads',
    secondaryMuscles: ['glutes', 'hamstrings', 'core'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    metScore: 5.5,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/aclHkVaku9U?autoplay=1&mute=1&loop=1&playlist=aclHkVaku9U',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80',
    description: 'The fundamental lower body movement pattern for quad strength, hip mobility, and knee stability.',
    instructions: [
      'Stand tall with feet shoulder-width apart, toes angled out 15-30 degrees.',
      'Initiate descent by hinging hips back and bending knees simultaneously.',
      'Keep chest upright and arms extended forward for balance.',
      'Descend until hip crease is below top of knees (parallel or deeper).',
      'Drive evenly through heels and mid-foot to stand back up to tall extension.'
    ],
    formCues: [
      'Keep knees tracking in line with toes, do not allow knees to cave inward.',
      'Maintain tripod foot pressure (big toe, pinky toe, heel).'
    ],
    commonMistakes: [
      'Knees collapsing inward (valgus collapse).',
      'Heels lifting off the ground during bottom position.'
    ],
    breathingTip: 'Inhale on the way down; exhale forcefully driving out of the bottom.',
    tempo: '3-0-1-0'
  },
  {
    id: 'barbell-back-squat',
    name: 'Barbell Back Squat',
    primaryMuscle: 'quads',
    secondaryMuscles: ['glutes', 'hamstrings', 'core'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    metScore: 7.0,
    homeFriendly: false,
    videoUrl: 'https://www.youtube-nocookie.com/embed/bEv6CCg2BC8?autoplay=1&mute=1&loop=1&playlist=bEv6CCg2BC8',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    description: 'The king of lower-body compound lifts for maximum quad hypertrophy, hip strength, and core rigidity.',
    instructions: [
      'Step under bar inside squat rack, resting bar firmly across upper traps (high bar) or rear delts (low bar).',
      'Unrack with both feet stable, take 2-3 calculated steps back.',
      'Take a deep diaphragmatic breath into abdomen and brace core hard.',
      'Squat down by pushing knees out and sitting between hips until hips pass parallel.',
      'Drive straight up through mid-foot, leading with chest.'
    ],
    formCues: [
      'Spread the floor with your feet to engage gluteus medius.',
      'Chest up, elbows pinned under the bar.'
    ],
    commonMistakes: [
      'Rounding the lower back (butt wink) under heavy load.',
      'Good-morning-ing the squat by shooting hips up before chest.'
    ],
    breathingTip: 'Big belly breath at top, hold through descent and turn-around, exhale at lockout.',
    tempo: '3-1-1-0'
  },
  {
    id: 'bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    primaryMuscle: 'quads',
    secondaryMuscles: ['glutes', 'hamstrings'],
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    metScore: 6.0,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/2C-uNgKwPLE?autoplay=1&mute=1&loop=1&playlist=2C-uNgKwPLE',
    thumbnailUrl: 'https://images.unsplash.com/photo-1434682881908-b0740ac3d44f?auto=format&fit=crop&w=600&q=80',
    description: 'Unilateral leg builder that builds massive quad & glute hypertrophy while fixing muscular imbalances.',
    instructions: [
      'Stand 2 feet in front of a flat bench or home chair.',
      'Place top of rear foot laces-down on the bench behind you.',
      'Lower hips straight down until back knee is hovering an inch above floor.',
      'Front thigh should be parallel to floor, torso leaning slightly forward (15 deg).',
      'Press through front heel to return to top.'
    ],
    formCues: [
      '80% of weight is on the front leg; rear leg is only for balance.',
      'Keep hips square and chest proud.'
    ],
    commonMistakes: [
      'Front foot placed too close, causing heel to peel off ground.',
      'Pushing off back leg instead of using front leg drive.'
    ],
    breathingTip: 'Inhale descending; exhale driving up through front heel.',
    tempo: '3-1-1-0'
  },
  {
    id: 'romanian-deadlift',
    name: 'Dumbbell Romanian Deadlift (RDL)',
    primaryMuscle: 'hamstrings',
    secondaryMuscles: ['glutes', 'back', 'core'],
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    metScore: 5.5,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/jEy_czb3RKA?autoplay=1&mute=1&loop=1&playlist=jEy_czb3RKA',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80',
    description: 'Hip-hinge movement that heavily stretches hamstrings and builds posterior chain strength.',
    instructions: [
      'Stand holding dumbbells against front of thighs with slight soft bend in knees.',
      'Push hips back toward wall behind you while keeping back flat and lats engaged.',
      'Slide dumbbells down along shins until feeling a loaded stretch in hamstrings.',
      'Squeeze glutes to pull hips forward back to tall standing position.'
    ],
    formCues: [
      'Hips go backward, not downward.',
      'Keep dumbbells glued to your legs throughout movement.'
    ],
    commonMistakes: [
      'Turning hinge into a squat by bending knees too much.',
      'Rounding the lower back to reach lower to the ground.'
    ],
    breathingTip: 'Inhale and brace core as hips hinge back; exhale as hips lock out.',
    tempo: '3-1-1-0'
  },
  {
    id: 'glute-bridge',
    name: 'Glute Bridge / Hip Thrust',
    primaryMuscle: 'glutes',
    secondaryMuscles: ['hamstrings', 'core'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    metScore: 4.8,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/OUgsJ8-Vi0E?autoplay=1&mute=1&loop=1&playlist=OUgsJ8-Vi0E',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    description: 'Direct glute isolation exercise to activate hip extensors and support pelvic posture.',
    instructions: [
      'Lie flat on back with knees bent and feet flat on floor hip-width apart.',
      'Press heels into ground, squeeze glutes, and lift hips toward ceiling.',
      'Form a straight line from knees through hips to shoulders at peak.',
      'Hold squeeze at top for 2 seconds, then lower under control.'
    ],
    formCues: [
      'Drive through heels and tuck pelvis slightly (posterior tilt).',
      'Do not hyperextend lower back at top.'
    ],
    commonMistakes: [
      'Arching lumbar spine instead of using glutes.',
      'Feet placed too far forward, turning it into a hamstring cramp.'
    ],
    breathingTip: 'Exhale while thrusting hips up; inhale descending.',
    tempo: '2-2-1-0'
  },
  {
    id: 'walking-lunges',
    name: 'Walking Dumbbell Lunges',
    primaryMuscle: 'quads',
    secondaryMuscles: ['glutes', 'hamstrings', 'calves'],
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    metScore: 6.5,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/L8fvypPrzzs?autoplay=1&mute=1&loop=1&playlist=L8fvypPrzzs',
    thumbnailUrl: 'https://images.unsplash.com/photo-1434682881908-b0740ac3d44f?auto=format&fit=crop&w=600&q=80',
    description: 'Dynamic lower body developer for athletic leg endurance, balance, and calorie burning.',
    instructions: [
      'Stand tall with dumbbells held at sides.',
      'Step forward smoothly with right leg, lowering back left knee toward ground.',
      'Both knees should form 90-degree angles at bottom.',
      'Push off front right foot and step left leg forward into the next lunge.'
    ],
    formCues: [
      'Keep torso upright, do not collapse chest onto front knee.',
      'Land softly on mid-foot.'
    ],
    commonMistakes: [
      'Steps too short causing front heel to elevate.',
      'Banging back kneecap against hard flooring.'
    ],
    breathingTip: 'Rhythmic breathing: inhale on step down, exhale stepping up.',
    tempo: '2-0-1-0'
  },

  // SHOULDERS
  {
    id: 'overhead-barbell-press',
    name: 'Overhead Barbell Military Press',
    primaryMuscle: 'shoulders',
    secondaryMuscles: ['triceps', 'core', 'chest'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    metScore: 6.0,
    homeFriendly: false,
    videoUrl: 'https://www.youtube-nocookie.com/embed/2yjwXTZQDDI?autoplay=1&mute=1&loop=1&playlist=2yjwXTZQDDI',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    description: 'Strict standing overhead press testing true vertical pressing power and core pillar stability.',
    instructions: [
      'Stand with feet shoulder-width apart, holding barbell on clavicle with hands just outside shoulders.',
      'Squeeze glutes, quads, and abdominal wall tightly.',
      'Pull chin back slightly so bar clears face, then press bar vertically overhead.',
      'Once bar passes forehead, push head forward back into neutral position.',
      'Lock out arms with bar directly over crown of head and midfoot.'
    ],
    formCues: [
      'Lock glutes to prevent leaning backward.',
      'Keep forearms vertical directly under the bar.'
    ],
    commonMistakes: [
      'Excessive backward lean turning it into an incline bench press.',
      'Flipping wrists backward.'
    ],
    breathingTip: 'Inhale and brace core at bottom; exhale past forehead lockout.',
    tempo: '2-1-1-0'
  },
  {
    id: 'pike-push-up',
    name: 'Pike Push-Up (Home Shoulder Press)',
    primaryMuscle: 'shoulders',
    secondaryMuscles: ['triceps', 'core'],
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    metScore: 5.5,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/qrfbWp2d8n4?autoplay=1&mute=1&loop=1&playlist=qrfbWp2d8n4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80',
    description: 'Bodyweight overhead press progression targeting anterior and lateral deltoids at home.',
    instructions: [
      'From a pushup position, walk your feet forward towards hands, sending hips high into an inverted V (downward dog).',
      'Look between feet or down at floor, keeping arms straight.',
      'Bend elbows down and back, lowering head diagonally forward between hands.',
      'Press palms down and push hips back to the inverted V start.'
    ],
    formCues: [
      'Head travels forward in a tripod shape with hands, not straight down.',
      'Keep hips elevated high over shoulders.'
    ],
    commonMistakes: [
      'Flaring elbows out to sides.',
      'Allowing hips to drop flat like a regular pushup.'
    ],
    breathingTip: 'Inhale lowering; exhale pushing floor away.',
    tempo: '3-0-1-0'
  },
  {
    id: 'dumbbell-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    primaryMuscle: 'shoulders',
    secondaryMuscles: ['triceps'],
    equipment: 'dumbbell',
    difficulty: 'beginner',
    metScore: 4.5,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/3VcKaXpzqRo?autoplay=1&mute=1&loop=1&playlist=3VcKaXpzqRo',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80',
    description: 'Essential isolation builder for lateral deltoid capping, creating shoulder width and V-taper aesthetic.',
    instructions: [
      'Stand tall holding light dumbbells at sides with a slight forward torso pitch (10 degrees).',
      'Keep slight bend in elbows.',
      'Raise arms out to sides until parallel to floor at shoulder height.',
      'Lead with elbows and pinkies slightly elevated, like pouring water from a pitcher.',
      'Lower under 2-second control.'
    ],
    formCues: [
      'Lead with elbows, keep traps relaxed.',
      'Do not swing or use hip momentum.'
    ],
    commonMistakes: [
      'Using too much weight and shrugging neck traps.',
      'Raising hands above shoulder level.'
    ],
    breathingTip: 'Exhale as dumbbells raise; inhale lowering.',
    tempo: '2-1-1-0'
  },
  {
    id: 'face-pull',
    name: 'Cable / Band Face Pull',
    primaryMuscle: 'shoulders',
    secondaryMuscles: ['back'],
    equipment: 'cable',
    difficulty: 'beginner',
    metScore: 4.2,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/rep-qVOkqgk?autoplay=1&mute=1&loop=1&playlist=rep-qVOkqgk',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    description: 'Crucial postural exercise strengthening rear delts, rhomboids, and external rotator cuffs for bulletproof shoulders.',
    instructions: [
      'Attach rope to cable pulley or anchor resistance band at eye height.',
      'Grip ends of rope with thumbs pointing backward.',
      'Step back, pull rope toward nose and ears while separating the handles.',
      'Rotate hands back into a double-bicep pose at the contraction point.',
      'Slowly return to start with controlled eccentric.'
    ],
    formCues: [
      'External rotation is key: hands should be higher than elbows at peak.',
      'Keep ribs down and core braced.'
    ],
    commonMistakes: [
      'Pulling down to chest like an upright row.',
      'Using too much weight and leaning backward.'
    ],
    breathingTip: 'Exhale as you pull toward eyes; inhale slowly on extension.',
    tempo: '2-1-1-0'
  },

  // ARMS - BICEPS & TRICEPS
  {
    id: 'barbell-bicep-curl',
    name: 'Standing Barbell Bicep Curl',
    primaryMuscle: 'biceps',
    secondaryMuscles: ['core'],
    equipment: 'barbell',
    difficulty: 'beginner',
    metScore: 4.5,
    homeFriendly: false,
    videoUrl: 'https://www.youtube-nocookie.com/embed/kwG2ipFRgfo?autoplay=1&mute=1&loop=1&playlist=kwG2ipFRgfo',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
    description: 'Classic bicep mass builder for peak and thickness.',
    instructions: [
      'Stand with feet shoulder-width apart, holding barbell underhand with arms fully extended.',
      'Pin elbows to sides of ribcage.',
      'Curl bar up by contracting biceps until forearms approach biceps.',
      'Squeeze biceps hard at top for 1 second, then lower down over 3 seconds.'
    ],
    formCues: [
      'Do not rock torso back and forth.',
      'Keep wrists straight, do not curl wrists backwards.'
    ],
    commonMistakes: [
      'Swinging hips to generate momentum.',
      'Letting elbows drift forward, shifting tension onto shoulders.'
    ],
    breathingTip: 'Exhale as bar curls up; inhale as bar lowers.',
    tempo: '3-0-1-1'
  },
  {
    id: 'dumbbell-hammer-curl',
    name: 'Dumbbell Hammer Curl',
    primaryMuscle: 'biceps',
    secondaryMuscles: ['core'],
    equipment: 'dumbbell',
    difficulty: 'beginner',
    metScore: 4.5,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/zC3nLlEvin4?autoplay=1&mute=1&loop=1&playlist=zC3nLlEvin4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80',
    description: 'Neutral-grip curl isolating the brachialis and brachioradialis for arm thickness and forearm development.',
    instructions: [
      'Hold dumbbells at sides with palms facing inward (neutral grip).',
      'Keep upper arms stationary, curl weights upward while maintaining palms-facing orientation.',
      'Squeeze forearm and outer bicep at peak.',
      'Lower weights smoothly to starting position.'
    ],
    formCues: [
      'Keep thumbs pointing up toward ceiling.',
      'Elbows locked against ribcage.'
    ],
    commonMistakes: [
      'Alternating with severe torso sway.',
      'Rushing the negative eccentric portion.'
    ],
    breathingTip: 'Exhale curling up; inhale lowering down.',
    tempo: '2-1-1-0'
  },
  {
    id: 'tricep-dips-chair',
    name: 'Bench / Chair Tricep Dips',
    primaryMuscle: 'triceps',
    secondaryMuscles: ['shoulders', 'chest'],
    equipment: 'bench',
    difficulty: 'beginner',
    metScore: 5.0,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/0326dy_-CzM?autoplay=1&mute=1&loop=1&playlist=0326dy_-CzM',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80',
    description: 'Accessible home bodyweight movement targeting the lateral and medial heads of the triceps.',
    instructions: [
      'Sit on edge of a stable bench or chair, placing hands next to hips with fingers over edge.',
      'Slide hips off edge, extending legs out (straight legs for harder, bent knees for easier).',
      'Lower body by bending elbows until upper arms are parallel to floor.',
      'Press through heels of palms to fully extend triceps back to top.'
    ],
    formCues: [
      'Keep back close to the bench as you descend.',
      'Maintain upright torso, chest proud.'
    ],
    commonMistakes: [
      'Drifting hips far away from bench, overstressing shoulders.',
      'Shrugging shoulders up.'
    ],
    breathingTip: 'Inhale lowering; exhale pressing out.',
    tempo: '2-0-1-0'
  },
  {
    id: 'tricep-rope-pushdown',
    name: 'Cable Tricep Rope Pushdown',
    primaryMuscle: 'triceps',
    secondaryMuscles: ['shoulders'],
    equipment: 'cable',
    difficulty: 'beginner',
    metScore: 4.5,
    homeFriendly: false,
    videoUrl: 'https://www.youtube-nocookie.com/embed/vB5OHsJ3EME?autoplay=1&mute=1&loop=1&playlist=vB5OHsJ3EME',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80',
    description: 'Gym cable isolation exercise allowing peak spread and triceps long-head contraction.',
    instructions: [
      'Attach rope to high cable pulley. Grip ends with neutral grip.',
      'Lean forward slightly at hips, pin elbows against your side ribs.',
      'Extend forearms downward, spreading rope ends apart at the bottom.',
      'Squeeze triceps for 1 full second, then return elbows to 90 degrees.'
    ],
    formCues: [
      'Flare hands apart at the bottom to maximize contraction.',
      'Only forearms should move; keep upper arms locked in place.'
    ],
    commonMistakes: [
      'Letting elbows travel forward and back.',
      'Leaning body weight on top of rope.'
    ],
    breathingTip: 'Exhale pressing down; inhale as hands return up.',
    tempo: '2-1-1-0'
  },

  // CORE & ABS
  {
    id: 'plank',
    name: 'Forearm Core Plank',
    primaryMuscle: 'core',
    secondaryMuscles: ['shoulders', 'glutes'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    metScore: 4.2,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/ASdvN_XEl_c?autoplay=1&mute=1&loop=1&playlist=ASdvN_XEl_c',
    thumbnailUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=600&q=80',
    description: 'Isometric anti-extension core builder promoting spinal stability and deep transverse abdominis endurance.',
    instructions: [
      'Lie face down and place forearms on floor with elbows directly beneath shoulders.',
      'Tuck toes and lift body into a rigid plank from heels to crown.',
      'Squeeze glutes, quads, and pull belly button toward spine.',
      'Maintain neutral neck by gazing at floor between hands.',
      'Hold position with continuous tension for prescribed duration.'
    ],
    formCues: [
      'Think of pulling elbows toward toes to create high-tension RKC plank.',
      'Do not allow hips to sag or pike into air.'
    ],
    commonMistakes: [
      'Sagging hips putting shear force on lower back.',
      'Holding breath instead of diaphragmatic breathing.'
    ],
    breathingTip: 'Breathe steadily in through nose and out through mouth under tension.',
    tempo: 'Isometric'
  },
  {
    id: 'hanging-leg-raise',
    name: 'Hanging Leg / Knee Raise',
    primaryMuscle: 'core',
    secondaryMuscles: ['back'],
    equipment: 'pullup-bar',
    difficulty: 'intermediate',
    metScore: 5.5,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/hdng3Nm1x_E?autoplay=1&mute=1&loop=1&playlist=hdng3Nm1x_E',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=600&q=80',
    description: 'Hanging abdominal exercise curling pelvis upward to hit lower abdominal wall and hip flexors.',
    instructions: [
      'Hang from pull-up bar with overhand grip and engaged shoulders.',
      'Roll pelvis slightly backward and raise knees or straight legs toward chest.',
      'Focus on rounding lower spine to engage abdominals rather than purely swinging legs.',
      'Lower legs back down slowly without swinging into the next rep.'
    ],
    formCues: [
      'Curl the pelvis up like a reverse crunch, not just hip flexion.',
      'Completely eliminate swinging momentum.'
    ],
    commonMistakes: [
      'Using swinging pendulum momentum.',
      'Arching lower back at bottom.'
    ],
    breathingTip: 'Exhale raising knees/legs; inhale as legs lower.',
    tempo: '2-1-1-0'
  },
  {
    id: 'bicycle-crunch',
    name: 'Bicycle Crunches',
    primaryMuscle: 'core',
    secondaryMuscles: ['quads'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    metScore: 5.0,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/9FGilxCbdz8?autoplay=1&mute=1&loop=1&playlist=9FGilxCbdz8',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    description: 'Rotational core exercise activating rectus abdominis and internal/external obliques.',
    instructions: [
      'Lie on back with hands lightly touching sides of head and knees bent at 90 degrees.',
      'Lift shoulder blades off floor and bring right elbow across toward left knee while extending right leg straight.',
      'Switch smoothly, bringing left elbow to right knee while extending left leg.',
      'Perform with deliberate tempo rather than rapid uncontrolled kicks.'
    ],
    formCues: [
      'Rotate from ribcage and torso, not by pulling on neck.',
      'Keep shoulder blades elevated off the floor throughout.'
    ],
    commonMistakes: [
      'Yanking on neck with hands.',
      'Moving too fast without contracting obliques.'
    ],
    breathingTip: 'Exhale with each rotational twist; keep breathing continuous.',
    tempo: '2-0-2-0'
  },

  // HIIT & METABOLIC / CARDIO CALORIE BURNERS
  {
    id: 'burpees',
    name: 'Full Body Burpees',
    primaryMuscle: 'full-body',
    secondaryMuscles: ['chest', 'quads', 'core', 'shoulders'],
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    metScore: 8.5,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dZgVxmf6jkA?autoplay=1&mute=1&loop=1&playlist=dZgVxmf6jkA',
    thumbnailUrl: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=600&q=80',
    description: 'High-intensity full-body metabolic conditioner that rapidly spikes heart rate and burns maximum calories.',
    instructions: [
      'Stand tall, then drop into a squat and place hands on floor outside feet.',
      'Kick feet back into a pushup plank and lower chest directly to the floor.',
      'Push up while jumping feet back forward outside hands.',
      'Explosively jump vertically into air, clapping hands overhead.',
      'Land softly and immediately flow into next repetition.'
    ],
    formCues: [
      'Land softly on balls of feet.',
      'Keep core braced when kicking out to plank to protect lower back.'
    ],
    commonMistakes: [
      'Sagging hips on plank landing.',
      'Hard jarring landing on stiff knees.'
    ],
    breathingTip: 'Breathe rhythmically with each phase of the jump and ground touch.',
    tempo: 'Explosive'
  },
  {
    id: 'mountain-climbers',
    name: 'Rapid Mountain Climbers',
    primaryMuscle: 'core',
    secondaryMuscles: ['shoulders', 'quads', 'full-body'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    metScore: 8.0,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/nmwgirgXLYM?autoplay=1&mute=1&loop=1&playlist=nmwgirgXLYM',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80',
    description: 'Dynamic plank variation building core stability, hip flexion speed, and metabolic burn.',
    instructions: [
      'Begin in a pushup plank position with wrists beneath shoulders.',
      'Drive right knee forward toward chest without letting hips pike up.',
      'Quickly switch legs, driving left knee forward as right leg kicks back.',
      'Maintain a continuous running motion on the balls of your feet.'
    ],
    formCues: [
      'Keep hips level and shoulders stacked directly over hands.',
      'Tap ball of front foot lightly or keep suspended.'
    ],
    commonMistakes: [
      'Bouncing hips high in air.',
      'Slumping shoulders.'
    ],
    breathingTip: 'Steady continuous rhythmic breath throughout intervals.',
    tempo: 'Continuous'
  },
  {
    id: 'kettlebell-swing',
    name: 'Kettlebell / Dumbbell Swing',
    primaryMuscle: 'hamstrings',
    secondaryMuscles: ['glutes', 'back', 'core', 'full-body'],
    equipment: 'kettlebell',
    difficulty: 'intermediate',
    metScore: 8.0,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/sSESeQAlb28?autoplay=1&mute=1&loop=1&playlist=sSESeQAlb28',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    description: 'Explosive hip hinge movement generating rapid hip snap, glute power, and high metabolic expenditure.',
    instructions: [
      'Stand with feet shoulder-width, kettlebell one foot in front on floor.',
      'Hinge at hips, reach forward, and hike bell back between thighs like a football.',
      'Snap hips forward explosively, standing tall and projecting bell to chest height.',
      'Let bell swing back down naturally, hinging hips back at the last instant.'
    ],
    formCues: [
      'Power comes 100% from hips and glutes, arms are merely ropes.',
      'Stand tall and proud at peak, do not lean back.'
    ],
    commonMistakes: [
      'Squatting the bell instead of hinging hips back.',
      'Lifting weight with shoulder deltoids.'
    ],
    breathingTip: 'Sharp exhale at explosive hip snap; inhale as bell swings through legs.',
    tempo: 'Explosive'
  },
  {
    id: 'jumping-jacks',
    name: 'Cardio Jumping Jacks',
    primaryMuscle: 'full-body',
    secondaryMuscles: ['calves', 'shoulders'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    metScore: 7.0,
    homeFriendly: true,
    videoUrl: 'https://www.youtube-nocookie.com/embed/iSSAk4XCsRA?autoplay=1&mute=1&loop=1&playlist=iSSAk4XCsRA',
    thumbnailUrl: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=600&q=80',
    description: 'Classic cardiovascular warm-up and calorie burner to elevate body temperature and limber joints.',
    instructions: [
      'Stand upright with feet together and arms at sides.',
      'Jump feet outward while sweeping arms overhead to touch.',
      'Jump feet back together while bringing arms back to sides.',
      'Maintain light, bouncy rhythm on balls of feet.'
    ],
    formCues: [
      'Land softly with knees slightly flexed.',
      'Maintain upright posture.'
    ],
    commonMistakes: [
      'Heavy flat-footed stomping.',
      'Flapping arms halfway.'
    ],
    breathingTip: 'Steady breathing in cadence with jumps.',
    tempo: 'Continuous'
  }
];

export const MUSCLE_GROUPS: { id: string; label: string }[] = [
  { id: 'all', label: 'All Muscles' },
  { id: 'chest', label: 'Chest' },
  { id: 'back', label: 'Back' },
  { id: 'shoulders', label: 'Shoulders' },
  { id: 'quads', label: 'Quads & Legs' },
  { id: 'hamstrings', label: 'Hamstrings' },
  { id: 'glutes', label: 'Glutes' },
  { id: 'biceps', label: 'Biceps' },
  { id: 'triceps', label: 'Triceps' },
  { id: 'core', label: 'Core & Abs' },
  { id: 'full-body', label: 'Full Body' },
];

export const EQUIPMENT_OPTIONS: { id: string; label: string }[] = [
  { id: 'all', label: 'All Equipment' },
  { id: 'bodyweight', label: 'Bodyweight (No Equip)' },
  { id: 'dumbbell', label: 'Dumbbells' },
  { id: 'barbell', label: 'Barbell' },
  { id: 'cable', label: 'Cables' },
  { id: 'pullup-bar', label: 'Pull-up Bar' },
  { id: 'resistance-band', label: 'Resistance Bands' },
  { id: 'kettlebell', label: 'Kettlebell' },
];
