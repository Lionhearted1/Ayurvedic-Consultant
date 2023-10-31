"use client"
import React, { useState } from 'react';
import FormWrapper from '../components/FormWrapper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import DropdownInput from '../components/DropdownInput';


const Page = () => {


  const [selectedItem, setSelectedItem] = useState(""); // State to track the selected item

  const handleSelectChange = (e) => {
    setSelectedItem(e.target.value); // Update the selected item when the dropdown value changes
  };

  const handleDropdownChange = (e) => {
    // Handle the dropdown change logic here
    console.log("Selected item:", e.target.value);
  };

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
        label="Name"
        type="" 
        name=""
        value={values.email}
        onChange={handleChange} 
      />

      <DropdownInput 
        onChange={handleDropdownChange} label="Role"
       />

      <FormButton 
        buttonText="Next"
        registerText="Already have an account?"
        linkText="Login"
        href="/register-1"
        onClick={buttonOnchange}
      />
    </FormWrapper>
</form>
</>
  );
}

export default Page;