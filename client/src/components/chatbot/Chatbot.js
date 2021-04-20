/*
Esta clase se encarga del manejo de estados de mensajes con las llamadas al backend.
Su uso será fundamental en la clase principal del Landing.
*/
import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from 'axios/index';
import Message from './Chat';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Divider from '@material-ui/core/Divider';

class Chatbot extends Component { // Usamos una clase para poder tener estados y poder mostrar mensajes
    constructor(props){
        super(props);
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
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
                speaks: 'bot',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, speak]});
        }
    }

    componentDidMount(){ // Metodo para renderizar el mensaje inicial al abrir la página
        this.df_event_query('Hello');
    }

    renderMessages(stateMessages){
        if (stateMessages){
            return stateMessages.map((message, i) => {
                return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
            });
        } else {
            return null;
        }
    }

    _handleInputKeyPress(e){
        if (e.key==='Enter'){
            this.df_text_query(e.target.value);
            e.target.value='';
        }
    }

    render(){
        return(
            <Container maxWidth="sm">
                <Typography component="div" style={{ minHeight: 150, maxHeight: 500, width: '100%', overflow: 'auto'}}>
                    {this.renderMessages(this.state.messages)}
                    <Divider />
                </Typography>
                <Grid container style={{padding: '20px'}}>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" label="Write a Message" fullWidth onKeyPress={this._handleInputKeyPress}/>
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                        </Grid>
                    </Grid>
            </Container>
        )
    }
}

export default Chatbot;
