import express from 'express';

import patientService from '../services/patientService';
import { NewEntry, NewPatient } from '../types';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_, res: express.Response) => {
  res.json(patientService.getPatientsWithoutSSN());
});

router.get('/:id', (req: express.Request, res: express.Response) => {
  res.json(patientService.getPatientByID(req.params.id));
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

router.post('/:id/entries', (req: express.Request, res: express.Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry: NewEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    res.status(400).send('Something went wrong.');
  }
});

export default router;
