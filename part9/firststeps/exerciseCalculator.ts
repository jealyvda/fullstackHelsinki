interface Result { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface ExerciseInputValues {
    dailyHours: number[],
    target: number
}

const parseExerciseArguments = (args: string[]): ExerciseInputValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    if (!isNaN(Number(args[2])) && (args.slice(3).filter((arg) => isNaN(Number(arg)))).length == 0) {
      return {
        target: Number(args[2]),
        dailyHours: process.argv.slice(3).map((arg) => Number(arg))
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};
  

export function calculateExercises(dailyHours: number[], targetAmount: number): Result {
    const totalHours = dailyHours.reduce((partial, h) => partial + h, 0);
    const average = totalHours / dailyHours.length;
    const percentage = Math.floor((average / targetAmount) * 3);
    const rating = Math.min(3, percentage);
    
    let ratingDescription = "Try harder next time";

    if (rating > 2) {
        ratingDescription = "Very well done";
    } else if (rating > 1) {
        ratingDescription = "Almost there!";
    }

    return {
        periodLength: dailyHours.length,
        trainingDays: (dailyHours.filter((hours) => hours > 0)).length,
        success: average >= targetAmount,
        rating,
        ratingDescription,
        target: targetAmount,
        average
    };
}

try {
    const { target, dailyHours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}