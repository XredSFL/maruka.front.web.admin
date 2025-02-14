'use client'
import * as React from "react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const InputField = ({ label, type = "text", placeholder, value, onChange }) => (
  <div className="flex flex-col w-full max-w-[435px] max-md:max-w-full">
    <label htmlFor={`${label.toLowerCase()}Input`} className="text-base text-neutral-900 max-md:max-w-full">
      {label}
    </label>
    <input
      type={type}
      id={`${label.toLowerCase()}Input`}
      placeholder={placeholder}
      className="px-8 py-5 mt-3 w-full text-base bg-white border border-solid border-neutral-900 min-h-[54px] rounded-[40px] text-zinc-400 max-md:px-5 max-md:max-w-full"
      aria-label={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch('/api/register-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        // Tambahkan juga sebagai cookie
        document.cookie = `token=${data.token}; path=/; max-age=86400; samesite=strict; secure`;
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
      <div className="flex flex-col justify-center min-w-[240px] w-[435px] max-md:max-w-full">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center w-full bg-white max-md:max-w-full">
          <h1 className="self-center text-3xl font-bold text-center text-neutral-900">
            Register
          </h1>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          <div className="flex flex-col mt-20 w-full max-md:mt-10 max-md:max-w-full">
            <p className="text-base leading-6 text-green-900 max-md:max-w-full">
              Create a new account
            </p>
            <div className="flex flex-col self-center mt-6 max-w-full w-[435px]">
              <InputField
                label="Email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="mt-6">
                <InputField
                  label="Password"
                  type="password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="justify-center items-center px-16 py-5 mt-6 text-base font-semibold leading-6 text-white whitespace-nowrap bg-green-800 rounded-[40px] max-md:px-5 max-md:max-w-full"
            >
              Register
            </button>
            <div className="self-center mt-6 text-sm leading-5 text-center text-zinc-900">
              Already have an account? <a href="/login" className="font-semibold text-green-800">Login</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;