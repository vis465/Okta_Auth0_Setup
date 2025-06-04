import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute({ children }) {
      const { isAuthenticated } = useAuth0();
      return isAuthenticated ? children : <Navigate to="/" />;
    }
