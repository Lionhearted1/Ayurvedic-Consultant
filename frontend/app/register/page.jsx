"use client"
import React, { useState } from 'react';

import FormWrapper from '../components/FormWrapper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

const Page = () => {

  const [values, setValues] = useState({
    email: '', 
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value  
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
  }

  const buttonOnchange = () => {
    console.log("button change");
  };

  return (
    <>
    
      <form className onSubmit={handleSubmit}>
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
}

export default Page;