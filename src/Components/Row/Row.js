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
    const rowUpdate = (id) =>{
        console.log("Update!")
        fetch(process.env.REACT_APP_API_URL+"/repairs/"+id)
        .then(res => res.json())
        .then(result => setRow(result));
    };
    return (
        <>
            <TableRow role="checkbox" tabIndex={-1} key={row._id} className={row.issueDate !== undefined ? classes.issued : row.receivingDate !== undefined ? classes.recived : ((new Date() - new Date(row.date.split('.')[1]+"-"+row.date.split('.')[0]+"-"+row.date.split('.')[2]))/1000/3600/24) > 12 ? classes.outdated : ""}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                    {props.columns.slice(1,9).map((column) => {
                        const value = row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align}>
                                {column.type === 'date' ? value !== undefined ? value : <form action={process.env.REACT_APP_API_URL+"/update/"+row._id} method="post" onSubmit={()=>{setTimeout(()=>rowUpdate(row._id),4000);}}><DateForm columnId={column.id} row={row}/></form> : value}
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
                                        {column.type === 'date' ? value !== undefined ? value : <form action={process.env.REACT_APP_API_URL+"/update/"+row._id} method="post" onSubmit={()=>{setTimeout(()=>rowUpdate(row._id),4000);}}><DateForm columnId={column.id} row={row}/></form> : value !== undefined ? value : 'Нет'}
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
