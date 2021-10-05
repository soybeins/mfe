import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

const mount = (el, { onNavigate, defaultHistory,initialPath }) => {
    const memoryHistory = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });
    
    if(onNavigate){
        memoryHistory.listen(onNavigate);
    }


    ReactDOM.render(<App history={memoryHistory} />,el)

    return {
        onParentNavigate({ pathname: nextPathname}) {
           
            const {pathname} = memoryHistory.location;

            if(pathname !== nextPathname){
                memoryHistory.push(nextPathname);
            }

        }
    }
}

if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector("#_auth-dev-root");
    console.log("works")
    if ( el ){
        console.log("works")
        mount(el, { defaultHistory: createBrowserHistory() });
    }
}

export { mount };