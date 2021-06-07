import React from 'react';
import { Route, Switch } from "react-router-dom";
import LandPage from './main/HomePage/LandPage';
import MedicPage from './main/MedicPage/MedicPage';
import UserPage from './main/UserPage/UserPage';
import PrescriPage from './main/PrescriPage/PrescriPage';
import Alerts from './components/Alerts'

const Routes = () => (
        <Switch>
            <Route path='/medic' component={MedicPage} />
            <Route path='/medic_users' component={UserPage} />
            <Route path='/prescriptions' component={PrescriPage} />
            <Route exact path='/' component={Alerts} />
        </Switch>
);

export default Routes;