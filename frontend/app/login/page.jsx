"use client";
import React, { useState } from "react";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import FormWrapper from "../components/FormWrapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import RedirectSearchComponent from "../components/RedirectSearchComponent";

const Page = () => {


  const router = useRouter();
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const buttonOnchange = async (e) => {
    let response;
    const email = state.email;
    const password = state.password;

    try {
      response = await axios.post(
        "http://localhost:3002/auth/login",
        {
          email,
          password,
        },
        {
          validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
          },
        }
      );
      // Handle the response here.
      if (response.status === 200) {
        console.log("Hello");
        toast.success(response.data.status);
        let name = response.data.name;
        localStorage.setItem("username", name);
        localStorage.setItem("isLogged", "true");
        setTimeout(() => {
          router.push(`/search?name=${name}`);
        }, 500);
      } else {
        toast.error(response.data.error);
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
      <ToastContainer />
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
            href="/register-1"
            onClick={buttonOnchange}
          />
        </FormWrapper>
      </form>
    </>
  );
};

export default Page;
