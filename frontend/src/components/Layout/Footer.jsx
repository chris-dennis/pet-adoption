import {FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer" style={{padding: '20px', textAlign: 'center', }}>
            <div>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{margin: '0 10px'}}>
                    <FaFacebook/>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{margin: '0 10px'}}>
                   <FaTwitter/>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{margin: '0 10px'}}>
                    <FaInstagram/>
                </a>
            </div>
            <p style={{marginTop: '10px'}}>Any questions? Contact us: (123) 456-7890</p>
            <img src="src/public/paw in a heart.svg" height="50" alt="paw"/>
        </footer>
    );
};

export default Footer;