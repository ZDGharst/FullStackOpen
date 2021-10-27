import express from 'express';

import patientService from '../services/patientService';
import { NewPatient } from '../types';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPatientsWithoutSSN());
});

router.post('/', (req: express.Request, res: express.Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient: NewPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    res.status(400).send('Something went wrong.');
  }
});

export default router;