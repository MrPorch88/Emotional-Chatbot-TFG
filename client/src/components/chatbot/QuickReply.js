import React from 'react';
import Button from '@material-ui/core/Button';

const QuickReply = (props) => {
    if (props.reply.structValue.fields.payload) {
        return (
            <Button style={{ margin: 3}} href="/" variant="contained" color="primary" onClick={(event) =>
                props.click(
                    event,
                    props.reply.structValue.fields.payload.stringValue,
                    props.reply.structValue.fields.text.stringValue
                )
            }>
                {props.reply.structValue.fields.text.stringValue}
            </Button>
        );
    } else {
        return (
            <Button style={{ margin: 3}} variant="contained" color="secondary">
                {props.reply.structValue.fields.text.stringValue}
            </Button>
        );
    }

};

export default QuickReply;