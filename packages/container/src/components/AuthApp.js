import React, {useRef, useEffect} from 'react';
import {mount} from 'auth/authApp';
import {useHistory} from 'react-router-dom';

export default ({onSignIn:containerSignIn}) => {
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
        },
        onSignIn(){
            console.log("container onsignin called");
            containerSignIn();
        },
    })
        
        history.listen(onParentNavigate);

    }, []);

    return <div ref={ref}></div>

}