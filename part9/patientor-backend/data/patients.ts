import { Gender, NewPatient } from '../src/types';

const patients: Array<NewPatient> = [
  {
    "name": "John McClane",
    "dateOfBirth": "1986-07-09",
    "ssn": "090786-122X",
    "gender": Gender.Male,
    "occupation": "New york city cop"
  },
  {
    "name": "Martin Riggs",
    "dateOfBirth": "1979-01-30",
    "ssn": "300179-77A",
    "gender": Gender.Male,
    "occupation": "Cop"
  },
  {
    "name": "Hans Gruber",
    "dateOfBirth": "1970-04-25",
    "ssn": "250470-555L",
    "gender": Gender.Male,
    "occupation": "Technician"
  },
  {
    "name": "Dana Scully",
    "dateOfBirth": "1974-01-05",
    "ssn": "050174-432N",
    "gender": Gender.Female,
    "occupation": "Forensic Pathologist"
  },
  {
    "name": "Matti Luukkainen",
    "dateOfBirth": "1971-04-09",
    "ssn": "090471-8890",
    "gender": Gender.Male,
    "occupation": "Digital evangelist"
  }
];

export default patients;