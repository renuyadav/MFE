import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import MarketingApp from './components/MarketingApp';
import Header from './components/Header';

export default(() => {
   return ( 
    <BrowserRouter>
    <div>
        <h1>container microfront-end</h1>
        <Header/>
        <hr/>
        <MarketingApp/>
    </div>
    </BrowserRouter>
   )
})