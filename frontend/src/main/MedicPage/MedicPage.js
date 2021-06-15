import '../../styles/MedicPage.css'
import React from "react"
import MenuAdmin from '../../components/Dashboard'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from "axios";
import PainelNovaPrescricao from './PainelNovaPrescricao';
import Review from './Review';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#DCF9FF',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const useStyles2 = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 1200,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Escolha Medicamentos', 'Revisão Prescrição'];




const MedicPage = (props) => {

  const classes = useStyles();
  const classes2 = useStyles2();

  const [activeStep, setActiveStep] = React.useState(0);
  const [prescription,setPrescription] = React.useState({entries:[],patientInfo:{}})
  const doctorID = props.match.params.docID;
  //console.log(props);
  //const doctorID = window.$name
  console.log(doctorID);

  const handleChange = (value) => {
    console.log("Entries",value.entries)
    let precriptionAux = {
      entries: value.entries,
      patientInfo: {...value.patientInfo}
    }
    setPrescription(precriptionAux)
    //console.log("Entries MedicPage", prescription)
  }

  function getStepContent(step) {

    switch (step) {
      case 0:
        return <React.Fragment>
          <PainelNovaPrescricao sendData={handleChange} id={props.match.params.id} name={props.match.params.name} sex={props.match.params.sex} date={props.match.params.date}/>
        </React.Fragment>
      case 1:
        return <React.Fragment>
          <Review prescription={prescription}/>
        </React.Fragment>
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);

    // EMITIR PRESCRIÇÃO
    if (activeStep === 1) {
      let entries = prescription.entries
      let reqEntries = []

      for (let i = 0;i<entries.length;i++){
        //console.log(entries[i].entry, entries[i])
        reqEntries.push({...entries[i].entry})
      }
      console.log("ReqEntries", reqEntries)
      axios.post("http://localhost:4800/entry/registEntries", {entries: reqEntries} )
          .then(dados => {
            let idEntries = dados.data.idEntries

            axios.post("http://localhost:4800/prescriptions/registPrescription", {patientNumber: prescription.patientInfo.patientNumber, doctorID: doctorID, entryID: idEntries})
                .then (dados => console.log("Done"))
                .catch(error => console.log("Error"))
          })
          .catch(error => console.log(error))

    }
  };



  return (

      <div className="body">
        <div className={classes.root}>
      <MenuAdmin doctorID={doctorID}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>

        <React.Fragment>
          <CssBaseline />
          <main className={classes2.layout}>
            <Paper className={classes2.paper}>
              <Typography component="h1" variant="h4" align="center">
                Nova Prescrição
              </Typography>
              <Stepper activeStep={activeStep} className={classes2.stepper}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      A sua prescrição foi emitida com sucesso
                    </Typography>
                    <Typography variant="subtitle1">
                      {`O número associado à sua prescrição é 60b55e4780116b0a70cd4225.
                      Pode consultá-la sempre que possível no separador Prescrições.`}
                    </Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <div className={classes2.buttons}>
                      {/*{activeStep !== 0 && (
                        <Button onClick={handleBack} className={classes2.button}>
                          Anterior
                        </Button>
                      )}*/}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes2.button}
                      >
                        {activeStep === steps.length - 1 ? 'Emitir' : 'Próximo'}
                      </Button>
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
          </main>
        </React.Fragment>
        </Container>
      </main>
      </div>
      </div>

  );
}


export default MedicPage;
