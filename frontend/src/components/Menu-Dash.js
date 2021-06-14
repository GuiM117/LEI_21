import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';

import ExitToApp from '@material-ui/icons/ExitToApp';

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/medic">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Nova Prescrição" />
    </ListItem>
    <ListItem button component="a" href="/medic_users" >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Pacientes" />
    </ListItem>
    <ListItem button component="a" href="/prescriptions" >
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Prescrições" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    {/*<ListSubheader inset>Opções</ListSubheader>*/}
    <ListItem button component="a" href="/" >
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
);

async function confirmSair(){
  console.log("confirmar sair");
}