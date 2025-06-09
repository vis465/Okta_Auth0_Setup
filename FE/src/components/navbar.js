import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/" className="text-white text-lg font-bold">My App</a>
                <div>
                    {!isAuthenticated ? (
                        <button
                            onClick={() => loginWithRedirect()}
                            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
                        >
                            Log In
                        </button>
                    ) : (
                        <div className="flex space-x-4">
                            <a
                                href="/profile"
                                className="text-white px-4 py-2 hover:bg-blue-700 rounded"
                            >
                                Profile
                            </a>
                            <button
                                onClick={() => logout({ returnTo: window.location.origin })}
                                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
                            >
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;