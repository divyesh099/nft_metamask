import React, { useState } from 'react';
import './PaymentInfo.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from './context/auth-context';
import { toast } from 'react-toastify';

function PaymentInfo() {
    const [shippingMethod, setShippingMethod] = useState('triangleTube');
    const { setMetaMaskData, metaMaskData } = useAuth();
    const [isFramed, setIsFramed] = useState(false);
    const [isFramedDisable, setIsFramedDisable] = useState(false);
    const [isInternational, setIsInternational] = useState(false);
    const [selectedFields, setSelectedFields] = useState({
        shippingMethod: '',
        isInternational: false,
        isFramed: false,
    });

    const handlingFee = 5;
    const frameFee = 80;

    const shippingCosts = {
        triangleTube: {
            domestic: 26,
            international: 43,
        },
        box: {
            domestic: 43,
            international: 62,
        },
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleShippingChange = (event) => {
        setShippingMethod(event.target.value);
        setSelectedFields({ ...selectedFields, shippingMethod: event.target.value });
        if (event.target.value === 'box') {
            setIsFramed(true);
            setIsFramedDisable(true);
        } else {
            setIsFramedDisable(false);
        }
    };

    const handleFrameChange = () => {
        setIsFramed(!isFramed);
        setSelectedFields({ ...selectedFields, isFramed: !isFramed });
    };

    const handleInternationalChange = () => {
        setIsInternational(!isInternational);
        setSelectedFields({ ...selectedFields, isInternational: !isInternational });
    };

    const calculateTotal = () => {
        let total = handlingFee;

        if (shippingMethod === 'triangleTube') {
            total += isInternational ? shippingCosts.triangleTube.international : shippingCosts.triangleTube.domestic;
        } else if (shippingMethod === 'box') {
            total += isInternational ? shippingCosts.box.international : shippingCosts.box.domestic;
        }

        if (isFramed) {
            total += frameFee;
        }

        return total;
    };
    const handleCheckout = () => {
        const total = calculateTotal();
        const selectedType = {
            type: shippingMethod,
            price: shippingMethod === 'triangleTube' ? (isInternational ? `international: $${shippingCosts.triangleTube.international}` : `domestic: $${shippingCosts.triangleTube.domestic}`) : (isInternational ? `international: $${shippingCosts.box.international}` : `domestic: $${shippingCosts.box.domestic}`)
        };
        const checkoutInfo = {
            ShippingMethod: selectedType,
            FramePrice: isFramed ? 80 : 0,
            totalCost: total,
            HandlingFee: 5,
            PhysicalProductCost: 0,
        };
        setMetaMaskData(prevState => ({
            ...prevState,
            checkoutInfo,
        }))
        handleShow(true)
    };

    const handleFinalCheckout = () => {
        if (metaMaskData?.walletBalance >= metaMaskData?.checkoutInfo.totalCost) {
            // toast.success('Thank you for your order! Your order will be shipped within 48 hours.  In the event this physical item has already been produced and shipped.')
            toast.error('something error in purchase order');
            setShow(false)
        } else {
            toast.error('insufficient balance in your wallet');
        }
    }



    return (
        <div className="container main-info">
            <h2 className="ClaimHeading mb-4">Costs and Payment Information</h2>
            <p>
                <span>Cost of Physical Product: </span>
                <span>$0</span>
            </p>
            <p>
                <span>Postage & Handling Fee: </span>
                <span>${handlingFee} (flat rate)</span>
            </p>
            <p>
                <span>Shipping Method:</span>
                <span>
                    <select value={shippingMethod} onChange={handleShippingChange} className='form-select'>
                        <option value="triangleTube">Triangle Shipping Tube</option>
                        <option value="box">Box Shipping (Frame Only)</option>
                    </select>
                </span>
            </p>
            {shippingMethod && (
                <div>
                    <div className='border-0 mb-0'>
                        <label>
                            <input type="checkbox" checked={isInternational} onChange={handleInternationalChange} />
                            International Shipping
                        </label>
                    </div>
                    <p className='border-bottom pb-1'>
                        <span>Shipping Costs {isInternational ? `(International):` : `(Domestic):`}</span>
                        <span>
                            ${isInternational ? `${shippingMethod === 'triangleTube' ? shippingCosts.triangleTube.international : shippingCosts.box.international}` : `${shippingMethod === 'triangleTube' ? shippingCosts.triangleTube.domestic : shippingCosts.box.domestic}`}
                        </span>
                    </p>
                </div>
            )}
            <p>
                <span className='d-flex'>
                    <input type="checkbox" checked={isFramed} onChange={handleFrameChange} disabled={isFramedDisable} />
                    <span>Include Frame (black frame only): </span>
                </span>
                <span>{isFramed ? '$80' : '$0'}</span>
            </p>
            <h3 className='d-flex align-items-center justify-content-between py-2'>
                <span>Total:</span>
                <span>${calculateTotal()}</span>
            </h3>
            <button className='d-block mx-auto btn btn-success' onClick={handleCheckout}>Checkout</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Before Checkout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Review all associated costs, including shipping, handling, monthly storage (if applicable), and framing fees. This page will provide a total cost breakdown and facilitate payment to complete the claim process</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Review
                    </Button>
                    <Button variant="success" onClick={handleFinalCheckout}>
                        Checkout
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PaymentInfo;

