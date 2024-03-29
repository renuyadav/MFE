import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createMemoryHistory, createBrowserHistory} from 'history';
//Mount funtion to start up the app
const mount  = (el, {onNavigate, defaultHistory, initialPath}) => {
    let history = defaultHistory || createMemoryHistory({
        initialEntries:[initialPath]
    });
    
    if(onNavigate) {
        history.listen(onNavigate);
    }
    
    ReactDOM.render(<App history={history}/>, el);
    return {
        onParentNavigate({pathname: nextPathName}) {
            const {pathname} = history.location;

            //console.log("container navigated:" + nextPathName +"::"+ pathname);
            if(pathname !== nextPathName) {
                history.push(nextPathName);
            }
        }
    }
}

//if in development mode and in isolation

if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');

    if(devRoot) {
        mount(devRoot, {defaultHistory:createBrowserHistory()});
    }
}

export {mount};