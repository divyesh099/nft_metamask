import React, { useState } from 'react';
import './DocumentPage.css';
import { toast } from 'react-toastify';
import termsAndConditionsPDF from '../assets/LICENSING RIGHTS draft temp delete example.pdf';

const DocumentPage = () => {
    const [isChecked, setIsChecked] = useState({
        acceptanceAgreement: false,
        privacy: false,
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (name === 'acceptanceAgreement' && checked) {
            downloadTermsAndConditions();
        }
        setIsChecked(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isChecked.acceptanceAgreement && isChecked.privacy) {
            console.log("Form submitted!");
            console.log("Acceptance Agreement Checked:", isChecked.acceptanceAgreement);
            console.log("Privacy Checked:", isChecked.privacy);
        } else {
            toast.error("Please read and agree to the terms of service and privacy policy", { position: "bottom-right" });
        }
    };

    const downloadTermsAndConditions = () => {
        const a = document.createElement('a');
        a.href = termsAndConditionsPDF;
        a.download = 'terms_and_conditions.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };


    return (
        <div className="document-page">
            <h2>NASH-WERTHAN ART COLLECTION & PRODUCT COLLABORATION</h2>
            <div className='describe'>
                <h4>THANK YOU:</h4>
                <p>
                    Thank you for purchasing a non-fungible token (the "NFT") on the blockchain. Along with this purchase, you will receive a physical product. This physical product may be a poster, hat, shirt, t-shirt, or any other type of physical object that was promised at the time of purchase (the "Physical Product"). There is always a 1:1 ratio of product to NFT. Therefore, if you buy the NFT, you get a Physical Product. Conversely, if you purchase the Physical Product in a brick-and-mortar store, either in person or on the internet, you will receive a corresponding NFT; it's that simple. You must claim their Physical Product by 12-31-24 or it will not be redeemable.
                </p>
                <h4>CLAIM FORM:</h4>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="checkbox"
                            name="acceptanceAgreement"
                            checked={isChecked.acceptanceAgreement}
                            onChange={handleCheckboxChange}
                        />
                        CONDITIONAL ACCEPTANCE AGREEMENT. By clicking this box, you acknowledge that you have read the disclaimer and the conditional acceptance agreement in the non-fungible and fungible token smart contracts (The “Agreement”). (this “Agreement” can be a link that downloads PDF of the Conditional Acceptance Agreement)
                    </label>
                    <br />
                    <label>
                        <input
                            type="checkbox"
                            name="privacy"
                            checked={isChecked.privacy}
                            onChange={handleCheckboxChange}
                        />
                        PRIVACY: We respect your privacy and do not retain your personal information, except for the postage records and proof that the Physical Product was shipped to the name and address you provide on the form. You have the option to send it to yourself or to someone else of your choosing. You own it and are free to do what you want with it. We do retain your login information along with your wallet address to confirm that you logged in and ordered the Physical Product. If your wallet address does not match the address that purchased the NFT, you will not be able to obtain your Physical Product. Only one Physical Product will be produced per NFT; if it has already been produced, you will not be able to request another one.
                    </label>
                    <br />
                    <button type="submit" className="document-page-submit">CLAIM PRODUCT NOW</button>
                </form>
            </div>
        </div>
    );
};

export default DocumentPage;
