import React, { useState } from 'react';
import './ChoicesPage.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ChoicesPage = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');


    const handleCheckboxChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedOption === 'NASH-WERTHAN Art Collection & Product Collaboration') {
            navigate('/NashWerthan');
        } else if (selectedOption === 'Werthan Art Collection') {
            toast.info('Not Available At This Time, The launch date is 07-01-2024', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <div className="second-page">
            <h2>Choices</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="radio"
                        name="product"
                        value="NASH-WERTHAN Art Collection & Product Collaboration"
                        checked={selectedOption === 'NASH-WERTHAN Art Collection & Product Collaboration'}
                        onChange={handleCheckboxChange}
                    />
                    NASH-WERTHAN Art Collection & Product Collaboration
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name="product"
                        value="Werthan Art Collection"
                        checked={selectedOption === 'Werthan Art Collection'}
                        onChange={handleCheckboxChange}
                    />
                    Werthan Art Collection
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ChoicesPage;
