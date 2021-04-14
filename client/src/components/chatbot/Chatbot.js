/*
Esta clase se encarga del manejo de estados de mensajes con las llamadas al backend.
Su uso será fundamental en la clase principal del Landing.
*/
import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from 'axios/index';

class Chatbot extends Component { // Usamos una clase para poder tener estados y poder mostrar mensajes
    constructor(props){
        super(props);

        this.state = {
            messages: []
        }
    }

    async df_text_query(text) {
        let speak = { // Objeto con info de los mensajes
            speaks: 'me',
            msg: {
                text: {
                    text: text
                }
            }
        };
        this.setState({messages: [...this.state.messages, speak]})  // Agregamos los mensajes anteriores con los nuevos

        const res = await axios.post('/api/df_text_query', {text});

        for (let msg of res.data.fulfillmentMessages) {
            speak = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, speak]}); // Agregar mensajes del bot con anteriores
        }
    }

    async df_event_query(event) {
        const res = await axios.post('/api/df_event_query', {event});

        for (let msg of res.data.fulfillmentMessages) {
            let speak = {
                speaks: 'me',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, speak]});
        }
    }

    render(){
        return(
            <Container maxWidth="sm">
                <Typography component="div" style={{ height: '100%', width: '100%', overflow: 'auto' }}>
                    <TextField id="standard-basic" label="Write your message" />
                </Typography>
            </Container>
        )
    }
}

export default Chatbot;
