import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import detectEthereumProvider from "@metamask/detect-provider";
import Loder from "./common/Loader";
import metamaskLogo from '../assets/MetaMask.png';
import { formatBalance, formatChainAsNum } from './utils';

const MetaMaskLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [walletBalance, setWalletBalance] = useState("");
    const [chainId, setChainId] = useState("");
    const [signature, setSignature] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("signatureToken");
        const expiration = localStorage.getItem("signatureTokenExpiration");

        if (token && expiration && new Date(expiration) > new Date()) {
            setSignature(token);
            setIsLoggedIn(true);
            fetchWalletInfo()
        }
    }, []);

    const fetchWalletInfo = async () => {
        try {
            const provider = await detectEthereumProvider();
            if (provider) {
                const accounts = await provider.request({ method: "eth_requestAccounts" });
                if (accounts.length > 0) {
                    const address = accounts[0];
                    setWalletAddress(address);
                    const balance = await provider.request({
                        method: "eth_getBalance",
                        params: [address, "latest"],
                    });
                    setWalletBalance(formatBalance(balance));
                    const networkId = await provider.request({ method: "net_version" });
                    setChainId(networkId);
                    setIsLoggedIn(true);
                } else {
                    console.log("No accounts found in MetaMask.");
                }
            } else {
                window.open("https://metamask.io/download/", "_blank");
            }
        } catch (error) {
            console.error("Error fetching wallet info:", error.message);
            const errorMessage = error.message.split(":")[1]?.trim();
            toast.error(errorMessage ? errorMessage : error.message);
        } finally {
            setIsLoading(false);
        }
    };


    const loginWithMetaMask = async () => {
        setIsLoading(true);
        try {
            const provider = await detectEthereumProvider();
            if (provider) {
                const accounts = await provider.request({ method: "eth_requestAccounts" });
                if (accounts.length > 0) {
                    const address = accounts[0];
                    setWalletAddress(address);
                    console.log("Logged in with MetaMask. Wallet Address:", address);
                    const message = `This request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n${address}`;
                    const signature = await provider.request({
                        method: "personal_sign",
                        params: [message, address],
                    });
                    setSignature(signature);
                    localStorage.setItem("signatureToken", signature);
                    const expiration = new Date();
                    expiration.setHours(expiration.getHours() + 12);
                    localStorage.setItem("signatureTokenExpiration", expiration);
                    const balance = await provider.request({
                        method: "eth_getBalance",
                        params: [address, "latest"],
                    });
                    setWalletBalance(formatBalance(balance));
                    const networkId = await provider.request({ method: "net_version" });
                    setChainId(networkId);
                    setIsLoggedIn(true);
                    toast.success('Successfully logged in with MetaMask.')
                    console.log("Signature:", signature);
                } else {
                    console.log("No accounts found in MetaMask.");
                }
            } else {
                window.open("https://metamask.io/download/", "_blank");
            }
        } catch (error) {
            console.error("Error connecting to MetaMask:", error.message);
            const errorMessage = error.message.split(":")[1]?.trim();
            toast.error(errorMessage ? errorMessage : error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setWalletAddress("");
        setSignature("");
        localStorage.removeItem("signatureToken");
        localStorage.removeItem("signatureTokenExpiration");
    };

    return (
        <div>
            {isLoading ? (
                <Loder />
            ) : (
                <div>
                    {!isLoggedIn ? (
                        <button onClick={loginWithMetaMask} style={styles.button}>
                            <img src={metamaskLogo} alt="Metamask Logo" style={styles.logo} />
                            Login with Metamask
                        </button>
                    ) : (
                        <div>
                            <p>{walletAddress && walletAddress.length > 0
                                ? `Connected: ${walletAddress.substring(
                                    0,
                                    6
                                )}...${walletAddress.substring(38)}`
                                : "Connect Wallet"}</p>
                            {walletBalance && <p>Wallet Balance: {walletBalance}</p>}
                            {chainId && (
                                <>
                                    <p>Hex ChainId: {chainId}</p>
                                    <p>Numeric ChainId: {formatChainAsNum(chainId)}</p>
                                </>
                            )}
                            <button onClick={logout}>Logout</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const styles = {
    button: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: '#1b75e5',
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
