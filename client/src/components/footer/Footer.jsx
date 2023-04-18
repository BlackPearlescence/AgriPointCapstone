import { useState } from "react";
import styles from "./Footer.module.scss"
import { SocialIcon } from 'react-social-icons';
import axios from "axios";

const Footer = () => {
    
    const [ email, setEmail ] = useState("");

    const handleNewsletterSubscriptionSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        const resp = axios.post("/email/send-newsletter-confirmation-no-auth", { username: email });
        console.log(resp)
        console.log(resp.data)
    }

    return (
        <div className={styles.footerContainer}>
            <div className={styles.subscribeContainer}>
                <h3>Stay in the loop!</h3>
                <span>
                    Receive a weekly newsletter with new,
                    trending vendors and products.
                </span>
                <form onSubmit={handleNewsletterSubscriptionSubmit} className={styles.subscribeFormContainer}>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className={styles.subscribeEmail} type="text" placeholder="Email Address" />
                    <input className={styles.subscribeSubmit} type="submit" value="Subscribe" />
                </form>
            </div>

            <div className={styles.contactContainer}>
                <h3>Contact Information</h3>
                <span>Main: 997-249-2110</span>
                <span>Support: 999-222-7777</span>
                <span>Email: agripointbusiness@gmail.com</span>
                <span>Address: 7741 KINGSBURY BLVD UNIT 11 SAINT LOUIS MO 63105-3846 USA</span>
            </div>

            <div className={styles.footerLinksContainer}>
                <div className={styles.footerSiteContainer}>
                    <a href="#">About Us</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms and Conditions</a>
                    <a href="#">FAQ</a>
                </div>
                <div className={styles.footerSocialContainer}>
                    <SocialIcon bgColor="white" url="https://facebook.com/blahblahblah" />
                    <SocialIcon bgColor="white" url="https://twitter.com/blahblahblah" />
                    <SocialIcon bgColor="white" url="https://instagram.com/blahblahblah" />
                    <SocialIcon bgColor="white" url="https://github.com/blahblahblah" />
                </div>
            </div>
        </div>
    )
}

export default Footer;