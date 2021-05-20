import React from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
//import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";
import VirtualizeList from "./VirtualizeList";

const initialState = {
  drugsList: []
}



export default class EntryInput extends React.Component {
    constructor(props) {
        super(props);
    }


    state = {...initialState}

  componentWillMount() {
    axios("http://localhost:4800/meds/listMeds").then(resp => {
      this.setState({drugsList: resp.data}, () => {
        console.log(this.state)
      })
    })
  }


  render() {
    return (
        this.props.entrys.map((val, idx)=> {
            return(
              <React.Fragment>
                <Grid container justify="space-between" spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <VirtualizeList drugList = {this.state.drugsList}/>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <TextField
                          id="standard-number"
                          label="Por Dia"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                      />
            </Grid>

                    <Grid item xs={12} sm={3}>
                      <TextField
                          type="text"
                          name="uniMed"
                          id="uniMed"
                          label="Uni"
                          fullWidth
                          className="uniMed"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                          id="DataInicio"
                          label="Data Inicio"
                          type="date"
                          defaultValue="2021-05-24"
                          className="DataInicio"
                          InputLabelProps={{
                            shrink: true,
                          }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                          id="DataFim"
                          label="Vencimento"
                          type="date"
                          defaultValue="2021-05-24"
                          className="DataFim"
                          InputLabelProps={{
                            shrink: true,
                          }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                          id="notasText"
                          label="Notas"
                          variant="outlined"
                          fullWidth
                      />
                    </Grid>
                </Grid>
              </React.Fragment>
            )
        })
    )
  }
}
