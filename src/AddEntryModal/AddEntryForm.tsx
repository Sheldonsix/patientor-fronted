import { Field, Form, Formik } from "formik";
// import { useStateValue } from "../state";
import { EntryType, HealthCheckRating } from "../types";
import { EntryTypeOption, RatingOption, SelectField, TextField } from "../AddPatientModal/FormField";
import { Button, Grid } from "@material-ui/core";


// export type EntryFormValues = Omit<NewEntry, 'id'>;

interface Props {
    onSubmit: (values: any) => void;
    onCancel: () => void;
}

const healthCheckRatingOptions: RatingOption[] = [
    { value: HealthCheckRating.Healthy, label: "Healthy" },
    { value: HealthCheckRating.LowRisk, label: "LowRisk" },
    { value: HealthCheckRating.HighRisk, label: "HighRisk" },
    { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" }
];

const entryTypeOptions: EntryTypeOption[] = [
    { value: EntryType.HealthCheck, label: "HealthCheck" },
    { value: EntryType.Hospital, label: "Hospital" },
    { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" }
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    // const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                date: "",
                specialist: "",
                description: "",
                type: "HealthCheck",

            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                return errors;
            }} >
            {({ isValid, dirty, values }) => {
                if (values.type === "HealthCheck") {
                    return (
                        <Form className="form ui" >
                            <SelectField label="Type" name="type" options={entryTypeOptions} />
                            <Field
                                label="Date"
                                placeholder="YYYY-MM-DD"
                                name="date"
                                component={TextField}
                            />
                            <Field
                                label="Description"
                                placeholder="Description"
                                name="description"
                                component={TextField}
                            />
                            <Field
                                label="Specialist"
                                placeholder="Specialist"
                                name="specialist"
                                component={TextField}
                            />
                            <Field
                                label="DiagnosisCodes"
                                placeholder="DiagnosisCodes"
                                name="diagnosisCodes"
                                component={TextField}
                            />
                            <SelectField label="HealthCheckRating" name="healthCheckRating" options={healthCheckRatingOptions} />
                            <Grid>
                                <Grid item>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        style={{ float: "left" }}
                                        type="button"
                                        onClick={onCancel}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        style={{
                                            float: "right",
                                        }}
                                        type="submit"
                                        variant="contained"
                                        disabled={!dirty || !isValid}
                                    >
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    );
                } else if (values.type === "Hospital") {
                    return (
                        <Form className="form ui" >
                            <SelectField label="Type" name="type" options={entryTypeOptions} />
                            <Field
                                label="Date"
                                placeholder="YYYY-MM-DD"
                                name="date"
                                component={TextField}
                            />
                            <Field
                                label="Description"
                                placeholder="Description"
                                name="description"
                                component={TextField}
                            />
                            <Field
                                label="Specialist"
                                placeholder="Specialist"
                                name="specialist"
                                component={TextField}
                            />
                            <Field
                                label="DiagnosisCodes"
                                placeholder="DiagnosisCodes"
                                name="diagnosisCodes"
                                component={TextField}
                            />
                            <Field
                                label="DischargeDate"
                                placeholder="YYYY-MM-DD"
                                name="dischargeDate"
                                component={TextField}
                            />
                            <Field
                                label="DischargeCriteria"
                                placeholder="DischargeCriteria"
                                name="dischargeCriteria"
                                component={TextField}
                            />
                            <Grid>
                                <Grid item>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        style={{ float: "left" }}
                                        type="button"
                                        onClick={onCancel}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        style={{
                                            float: "right",
                                        }}
                                        type="submit"
                                        variant="contained"
                                        disabled={!dirty || !isValid}
                                    >
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    );
                } else if (values.type === "OccupationalHealthcare") {
                    return (
                        <Form className="form ui" >
                            <SelectField label="Type" name="type" options={entryTypeOptions} />
                            <Field
                                label="Date"
                                placeholder="YYYY-MM-DD"
                                name="date"
                                component={TextField}
                            />
                            <Field
                                label="Description"
                                placeholder="Description"
                                name="description"
                                component={TextField}
                            />
                            <Field
                                label="Specialist"
                                placeholder="Specialist"
                                name="specialist"
                                component={TextField}
                            />
                            <Field
                                label="EmployerName"
                                placeholder="EmployerName"
                                name="employerName"
                                component={TextField}
                            />
                            <Field
                                label="DiagnosisCodes"
                                placeholder="DiagnosisCodes"
                                name="diagnosisCodes"
                                component={TextField}
                            />
                            <Field
                                label="SickLeaveStartDate"
                                placeholder="YYYY-MM-DD"
                                name="sickLeaveStartDate"
                                component={TextField}
                            />
                            <Field
                                label="SickLeaveEndDate"
                                placeholder="YYYY-MM-DD"
                                name="sickLeaveEndDate"
                                component={TextField}
                            />
                            <Grid>
                                <Grid item>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        style={{ float: "left" }}
                                        type="button"
                                        onClick={onCancel}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        style={{
                                            float: "right",
                                        }}
                                        type="submit"
                                        variant="contained"
                                        disabled={!dirty || !isValid}
                                    >
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    );
                } else return null;
            }

            }
        </Formik>
    );
};

export default AddEntryForm;