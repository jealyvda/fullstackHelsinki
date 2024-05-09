interface BmiInputValues {
    height: number,
    weight: number
}

const parseBmiArguments = (args: string[]): BmiInputValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

export function calculateBmi(height: number, weight: number): string {
    const adjustedHeight: number = height / 100;
    const bmi: number = weight / (adjustedHeight * adjustedHeight);

    if (bmi >= 0 && bmi < 18.5) {
        return "You are underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
        return "You are normal weight";
    } else if (bmi >= 25 && bmi < 30) {
        return "You are overweight";
    } else if (bmi >= 30 && bmi < 35) {
        return "You are moderately obese";
    } else if (bmi >= 35 && bmi < 40) {
        return "You are severely obese";
    } else {
        return "You are very severely obese";
    }
}

try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
