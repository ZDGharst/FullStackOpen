interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

/**
 * Calculates an exercise result from given parameters.
 * @param exercises An array of exercise hours.
 * @param target A target amount of average hours per day.
 * @returns An exercise result.
 */
const exerciseCalculator = (exercises: number[], target: number): ExerciseResult => {
  let totalHours = 0;
  let trainingDays = 0;

  exercises.forEach((e) => {
    totalHours += e;
    if(e !== 0) {
      trainingDays++;
    }
  });

  const average: number = totalHours / exercises.length;
  let rating = 1;
  let ratingDescription = 'Quit slacking, you have goals to meet.';
  if (average >= target) {
    rating = 3;
    ratingDescription = 'Great job! Keep it up!';
  } else if (average >= target / 3 * 2) {
    rating = 2;
    ratingDescription = 'You almost made it! Let\'s keep training!';
  }

  return {
    periodLength: exercises.length,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if(process.argv[2] && process.argv[3]) {
  const exercises = process.argv.slice(2).map(n => parseInt(n));
  console.log(exerciseCalculator(exercises, parseInt(process.argv[2])));
}

export default exerciseCalculator;