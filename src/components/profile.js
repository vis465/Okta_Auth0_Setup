import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

async function gettoken(func) {
  
  try {
    const token = await func();
    console.log('Access Token:', token);
    return token;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
}

const Profile =  () => {
 const { user, isAuthenticated, isLoading,getAccessTokenSilently } = useAuth0();
 const token=  gettoken(getAccessTokenSilently);
console.log('token', token);


    if (isLoading) {
        return <div className="container mx-auto mt-8 text-center">Loading...</div>;
      }

      if (!isAuthenticated) {
        return <Navigate to="/" />;
      }

      return (
        <div className="container mx-auto mt-8 text-center">
          <h1 className="text-3xl font-bold mb-4">User Profile</h1>
          {user && (
            <div className="bg-white shadow-md rounded p-6 max-w-md mx-auto">
              <img
                src={user.picture}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              
              <pre className="text-left mt-4 bg-gray-100 p-4 rounded">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          )}
        </div>
      );
};

export default Profile;
