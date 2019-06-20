import React from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Login, MapLayout } from '../Components'


function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/map" component={MapLayout} />
                <Route exact path="/" component={Login} />
            </Switch>
        </Router>
    )
}

export {
    Routes
}
