import React from "react";
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import App from './App';
import HelloWorld from "./HelloWorld";

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/helloWorld" component={HelloWorld} />
            <Route exact path="/" component={App} />
        </Switch>
    </Router>
);

// we're exporting a function (renderRoutes) that's going to be a router -> we have to tell the router how to access the history with the browserHistory variable we created above -> the switch comes from the React router and that matches one of the paths -> then we make our route -> only look for an exact match for the path we passed in -> when something matches the exact path, load the component App