import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";




const AddModel = () => {
    const CssTextField = withStyles({
        root: {
          '& label.Mui-focused': {
            color: '#FF6700',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#FF6700',
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#FF6700',
            },
          },
        },
      })(TextField);
    const history = useHistory();

    
    return (
        <form action={process.env.REACT_APP_API_URL+"/add-model"} method="post" autoComplete="off" onSubmit={() => setTimeout(() =>history.push("/"))}>
            <CssTextField margin="dense" required={true} style={{margin: "15px"}} color="secondary" name="name" variant="outlined" label="Наименование из 1С:"/>
            <CssTextField margin="dense" required={true} style={{margin: "15px"}} name="code" variant="outlined" label="Штрих-код:"/>
            <div></div>
            <Button type="submit" style={{margin: "15px"}} variant="contained" color="primary">Добавить номенклатуру</Button>
        </form>
    );
}

export default AddModel;
