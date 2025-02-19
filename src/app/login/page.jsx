'use client'
import * as React from "react";
import Cookies from 'js-cookie';
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const InputField = ({ label, type = "text", placeholder, icon, value, onChange }) => (
  <div className="flex flex-col w-full max-w-[435px] max-md:max-w-full">
    <label htmlFor={`${label.toLowerCase()}Input`} className="text-base text-neutral-900 max-md:max-w-full">
      {label}
    </label>
    <div className="flex gap-2.5 items-center px-8 py-5 mt-3 w-full text-base bg-white border border-solid border-neutral-900 min-h-[54px] rounded-[40px] text-zinc-400 max-md:px-5 max-md:max-w-full">
      <input
        type={type}
        id={`${label.toLowerCase()}Input`}
        placeholder={placeholder}
        className="flex-1 shrink gap-2.5 self-stretch my-auto w-full min-w-[240px] bg-transparent border-none outline-none"
        aria-label={placeholder}
        value={value}
        onChange={onChange}
      />
      {icon && (
        <img
          loading="lazy"
          src={icon}
          alt=""
          className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
        />
      )}
    </div>
  </div>
);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        router.push('/dashboard'); // Redirect to dashboard or home page

      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');

    }
  };


  return (
    <div className="flex overflow-hidden flex-col justify-center items-center px-10 py-14 bg-white rounded-3xl shadow-2xl max-md:px-5">
      <div className="flex flex-wrap gap-20 max-w-full">
        <Image 
          loading="lazy"
          src='/img/login-form/img-login-form.svg'
          alt="Login illustration"
          width='737'
          height='913'
          className="object-contain my-auto rounded-3xl aspect-[0.81] min-w-[240px] w-[737px] max-md:max-w-full"
        />
        <div className="flex flex-col justify-center min-w-[240px] w-[435px] max-md:max-w-full">
          <form onSubmit={handleSubmit} className="flex flex-col justify-center w-full bg-white max-md:max-w-full">
            <h1 className="self-center text-3xl font-bold text-center text-neutral-900">
              Login
            </h1>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            <div className="flex flex-col mt-20 w-full max-md:mt-10 max-md:max-w-full">
              <p className="text-base leading-6 text-green-900 max-md:max-w-full">
                Please enter your credentials to log in.
              </p>
              <div className="flex flex-col self-center mt-6 max-w-full w-[435px]">
              <InputField
                  label="Email"
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex flex-col mt-6 w-full max-w-[435px] max-md:max-w-full">
                  <InputField
                    label="Password"
                    type="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="flex justify-between items-center mt-2 w-full max-w-[432px] max-md:max-w-full">
                    <div className="flex gap-2.5 items-center self-stretch my-auto">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-6 h-6 rounded-md border border-solid border-zinc-400"
                        />
                        <span className="text-sm leading-5 text-zinc-900">Remember me</span>
                      </label>
                    </div>
                    <a href="#" className="text-sm leading-5 text-green-800">Forgot Password?</a>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="justify-center items-center px-16 py-5 mt-6 text-base font-semibold leading-6 text-white whitespace-nowrap bg-green-800 rounded-[40px] max-md:px-5 max-md:max-w-full"
              >
                Login
              </button>
              <div className="self-center mt-6 text-sm leading-5 text-center text-zinc-900">
                Don't have an account? <a href="#" className="font-semibold text-green-800">Sign up</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;