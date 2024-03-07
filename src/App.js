import React, { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import MetaMaskLogin from './components/MetaMaskLogin';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/ChoicesPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import DocumentPage from './components/DocumentPage';
import ClaimProductPage from './components/ClaimProductPage';
import ContactInformation from './components/Contactinfo';
import PaymentInfo from './components/PaymentInfo';
import JsonDataViewer from './components/JsonDataViewer';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MetaMaskLogin />} />
                <Route path="/Home" element={<PrivateRoute element={<Home />} />} />
                <Route path="/NashWerthan" element={<PrivateRoute element={<DocumentPage />} />} />
                <Route path="/ClaimProduct" element={<PrivateRoute element={<ClaimProductPage />} />} />
                <Route path="/ContactInfo" element={<PrivateRoute element={<ContactInformation />} />} />
                <Route path="/PaymentInfo" element={<PrivateRoute element={<PaymentInfo />} />} />
                <Route path="/regular-metadata/:filename" element={<RegularMetadata />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

function RegularMetadata() {
    const [jsonData, setJsonData] = useState(null);
    const { filename } = useParams();
    const jsonDataPath = `https://nft-json-deta.fra1.digitaloceanspaces.com/json-files/${filename}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(jsonDataPath);
                console.log(response);
                if (!response.ok) {
                    throw new Error('Error fetching JSON');
                }
                const data = await response.json();
                setJsonData(data);
            } catch (error) {
                console.error('Error fetching JSON:', error);
            }
        };
        fetchData();
    }, [jsonDataPath]);

    return jsonData ? <JsonDataViewer data={jsonData} /> : null;
}

export default App;
