// Render Prop
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Alert } from 'reactstrap';

import WorkInput from '../form/WorkInput';

const validateInputs = (values) => {
    let errors = {};
    Object.entries(values).forEach(([key, value]) => {
        if (!values[key]) {
            errors[key] = `Field ${key} is Required!`;
        }
    })

    return errors;
}

const WorkCreateForm = ({ initialValues, onSubmit, error }) => (
  <div>
    <Formik
      initialValues={initialValues}
      validate={validateInputs}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="title" label="Title" component={WorkInput} />
          <Field
            type="text"
            name="company"
            label="Company"
            component={WorkInput}
          />
          <Field
            type="text"
            name="location"
            label="Location"
            component={WorkInput}
          />
          <Field
            type="text"
            name="position"
            label="Position"
            component={WorkInput}
          />
          <Field
            type="textarea"
            name="description"
            component="textarea"
            label="Description"
            component={WorkInput}
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

export default WorkCreateForm;