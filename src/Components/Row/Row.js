import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import PrintIcon from '@material-ui/icons/Print';
import DateForm from '../DateForm/DateForm';
import Comment from '../Comment/Comment';
import Loader from 'react-loader-spinner';
import Axios from 'axios';

const useStyles = makeStyles({
    recived:{
      background: 'linear-gradient(to left, #ffffff, #ffffff, #fffc00, #fffc00)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    },
    issued:{
      background: 'linear-gradient(to right, #34a853, #34a853, #fff, #fff)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    },
    outdated:{
      background: 'linear-gradient(to right, #ea4335, #ea4335, #fff, #fff)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */  
    }
});


const Row = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [row, setRow] = React.useState(props.row);
    const [printLoading, setPrintLoading] = React.useState(false);
    const handleDateSubmit = (event, column, row) =>{
        event.preventDefault();
        if(event.target[column.id].value){
            Axios.post(process.env.REACT_APP_API_URL+"/repairs/update/"+row._id,{[column.id]: event.target[column.id].value})
            .then(res =>{
                if(res.status === 204){
                    rowUpdate(row._id)
                }
            })
        }
    };
    const rowUpdate = (id) =>{
        Axios.get(process.env.REACT_APP_API_URL+"/repairs/"+id)
        .then(result => setRow(result.data));
    };
    return (
        <>
            <TableRow role="checkbox" tabIndex={-1} key={row._id} className={row.issueDate !== undefined ? classes.issued : row.receivingDate !== undefined ? classes.recived : ((new Date() - new Date(row.date.split('.')[2]+"-"+row.date.split('.')[1]+"-"+row.date.split('.')[0]))/1000/3600/24) > 12 ? classes.outdated : ""}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                    {props.columns.slice(1,9).map((column) => {
                        const value = row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align}>
                                {column.type === 'date' ? value !== undefined ? value : <form onSubmit={(event) => handleDateSubmit(event, column, row)}><DateForm columnId={column.id} row={row}/></form> : value}
                            </TableCell>
                        );
                    })}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 5, paddingTop: 0 }} colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                            <TableRow>
                                {props.columns.slice(9).map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow role="checkbox" tabIndex={-1} key={row._id}>
                                    {props.columns.slice(9).map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                        {column.type === 'date' ? value !== undefined ? value : <form onSubmit={(event) => handleDateSubmit(event, column, row)}><DateForm columnId={column.id} row={row}/></form> : column.type === 'print' || column.type === 'text' ? '' : value !== undefined  ? value :   'Нет'}
                                        {column.type === 'print' ? 
                                            printLoading ? 
                                            <Loader type="TailSpin" color="#FF6700" height={25} width={25} /> :
                                            <PrintIcon color="primary" style={{cursor: "pointer"}} onClick={()=>{
                                                setPrintLoading(true);
                                                Axios.get(process.env.REACT_APP_API_URL+"/print/"+row._id,{responseType: 'blob'})
                                                .then(res =>{
                                                    let file = new Blob([res.data], {type: 'application/pdf'});
                                                    let fileURL = window.URL.createObjectURL(file);
                                                    window.open(fileURL);
                                                    setPrintLoading(false);
                                                })
                                            }}/> : ""}
                                        {column.type === 'text' ? <form onSubmit={(event) => handleDateSubmit(event, column, row)}><Comment row={row} comment={row.comment} /></form> : ""}
                                        </TableCell>
                                    );
                                    })}
                                </TableRow>
                            </TableBody>
                        </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>    
    );
}

export default Row;
