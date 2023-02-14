import { Card } from "@material-ui/core";
import { HealthCheckEntry } from "../types";

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
    return (
        <Card style={{ margin: 10}}>
            <p>{entry.date}</p>
            <p>{entry.description}</p>
            <p>healthCheckRating: {entry.healthCheckRating}</p>
            <p>diagnose by {entry.specialist}</p>
        </Card>
    );
};

export default HealthCheck;