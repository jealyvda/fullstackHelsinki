import express from 'express';
import cors from 'cors';
import patientService from './services/patientService';
import diagnoseService from './services/diagnoseService';
import toNewPatient from './utils';
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
    res.send(diagnoseService.getDiagnoses());
});

app.post('api/patients', (req, res) => {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.send(addedPatient);
});

app.get('/api/patients', (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

app.get('/api/patients/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService.getPatientById(id);
    res.json(patient);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});