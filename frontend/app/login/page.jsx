"use client";
import React, { useState } from "react";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import FormWrapper from "../components/FormWrapper";

const Page = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
  }

  const buttonOnchange = () => {
    console.log("button change");
  };

  return (
    <>
        <form onSubmit={handleSubmit}>
      <FormWrapper heading="Login">
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={state.email}
            onChange={onChangeHandle}
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={state.password}
            onChange={onChangeHandle}
          />
          <FormButton
            buttonText="Login"
            registerText="Don't have an account?"
            linkText="Register"
            href="/register"
            onClick={buttonOnchange}
          />
      </FormWrapper>
        </form>
    </>
  );
};

export default Page;
