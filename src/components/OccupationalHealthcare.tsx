import { OccupationalHealthcareEntry } from "../types";
import { Card } from "@material-ui/core";

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return (
        <Card style={{ margin: 10 }}>
            <p>{entry.date} {entry.employerName}</p>
            <p>{entry.description}</p>
            <p>diagnose by {entry.specialist}</p>
        </Card>
    );
};

export default OccupationalHealthcare;