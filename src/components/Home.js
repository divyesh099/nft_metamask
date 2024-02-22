import React from 'react'
import { useAuth } from './context/auth-context';
import { formatChainAsNum } from './utils';

function Home() {
    const { setLoading, setIsAuthenticated, metaMaskData, setMetaMaskData, logout } = useAuth();

    return (
        <div className="wallet-content">
            <p>{metaMaskData.walletAddress && metaMaskData.walletAddress.length > 0
                ? `Connected to: ${metaMaskData.walletAddress.substring(
                    0,
                    6
                )}...${metaMaskData.walletAddress.substring(38)}`
                : "Connect Wallet"}</p>
            {metaMaskData.walletBalance && <p>Wallet Balance: {metaMaskData.walletBalance}</p>}
            {metaMaskData.chainId && (
                <>
                    <p>Hex ChainId: {metaMaskData.chainId}</p>
                    <p>Numeric ChainId: {formatChainAsNum(metaMaskData.chainId)}</p>
                </>
            )}
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Home