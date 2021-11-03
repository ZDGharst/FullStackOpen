import axios from 'axios';
import React, { useState } from 'react';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Entry } from '../types';
import { addEntry as serviceAddEntry } from '../state/reducer';
import LineItem from './LineItem';

const AddEntryForm = ({ patientId }: { patientId: string }) => {
  const [, dispatch] = useStateValue();
  const [error, setError] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [newDiagnosis, setNewDiagnosis] = useState('');
  const [type, setType] = useState('HealthCheck');

  const [healthCheckRating, setHealthCheckRating] = useState('Healthy');

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  

  const addDiagnosisCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDiagnosisCodes(diagnosisCodes.concat(newDiagnosis));
  };

  const typeExtension = () => {
    switch(type) {
      case 'HealthCheck':
        return (
          <div><select
            id='HealthCheckRating'
            onChange={(e) => setHealthCheckRating(e.target.value)}
          >
            <option value='Healthy'>Healthy</option>
            <option value='LowRisk'>Low Risk</option>
            <option value='HighRisk'>High Risk</option>
            <option value='CriticalRisk'>Critical Risk</option>
          </select></div>
        );
      case 'Hospital':
        return (
          <>
            <LineItem name='Discharge Date' value={dischargeDate} onChange={setDischargeDate} />
            <LineItem name='Discharge Criteria' value={dischargeCriteria} onChange={setDischargeCriteria} />
          </>
        );
      case 'OccupationalHealthcare':
        return (
          <>
            <LineItem name='Employer Name' value={employerName} onChange={setEmployerName} />
            <LineItem name='Sick Leave Start' value={sickLeaveStart} onChange={setSickLeaveStart} />
            <LineItem name='Sick Leave End' value={sickLeaveEnd} onChange={setSickLeaveEnd} />
          </>
        );
      default:
        return null;
    }
  };

  const addEntry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        {
          description,
          date,
          specialist,
          diagnosisCodes,
          type,
          healthCheckRating,
          dischargeDate,
          dischargeCriteria,
          employerName,
          sickLeaveStart,
          sickLeaveEnd
        }
      );

      dispatch(serviceAddEntry(patientId, newEntry));
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if(axios.isAxiosError(error) && error.response && typeof error.response.data === 'string') {
        errorMessage = error.response.data;
      }
      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={addEntry}>
      <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
      <LineItem name='Description' value={description} onChange={setDescription} />
      <LineItem name='Date' value={date} onChange={setDate} />
      <LineItem name='Specialist' value={specialist} onChange={setSpecialist} />
      <LineItem name='Code' value={newDiagnosis} onChange={setNewDiagnosis} />
      <button onClick={addDiagnosisCode}>Add code</button>
      <p>{diagnosisCodes.join(', ')}</p>
      <label htmlFor='Type'>Type</label><br />
      <div><select id='Type' name='Type' onChange={(e) => setType(e.target.value)}>
        <option value='HealthCheck' defaultChecked>Health Check</option>
        <option value='Hospital'>Hospital Visit</option>
        <option value='OccupationalHealthcare'>Occupational Healthcare</option>
      </select></div>
      {typeExtension()}
      <button>Add entry</button>
    </form>
  );
};

export default AddEntryForm;

// interface OccupationalHealthcareEntry extends BaseEntry {
//   type: "OccupationalHealthcare";
//   employerName: string;
//   sickLeave?: {
//     startDate: string;
//     endDate: string;
//   }
// }