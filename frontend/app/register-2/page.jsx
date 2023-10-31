"use client"
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FormWrapper from '../components/FormWrapper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';


const Page = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      toast.error('Password and Confirm Password do not match');
      return;
    }
    console.log(values)
    // Continue with your form submission logic here if the passwords match.
  };

  const buttonOnchange = () => {
    console.log('button change');
    console.log(values)
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ToastContainer/>
        <FormWrapper heading="Register">
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />

          <FormInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          />

          <FormButton
            buttonText="Register"
            registerText="Already have an account?"
            linkText="Login"
            href="/login"
            onClick={buttonOnchange}
          />
        </FormWrapper>
      </form>
    </>
  );
};

export default Page;
