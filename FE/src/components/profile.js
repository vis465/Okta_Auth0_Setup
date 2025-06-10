import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

import axios from "axios"


const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenWithPopup, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState(null);
  const [decoded, setDecoded] = useState(null);
  const [data,Setdata]=useState(null)

  useEffect(async () => {
    const options = { authorizationParams: { audience: "http://story" } }; //modification here
    const token = await getAccessTokenSilently(options);
    setToken(token)
   const data=await axios.get(`http://localhost:4000/data/${token}`)
   Setdata(data);
   console.log(data.data)
    let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
   const adminstatus=await axios.get(`http://localhost:4000/admin/}`,config)
   console.log("adminstatus",adminstatus.message)

  }, [getAccessTokenSilently]);
  
  
// console.log(decoded)
  
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
          <h2 className="text-xl font-semibold">{user.userid ? user.userid : user.name}</h2>
          <p className="text-gray-600">{user.email}</p>


         
         <p>User data:</p>
         <pre>{JSON.stringify(decoded, null, 3)}</pre>


        </div>
      )}
    </div>
  );
};

export default Profile;
