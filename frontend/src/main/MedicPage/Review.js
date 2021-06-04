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
    { name: 'Amidotrizoato de meglumina 660 mg/mL + amidotrizoato de sódio 100 mg/mL', dateInicio: '01-06-2022', dateFim: '10-06-2021', desc: '1 comprimido ao jantar' },
    { name: 'Bupivacaína 2.5 mg/mL', dateInicio: '01-06-2021', dateFim: '08-07-2022', desc: 'Aplicar 1 vez por dia' },
    { name: 'Metilprednisolona 40 mg/mL', dateInicio: '01-06-2021', dateFim: '11-06-2021', desc: 'Tomar 1 cápsula de 12 em 12 horas'},
  ];

  const payments = [
    { name: 'Numero Utente', detail: '123475876' },
    { name: 'Nome', detail: 'Tifany Silva' },
    { name: 'Data de Nascimento', detail: '25 Janeiro 1994' },
    { name: 'Sexo', detail: 'Feminino' }
  ];

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Revisão de Prescrição
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name+' '} secondary={product.desc} />
            <Typography variant="body2">{product.dateInicio+' - '+product.dateFim}</Typography>
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
