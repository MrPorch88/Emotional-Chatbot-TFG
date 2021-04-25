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
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';
import CardTemp from './CardTemp';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

const cookies = new Cookies();

class Chatbot extends Component { // Usamos una clase para poder tener estados y poder mostrar mensajes
    constructor(props){
        super(props);
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this.state = {
            messages: [],
            buttonText: ''
        };
        
        if (cookies.get('userID') === undefined){
            cookies.set('userID', uuid(), { path: '/' });
        }
    }

    async df_text_query(queryText) {
        let speak = { // Objeto con info de los mensajes
            speaks: 'me',
            msg: {
                text: {
                    text: queryText
                }
            }
        };
        this.setState({messages: [...this.state.messages, speak]})  // Agregamos los mensajes anteriores con los nuevos

        const res = await axios.post('/api/df_text_query', {text: queryText, userID: cookies.get('userID')});

        for (let msg of res.data.fulfillmentMessages) {
            console.log(JSON.stringify(msg));
            speak = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, speak]}); // Agregar mensajes del bot con anteriores
        }
    }

    async df_event_query(eventName) {
        const res = await axios.post('/api/df_event_query', {event: eventName, userID: cookies.get('userID')});
        for (let msg of res.data.fulfillmentMessages) {
            let speak = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, speak]});
        }
    }

    componentDidMount(){ // Metodo para renderizar el mensaje inicial al abrir la página
        this.df_event_query('Howdy');
    }


    renderCards(cards) {
        return cards.map((card, i) => <CardTemp key={i} payload={card.structValue}/>);
    }

    renderOneMessage(message, i){ // Metodo para unificar y limpiar codigo que devuelve un unico mensaje
        if (message.msg && message.msg.text && message.msg.text.text){
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
        } else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.cards) { // Comprobamos si se trata de una tarjeta
            return <div key={i}>
                    <Grid container component={Paper}>
                        <Grid item xs={12}>
                            <List>
                                <ListItem key="1">
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <ListItemText align="left" secondary={message.speaks}></ListItemText>
                                            </Grid>
                                            <Grid item xs={12}>
                                            <ListItemText align="center">
                                                {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                                            </ListItemText>
                                                
                                                {/* <div style={{ overflow: 'auto', overflowY: 'scroll'}}>
                                                    <div style={{ height: 300, width:message.msg.payload.fields.cards.listValue.values.length * 270}}>
                                                        {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                                                    </div>
                                                </div> */}
                                            </Grid>
                                        </Grid>
                                </ListItem>
                            </List>
                        </Grid>
                </Grid>
            </div>
        }
    }

    renderMessages(stateMessages){
        if (stateMessages){
            return stateMessages.map((message, i) => {
                return this.renderOneMessage(message, i);
            });
        } else {
            return null;
        }
    }

    _handleInputKeyPress(e){
        if (e.key==='Enter'){
            this.df_text_query(e.target.value);
            e.target.value='';
            this.setState({buttonText: ''});
        }
    }

    buttonClick = async () => { // Envio del texto del campo TextField al endpoint de la API al hacer click en el boton haciendo uso de estados
        this.df_text_query(this.state.buttonText);
        this.setState({buttonText: ''});
    }

    render(){
        return(
            <Container maxWidth="sm">
                <Typography component="div" style={{ minHeight: 150, maxHeight: 500, width: '100%', overflow: 'auto'}}>
                    {this.renderMessages(this.state.messages)}
                    <Divider/>
                </Typography>
                <Grid container style={{padding: '20px'}}>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" label="Write a Message" fullWidth autoFocus value={this.state.buttonText} onChange={ e => this.setState({buttonText: e.target.value})} onKeyPress={this._handleInputKeyPress}/>
                        </Grid>
                        <Grid item xs={1} align="right">
                            <Fab color="primary" aria-label="add" onClick={() => this.buttonClick()}><SendIcon /></Fab>
                        </Grid>
                    </Grid>
            </Container>
        )
    }
}

export default Chatbot;
