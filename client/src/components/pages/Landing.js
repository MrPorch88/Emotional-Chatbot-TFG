/*
Pagina principal que se muestra al abrir la aplicación web.
*/
import React from 'react';
import Footer from '../Footer';
import Logo from './chatbotlogo.png';
import Chatbot from '../chatbot/Chatbot';

function Landing() {
    return(
        <div className="Landing" style={{ textAlign: 'center'}}  alignItems="center">
            <img src={Logo} alt="logo" height='200' />
            <div>
                <Chatbot/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
}

export default Landing;