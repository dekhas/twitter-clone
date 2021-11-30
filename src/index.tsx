import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ThemeProvider} from "@mui/styles";
import theme from "./theme";
import './index.css'
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <BrowserRouter>
              <Provider store={store}>
                  <App />
              </Provider>
          </BrowserRouter>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
