import React, { lazy, Suspense} from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Progress from './components/Progress';
import Header from './components/Header';
import {StylesProvider , createGenerateClassName} from '@material-ui/core/styles';
const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

export default () => {
    return ( 
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
            <div>
                <Header />
                <Suspense fallback={<Progress/>}>
                <Switch>
                    <Route path="/" component={MarketingLazy}/> 
                    <Route path="/auth" component={AuthLazy}/> 
                   
                </Switch>
                </Suspense>
            </div>
            </StylesProvider>
        </BrowserRouter>
        );
}