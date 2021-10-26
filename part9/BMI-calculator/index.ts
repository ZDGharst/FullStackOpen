import express from 'express';
import calculateBmi from './calculateBmi';

const app = express();

app.get('/bmi', (req: express.Request, res: express.Response) => {
  if(typeof req.query.height === 'string' && typeof req.query.weight === 'string') {
    const bmi = calculateBmi(parseInt(req.query.height), parseInt(req.query.weight));
    res.send(bmi);
  } else {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

app.get('/', (_, res: express.Response) => {
  res.send('Hello world!');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});