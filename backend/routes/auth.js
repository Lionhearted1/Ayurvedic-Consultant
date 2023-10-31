"use client"
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Import Axios
import { useRouter } from 'next/router'; // Import useRouter from Next.js

import FormWrapper from '../components/FormWrapper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

const Page = () => {
  const router = useRouter(); // Initialize the router

  const [values, setValues] = useState({
    name: router.query.name || '', // Obtain name from router or set to an empty string
    role: router.query.role || '', // Obtain role from router or set to an empty string
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

    // Continue with your form submission logic here if the passwords match.
  };

  const buttonOnchange = async () => {
    if (values.password !== values.confirmPassword) {
      toast.error('Password and Confirm Password do not match');
      return;
    }

    if (!(values.name && values.role && values.email && values.password)) {
      toast.error('Please fill in all the required fields');
      return;
    }

    // Prepare the data to send
    const data = {
      name: values.name,
      role: values.role,
      email: values.email,
      password: values.password,
    };

    try {
      // Send a POST request to your server using async/await
      const response = await axios.post('/your-api-endpoint', data);

      // Handle a successful response
      toast.success('Registration Successful');
      // Optionally, you can reset the form fields here
      setValues({
        name: '',
        role: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      // Handle an error response
      toast.error('Registration Failed');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ToastContainer />
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
