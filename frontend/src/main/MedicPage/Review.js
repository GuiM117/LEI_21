import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import 'moment/locale/pt'



const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {

  const patientInfo = [
    { name: 'Numero Utente', detail: props.prescription.patientInfo.patientNumber },
    { name: 'Nome', detail: props.prescription.patientInfo.name },
    { name: 'Data de Nascimento', detail: moment(props.prescription.patientInfo.birth_date).format("dddd, DD MMM YYYY") },
    { name: 'Sexo', detail: props.prescription.patientInfo.sex },
    {name: "Número de Episódio", detail: props.prescription.patientInfo.episode_number}
  ];

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Revisão de Prescrição
      </Typography>
      <List disablePadding>
        {props.prescription.entries.map((ent) => (
          <ListItem className={classes.listItem} key={ent.name}>
            <ListItemText primary={ent.name+' '} secondary={ent.entry.description} />
            <Typography variant="body2">{moment(ent.entry.initDate).format("dddd, DD MMM YYYY") +' - ' + moment(ent.entry.endDate).format("dddd, DD MMM YYYY")}</Typography>
          </ListItem>
        ))}
        
      </List>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={12}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Detalhes Paciente
          </Typography>
          <Grid container>
            {patientInfo.map((patient) => (
              <React.Fragment key={patient.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{patient.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{patient.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
          
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
