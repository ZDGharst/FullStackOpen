import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

import diagnoses from '../data/diagnoses';
import patientService from './services/patientService';

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  res.json(diagnoses);
});

app.get('/api/patients', (_req, res) => {
  res.json(patientService.getPatientsWithoutSSN());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
