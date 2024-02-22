import React, { createContext, useContext, useState } from 'react';
import Loader from '../common/Loader';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [metaMaskData, setMetaMaskData] = useState({
        walletAddress: "",
        walletBalance: "",
        chainId: "",
        signature: ""
    });

    const logout = () => {
        setLoading(false);
        setMetaMaskData({
            walletAddress: "",
            walletBalance: "",
            chainId: "",
            signature: ""
        });
        setIsAuthenticated(false);
        localStorage.removeItem("encryptedData");
    };


    if (loading) {
        return <Loader />;
    }

    return (
        <AuthContext.Provider value={{ loading, isAuthenticated, metaMaskData, setMetaMaskData, setIsAuthenticated, setLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
