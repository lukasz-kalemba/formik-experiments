import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

import './App.css';

const App = ({ values, errors, touched, isSubmitting }) => (
  <div className='App'>
    <h1>Formik</h1>

    <Form>
      <div>
        {touched.email && errors.email && (
          <p className='error'>{errors.email}</p>
        )}
        <label htmlFor='email'>Email</label>
        <Field id='email' type='email' name='email' required />
      </div>

      <div>
        {touched.password && errors.password && (
          <p className='error'>{errors.password}</p>
        )}
        <label htmlFor='password'>Password</label>
        <Field id='password' type='password' name='password' required />
      </div>

      <label htmlFor='newsletter'>Newsletter</label>
      <Field
        id='newsletter'
        type='checkbox'
        name='newsletter'
        checked={values.newsletter}
      />

      <label htmlFor='plan'>Plan</label>
      <Field id='plan' component='select' name='plan'>
        <option value='free'>Free</option>
        <option value='premium'>Premium</option>
      </Field>

      <button type='submit' disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  </div>
);

const FormikApp = withFormik({
  mapPropsToValues() {
    return {
      email: '',
      password: '',
      newsletter: false,
      plan: 'free'
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Email not valid')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be 9 characters or longer')
      .required('Password is required')
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if (values.email === 'lukasz.kalemba1@gmail.com') {
        setErrors({ email: 'That email is already taken' });
      } else {
        resetForm();
        console.log(values);
      }
      setSubmitting(false);
    }, 2000);
  }
})(App);

export default FormikApp;
