import React, { Component } from 'react';
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
        return (
            <div className="create_form">
                <form target="_blank" action={process.env.REACT_APP_API_URL} method="post" autoComplete="off" onSubmit={() => setTimeout(() =>this.props.history.push("/"))}>
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
                        >
                            <MenuItem value={"Савицкий А.С."}>Савицкий А.С.</MenuItem>
                            <MenuItem value={"Прудников В.И."}>Прудников В.И.</MenuItem>
                            <MenuItem value={"Зенько Е.А."}>Зенько Е.А.</MenuItem>
                            <MenuItem value={"Азважинский И.А."}>Азважинский И.А.</MenuItem>
                        </Select>
                    </FormControl>
                    <CssTextField margin="dense" required={true} color="secondary" name="model" variant="outlined" label="Номенклатура:" onBlur={findModel}/>
                    <CssTextField margin="dense" required={true} name="serial" variant="outlined" label="Серия / IMEI:" onBlur={dotReplacer}/>
                    <FormControl variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">Вид ремонта:</InputLabel>
                        <Select
                            name="repair_type"
                            variant="standard"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Вид ремонта:"
                            required
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
                            required
                        >
                            <MenuItem value={"ООО Новый Символ"}>ООО Новый Символ</MenuItem>
                            <MenuItem value={"ООО Ксистор Плюс"}>ООО Ксистор Плюс</MenuItem>
                            <MenuItem value={"ООО Ньюстэйдж"}>ООО Ньюстэйдж</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="equipment__wrapper">
                        <FormControl component="fieldset">
                            <FormLabel component="legend" className="equipment__label" >Комплектация: </FormLabel>
                            <FormGroup className="group">
                                <FormControlLabel
                                control={<OrangeCheckbox name="equipment" value="Аппарат"/>}
                                label="Аппарат"
                                />
                                <FormControlLabel
                                control={<OrangeCheckbox name="equipment" value="Коробка"/>}
                                label="Коробка"
                                />
                                <FormControlLabel
                                control={<OrangeCheckbox name="equipment" value="Гарантийный талон"/>}
                                label="Гарантийный талон"
                                />
                                <FormControlLabel
                                control={<OrangeCheckbox name="equipment" value="Гарантия Плюс"/>}
                                label="Гарантия Плюс"
                                />
                                <FormControlLabel
                                control={<OrangeCheckbox name="equipment" value="Руководство пользователя"/>}
                                label="Руководство пользователя"
                                />
                                <FormControlLabel
                                control={<OrangeCheckbox name="equipment" value="Зарядное устройство"/>}
                                label="Зарядное устройство"
                                />
                                <FormControlLabel
                                control={<OrangeCheckbox name="equipment" value="Кабель"/>}
                                label="Кабель"
                                />
                                <FormControlLabel
                                control={<OrangeCheckbox name="equipment" value="Скрепка"/>}
                                label="Скрепка"
                                />
                                <FormControlLabel
                                control={<OrangeCheckbox name="equipment" value="Чек"/>}
                                label="Чек"
                                />
                                <CheckboxOther />
                            </FormGroup>
                        </FormControl>
                    </div>
                    </div>
                    <div className="first_column">
                        {/* <CssTextField margin="dense" required={true} name="purchaseDate" variant="outlined" label="Дата покупки:"/> */}
                        <CssTextField margin="dense" color="secondary" name="refoundNumber" variant="outlined" label="Номер возврата в 1С:"/>
                        <CssTextField
                        id="date"
                        label="Дата покупки:"
                        name="purchaseDate"
                        type="date"
                        defaultValue="2020-01-01"
                        // className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                        <CssTextField margin="dense" required={true} name="clientName" variant="outlined" label="ФИО клиента:"/>
                        <CssTextField margin="dense" required={true} type="tel" placeholder="80xxxxxxxxx" pattern="[0-9]{11}" name="clientPhone" variant="outlined" label="Номер телефона:"/>
                        <CssTextField margin="dense" required={true} name="malfunction" variant="outlined" label="Описание неисправности:"/>
                        <CssTextField margin="dense" name="notes" variant="outlined" label="Заметки при приеме:"/>
                        <CssTextField margin="dense" required={true} name="appearance" variant="outlined" multiline={true} rows={4} label="Внешний вид:"/>
                        <CssTextField margin="dense" name="replacementDevice" variant="outlined" label="Подменный фонд:"/>
                        <Button type="submit" variant="outlined" color="primary">Записать</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Create;
