import React, {useRef, useEffect} from 'react';
import {mount} from 'marketing/MarketingApp';
import {useHistory} from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    const history = useHistory();
    useEffect(() => {
        //location object from memeoryhistory from marketing app listen
        const {onParentNavigate} =  mount(ref.current , {
            initialPath:(history.location.pathname),
            onNavigate: ({pathname: nextPathName})=>{
            console.log("container detetced some change:", nextPathName);
            const {pathname} = history.location;

            if(pathname !== nextPathName) {
                history.push(nextPathName);
            }
        }})
        
        history.listen(onParentNavigate);

    }, []);

    return <div ref={ref}></div>

}