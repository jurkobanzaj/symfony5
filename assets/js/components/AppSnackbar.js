import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Snackbar, SnackbarContent, Button } from '@material-ui/core';
import { TodoContext } from '../contexts/TodoContext';

function checkLevel(level) {
    switch (level) {
        case 'success':
            return 'green';
        case 'error':
            return 'red';
        default:
            return 'black';
    }
}

function AppSnackbar() {
    const context = useContext(TodoContext);
    return (
        <Snackbar autoHideDuration={6000} open={Boolean(context.message.text)}>
            {context.message.text && (
                <SnackbarContent
                    style={{ backgroundColor: checkLevel(context.message.level), whiteSpace: 'pre' }}
                    message={context.message.text.map((text, i) => (
                        <Fragment key={`${i} ${text}`}>
                            <span>{text}</span>
                            <br />
                        </Fragment>
                    ))}
                    action={[
                        <Button key="dismiss" onClick={() => context.setMessage({})} color="inherit">
                            Dismiss
                        </Button>,
                    ]}
                />
            )}
        </Snackbar>
    );
}

export default AppSnackbar;
