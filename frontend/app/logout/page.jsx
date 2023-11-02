"use client"
import React from 'react'
import LogOutComponent from '../components/LogOutComponent'

const page = () => {
    localStorage.removeItem('username');
    localStorage.setItem('isLogged',"false")
  return (
    <>
      <LogOutComponent/>
    </>
  )
}

export default page
