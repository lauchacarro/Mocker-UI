import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#4A148C' },
        secondary: { main: '#039be5' },
        inherit:{
            main: '#FFFFFF',
        },
        text: {
            primary: '#000000'
        }
    },
    typography: {
        useNextVariants: true
    }
});

ReactDOM.render(
    // <MuiThemeProvider theme={theme}>
        <App />
    // </MuiThemeProvider>
    ,

    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
