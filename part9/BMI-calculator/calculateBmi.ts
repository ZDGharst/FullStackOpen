/**
 * Calculates a person's BMI and returns their category.
 * @param {number} height - A person's height in centimeters. 
 * @param {number} mass - A person's mass in kilograms.
 * @returns {string}
 */
const calculateBmi = (height: number, mass: number): string => {
  const bmi: number = mass / (height / 100) ** 2;

  if(bmi >= 40.0) return 'Obese (Class III)';
  else if(bmi >= 35.0) return 'Obese (Class II)';
  else if(bmi >= 30.0) return 'Obese (Class I)';
  else if(bmi >= 25.0) return 'Overweight (Pre-obese)';
  else if(bmi >= 18.5) return 'Normal';
  else if(bmi >= 17.0) return 'Underweight (Mild thinness)';
  else if(bmi >= 16.0) return 'Underweight (Moderate thinness)';
  else return 'Underweight (Severe thinness)';
}

console.log(calculateBmi(170, 72));
