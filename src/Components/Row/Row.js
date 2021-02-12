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
import DateForm from '../DateForm/DateForm';
import Axios from 'axios';

const useStyles = makeStyles({
    recived:{
      background: '#fffc00',  /* fallback for old browsers */
      background: '-webkit-linear-gradient(to left, #ffffff, #ffffff, #fffc00, #fffc00)',  /* Chrome 10-25, Safari 5.1-6 */
      background: 'linear-gradient(to left, #ffffff, #ffffff, #fffc00, #fffc00)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    },
    issued:{
      background: '#45B649',  /* fallback for old browsers */
      background: '-webkit-linear-gradient(to right, #45B649, #45B649, #fff, #fff)',  /* Chrome 10-25, Safari 5.1-6 */
      background: 'linear-gradient(to right, #45B649, #45B649, #fff, #fff)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    },
    outdated:{
      background: '#89253e',  /* fallback for old browsers */
      background: '-webkit-linear-gradient(to right, #89253e, #89253e, #fff, #fff)',
      background: 'linear-gradient(to right, #89253e, #89253e, #fff, #fff)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */  
    }
});


const Row = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [row, setRow] = React.useState(props.row);
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
                                        {column.type === 'date' ? value !== undefined ? value : <form onSubmit={(event) => handleDateSubmit(event, column, row)}><DateForm columnId={column.id} row={row}/></form> : value !== undefined ? value : 'Нет'}
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
