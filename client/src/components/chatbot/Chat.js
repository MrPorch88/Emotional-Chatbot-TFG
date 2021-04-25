/*
Esta clase se encarga del renderizado de los cuadros de texto recibiendo los datos
desde la clase Chatbot.
*/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles({
  chatSection: {
    width: '100%',
    height: '12vh',
    marginBottom: '1vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '12vh'
  }
});

const Chat = (props) => {
  const classes = useStyles();

  return (
      <div>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={12}>
                <List className={classes.messageArea}>
                    <ListItem key="1">
                        {props.speaks==='bot' && // Comprobamos que escribe el bot para renderizar los mensajes correctamente
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="left" primary={props.text}></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="left" secondary={props.speaks}></ListItemText>
                                </Grid>
                            </Grid>
                        }           
                    </ListItem>
                    <ListItem key="2">
                        {props.speaks==='me' && // Comprobamos que escribe el usuario para renderizar los mensajes correctamente
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="right" primary={props.text}></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary={props.speaks}></ListItemText>
                                </Grid>
                            </Grid>
                        }
                    </ListItem>
                </List>
            </Grid>
        </Grid>
      </div>
  );
}

export default Chat;