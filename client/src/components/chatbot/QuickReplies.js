import React, { Component } from 'react';
import QuickReply from './QuickReply';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

class QuickReplies extends Component {
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(event, payload, text) {
        this.props.replyClick(event, payload, text);
    }


    renderQuickReply(reply, i) {
        return <QuickReply key={i} click={this._handleClick} reply={reply} />;
    }

    renderQuickReplies(quickReplies) {
        if (quickReplies) {
            return quickReplies.map((reply, i) => {
                    return this.renderQuickReply(reply, i);
                }
            )
        } else {
            return null;
        }
    }


    render (){
        return(<Grid container component={Paper}>
            <Grid item xs={12}>
                <List>
                    <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="left" secondary={this.props.speaks}></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="center">
                                        {this.props.text && <p>
                                            {this.props.text.stringValue}
                                        </p>
                                        }
                                        {this.renderQuickReplies(this.props.payload)}
                                    </ListItemText>
                                </Grid>
                            </Grid>
                    </ListItem>
                </List>
            </Grid>
    </Grid>);
    }
}

export default QuickReplies;