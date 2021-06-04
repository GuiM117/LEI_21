import React from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import axios from "axios";
import VirtualizeList from "./VirtualizeList";
import Button from "@material-ui/core/Button";



const entry = {
    entryId:0,
    currentMedEntry:{},
    currentDescription:""
}

const initialState = {
    drugsList: [],
    entries: [{...entry}]
}

export default class EntryInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...initialState}

        this.handleNewEntry = this.handleNewEntry.bind(this)
    }

    componentWillMount() {
    axios("http://localhost:4800/meds/listMeds").then(resp => {
      this.setState({drugsList: resp.data}, () => {
        console.log(this.state)
      })
    })
  }

    handleCurrentDescription(idx,value){
        // 1. Make a shallow copy of the items
        let entriesAux = [...this.state.entries];
        // 2. Make a shallow copy of the item you want to mutate
        let entryAux = {...entriesAux[idx]};
        // 3. Replace the property you're intested in
        entryAux.currentDescription = "";
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        entriesAux[idx] = entryAux;
        // 5. Set the state to our new copy
        this.setState({entriesAux});
    }

    handleCurrentEntry(idx,value){
        // 1. Make a shallow copy of the items
        let entriesAux = [...this.state.entries];
        // 2. Make a shallow copy of the item you want to mutate
        let entryAux = {...entriesAux[idx]};
        // 3. Replace the property you're intested in
        entryAux.currentMedEntry = value;
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        entriesAux[idx] = entryAux;
        // 5. Set the state to our new copy
        this.setState({entriesAux});
    }

    handleNewEntry(){

        let entryAux = {
            entryId:this.state.entries.length,
            currentMedEntry:{},
            currentDescription:""
        }

        console.log(entryAux)

        this.setState(prevState => ({
            entries: [...prevState.entries, entryAux],
        }), console.log("Entriesss",this.state.entries));
    }

    handlePosology = (value,idx) => {
        //this.setState({entry: {...entry}})
        if (value) {
            this.setState({entry})
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
                    if (this.state.entry.currentDescription !== "") description += "\n"
                    description += `\nCapacidade: ${capacity} ${data.data}`
                    this.setState({entry: {currentDescription: this.state.currentDescription.concat(description)}})
                })
                .catch (e => console.log(e))
        }
    }

    async renderInfo(value){
        let dciDescription = ""

    }

    renderDCI (id) {
        if (id){
            axios.get(`http://localhost:4800/dci/getDCI?id=${id}`)
                .then(data => {
                    let description = ""
                    if (this.state.entry.currentDescription !== "") description += "\n"
                    description += `Designação Comum Internacional: ${data.data}`
                    this.setState({entry : {currentDescription: this.state.currentDescription.concat(description)}})
                })
                .catch (e => console.log(e))
        }
    }

    renderPharmForm (id) {
        if (id){
            axios.get(`http://localhost:4800/pharmForm/getPharmForm?id=${id}`)
                .then(data => {
                    let description = ""
                    if (this.state.entry.currentDescription !== "") description += "\n"
                    description += `\nForma Farmacêutica: ${data.data}`
                    this.setState({entry: {currentDescription: this.state.currentDescription.concat(description)}})
                })
                .catch (e => console.log(e))
        }
    }

    renderContainerForm(id){
        if (id){
            axios.get(`http://localhost:4800/unitMed/getUnitMed?id=${id}`)
                .then(data => {
                    let description = ""
                    if (this.state.entry.currentDescription !== "") description += "\n"
                    description += `\nForma de Apresentação: ${data.data}`
                    this.setState({entry: {currentDescription: this.state.currentDescription.concat(description)}})
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
                    if (this.state.entry.currentDescription !== "") description += "\n"
                    description += "\nVia(s) de Administração: "

                    for(let i = 0; i< viasArray.length ;i++){
                        if (i === viasArray.length - 1) description += `${viasArray[i].description}`

                        else description += `${viasArray[i].description}, `
                    }
                    this.setState({entry: {currentDescription: this.state.currentDescription.concat(description)}})
                })
                .catch (e => console.log(e))
        }
    }



  render() {
    return (
        this.state.entries.map((val, idx)=> {
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
                            value = {this.state.entries[idx].currentDescription}
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
                    <Grid item xs={12} sm={4}>
                      <Button
                          variant="contained"
                          color="secondary"
                          onClick = {this.handleNewEntry}
                          className="botao2"
                      >Novo Medicamento
                      </Button>

                  </Grid>
              </React.Fragment>
            )
        })
    )
  }
}
