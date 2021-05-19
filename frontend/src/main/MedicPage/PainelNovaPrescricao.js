import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EntryInput from '../../components/EntryInput.js';
import Autocomplete from '@material-ui/lab/Autocomplete';

//let patients = []
const axios = require('axios')

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

let top100Films = [];


export default class PainelNovaPrescricao extends React.Component {

  constructor() {
    super();

    this.fetchPatients()

    console.log(top100Films)

  }

  state = {
    entrys: [{entryId:"", qtdMed:""}]
  }

  addEntry = (e) => {
    this.setState((prevState) => ({
      entrys: [...prevState.entrys, {entryId:"", qtdMed:""}],
    }));
  }

  async fetchPatients ( ){
    try {
      const result = await axios.get("http://localhost:4800/patients/listPatients")
      top100Films = result.data

    } catch (e) {
      console.log(e)
    }

  }

  componentDidMount() {
    this.fetchPatients()
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
              options = {top100Films}
              getOptionLabel={(option) => option.name }
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
