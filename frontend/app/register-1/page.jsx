"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import FormWrapper from '../components/FormWrapper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import DropdownInput from '../components/DropdownInput';
import RedirectSearchComponent from '../components/RedirectSearchComponent';


const Page = () => {

  const router = useRouter(); // Initialize the router

  const [selectedItem, setSelectedItem] = useState(''); // State to track the selected item
  const handleSelectChange = (e) => {
    setSelectedItem(e.target.value); // Update the selected item when the dropdown value changes
  };

  const [name, setName] = useState(''); // State to track the name input
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

const query=`?name=${name}&role=${selectedItem}`

  const buttonOnchange = () => {
    // Navigate to "/register-2" with data using router.push

    router.push(`/register-2${query}`)
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
      <form >
        <FormWrapper heading="Register">
          <FormInput
            label="Name"
            type="text"
            value={name}
            onChange={handleNameChange}
          />

          <DropdownInput
            value={selectedItem}
            onChange={handleSelectChange}
            label="Role"
          />

          <FormButton
            buttonText="Next"
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
