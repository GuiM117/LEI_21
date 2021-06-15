import React from "react"
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PeopleIcon from '@material-ui/icons/People';

const MainList = (props) => {

    const doctorID = props.doctorID
    console.log(doctorID);
    return (
        <div>
            <ListItem button component="a" href={'/medic/' + doctorID}>
            <ListItemIcon>
                <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Nova Prescrição" />
            </ListItem>
            <ListItem button component="a" href={'/medic_users/' + doctorID}>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Pacientes" />
            </ListItem>
            <ListItem button component="a" href={'/prescriptions/' + doctorID}>
            <ListItemIcon>
                <FormatListBulletedIcon/>
            </ListItemIcon>
            <ListItemText primary="Prescrições" />
            </ListItem>
        </div>
    );
}

export default MainList;
