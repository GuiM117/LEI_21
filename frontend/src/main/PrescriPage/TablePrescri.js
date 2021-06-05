//import MenuAdmin from '../../components/Dashboard'
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import React, { useState , useEffect } from 'react';
//import SearchBar from "material-ui-search-bar";
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
//import { SystemUpdate } from '@material-ui/icons';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
  }));


  const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
  
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
          <TableCell>{row.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Data Inicio</TableCell>
                      <TableCell>Data Fim</TableCell>
                      <TableCell>Medicamento</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.entrys.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.initDate}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {historyRow.endDate}
                        </TableCell>
                        <TableCell>{historyRow.description}</TableCell>
                        <TableCell align="right">{historyRow.dosagePerDay}</TableCell>
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

Row.propTypes = {
    row: PropTypes.shape({
        patientNumber: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }).isRequired,
  };


  function createData(patientNumber, name) {
    return {
      patientNumber,
      name,
      entrys: [
        { initDate: '2020-01-05', endDate: '2021-01-05', description: 'Nome do Medicamento ou Assim', dosagePerDay: 3 },
        { initDate: '2020-01-02', endDate: '2021-01-05', description: 'Nome do Medicamento ou Subs Ativa', dosagePerDay: 1 },
      ],
    };
  }
  

const initialState = {
    rows: [
        createData(1, 'Zacarias Antonio'),
        createData(2, 'Pinto da Costa'),
        createData(3, 'Jose Machado'),
        createData(4, 'Cupcake de Morango'),
    ]
}

export default class TablePrescri extends React.Component {
    
    state = { ...initialState  }

    render(){
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
                        {this.state.rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
            </React.Fragment>
        );
    }
    
}
