import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './App';
import { ThemeProvider } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import { theme } from './theme';

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);
