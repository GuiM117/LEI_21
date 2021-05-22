import React from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import axios from "axios";
import VirtualizeList from "./VirtualizeList";

const initialState = {
  drugsList: [],
  currentMedEntry:{},
  currentDescription:""
}



export default class EntryInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...initialState}

    }

    componentWillMount() {
    axios("http://localhost:4800/meds/listMeds").then(resp => {
      this.setState({drugsList: resp.data}, () => {
        console.log(this.state)
      })
    })
  }

    handlePosology = (value) => {
        this.setState({currentDescription:""})
        if (value) {
            this.renderDCI(value.dci_ID)
            this.renderPharmForm(value.farmForm_ID)
            this.renderContainerForm(value.containerForm_ID)
            this.renderViasAdministraçao(value.administrationForm_IDs)
            this.renderCapacity(value.capacityUnit_ID, value.capacity)
        }
    }

    renderCapacity(id,capacity){
        if (id){
            axios.get(`http://localhost:4800/unitMed/getUnitMed?id=${id}`)
                .then(data => {
                    let description = ""
                    if (this.state.currentDescription !== "") description += "\n"
                    description += `\nCapacidade: ${capacity} ${data.data}`
                    this.setState({currentDescription: this.state.currentDescription.concat(description)})
                })
                .catch (e => console.log(e))
        }
    }

    renderDCI (id) {
        if (id){
            axios.get(`http://localhost:4800/dci/getDCI?id=${id}`)
                .then(data => {
                    let description = ""
                    if (this.state.currentDescription !== "") description += "\n"
                    description += `Designação Comum Internacional: ${data.data}`
                    this.setState({currentDescription: this.state.currentDescription.concat(description)})
                })
                .catch (e => console.log(e))
        }
    }

    renderPharmForm (id) {
        if (id){
            axios.get(`http://localhost:4800/pharmForm/getPharmForm?id=${id}`)
                .then(data => {
                    let description = ""
                    if (this.state.currentDescription !== "") description += "\n"
                    description += `\nForma Farmacêutica: ${data.data}`
                    this.setState({currentDescription: this.state.currentDescription.concat(description)})
                })
                .catch (e => console.log(e))
        }
    }

    renderContainerForm(id){
        if (id){
            axios.get(`http://localhost:4800/unitMed/getUnitMed?id=${id}`)
                .then(data => {
                    let description = ""
                    if (this.state.currentDescription !== "") description += "\n"
                    description += `\nForma de Apresentação: ${data.data}`
                    this.setState({currentDescription: this.state.currentDescription.concat(description)})
                })
                .catch (e => console.log(e))
        }
    }

    renderViasAdministraçao(ids){
        if (ids){
            axios.get(`http://localhost:4800/viaAdmin/getViaAdmins?ids=${ids}`)
                .then(data => {
                    let viasArray = data.data
                    let description = ""
                    if (this.state.currentDescription !== "") description += "\n"
                    description += "\nVia(s) de Administração: "

                    for(let i = 0; i< viasArray.length ;i++){
                        if (i === viasArray.length - 1) description += `${viasArray[i].description}`

                        else description += `${viasArray[i].description}, `
                    }
                    this.setState({currentDescription: this.state.currentDescription.concat(description)})
                })
                .catch (e => console.log(e))
        }
    }



  render() {
    return (
        this.props.entries.map((val, idx)=> {
            console.log(val, idx)
            return(
              <React.Fragment>
                    <Grid item xs={12} sm={12}>
                        <VirtualizeList drugList = {this.state.drugsList} sendData={this.handlePosology}/>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            label="Informação Detalhada"
                            variant="outlined"
                            disabled={true}
                            fullWidth
                            multiline={true}
                            value = {this.state.currentDescription}
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
                            label="Posologia"
                            variant="outlined"
                            fullWidth
                            multiline={true}
                        />

                    </Grid>
              </React.Fragment>
            )
        })
    )
  }
}
