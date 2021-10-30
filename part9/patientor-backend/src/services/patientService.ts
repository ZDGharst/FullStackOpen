import { v1 as uuid } from 'uuid';

import patientData from '../../data/patients';
import { NewPatient, Patient, PublicPatient } from '../types';

const patients: Array<Patient> = patientData.map(p => {
  return {
    ...p,
    id: uuid(),
    entries: []
  };
});

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

export default { getPatients, getPatientsWithoutSSN, getPatientByID, addPatient };