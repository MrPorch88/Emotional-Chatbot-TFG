import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles({
  chatSection: {
    width: '100%',
    height: '10vh',
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '50vh',
    overflowY: 'auto'
  }
});

const Chat = (props) => {
  const classes = useStyles();

  return (
      <div>
        {/* <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chatbot Emocional</Typography>
            </Grid>
        </Grid> */}
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
                {/* <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Write a Message" fullWidth />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                    </Grid>
                </Grid> */}
            </Grid>
        </Grid>
      </div>
  );
}

export default Chat;