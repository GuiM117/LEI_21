import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EntryInput from '../../components/EntryInput.js';
import Autocomplete from '@material-ui/lab/Autocomplete';


// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
];

export default class PainelNovaPrescricao extends React.Component {
  
  
  state = {
    entrys: [{entryId:"", qtdMed:""}]
  }

  addEntry = (e) => {
    this.setState((prevState) => ({
      entrys: [...prevState.entrys, {entryId:"", qtdMed:""}],
    }));
  }


  render(){
    let {entrys} = this.state
    return (
      <React.Fragment>

        <Typography variant="h6" gutterBottom>
          Medicação
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12} sm={2}>
            <TextField
              id="numUtente"
              name="numUtente"
              label="NºUtente"
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Autocomplete
              id="lastName"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              style={{ width: 455 }}
              renderInput={(params) => <TextField {...params} label="Nome Paciente" variant="outlined" />}
            />
          </Grid>
          
          <EntryInput entrys={entrys}/>

          <Button
                variant="contained"
                color="secondary"
                onClick={this.addEntry}
                className="botao2"
              >Novo Medicamento
          </Button>
        </Grid>
      </React.Fragment>
  );
  }
}
