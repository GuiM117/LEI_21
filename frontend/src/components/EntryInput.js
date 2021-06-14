import React from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import axios from "axios";
import VirtualizeList from "./VirtualizeList";
import Button from "@material-ui/core/Button";
import { withSnackbar } from 'notistack';
import {Divider} from "@material-ui/core";

const entryInit = {
    chnm: 0,
    initDate: "",
    endDate: "",
    description:""
}


const entry = {
    entryId:0,
    detailedInformation:"",
    name:"",
    entry: { ...entryInit}
}

const initialState = {
    drugsList: [],
    entries: [{...entry}],
    chnms : []
}



class EntryInput extends React.Component {

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

    handleChange() {
        this.props.sendData(this.state.entries);
    }

    /* Altera Array Entries*/
    handleNewEntry(){

        let entryAux = {
            entryId:this.state.entries.length,
            detailedInformation:"",
            entry : {...entryInit}
        }


        this.setState(prevState => ({
            entries: [...prevState.entries, entryAux],
        }), console.log("Entriesss",this.state.entries));
    }

    /* Altera Array Entries */
    handlePosology = (value) => {

        if (value.data) {
            let requestCapacity
            let requestDCI
            let requestPharmForm
            let requestContainerForm
            let requestViaAdmin
            let requestsAux = []
            let requestsStrings = []

            if (value.data.dci_ID) {
                requestDCI = axios.get(`http://localhost:4800/dci/getDCI?id=${value.data.dci_ID}`)
                requestsAux.push(requestDCI)
                requestsStrings.push("Designação Comum Internacional:")
            }
            if (value.data.capacityUnit_ID) {
                requestCapacity = axios.get(`http://localhost:4800/unitMed/getUnitMed?id=${value.data.capacityUnit_ID}`)
                requestsAux.push(requestCapacity)
                requestsStrings.push(`Capacidade: ${value.data.capacity}`)
            }
            if (value.data.farmForm_ID) {
                requestPharmForm = axios.get(`http://localhost:4800/pharmForm/getPharmForm?id=${value.data.farmForm_ID}`)
                requestsAux.push(requestPharmForm)
                requestsStrings.push(`Forma Farmacêutica:`)
            }
            if (value.data.containerForm_ID) {
                requestContainerForm = axios.get(`http://localhost:4800/unitMed/getUnitMed?id=${value.data.containerForm_ID}`)
                requestsAux.push(requestContainerForm)
                requestsStrings.push("Forma de Apresentação:")
            }
            if (value.data.administrationForm_IDs.length !== 0) {
                requestViaAdmin = axios.get(`http://localhost:4800/viaAdmin/getViaAdmins?ids=${value.data.administrationForm_IDs}`)
                requestsAux.push(requestViaAdmin)
                requestsStrings.push("Via(s) de Administração:")
            }

            this.renderAll(requestsAux, requestsStrings, value.id, value.data.chnm,value.data.name)
        }

        else this.updateEntries(value.id, "",-1,"")
    }

    renderAll (requestsAux, requestsStrings,id,chnm,name) {

        axios.all(requestsAux).then(axios.spread((...responses) => {
            let description = ""
            let stringsLength = requestsStrings.length

            for (let i = 0; i < stringsLength; i++ ) {

                if ( requestsStrings[i]==="Via(s) de Administração:"){

                    description += `${requestsStrings[i]}`
                    let viasAdmin = responses[i].data

                    for(let j = 0; j < viasAdmin.length ;j++){
                        if (j === responses[i]["data"].length - 1) description += `${responses[i]["data"][j].description}`
                        else description += `${responses.data[i]["data"][j].description}, `
                    }
                }
                else if (i === stringsLength -1 ) description += `${requestsStrings[i]} ${responses[i].data}`
                else description += `${requestsStrings[i]} ${responses[i].data}\n`

            }

            this.updateEntries(id,description,chnm,name)
        })).catch(errors => {console.log("error, invalid requests", errors)})
    }

    /* Altera Array Entries */
    updateEntries(id, description, chnm,name) {

        let entriesAux = [...this.state.entries];
        let entryAux = {...entriesAux[id]};
        entryAux.detailedInformation = description;
        entryAux.entry.chnm = chnm
        entryAux.name = name
        entriesAux[id] = entryAux;

        this.updateArrayChnms(id,chnm)

        this.setState({entries: entriesAux} , () => {
            console.log(`Entry = ${id}: `, this.state.entries[id])
            this.handleChange()
        });
    }

    updateArrayChnms(id,chnm){

        if (chnm === -1) {
            let chnms = this.state.chnms
            chnms[id] = -1
            this.setState({chnms: chnms}, ()=> {
                console.log("Delete",this.state.chnms)
            })
        }
        else {
            let chnms = this.state.chnms
            chnms[id] = chnm
            this.setState({chnms: chnms}, ()=> {
                console.log("Add",this.state.chnms)
            })

            if (chnms.length > 1) {
                axios.get(`http://localhost:4800/interactions/interaction?chnms=${chnms}`)
                    .then(dados => {
                        let alerts = dados.data

                        for (let i= 0; i<alerts.length;i++ ){
                            this.props.enqueueSnackbar("Interação entre Medicamentos Perigosa", {
                                variant: 'warning',
                                autoHideDuration: 3000,
                                action: key => (
                                    <React.Fragment>
                                        <Button onClick={() => { alert(` ${alerts[i].description}`); }}>
                                            Alert
                                        </Button>
                                        <Button onClick={() => { this.props.closeSnackbar(key) }}>
                                            Dismiss
                                        </Button>
                                    </React.Fragment>
                                ),
                            });
                        }
                        console.log(dados)
                    })
                    .catch(err => console.log)
            }
        }
    }


    /* Altera Array Entries */
    setDate(idx,event, string) {
        let entriesAux = [...this.state.entries];
        let entryAux = {...entriesAux[idx]};

        if (string === "beginDate") entryAux.entry.initDate = event.target.value
        else entryAux.entry.endDate = event.target.value

        entriesAux[idx] = entryAux;

        this.setState({entries: entriesAux}, () => {
            this.handleChange()
            console.log ("Entries: ",this.state.entries[idx])});
    }

    /* Altera Array Entries */
    setDescription (idx,event){
        let entriesAux = [...this.state.entries];
        let entryAux = {...entriesAux[idx]};

        entryAux.entry.description = event.target.value

        entriesAux[idx] = entryAux;

        this.setState({entries: entriesAux}, () => {
            this.handleChange()
            console.log ("Entries: ",this.state.entries[idx])
        });
    }

  render() {
    return (
        this.state.entries.map((val, idx)=> {
            return(
              <React.Fragment key = {idx}>
                    <Grid item xs={12} sm={12}>
                        <VirtualizeList drugList = {this.state.drugsList} sendData={this.handlePosology} id={idx} className = "VirtualizeList"/>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            label="Informação Detalhada"
                            variant="outlined"
                            disabled={true}
                            fullWidth
                            multiline={true}
                            value = {this.state.entries[idx].detailedInformation}
                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                          id="DataInicio"
                          label="Data Inicio"
                          type="date"
                          defaultValue={new Date().toISOString().slice(0, 10)}
                          className="DataInicio"
                          onChange={event => this.setDate(idx,event,"beginDate")}

                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                          id="DataFim"
                          label="Vencimento"
                          type="date"
                          defaultValue={new Date().toISOString().slice(0, 10)}
                          className="DataFim"
                          onChange={event => this.setDate(idx,event,"end")}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            label="Posologia"
                            variant="outlined"
                            fullWidth
                            multiline={true}
                            onChange={event => this.setDescription(idx,event)}

                        />

                    </Grid>
                    {this.state.entries.length > 1 &&
                      <Grid item xs={12} sm={12}>
                        <Divider/>
                      </Grid>
                      }
                    {idx === this.state.entries.length - 1 &&
                        <Grid item xs={12} sm={4}>
                          <Button
                              variant="outlined"
                              color="secondary"
                              onClick = {this.handleNewEntry}
                              className="botao2"
                          >Novo Medicamento
                          </Button>
                      </Grid>
                    }
              </React.Fragment>
            )
        })
    )
  }
}

export default withSnackbar(EntryInput)