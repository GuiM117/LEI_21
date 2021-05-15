import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';


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
    
  const products = [
    { name: 'Medicamento A', dateInicio: '28-01-2022', dateFim: '02-02-2022', desc: 'descricao 1', qtd: '3', uni: 'mg' },
    { name: 'Medicamento B', dateInicio: '28-05-2021', dateFim: '08-06-2022', desc: 'descricao 2', qtd: '4', uni: 'caixas' },
    { name: 'Medicamento C', dateInicio: '03-06-2021', dateFim: '11-07-2022', desc: 'descricao 3', qtd: '5', uni: 'kg' },
    { name: 'Medicamento D', dateInicio: '', dateFim: '', desc: '', qtd: '8', uni: 'L' },
  ];

  const payments = [
    { name: 'Numero Utente', detail: '123' },
    { name: 'Nome', detail: 'Mr John Smith' },
    { name: 'Data de Nascimento', detail: 'yyy-yyy-yyy' },
    { name: 'Sexo', detail: 'M' }
  ];

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name+' '+product.dateInicio+' - '+product.dateFim} secondary={product.desc} />
            <Typography variant="body2">{product.qtd + ' ' + product.uni}</Typography>
          </ListItem>
        ))}
        
      </List>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={12}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Detalhes Paciente
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
          
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
