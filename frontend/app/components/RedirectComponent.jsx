import React, { useEffect } from 'react'
import { useState } from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'


const RedirectComponent = () => {
    const router=useRouter();
    const [count,setCount]=useState(3)
    useEffect(()=>{
        setInterval(()=>{
            setCount(count-1)
        },1000)

        setTimeout(()=>{router.push('/login')},3000) 
    })
  return (
    <>
        <div className="wrap flex items-center justify-center text-white text-[1.2rem] px-8 text-center md:text-[2rem]">
            <p>You are not logged in.You will be redirected to <span className='inline-block text-blue-200'><Link href={'/login'}>login</Link></span> page in {count} </p>
            
        </div>
    </>
  )
}

export default RedirectComponent
