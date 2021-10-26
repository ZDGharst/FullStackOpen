import express from 'express';
import calculateBmi from './calculateBmi';
import exerciseCalculator from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/bmi', (req: express.Request, res: express.Response) => {
  if(typeof req.query.height === 'string' && typeof req.query.weight === 'string') {
    const bmi = calculateBmi(parseInt(req.query.height), parseInt(req.query.weight));
    res.send(bmi);
  } else {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req: express.Request, res: express.Response) => {
  // eslint-disable-next-line
  const { exercises, target } = req.body;
  if(!exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
  } else if(Array.isArray(exercises) && exercises.length && exercises.every(e => typeof e === 'number') && typeof target === 'number') {
      // eslint-disable-next-line
      const exerciseResult = exerciseCalculator(exercises, target);
    res.json(exerciseResult);
  } else {
    res.status(400).json({ error: 'malformed parameteers' });
  }
});

app.get('/', (_, res: express.Response) => {
  res.send('Hello world!');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});