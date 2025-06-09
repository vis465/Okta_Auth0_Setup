import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState(null);
  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
      const token = await getAccessTokenSilently();
      console.log(token)
      const token1= await getAccessTokenSilently({audience:""})
const decoded = jwtDecode(token);

// Access roles from custom claim (replace with your namespace)
const roles = decoded["dev-u1gdkhrrw304d3qq.us.auth0.com/roles"] || [];

console.log("User roles:", roles);

        console.log('Access Token:', token);
        setToken(token);
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken);
        console.log('Decoded:', decodedToken);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    if (isAuthenticated) {
      fetchToken();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

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
          <p> role: {user.role}</p>

          <pre className="text-left mt-4 bg-gray-100 p-4 rounded">
            {JSON.stringify(user, null, 2)}
          </pre>

          {token && (
            <div className="mt-4 text-left">
              <h3 className="font-semibold">Access Token:</h3>
              <code className="text-xs break-all">{token}</code>
            </div>
          )}

          {decoded && (
            <div className="mt-4 text-left">
              <h3 className="font-semibold">Decoded Token:</h3>
              <pre className="text-xs bg-gray-200 p-2 rounded">
                {JSON.stringify(decoded, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
