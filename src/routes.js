import React from "react";
import {Switch, Route} from "react-router-dom";

import Feed from './pages/Feed';
import New from './pages/New';
import Comment from './pages/Comment';

function Routes() {
    return (
        <Switch>
            <Route path="/instaclone" exact component={Feed}/>
            <Route path="/new" component={New}/>
            <Route path="/p" component={Comment}/>
        </Switch>
    )
}

export default Routes;