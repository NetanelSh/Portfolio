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

    const startDate = new Date(values.startDate);
    const endDate = new Date(values.endDate);

    if (startDate && endDate && (endDate < startDate)) {
        errors.endDate = 'End date cannot be before start date!';
    }

    return errors;
}

const PortfolioCreateForm = ({ initialValues, onSubmit, error }) => (
  <div>
    <Formik
      initialValues={initialValues}
      validate={validateInputs}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="title" label="Title" component={PortInput} />
          <Field
            type="text"
            name="company"
            label="Company"
            component={PortInput}
          />
          <Field
            type="text"
            name="location"
            label="Location"
            component={PortInput}
          />
          <Field
            type="text"
            name="position"
            label="Position"
            component={PortInput}
          />
          <Field
            type="textarea"
            name="description"
            component="textarea"
            label="Description"
            component={PortInput}
          />
          <Field
            name="startDate"
            label="Start Date"
            initialDate={initialValues.startDate}
            component={PortDate}
          />
          <Field
            name="endDate"
            label="End Date"
            initialDate={initialValues.endDate}
            component={PortDate}
            canBeDisable={true}
          />
          {error && <Alert color="danger">{error}</Alert>}
          <Button
            size="lg"
            color="success"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioCreateForm;