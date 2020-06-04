import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreateCollectPoints from './pages/CreateCollectPoint';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Home} path="" />
        </BrowserRouter>
    );
}

export default Routes;
