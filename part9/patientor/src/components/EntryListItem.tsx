import { useEffect, useState } from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { LocalHospital, Work, Favorite } from '@mui/icons-material';
import axios from 'axios';
import { Diagnosis, Entry } from '../types';
import { apiBaseUrl } from '../constants';

interface EntryListItemProps {
  entry: Entry;
}

const EntryListItem = ({ entry }: EntryListItemProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/diagnoses`);
        setDiagnoses(response.data);
      } catch (error) {
        console.error('Error fetching diagnoses:', error);
      }
    };

    fetchDiagnoses();
  }, []);

  const getIcon = (entry: Entry) => {
    switch (entry.type) {
      case 'HealthCheck':
        return <Favorite />;
      case 'Hospital':
        return <LocalHospital />;
      case 'OccupationalHealthcare':
        return <Work />;
    }
  };

  const getDiagnosisDescription = (code: string) => {
    const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
    return diagnosis ? diagnosis.name : 'N/A';
  };

  return (
    <div>
      <ListItem>
        <ListItemIcon>
          {getIcon(entry)}
        </ListItemIcon>
        <ListItemText primary={`${entry.date}: ${entry.description}`} />
      </ListItem>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <ListItem>
          <ListItemText
            primary={`Diagnosis Codes:`}
            secondary={
              <ul>
                {entry.diagnosisCodes.map(code => (
                  <li key={code}>{code}: {getDiagnosisDescription(code)}</li>
                ))}
              </ul>
            }
          />
        </ListItem>
      )}
    </div>
  );
};

export default EntryListItem;
