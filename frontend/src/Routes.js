import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from './main/App';
import MedicPage from './main/MedicPage/MedicPage';


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path='/medic' component={MedicPage} />
        </Switch>
    </BrowserRouter>
);

export default Routes;