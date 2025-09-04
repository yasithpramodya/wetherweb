import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual password reset logic (API call)
    console.log('Password reset requested for:', email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We'll send you a link to reset it.
          </p>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="e.g. username@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                         shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Send Reset Link
            </button>
          </div>

          <div className="text-center text-sm">
            <Link to="/signin" className="text-sky-600 hover:text-sky-500 font-medium">
              Back to sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
