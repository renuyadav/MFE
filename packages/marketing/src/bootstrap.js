import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//Mount funtion to start up the app
const mount  = (el) => {
    ReactDOM.render(<App/>, el);
}

//if in development mode and in isolation

if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');

    if(devRoot) {
        mount(devRoot);
    }
}

export {mount};