import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EntryInput from '../../components/EntryInput.js';
import Autocomplete from '@material-ui/lab/Autocomplete';
const axios = require('axios')


const initialState = {
  entries: [{entryId:"", qtdMed:""}],
  patientsList: [],
  patient:{}
}

export default class PainelNovaPrescricao extends React.Component {

  state = { ...initialState  }

  addEntry = (e) => {
    this.setState((prevState) => ({
      entries: [...prevState.entries, {entryId:"", qtdMed:""}],
    }));

  }

  removeEntry = (e) => {
    this.setState((prevState) => ({
      entrys: [...prevState.entrys.pop()],
    }));
    console.log("medicamento removido")
  }

  componentWillMount() {
    axios("http://localhost:4800/patients/listPatients").then(resp => {
      this.setState({patientsList: resp.data}, () => {
        console.log(this.state)
      })
    })
  }

  handleSelectedName(value) {
    let auxPatient = {
      name:value.name,
      patientNumber: value.patientNumber,
      sex:value.sex,
      birth_date:value.birth_date,
      episode_number:value.episode_number
    }
    this.setState({patient: { ...auxPatient}}, () => {
      console.log("Estado",this.state)
    })
  }

  handleSelectedPatientNumber(value) {
    this.setState({ patient : {patientNumber: value } }, () => {
      console.log(this.state.patient)
    })
  }

  handleEntry(value){
    this.setState(this.state.entries.push(value))
  }

  render(){
    let {entries} = this.state
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Medicação
        </Typography>
        <Grid container spacing={3}>
          <Grid item  xs={12} sm={4}>
            <TextField
                id="outlined-basic"
                label="Nº de Utente"
                variant="outlined"
                style={{width: 370}}
                value={this.state.patient.patientNumber}
                onChange={(event, value) => this.handleSelectedPatientNumber(value)}
            />
          </Grid>

          <Grid item  xs={12} sm={8}>
            <Autocomplete
              id="lastName"
              options = {this.state.patientsList}
              getOptionLabel={(option) => option.name}
              style={{ width: 758 }}
              renderInput={(params) => <TextField {...params} label="Nome Paciente" variant="outlined" />}
              onChange={ (event,value) => this.handleSelectedName(value)}
            />
          </Grid>
          
          <EntryInput entries={entries} />

          <Grid item xs={12} sm={4}>
            <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.addEntry}
                  className="botao2"
                >Novo Medicamento
            </Button>

          <Button
                variant="contained"
                color="secondary"
                onClick={this.addEntry}
                className="botao2"
              >Novo Medicamento
          </Button>
          <Button
              variant="contained"
              color="secondary"
              onClick={this.removeEntry}
              className="botao2"
          >Remover Medicamento
          </Button>
        </Grid>
      </React.Fragment>
  );
  }
}
