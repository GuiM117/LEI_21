import React from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';



export default function EntryInput(props) {
  
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
  ];

  
  return (
    props.entrys.map((val, idx)=> {
      
      return (
        <React.Fragment>
          <Grid container justify="space-between" spacing={3}>
            <Grid item xs={12} sm={6}>
              
              <Autocomplete
                id="nomeMed"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <TextField {...params} label="Nome Medicamento" />}
              />
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
