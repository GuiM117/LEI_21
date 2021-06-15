import React from 'react';
import { Route, Switch } from "react-router-dom";
import LandPage from './main/HomePage/LandPage';
import MedicPage from './main/MedicPage/MedicPage';
import UserPage from './main/UserPage/UserPage';
import PrescriPage from './main/PrescriPage/PrescriPage';


const Routes = () => (
        <Switch>
            <Route path='/medic/:docID/:name?/:id?/:sex?/:date?' component={MedicPage} />
            <Route path='/medic_users/:docID' component={UserPage} />
            <Route path='/prescriptions/:docID' component={PrescriPage} />
            <Route exact path='/' component={LandPage} />
        </Switch>
);

export default Routes;