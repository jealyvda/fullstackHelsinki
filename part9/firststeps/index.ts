import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    if (!('height' in req.query && 'weight' in req.query)){
        res.status(400).send({
            error: "malformatted parameters"
        });
    }

    const { height, weight } = req.query;
    if (isNaN(Number(height)) || isNaN(Number(weight))) {
        res.status(400).send({
            error: "malformatted parameters"
        });
    }

    res.send({
        height,
        weight,
        bmi: calculateBmi(Number(height), Number(weight))
    });
});

app.post('/exercises', (req, res) => {
    if (!('daily_exercises' in req.body && 'target' in req.body)) {
        res.status(400).json({
            error: "parameters missing"
        });

        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (isNaN(Number(target))) {
        res.status(400).json({
            error: "malformatted parameters"
        });

        return;
    }

    if (!Array.isArray(daily_exercises)) {
        res.status(400).json({
            error: "malformatted parameters"
        });

        return;
    } else {
        const dailyArray = daily_exercises;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const convertedDailyExercises: number[] = dailyArray.map((h: any) => {
            const num = Number(h);

            if (isNaN(Number(num))) {
                res.status(400).json({
                    error: "malformatted parameters"
                });

                return NaN;
            } else {
                return num;
            }
        });

        res.status(200).json(calculateExercises(convertedDailyExercises, Number(target)));
        return;
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});