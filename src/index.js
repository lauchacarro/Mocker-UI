import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// const theme = createMuiTheme({
//     palette: {
//         primary: {
//             light: '#DF744A',
//             main: '#9FD5D1',
//             dark: '#DF744A'
//         },
//         secondary: {
//             main: '#DF744A',
//         },
//         inherit:{
//             main: '#FFFFFF',
//         },
//         text: {
//             primary: '#ffffff'
//         }
//     },
//     typography: {
//         useNextVariants: true
//     }
// });

ReactDOM.render(
    // <MuiThemeProvider theme={theme}>
        <App />,

    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
