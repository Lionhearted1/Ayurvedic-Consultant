"use client"
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormWrapper from '../components/FormWrapper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { useRouter, useSearchParams } from 'next/navigation'; // Use 'next/router' instead of 'next/navigation'
import axios from 'axios'; // Import axios
import RedirectSearchComponent from '../components/RedirectSearchComponent';


const Page = () => {
  const router = useRouter();
  const userparams=useSearchParams();

  const name=userparams.get('name')
  const role=userparams.get('role')

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
  };

  const buttonOnchange = async (e) => {

    const email = values.email;
    const password = values.password;

    if (password !== values.confirmPassword) {
      toast.error('Password and Confirm Password do not match');
      return;
    }
    let response;

    try {
      response = await axios.post('http://localhost:3002/auth/register', {
        name, 
        role, 
        email,
        password,
      },{validateStatus: function (status) {
        return status < 501; // Resolve only if the status code is less than 500
      }});
      // Handle the response here.
      if(response.status===200){
      toast.success(response.data.status);
      localStorage.setItem('username',name)
      localStorage.setItem('isLogged',"true")
      setTimeout(()=>{router.push(`/search`)},1000)
      }else{
        toast.error(response.data.error)
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const isLogged = localStorage.getItem("isLogged");
  if (isLogged == "true") {
    return (
      <>
        <RedirectSearchComponent />
      </>
    );
  }

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
