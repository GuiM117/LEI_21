import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandPage from './main/LandPage';
import MedicPage from './main/MedicPage/MedicPage';


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={LandPage} />
            <Route path='/medic' component={MedicPage} />
        </Switch>
    </BrowserRouter>
);

export default Routes;