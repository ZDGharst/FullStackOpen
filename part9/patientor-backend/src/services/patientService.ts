import { v1 as uuid } from 'uuid';

import data from '../../data/patients';
import { Entry, NewEntry, NewPatient, Patient, PublicPatient } from '../types';

const patients = data;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientsWithoutSSN = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const getPatientByID = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
    entries: []
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };

  const patient = patients.find(p => p.id === id);
  if(!patient) {
    throw new Error('Patient not found.');
  } else {
    patient.entries.push(newEntry);
  }

  return newEntry;
};

export default { getPatients, getPatientsWithoutSSN, getPatientByID, addPatient, addEntry };