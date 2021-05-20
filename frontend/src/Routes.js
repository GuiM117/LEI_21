import React from 'react';
import { Route, Switch } from "react-router-dom";
import LandPage from './main/HomePage/LandPage';
import MedicPage from './main/MedicPage/MedicPage';


const Routes = () => (
        <Switch>
            <Route path='/medic' component={MedicPage} />
            <Route exact path='/' component={LandPage} />
        </Switch>
);

export default Routes;