import { Gender, HealthCheckRating, NewEntry, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseField = (field: unknown, fieldName: string): string => {
  if(!field || !isString(field)) {
    throw new Error('Incorrect or missing ' + fieldName);
  }

  return field;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender.');
  }

  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStringArray = (diagnoseCodes: any): diagnoseCodes is string[] => {
  if(!diagnoseCodes) {
    return false;
  }
  
  // eslint-disable-next-line
  diagnoseCodes.forEach((d: unknown) => {
    if(!isString(d)) {
      return false;
    }
    return true;
  });

  return true;
};

const parseDiagnoseCodes = (diagnoseCodes: unknown): string[] | undefined => {
  if(!diagnoseCodes) {
    return undefined;
  }

  if(!isStringArray(diagnoseCodes)) {
    throw new Error('Incorrect or missing diagnose codes.');
  }

  return diagnoseCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (healthCheckRating: any): healthCheckRating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if(!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating.');
  }

  return healthCheckRating;
};

export const toNewPatient = ({ name, ssn, dateOfBirth, occupation, gender } : {
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
    gender: parseGender(gender)
  };

  return newPatient;
};

export const toNewEntry = ({
  description, date, specialist, diagnosisCodes, type,
  healthCheckRating,
  employerName, sickLeaveStart, sickLeaveEnd,
  dischargeDate, dischargeCriteria
  } : {
  description: unknown,
  date: unknown,
  specialist: unknown,
  diagnosisCodes?: unknown,
  type: unknown,
  healthCheckRating?: unknown,
  employerName?: unknown,
  sickLeaveStart?: unknown,
  sickLeaveEnd?: unknown,
  dischargeDate?: unknown,
  dischargeCriteria?: unknown
}): NewEntry => {
  if(!type || !isString(type)) {
    throw new Error('Incorrect or missing type.');
  }

  if(type === 'HealthCheck') {
    return {
      description: parseField(description, 'description'),
      date: parseField(date, 'date'),
      specialist: parseField(specialist, 'specialist'),
      diagnosisCodes: parseDiagnoseCodes(diagnosisCodes),
      type: 'HealthCheck',
      healthCheckRating: parseHealthCheckRating(healthCheckRating)
    };
  } else if(type === 'OccupationalHealthcare') {
    return {
      description: parseField(description, 'description'),
      date: parseField(date, 'date'),
      specialist: parseField(specialist, 'specialist'),
      diagnosisCodes: parseDiagnoseCodes(diagnosisCodes),
      type: 'OccupationalHealthcare',
      employerName: parseField(employerName, 'employer name'),
      sickLeave: {
        startDate: parseField(sickLeaveStart, 'sick leave start'),
        endDate: parseField(sickLeaveEnd, 'sick leave end')
      }
    };
  } else if(type === 'Hospital') {
    return {
      description: parseField(description, 'description'),
      date: parseField(date, 'date'),
      specialist: parseField(specialist, 'specialist'),
      diagnosisCodes: parseDiagnoseCodes(diagnosisCodes),
      type: 'Hospital',
      discharge: {
        date: parseField(dischargeDate, 'discharge date'),
        criteria: parseField(dischargeCriteria, 'dispatch criteria')
      }
    };
  } else {
    throw new Error('Incorrect type.');
  }
};
