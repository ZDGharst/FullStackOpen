import patientData from '../../data/patients';
import { Patient, PatientRemoveSSN } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientsWithoutSSN = (): Array<PatientRemoveSSN> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export default { getPatients, getPatientsWithoutSSN };