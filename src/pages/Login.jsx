import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from '../context/AuthContext';

function Login() {

  const [rememberLogin, setRememberLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {user, logIn} = UserAuth()
  const navigate = useNavigate()

  const handleFormSubmit = async (e) => {
    e.preventDefault();

      try {
         await logIn(email, password)
         navigate("/")
      } catch (error) {
        console.log(error);
      }
  }


  return (
    <>
      <div className='w-full h-screen'>
        <img 
        src="https://assets.nflxext.com/ffe/siteui/vlv3/ff5587c5-1052-47cf-974b-a97e3b4f0656/065df910-dec3-46ae-afa8-7ad2b52dce40/IN-en-20240506-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="///" 
        className='hidden sm:block absolute w-full h-full object-cover'
        />
        <div className='bg-black/70 fixed top-0 w-full h-screen'/>

        <div className='fixed w-full px-4 py-24 z-20'>
          <div className='max-w-[450px] h-[500px] mx-auto bg-black/80 rounded-lg'>
            <div className=' max-w-[320px] mx-auto py-16'>
              <h1 className='text-3xl font-nsans-bold'>Login</h1>
              <form className='w-full flex flex-col py-4' onSubmit={handleFormSubmit}>
                <input 
                type="email" 
                placeholder='email'
                autoComplete='email'
                className='p-3 my-2 bg-gray-700 rounded'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                type="password" 
                placeholder='password'
                autoComplete='current-password'
                className='p-3 my-2 bg-gray-700 rounded'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button className='bg-red-600 py-3 my-6 rounded font-nsans-bold'>Login</button>

                <div className='flex justify-between items-center text-gray-600'>
                  <p>
                    <input 
                    type="checkbox"
                    className='mr-2'
                    checked={rememberLogin}
                    onChange={(e) => setRememberLogin(!rememberLogin)}
                    />
                    Remember me
                  </p>
                  <p>Need help?</p>

              </div>
              <p className='m-4'>
                <span className='text-gray-600 mr-2'>New to Netflix?</span>
                <Link to="/login">Sign Up</Link>
              </p>
            </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login