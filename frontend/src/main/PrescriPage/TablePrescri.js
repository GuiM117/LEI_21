//import MenuAdmin from '../../components/Dashboard'
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import 'moment/locale/pt'

const axios = require('axios');


const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });


  function RowAlt(props) {
    const { row } = props;
    const { users } = props;
    console.log(props);
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
  
    var userName = [];
    
    for (let [key, value] of users.entries()) {
      if (value.patientNumber === row.patientNumber)
        userName = value.name;
    }
    //console.log(userName);
  
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.patientNumber}
          </TableCell>
          <TableCell>{userName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Detalhes Receita
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Data Inicio</TableCell>
                      <TableCell>Data Fim</TableCell>
                      <TableCell>Posologia</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.entryID.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {moment(historyRow.initDate).locale('pt').format("dddd, DD MMM YYYY")}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {moment(historyRow.endDate).format("dddd, DD MMM YYYY")}
                        </TableCell>
                        <TableCell>{historyRow.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }


const initialState = {
    prescList: [],
    prescListAux: [],
    userList: [],
    acabou: false,
    entryInd: []
}


export default class TablePrescri extends React.Component {
    
    state = { ...initialState  }

    componentDidMount() {

      console.log(this.props);
      axios("http://localhost:4800/patients/listPatients").then(respond => {
        respond.data.forEach(element => {
          //console.log(element)
          this.state.userList = this.state.entryInd.concat(respond.data);
        })
      })

      axios("http://localhost:4800/prescriptions/"+this.props.doctorID).then(resp => {
        //this.setState({prescList: resp.data}, () => {
          //console.log(this.state.prescList)
          console.log(resp)
          //console.log(this.state);
          resp.data.forEach(element => {
            //console.log("elemento prescList:")
            //console.log(element);
            // para cada elemento EntryID:
            var tamAt = 0;
            element.entryID.forEach(elementoEntry => {
              const tamMax = element.entryID.length;
              //console.log("elemento Entry:");

              axios("http://localhost:4800/entry/"+elementoEntry).then(response => {
                tamAt++;
                this.state.entryInd = this.state.entryInd.concat(response.data);
                //console.log(response.data);
                //console.log(this.state.entryInd);
                this.setState({
                  prescListAux: {
                    doctorID: element.doctorID,
                    patientNumber: element.patientNumber,
                    entryID: this.state.entryInd
                  }
                })
                if(tamAt == tamMax){
                  //console.log(tamAt)
                  //console.log(tamMax)
                  //console.log("AQUI")
                  this.setState({
                    ...this.state,
                      prescList: this.state.prescList.concat(this.state.prescListAux),
                      entryInd : []
                    
                  })
                  //this.state.prescList = this.state.prescList.concat(this.state.prescListAux);
                  //this.state.entryInd = [];
                  //this.state.acabou = true;
                  
                }
                console.log(this.state);

              })
              //console.log(tamAt);
              //console.log(this.state.prescList)
            })
            
          });
          
        //})
      })
    }
    
    render(){
      console.log(this.props);
      return (
          <React.Fragment>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Lista de Prescrições
              </Typography>
              
              <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                  <colgroup>
                      <col style={{width:'10%'}}/>
                      <col style={{width:'20%'}}/>
                      <col style={{width:'70%'}}/>
                  </colgroup>
                      <TableHead>
                      <TableRow>
                          <TableCell />
                          <TableCell align="left">Número de Paciente</TableCell>
                          <TableCell>Nome</TableCell>
                      </TableRow>
                      </TableHead>
                      <TableBody>
                        
                      { this.state.prescList.map((row) => (
                          <RowAlt key={row.name} row={row} users={this.state.userList} />
                      ))}
                      </TableBody>
                  </Table>
                  </TableContainer>
          </React.Fragment>
      );
  }
    
}
