import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { PersonOutline, MaleOutlined, FemaleOutlined, TransgenderOutlined, WorkOutline } from '@mui/icons-material';
import { Gender, Patient, Entry } from '../../types';
import { apiBaseUrl } from '../../constants';
import EntryListItem from '../EntryListItem';


const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/patients/${id}`)
      .then(response => setPatient(response.data))
      .catch(error => console.error('Error fetching patient details:', error));
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Box m={2}>
        <Typography variant="h4">{patient.name}</Typography>
      </Box>
      <Divider />
      <Box m={2}>
        <Typography variant="h6">Personal Information</Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <PersonOutline />
            </ListItemIcon>
            <ListItemText primary={`Date of Birth: ${patient.dateOfBirth}`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              {patient.gender === Gender.Male && <MaleOutlined />}
              {patient.gender === Gender.Female && <FemaleOutlined />}
              {patient.gender === Gender.Other && <TransgenderOutlined />}
            </ListItemIcon>
            <ListItemText primary={`Gender: ${patient.gender}`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <WorkOutline />
            </ListItemIcon>
            <ListItemText primary={`Occupation: ${patient.occupation}`} />
          </ListItem>
        </List>
        <List>
          {patient.entries.map((entry: Entry) => (
            <EntryListItem key={entry.id} entry={entry} />
          ))}
        </List>
      </Box>
    </div>
  );
};

export default PatientDetails;