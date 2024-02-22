import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import './DocumentPage.css';
import { useAuth } from './context/auth-context';
import { useNavigate } from 'react-router-dom';

function AccordionPage() {
    const { metaMaskData, setMetaMaskData } = useAuth();
    const navigate = useNavigate();
    const [nftProof, setNFTProof] = useState('');
    const [nftID, setNFTID] = useState('');
    const [walletAddress, setWalletAddress] = useState(metaMaskData?.walletAddress);
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!nftID.trim() || !walletAddress.trim()) {
            setError('Please fill out all required fields.');
            return;
        } else if (isNaN(nftID)) {
            setError('NFT ID must be a numeric value.');
            return;
        } else if (!/^(0x)?[0-9a-f]{40}$/i.test(walletAddress)) {
            setError('Please enter a valid Public Wallet Address.');
            return;
        } else {
            setError('');
            setMetaMaskData(prevState => ({
                ...prevState,
                nftProof,
                nftID,
            }))
            navigate('/ContactInfo')
        }
    };
    return (
        <div className="document-page">
            <h2 className='ClaimHeading'>CLAIM PRODUCT</h2>
            <div className='describe'>
                <Accordion defaultActiveKey="0" style={{ marginTop: '15px' }}>
                    <Accordion.Item eventKey="0" className='AccordionItemback'>
                        <Accordion.Header>
                            <span className='AccordionHead'>Total Supply & Rarity</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            Each NFT in our NASH-WERTHAN Collection is paired with a physical poster print, available in sizes of 9x12 inches (limited to 1,000 prints), 12x16 inches (limited to 1,000 prints), and 18x24 inches (restricted to 200 prints, with the first 100 sales classified as Limited Reproductions). Every print size comes with a Certificate of Authenticity, and the Limited Reproductions also include a Certificate of Title. Typically, these are delivered within 48 hours of the NFT purchase, and within 14 days for purchases made in a brick-and-mortar store.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" className='AccordionItemback'>
                        <Accordion.Header>
                            <span className='AccordionHead'>Benefits & Extra’s</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            Upon claiming your physical item, you might be surprised with complimentary gifts such as airdrops, object files for 3D printing, .stl files for CNC machining, augmented reality files to visualize the art in your space, plus offset tokens for purchasing additional products from nashᵀᴺ and Werthan Trading Company via NASH-HOC (fungible coupon).
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2" className='AccordionItemback'>
                        <Accordion.Header>
                            <span className='AccordionHead'>Collaboration</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            This NFT comes with exclusive goodies. We are thrilled to reveal treasured American artifacts, concealed for over a century, to the world. Werthan Trading Company has partnered with Nashᵀᴺ to present unique, one-of-a-kind artwork for NFTs, accompanied by a matching Physical Product with this offering. The NFT you have purchased and the Physical Product represent an outstanding collaboration between Nashᵀᴺ and Werthan Trading Company. This partnership unites the historic Werthan Art Collection with the iconic logos and trademarks of Nashᵀᴺ, creating a unique fusion of historical art and contemporary design within an exclusive NFT. It celebrates the transcending of art through time, blending traditional pieces with modern branding.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3" className='AccordionItemback'>
                        <Accordion.Header>
                            <span className='AccordionHead'>About Us</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            Nashᵀᴺ: Inspired by Nashville's skyline, Nashᵀᴺ has crafted a brand that embodies the city's soul and celebrates its vibrant community of entrepreneurs and creatives. Our products range from sleek shirts to cozy hoodies that not only pay homage to Nashville's spirit but are also locally sourced to support our community. With our black & white designs, we aim to highlight the city's dynamic range of talent. Embrace Nashville's heart with our understated yet bold collection at Nashᵀᴺ, where your passion for the city shines.
                            <p className='AccordionLink'><a href="https://nash.tn/" style={{ color: '#ffcc00' }} target="_blank">Visit our Website</a> <a href="https://my.matterport.com/show/?m=Sx9WLkvHt3U&ss=18&sr=-.29%2C.29&tag=mAnkMD0N4nz&pin-pos=13.18%2C.73%2C-2.46" style={{ color: '#ffcc00' }} target="_blank">Visit our VR Store</a></p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4" className='AccordionItemback'>
                        <Accordion.Header>
                            <span className='AccordionHead'>WERTHAN ART COLLECTIONS</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            Werthan “Since 1868,” Werthan Bag has stood as a pillar of American heritage, operating from its Nashville company. The company transformed raw cotton into artistic, vibrant dry goods bags that captured the essence of numerous businesses. These bags, adorned with artful company logos and product imagery, became ubiquitous across the United States and around the world, often being repurposed into household textiles. Artworks, some dating back to the late 1800s and as recent as 1970, have been preserved in near-perfect condition, offering a unique window into the past. Although the Werthan companies have ceased operations, their art endures, now promoted by Werthan Trading Company as both tangible (physical) and intangible (digital) merchandise.  We are excited to unveil these treasured American artifacts, hidden for over a century, to the global community. Werthan Trading Company has collaborated with Nashᵀᴺ to present unique, one-of-a-kind artwork for NFTs and matching Physical Products.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <div className='detailsForm'>
                    <h5 className='ClaimHeading'>To claim an NFT, the claim form will generally require the following detailed information:</h5>
                    <div className="container">
                        <form onSubmit={handleSubmit} className="form">
                            <div className="form-group">
                                <label htmlFor="nftProof">Proof of NFT Ownership:</label>
                                <input
                                    type="text"
                                    id="nftProof"
                                    value={nftProof}
                                    onChange={(e) => setNFTProof(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nftID">NFT ID or Token Number:</label>
                                <input
                                    type="text"
                                    id="nftID"
                                    value={nftID}
                                    onChange={(e) => setNFTID(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="walletAddress">Public Wallet Address:</label>
                                <input
                                    type="text"
                                    id="walletAddress"
                                    value={walletAddress}
                                    onChange={(e) => setWalletAddress(e.target.value)}
                                />
                            </div>
                            {error && <p className="error">{error}</p>}
                            <button type="submit" className="btn-submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccordionPage;
