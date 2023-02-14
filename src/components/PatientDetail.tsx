/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";

import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, Patient } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Button } from "@material-ui/core";
// import  { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";
import axios from "axios";
// import { apiBaseUrl } from "../constants";
import Hospital from "./HospitalEntry";
import HealthCheck from "./HealthCheckEntry";
import OccupationalHealthcare from "./OccupationalHealthcare";
import { apiBaseUrl } from "../constants";
// import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const [error, setError] = React.useState<string>();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    const submitNewEntry = async (values: any) => {
        try {
            if (id) {
                if (values.type === "HealthCheck") {
                    const newHealthCheckEntry: Omit<HealthCheckEntry, 'id'> = {
                        date: values.date,
                        description: values.description,
                        type: values.type,
                        specialist: values.specialist,
                        diagnosisCodes: values.diagnosisCodes,
                        healthCheckRating: values.healthCheckRating
                    };
                    const { data: newHealthCheckPatient } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, newHealthCheckEntry);
                    console.log(newHealthCheckPatient);
                    dispatch({ type: "ADD_ENTRY", payload: newHealthCheckPatient });
                    closeModal();
                } else if (values.type === "Hospital") {
                    const newHospitalEntry: Omit<HospitalEntry, 'id'> = {
                        date: values.date,
                        description: values.description,
                        type: values.type,
                        specialist: values.specialist,
                        diagnosisCodes: values.diagnosisCodes,
                        discharge: {
                            date: values.dischargeDate,
                            criteria: values.dischargeCriteria
                        }
                    };
                    const { data: newHospitalPatient } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, newHospitalEntry);
                    console.log(newHospitalPatient);
                    dispatch({ type: "ADD_ENTRY", payload: newHospitalPatient });
                    closeModal();
                } else if (values.type === "OccupationalHealthcare") {
                    const newOccupationalHealthcareEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
                        date: values.date,
                        description: values.description,
                        type: values.type,
                        specialist: values.specialist,
                        diagnosisCodes: values.diagnosisCodes,
                        employerName: values.employerName,
                        sickLeave: {
                            startDate: values.sickLeaveStartDate,
                            endDate: values.sickLeaveEndDate
                        }
                    };
                    const { data: newOccupationalHealthcarePatient } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, newOccupationalHealthcareEntry);
                    console.log(newOccupationalHealthcarePatient);
                    dispatch({ type: "ADD_ENTRY", payload: newOccupationalHealthcarePatient });
                    closeModal();
                }
            }
            else console.log(`id is empty`);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error(e?.response?.data || "Unrecognized axios error");
                setError(String(e?.response?.data?.error) || "Unrecognized axios error");
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };



    const patient = Object.values(patients).find(
        (patient: Patient) => patient.id === id
    );
    if (patient) {
        return (
            <div>
                <h2>{patient.name}{patient.gender === 'male' ? <MaleIcon></MaleIcon> : <FemaleIcon></FemaleIcon>}</h2>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
                <h3>entries</h3>
                {patient.entries.map((entry) => {
                    switch (entry.type) {
                        case "Hospital":
                            return <Hospital entry={entry} />;
                        case "HealthCheck":
                            return <HealthCheck entry={entry} />;
                        case "OccupationalHealthcare":
                            return <OccupationalHealthcare entry={entry} />;
                        default:
                            return assertNever(entry);
                    }
                }

                    // (
                    //     <div key={id}>
                    //         <p>{entry.date} {entry.description}</p>
                    //         {entry.diagnosisCodes ?
                    //             <ul>
                    //                 {entry.diagnosisCodes.map((item, id) => <li key={id}>{item} {Object.values(diagnoses).find(diagnose => diagnose.code === item)?.name} </li>)}
                    //             </ul> : null}
                    //     </div>
                    // )
                )}
                <AddEntryModal modalOpen={modalOpen} onSubmit={submitNewEntry} error={error} onClose={closeModal} />
                <Button style={{ float: "left" }} variant="contained" onClick={() => openModal()}> Add New Entry </Button>

            </div>
        );
    }
    else return null;

};

export default PatientDetail;