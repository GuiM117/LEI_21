import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/Button';
import EntryInput from '../../components/EntryInput.js';
import Autocomplete from '@material-ui/lab/Autocomplete';
const axios = require('axios')


const patient = {
  name:"",
  patientNumber:-2,
  sex:"",
  birth_date:"",
  episode_number:0

}

export default class PainelNovaPrescricao extends React.Component {

  state = {
    from_users: 0,
    entries: [],
    patientsList: [],
    patientInfo : {
      name:this.props.name,
      patientNumber:this.props.id,
      sex:this.props.sex,
      birth_date:this.props.date,
      episode_number:0
    }
  }

  componentWillMount() {
    axios("http://localhost:4800/patients/listPatients").then(resp => {
      if(this.state.patientInfo.name !== undefined){
        console.log("VEM NOME NO LINK")
        this.setState({from_users: 1}, () => {
          console.log(this.state)
        })
      }
      this.setState({patientsList: resp.data}, () => {
        console.log(this.state)
        console.log(this.props)
      })
    })
  }

  handleEntries = (value) => {
    this.setState({entries: value}, () => {
      let prescription = {
        entries: this.state.entries,
        patientInfo: this.state.patientInfo
      }
      this.props.sendData(prescription);
      console.log("Entries updated", this.state.entries)
    })
  }

  handleSelectedName(value) {
    if (value) {
      let auxPatient = {
        name:value.name,
        patientNumber: value.patientNumber,
        sex:value.sex,
        birth_date:value.birth_date,
        episode_number:value.episode_number
      }
      this.setState({patientInfo: { ...auxPatient}}, () => {
        let prescription = {
          entries: this.state.entries,
          patientInfo: this.state.patientInfo
        }
        this.props.sendData(prescription);
        console.log("Estado",this.state)
      })
    } else {
      this.setState({patientInfo: { ...patient}}, () => {
        let prescription = {
          entries: this.state.entries,
          patientInfo: this.state.patientInfo
        }
        this.props.sendData(prescription);
        console.log("Estado",this.state)
      })
    }
  }

  handleSelectedPatientNumber(event) {
    this.setState({ patient : {patientNumber: event.target.value } }, () => {
      let prescription = {
        entries: this.state.entries,
        patientInfo: this.state.patientInfo
      }
      this.props.sendData(prescription);
      console.log(this.state.patient)
    })
  }

  handleEntry(value){
    this.setState(this.state.entries.push(value))
  }

  render(){

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Medicação
        </Typography>
        {this.state.from_users !== 0 ?
        <Grid container spacing={3}>
        <Grid item  xs={12} sm={4}>

          <TextField
            id="outlined-basic"
            label="Nº de Utente"
            defaultValue={this.state.patientInfo.patientNumber}
            style={{width: 370}}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>
            
        <Grid item  xs={12} sm={8}>
          <TextField
              id="lastName"
              label="Nome Paciente"
              defaultValue={this.state.patientInfo.name}
              style={{ width: 758 }} 
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
        </Grid>
        <EntryInput sendData={this.handleEntries} />
        </Grid>
        :
        <Grid container spacing={3}>
            <Grid item  xs={12} sm={4}>
              <TextField
                  id="outlined-basic"
                  label="Nº de Utente"
                  variant="outlined"
                  style={{width: 370}}
                  value={this.state.patientInfo.patientNumber}
                  onChange={(event,value)=> this.handleSelectedPatientNumber(value)}
              />
            </Grid>

            <Grid item  xs={12} sm={8}>
              <Autocomplete
                id="lastName"
                options = {this.state.patientsList}
                getOptionLabel={(option) => option.name}
                style={{ width: 758 }} 
                renderInput={(params) => <TextField {...params} defaultValue={this.state.patientInfo.name} label="Nome Paciente" variant="outlined" />}
                onChange={ (event,value) => this.handleSelectedName(value)}
              />
            </Grid>
            <EntryInput sendData={this.handleEntries} />
          </Grid>
        }
      </React.Fragment>
  );
  }
}
