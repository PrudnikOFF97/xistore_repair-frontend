import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import "../AddModel/AddModel.css";
import { Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import Axios from 'axios';




const AddModel = () => {
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
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
    const submitHandler = (e) =>{
      e.preventDefault();
      setMessage("");
      let data = new FormData(e.target);
      Axios.post(process.env.REACT_APP_API_URL+"/add-model", data)
      .then(res => {
        setOpen(true);
        setTimeout(() => {
          history.push("/");
        }, 2000);
      })
      .catch(res => {
        setOpen(true);
        setMessage(res.response.data.message);
      })
    };
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    
    return (<>
        <form className="AddModel_form" autoComplete="off" onSubmit={(event) => submitHandler(event)}>
            <CssTextField margin="dense" required={true} style={{margin: "15px"}} color="secondary" name="name" variant="outlined" label="Наименование из 1С:"/>
            <CssTextField margin="dense" required={true} style={{margin: "15px"}} name="code" variant="outlined" label="Штрих-код:"/>
            <div></div>
            <Button type="submit" style={{margin: "15px"}} variant="contained" color="primary">Добавить номенклатуру</Button>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={!!message ? "error" : "success"}>
            {!!message ? message : "Номенклатура успешно добавлена!"}
          </Alert>      
      </Snackbar>
      </>
    );
}

export default AddModel;
