import { Card } from "@material-ui/core";
import { HospitalEntry } from "../types";

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
    return (
        <Card style={{ margin: 10 }}>            
            <p>{entry.date}</p>
            <p>{entry.description}</p>
            <p>criteria: {entry.discharge.criteria}</p>
            <p>diagnose by {entry.specialist}</p>
        </Card>
    );
};

export default Hospital;