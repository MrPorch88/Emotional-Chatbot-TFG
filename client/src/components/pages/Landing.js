/*
Pagina principal que se muestra al abrir la aplicación web.
*/
import React from 'react';
import Footer from '../Footer';
import Logo from './chatbotlogo.png';
import Chatbot from '../chatbot/Chatbot';
import CookieConsent from "react-cookie-consent";

function Landing() {
    return(
        <div className="Landing" style={{ textAlign: 'center'}}  alignitems="center">
            <CookieConsent>This website uses cookies to stablish a unique ID for each user enhancing the overall experience.</CookieConsent>
            <img src={Logo} alt="logo" height='200'/>
            <div>
                <Chatbot/>
            </div>
            <footer className="footer">
                <Footer/>
            </footer>
        </div>
    );
}

export default Landing;