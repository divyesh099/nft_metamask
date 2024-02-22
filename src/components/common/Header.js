import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import './Header.css';
import { useAuth } from '../context/auth-context';
import { formatChainAsNum } from '../utils';

const Header = () => {
    const { metaMaskData, logout } = useAuth();
    const [userName, setUserName] = useState('N/A');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {

        metaMaskData.walletAddress && metaMaskData.walletAddress.length > 0
            ? setUserName(`${metaMaskData.walletAddress.substring(
                0,
                6
            )}...${metaMaskData.walletAddress.substring(38)}`) : setUserName('Connect Wallet');

    }, [])

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <header className="header">
            <div className="logo"> <Link to="/">NASH-WERTHAN</Link></div>
            <nav className="nav-links">
            </nav>
            <div className="user-dropdown">
                <DropdownButton
                    id="dropdown-basic-button"
                    title={'Wallet: ' + userName}
                    variant="success"
                    show={showDropdown}
                    onClick={toggleDropdown}
                >
                    <Dropdown.Item >Wallet Balance: {metaMaskData.walletBalance ? metaMaskData.walletBalance : 'N/A'}</Dropdown.Item>
                    <Dropdown.Item >Hex ChainId: {metaMaskData.chainId ? metaMaskData.chainId : 'N/A'}</Dropdown.Item>
                    <Dropdown.Item >Numeric ChainId: {metaMaskData.chainId ? formatChainAsNum(metaMaskData.chainId) : 'N/A'}</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                </DropdownButton>
            </div>
        </header>
    );
};

export default Header;
