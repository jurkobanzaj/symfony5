import React from 'react';
import { MuiThemeProvider, createMuiTheme, CssBaseline, responsiveFontSizes } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

const responciveTheme = responsiveFontSizes(theme); // not working yet

function DefaultThemeProvider(props) {
    return (
        <MuiThemeProvider theme={responciveTheme}>
            <CssBaseline>{props.children}</CssBaseline>
        </MuiThemeProvider>
    );
}

export default DefaultThemeProvider;
