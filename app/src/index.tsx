import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// import './assets/styles/css/vertical-responsive-menu.min.css';
// import './assets/styles/css/style.css';
// import './assets/styles/css/responsive.css';
// import './assets/styles/css/night-mode.css';

// import './assets/vendor/unicons-2.0.1/css/unicons.css';
// import './assets/vendor/fontawesome-free/css/all.min.css';
// import './assets/vendor/OwlCarousel/assets/owl.carousel.css';
// import './assets/vendor/OwlCarousel/assets/owl.theme.default.min.css';
// import './assets/vendor/bootstrap/css/bootstrap.min.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
