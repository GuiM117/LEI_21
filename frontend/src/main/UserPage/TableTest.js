
import MenuAdmin from '../../components/Dashboard'

import React, { useState , useEffect } from 'react';
import SearchBar from "material-ui-search-bar";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import { SystemUpdate } from '@material-ui/icons';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
  }));


const initialState = {
    searched: "",
    patientsList: [],
    patientsListFull: []
}

export default class TableTest extends React.Component {
    
    state = { ...initialState  }

  componentWillMount() {
    axios("http://localhost:4800/patients/listPatients").then(resp => {
      this.setState({patientsList: resp.data, patientsListFull: resp.data}, () => {
        //console.log(this.state.patientsListFull)
        //console.log(this.state.patientsList)
      })
    })
  }
  //classes = useStyles();

  requestSearch = (searchedVal) => {
    if(searchedVal == ""){ 
        this.state.patientsList = this.state.patientsListFull;
    }
    
    const filteredRows = this.state.patientsList.filter((row) => {
        return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    this.setState({
        patientsList: filteredRows
      });
    //console.log(filteredRows);
  };

  cancelSearch = () => {
    this.setState({
        searched: ""
      });
    this.state.patientsList = this.state.patientsListFull;
    this.requestSearch(this.state.searched);
};

    render(){
        return (
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Lista de Pacientes
                </Typography>
                
                <SearchBar
                    value={this.state.searched}
                    onChange={(searchVal) => this.requestSearch(searchVal)}
                    onCancelSearch={() => this.cancelSearch()}
                    onKeyDown={(e) => { if (e.key === 'Backspace') { this.requestSearch(this.state.searched) }}}
                />
    
                <TableContainer>
                <Table size="medium">
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Sexo</TableCell>
                        <TableCell>Data-Nascimento</TableCell>
                        <TableCell align="right">Exemplo</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.patientsList.map((row) => (
                        <TableRow key={row._id}>
                        <TableCell>{row.patientNumber}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.sex}</TableCell>
                        <TableCell>{row.birth_date}</TableCell>
                        <TableCell align="right">1</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </React.Fragment>
        );
    }
    
}
