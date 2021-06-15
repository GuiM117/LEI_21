import React from 'react';
import SearchBar from "material-ui-search-bar";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import moment from 'moment';
import 'moment/locale/pt'



const axios = require('axios');

export default class TableTest extends React.Component {
    
  state = { 
    searched: "",
    patientsList: [],
    patientsListFull: []
  }

  componentWillMount() {
    axios("http://localhost:4800/patients/listPatients").then(resp => {
      this.setState({patientsList: resp.data, patientsListFull: resp.data}, () => {
        console.log(this.props)
        console.log(this.state)
        //console.log(this.state.patientsListFull)
        //console.log(this.state.patientsList)
      })
    })
  }
  //classes = useStyles();

  handleClick(row)
  {
         console.log('Row clicked : ' + row);
  }

  
  requestSearch = (searchedVal) => {
    if(searchedVal === ""){ 
        this.state.patientsList = this.state.patientsListFull;
    }
    
    const filteredRows = this.state.patientsList.filter((row) => {
        return row.name.toLowerCase().startsWith(searchedVal.toLowerCase());
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
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.patientsList.map((row) => (
                        <TableRow component={Link} href={'/medic/'+ this.props.doctorID +'/' + row.name + '/' + row.patientNumber + '/' + row.sex + '/' + row.birth_date} key={row._id} onClick={() => this.handleClick(row.patientNumber)}>
                        <TableCell>{row.patientNumber}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.sex}</TableCell>
                        <TableCell>
                          {moment(row.birth_date).format("dddd, DD MMM YYYY")}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </React.Fragment>
        );
    }
    
}
