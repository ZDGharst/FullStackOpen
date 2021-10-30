import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import { Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { addPatient, useStateValue } from '../state';
import { Patient } from '../types';

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();

  type PatientParams = {
    id: string;
  };

  const { id } = useParams<PatientParams>();
  const patient = id ? patients[id] : null;

  React.useEffect(() => {
    if(!patient || !patient.ssn) {
      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(addPatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      
      void fetchPatient();
    }
  }, [dispatch]);

  if(!patient) {
    return null;
  }

  const genderIcon = patient.gender === 'male' ? 'mars' : patient.gender ===  'female' ? 'venus' : 'genderless';


  return (<>
    <h2>{patient.name} <Icon name={genderIcon} /></h2>
    <p>SSN: {patient.ssn}</p>
    <p>Occupation: {patient.occupation}</p>
  </>);
};

export default PatientPage;