/*
Pagina principal que se muestra al abrir la aplicación web.
*/
import React from 'react';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';

import Footer from '../Footer';
import Logo from './chatbotlogo.png';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));



function Landing() {
    const classes = useStyles();
    return(
        <div className="Landing" style={{ textAlign: 'center'}}>
            <img src={Logo} alt="logo"/>
            <p>Esta pagina es el Landing</p>
            <Button variant="contained" color="primary" className={classes.button} endIcon={<SendIcon></SendIcon>}>
                Enviar Prueba
            </Button>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
}

export default Landing;