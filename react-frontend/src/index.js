import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import ScrollToTop from "./component/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(
    <BrowserRouter>
        <ScrollToTop />
        <App />
    </BrowserRouter>
)

reportWebVitals();
