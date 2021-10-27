import { v1 as uuid } from 'uuid';

import patientData from '../../data/patients';
import { NewPatient, Patient, PatientRemoveSSN } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientsWithoutSSN = (): Array<PatientRemoveSSN> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getPatientsWithoutSSN, addPatient };