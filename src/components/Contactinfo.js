import React, { useState } from 'react';
import { useAuth } from './context/auth-context';
import { useNavigate } from 'react-router-dom';

const ContactInformation = () => {
    const { setMetaMaskData } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!name.trim()) {
            errors.name = "Name is required";
        }
        if (!email.trim()) {
            errors.email = "Email is required";
        }
        if (!phone.trim()) {
            errors.phone = "Phone is required";
        }
        if (!shippingAddress.trim()) {
            errors.shippingAddress = "Shipping address is required";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setMetaMaskData(prevState => ({
                ...prevState,
                name,
                email,
                phone,
                shippingAddress,
            }))
            setShippingAddress('');
            setName('')
            setPhone('')
            setEmail('')
            navigate('/PaymentInfo')
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleShippingAddressChange = (e) => {
        setShippingAddress(e.target.value);
    };

    return (
        <div className="container">
            <h2 className='ClaimHeading'>Contact Information</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Full Name"
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email"
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                    <p>
                        To receive confirmations and updates regarding your product claim and to receive extras. Upon claiming your physical item, you might be surprised with complimentary gifts such as airdrops, object files for 3D printing, .stl files for CNC machining, augmented reality files to visualize the art in your space, plus offset tokens for purchasing additional products from Nash and Werthan Trading Company via NASH-HOC (fungible coupon). These goodies may be sent to your wallet address, your email, or both.
                    </p>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="Phone"
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </div>
                <h2>Shipping and Delivery Details</h2>
                <div className="form-group">
                    <label htmlFor="shippingAddress">Shipping Address:</label>
                    <textarea
                        id="shippingAddress"
                        value={shippingAddress}
                        onChange={handleShippingAddressChange}
                        rows={4}
                        placeholder="Address"
                    />
                    {errors.shippingAddress && <span className="error">{errors.shippingAddress}</span>}
                </div>
                <button type="submit" className="btn-submit">Submit</button>
            </form>
        </div>
    );
};

export default ContactInformation;
