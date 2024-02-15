import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MetaMaskLogin from './components/MetaMaskLogin';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MetaMaskLogin />} />
            </Routes>
        </Router>
    );
}

export default App;
