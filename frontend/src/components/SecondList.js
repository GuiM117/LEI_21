import React from "react"
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PeopleIcon from '@material-ui/icons/People';
import ExitToApp from '@material-ui/icons/ExitToApp';

const SecondList = (props) => {

    return (
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
}

export default SecondList;
