import React, { lazy, Suspense, useEffect,useState} from "react";
import {Router, Redirect, Route, Switch} from 'react-router-dom';
import Progress from './components/Progress';
import Header from './components/Header';
import {StylesProvider , createGenerateClassName} from '@material-ui/core/styles';
import { createBrowserHistory} from 'history';

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const history = createBrowserHistory();

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(()=> {
        if(isSignedIn){
            history.push('/dashboard')
        }
    },[isSignedIn])

    return ( 
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
            <div>
                <Header onSignOut={()=> setIsSignedIn(false)} isSignedIn={isSignedIn}/>
                <Suspense fallback={<Progress/>}>
                <Switch>
                    <Route path="/auth" component={AuthLazy}>
                        <AuthLazy onSignIn={() => setIsSignedIn(true)}  />  
                    </Route> 
                    <Route path="/dashboard">
                        {!isSignedIn && <Redirect to='/' />}
                        <DashboardLazy />    
                    </Route>  
                    <Route path="/" component={MarketingLazy}/> 
               
                </Switch>
                </Suspense>
            </div>
            </StylesProvider>
        </Router>
        );
}