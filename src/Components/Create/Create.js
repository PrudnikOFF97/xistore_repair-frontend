import React, { Component } from 'react';
import Axios from 'axios';
import './Create.css';
import { withStyles } from '@material-ui/core/styles';
import { Select } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckboxOther from '../CheckboxOther/CheckboxOther';
import Loader from 'react-loader-spinner';


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

  const OrangeCheckbox = withStyles({
    root: {
      color: '#FF6700',
      '&$checked': {
        color: '#FF6700',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

class Create extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: false,
            managers: []

        };
    }
    componentDidMount(){
        Axios.get(process.env.REACT_APP_API_URL+"/user/managers")
        .then(res => {
            this.setState({managers: res.data});
        })
    }
    render() {

        const findModel = async (event) => {
            const eventT = event.target;
            if(eventT.value !== ""){
                eventT.value = await fetch(process.env.REACT_APP_API_URL+"/get_model/"+eventT.value)
                .then(response => response.json())
                .then(model =>{
                    if(model){
                        return model.name;
                    }
                });
            }
        }
        const dotReplacer = (event) =>{
            const eventT = event.target;
            eventT.value = eventT.value.split(".").join("/");
        }
        const handleSubmit = (event) => {
            event.preventDefault();
            this.setState({isLoading: true});
            let data = new FormData(event.target);
            Axios.post(process.env.REACT_APP_API_URL, data, {responseType: 'blob'})
            .then(res =>{
                let file = new Blob([res.data], {type: 'application/pdf'});
                let fileURL = window.URL.createObjectURL(file);
                window.open(fileURL);
                this.setState({isLoading: false});
                this.props.history.push("/");
            })
        };
        return (<>
            {this.state.isLoading && <Loader className="app__loader" type="TailSpin" color="#FF6700" height={150} width={150} />}
            <div className="create_form">
                <form autoComplete="off" onSubmit={(event) => handleSubmit(event)}>
                    <div className="first_column">
                    <FormControl variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">Приемщик:</InputLabel>
                        <Select
                            name="manager"
                            variant="standard"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Приемщик:"
                            required
                            disabled={this.state.isLoading}
                            defaultValue=""
                        >
                            {this.state.managers.map(manager => {
                                return(
                                    <MenuItem key={manager} value={manager}>{manager}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <CssTextField margin="dense" required={true} color="secondary" name="model" disabled={this.state.isLoading}  variant="outlined" label="Номенклатура:" onBlur={findModel}/>
                    <CssTextField margin="dense" required={true} name="serial" variant="outlined" disabled={this.state.isLoading}  label="Серия / IMEI:" onBlur={dotReplacer}/>
                    <FormControl variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">Вид ремонта:</InputLabel>
                        <Select
                            name="repair_type"
                            variant="standard"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Вид ремонта:"
                            disabled={this.state.isLoading} 
                            required
                            defaultValue=""
                        >
                            <MenuItem value={"Гарантийный ремонт"}>Гарантийный ремонт</MenuItem>
                            <MenuItem value={"Гарантия SILVER"}>Гарантия SILVER</MenuItem>
                            <MenuItem value={"Гарантия GOLD"}>Гарантия GOLD</MenuItem>
                            <MenuItem value={"Гарантия PLATINUM"}>Гарантия PLATINUM</MenuItem>
                            <MenuItem value={"Платный ремонт"}>Платный ремонт</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">Организация:</InputLabel>
                        <Select
                            name="from"
                            variant="standard"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Организация:"
                            disabled={this.state.isLoading} 
                            required
                            defaultValue=""
                        >
                            <MenuItem value={"ООО Ксистор Плюс"}>ООО Ксистор Плюс</MenuItem>
                            <MenuItem value={"ООО Ньюстэйдж"}>ООО Ньюстэйдж</MenuItem>
                            <MenuItem value={"ООО Новотрэнд"}>ООО Новотрэнд</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="equipment__wrapper">
                        <FormControl component="fieldset">
                            <FormLabel component="legend" className="equipment__label" >Комплектация: </FormLabel>
                            <FormGroup className="group">
                                <FormControlLabel
                                control={<OrangeCheckbox name="equipment" disabled={this.state.isLoading} value="Аппарат"/>}
                                label="Аппарат"
                                />
                                <FormControlLabel
                                control={<OrangeCheckbox name="equipment" disabled={this.state.isLoading} value="Коробка"/>}
                                label="Коробка"
                                />
                                <FormControlLabel
                                control={<OrangeCheckbox name="equipment" disabled={this.state.isLoading} value="Гарантийный талон"/>}
                                label="Гарантийный талон"
                                />
                                <FormControlLabel
                                control={<OrangeCheckbox name="equipment" disabled={this.state.isLoading} value="Гарантия Плюс"/>}
                                label="Гарантия Плюс"
                                />
                                <FormControlLabel
                                control={<OrangeCheckbox name="equipment" disabled={this.state.isLoading} value="Руководство пользователя"/>}
                                label="Руководство пользователя"
                                />
                                <FormControlLabel
                                control={<OrangeCheckbox name="equipment" disabled={this.state.isLoading} value="Зарядное устройство"/>}
                                label="Зарядное устройство"
                                />
                                <FormControlLabel
                                control={<OrangeCheckbox name="equipment" disabled={this.state.isLoading} value="Кабель"/>}
                                label="Кабель"
                                />
                                <FormControlLabel
                                control={<OrangeCheckbox name="equipment" disabled={this.state.isLoading} value="Скрепка"/>}
                                label="Скрепка"
                                />
                                <FormControlLabel
                                control={<OrangeCheckbox name="equipment" disabled={this.state.isLoading} value="Чек"/>}
                                label="Чек"
                                />
                                <CheckboxOther disabled={this.state.isLoading}  />
                            </FormGroup>
                        </FormControl>
                    </div>
                    </div>
                    <div className="first_column">
                        <CssTextField margin="dense" color="secondary" name="refoundNumber" disabled={this.state.isLoading} variant="outlined" label="Номер возврата в 1С:"/>
                        <CssTextField
                        id="date"
                        label="Дата покупки:"
                        name="purchaseDate"
                        disabled={this.state.isLoading} 
                        type="date"
                        defaultValue=""
                        required={true}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                        <CssTextField margin="dense" required={true} name="clientName" disabled={this.state.isLoading} variant="outlined" label="ФИО клиента:"/>
                        <CssTextField margin="dense" required={true} type="tel" placeholder="80xxxxxxxxx" pattern="[0-9]{11}" name="clientPhone" disabled={this.state.isLoading} variant="outlined" label="Номер телефона:"/>
                        <CssTextField margin="dense" required={true} name="malfunction" multiline disabled={this.state.isLoading} variant="outlined" label="Описание неисправности:"/>
                        <CssTextField margin="dense" name="notes" disabled={this.state.isLoading} variant="outlined" label="Заметки при приеме:"/>
                        <CssTextField margin="dense" required={true} name="appearance" disabled={this.state.isLoading} variant="outlined" multiline={true} rows={4} label="Внешний вид:"/>
                        <CssTextField margin="dense" name="replacementDevice" disabled={this.state.isLoading} variant="outlined" label="Подменный фонд:"/>
                        <Button type="submit" disabled={this.state.isLoading} variant="outlined" color="primary">Записать</Button>
                    </div>
                </form>
            </div>
            </>
        );
    }
}

export default Create;
