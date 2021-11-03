import React from 'react';
import { useStateValue } from '../state';
import { Entry } from '../types';

const EntryListing = ({ entries }: { entries: Entry[] }) => {
  const [{ diagnoses }] = useStateValue();

  if(!entries) {
    return null;
  }

  const mappedEntries = entries.map(e => {
    const style = {
      borderWidth: 1,
      borderColor: 'black',
      borderStyle: 'solid',
      margin: 5,
      padding: 15
    };

    switch(e.type) {
      case 'HealthCheck':
        return (
          <div key={e.id} style={style}>
            <p>Health Check</p>
            <p>{e.date}: <em>{e.description}</em></p>
            <p>Rating: {e.healthCheckRating}</p>
            <ul>
              {e.diagnosisCodes && e.diagnosisCodes.map(d => <li key={d}>{d} {diagnoses.find(desc => desc.code === d)?.name}</li>)}
            </ul>
          </div>
        );
      case 'Hospital':
        return (
          <div key={e.id} style={style}>
            <p>Hospital Visit</p>
            <p>{e.date}: <em>{e.description}</em></p>
            <p>Discharge date: {e.discharge.date}</p>
            <p>Discharge criteria: {e.discharge.criteria}</p>
            <ul>
              {e.diagnosisCodes && e.diagnosisCodes.map(d => <li key={d}>{d} {diagnoses.find(desc => desc.code === d)?.name}</li>)}
            </ul>
          </div>
        );
      case 'OccupationalHealthcare':
        return (
          <div key={e.id} style={style}>
            <p>Occupational Healthcaree</p>
            <p>{e.date}: <em>{e.description}</em></p>
            <p>{e.sickLeave ? `Sick leave from ${e.sickLeave.startDate} to ${e.sickLeave.endDate}` : null}</p>
            <ul>
              {e.diagnosisCodes && e.diagnosisCodes.map(d => <li key={d}>{d} {diagnoses.find(desc => desc.code === d)?.name}</li>)}
            </ul>
          </div>
        );
      default:
        return null;
    }

  });

  return <>{mappedEntries}</>;
};

export default EntryListing;
