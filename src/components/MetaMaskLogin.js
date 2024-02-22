import React, { useEffect } from "react";
import { toast } from "react-toastify";
import detectEthereumProvider from "@metamask/detect-provider";
import metamaskLogo from '../assets/MetaMask.png';
import { formatBalance, formatChainAsNum } from './utils';
import { useAuth } from "./context/auth-context";
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';

const MetaMaskLogin = () => {
    const { setLoading, setIsAuthenticated, setMetaMaskData, logout } = useAuth();
    const navigate = useNavigate();
    const SECRET_KEY = '8hx(C#O6$RtRkV0Vcu^8J#^INVfHH!OC';

    useEffect(() => {
        const fetchData = async () => {
            const encrypted = localStorage.getItem('encryptedData');
            if (encrypted) {
                const decryptedBytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
                const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
                const decryptedData = JSON.parse(decryptedString);

                const currentTime = new Date().getTime();
                if (currentTime < decryptedData.expiry) {
                    setMetaMaskData(prevState => ({
                        ...prevState,
                        signature: decryptedData.signature,
                    }))
                    await fetchWalletInfo();
                } else {
                    localStorage.removeItem('encryptedData');
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const fetchWalletInfo = async () => {
        try {
            const provider = await detectEthereumProvider();
            if (provider) {
                const accounts = await provider.request({ method: "eth_requestAccounts" });
                if (accounts.length > 0) {
                    const address = accounts[0];
                    const balance = await provider.request({
                        method: "eth_getBalance",
                        params: [address, "latest"],
                    });
                    const networkId = await provider.request({ method: "net_version" });
                    setMetaMaskData(prevState => ({
                        ...prevState,
                        walletAddress: address,
                        walletBalance: formatBalance(balance),
                        chainId: networkId
                    }));
                    setIsAuthenticated(true);
                    navigate('/Home');
                } else {
                    setIsAuthenticated(false);
                }
            } else {
                window.open("https://metamask.io/download/", "_blank");
            }
        } catch (error) {
            console.error("Error fetching wallet info:", error.message);
            const errorMessage = error.message.split(":")[1]?.trim();
            toast.error(errorMessage ? errorMessage : error.message);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const loginWithMetaMask = async () => {
        setLoading(true);
        try {
            const provider = await detectEthereumProvider();
            if (provider) {
                const accounts = await provider.request({ method: "eth_requestAccounts" });
                if (accounts.length > 0) {
                    const address = accounts[0];
                    const message = `This request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n${address}`;
                    const signature = await provider.request({
                        method: "personal_sign",
                        params: [message, address],
                    });
                    const currentTime = new Date().getTime();
                    const encryptedData = { signature, expiry: currentTime + 24 * 60 * 60 * 1000 };
                    const encryptedString = JSON.stringify(encryptedData);
                    const encrypted = CryptoJS.AES.encrypt(encryptedString, SECRET_KEY).toString();
                    localStorage.setItem('encryptedData', encrypted);
                    const balance = await provider.request({
                        method: "eth_getBalance",
                        params: [address, "latest"],
                    });
                    const networkId = await provider.request({ method: "net_version" });
                    setMetaMaskData(prevState => ({
                        ...prevState,
                        walletAddress: address,
                        walletBalance: formatBalance(balance),
                        chainId: networkId,
                        signature
                    }));
                    toast.success('Successfully logged in with MetaMask.')
                    setIsAuthenticated(true);
                    navigate('/Home');
                } else {
                    setIsAuthenticated(false);
                }
            } else {
                window.open("https://metamask.io/download/", "_blank");
            }
        } catch (error) {
            console.error("Error connecting to MetaMask:", error.message);
            const errorMessage = error.message.split(":")[1]?.trim();
            toast.error(errorMessage ? errorMessage : error.message);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="metamask-btn">
            <button onClick={loginWithMetaMask} style={styles.button}>
                <img src={metamaskLogo} alt="Metamask Logo" style={styles.logo} />
                Login with Metamask
            </button>
        </div>
    );
};

const styles = {
    button: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: '#785f16',
        color: '#FFFFFF',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
        outline: 'none',
    },
    logo: {
        width: '30px',
        marginRight: '10px',
    },
};

export default MetaMaskLogin;
