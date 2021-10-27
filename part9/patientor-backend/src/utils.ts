import { NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseField = (field: unknown, fieldName: string): string => {
  if(!field || !isString(field)) {
    throw new Error('Incorrect or missing ' + fieldName);
  }

  return field;
};

const toNewPatient = ({ name, ssn, dateOfBirth, occupation, gender } : {
  name: unknown,
  ssn: unknown,
  dateOfBirth: unknown,
  occupation: unknown,
  gender: unknown
}): NewPatient => {
  const newPatient: NewPatient = {
    name: parseField(name, 'name'),
    ssn: parseField(ssn, 'ssn'),
    dateOfBirth: parseField(dateOfBirth, 'dateOfBirth'),
    occupation: parseField(occupation, 'occupation'),
    gender: parseField(gender, 'gender')
  };

  return newPatient;
};

export default toNewPatient;