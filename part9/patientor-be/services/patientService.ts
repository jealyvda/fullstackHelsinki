import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: Patient[] = patientData as Patient[];

const getPatients = (): Patient[] => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = (newPatient: NewPatient): NonSensitivePatient => {
    const id = uuid();
    patients.push({id, ...newPatient});

    return {
        id,
        name: newPatient.name,
        dateOfBirth: newPatient.dateOfBirth,
        gender: newPatient.gender,
        occupation: newPatient.occupation
    };
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient
};