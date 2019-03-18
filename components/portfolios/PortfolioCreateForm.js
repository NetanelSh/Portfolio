// Render Prop
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Alert } from 'reactstrap';

import PortInput from '../form/PortInput';
import PortDate from '../form/PortDate';

const validateInputs = (values) => {
    let errors = {};
    Object.entries(values).forEach(([key, value]) => {
        if (!values[key] &&  key !== 'endDate') {
            errors[key] = `Field ${key} is Required!`;
        }
    })

    const startDate = values.startDate;
    const endDate = values.endDate;

    if (startDate && endDate && (endDate < startDate)) {
        errors.endDate = 'End date cannot be before start date!';
    }

    return errors;
}

const INITIAL_VALUES = { title: '', company: '', location: '', position: '', description: '', startDate: '', endDate: ''};

const PortfolioCreateForm = (props) => (
    <div>
        <Formik
            initialValues={INITIAL_VALUES}
            validate={validateInputs}
            onSubmit={props.onSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="title" label="Title" component={PortInput} />
                    <Field type="text" name="company" label="Company" component={PortInput} />
                    <Field type="text" name="location" label="Location" component={PortInput} />
                    <Field type="text" name="position" label="Position" component={PortInput} />
                    <Field type="textarea" name="description" component="textarea" label="Description" component={PortInput} />
                    <Field name="startDate" label="Start Date" component={PortDate} />
                    <Field name="endDate" label="End Date" component={PortDate} canBeDisable={true}/>

                    {
                        props.error &&
                        <Alert color="danger">
                            {props.error}
                        </Alert>
                    }

                    <Button size="lg" color="success" type="submit" disabled={isSubmitting}>
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    </div>
);

export default PortfolioCreateForm;