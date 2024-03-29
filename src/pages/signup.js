import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import axios from 'axios';
import { useRouter } from 'next/router';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    try {
      const response = await axios.post('/api/signup', { email, password });
      console.log(response.data);
      localStorage.setItem('userEmail', response.data.email);
      localStorage.setItem('token', response.data.token);
      router.push('/');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Failed to sign up');
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-6 text-center tracking-wide"
          >
            Sign Up
          </motion.h1>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSignup}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-0 top-0 mt-3 mr-4 text-black"
                  style={{ filter: 'invert()' }}
                >
                  {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                </motion.button>
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-0 top-0 mt-3 mr-4 text-black"
                  style={{ filter: 'invert()' }}
                >
                  {showConfirmPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                </motion.button>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <button
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </motion.div>
          </motion.form>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-4 text-gray-400"
          >
            Already have an account?{' '}
            <Link href="/login" className="text-white font-semibold">
              Log In
            </Link>
          </motion.p>
        </div>
      </main>
    </>
  );
};

export default Signup;