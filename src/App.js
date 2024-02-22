import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MetaMaskLogin from './components/MetaMaskLogin';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MetaMaskLogin />} />
                <Route path="/Home" element={<PrivateRoute element={<Home />} />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
