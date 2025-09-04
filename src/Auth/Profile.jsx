import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  // In a real app, you would get this data from your authentication state
  const user = {
    name: "John Doe",
    email: "john@example.com",
    joined: "January 2023"
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-sky-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Your Profile</h1>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600">
                {user.name.charAt(0)}
              </div>
            </div>
            <h2 className="text-xl font-semibold text-center">{user.name}</h2>
            <p className="text-gray-600 text-center">{user.email}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Member since</span>
              <span>{user.joined}</span>
            </div>
            
            <Link
              to="/tasks"
              className="block mt-6 w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              View Your Tasks
            </Link>
            
            <button
              className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => {
                // Add logout logic here
                console.log('User logged out');
                window.location.href = '/signin';
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;