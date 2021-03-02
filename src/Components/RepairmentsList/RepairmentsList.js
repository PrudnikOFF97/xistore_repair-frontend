import React, { useEffect } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Loader from 'react-loader-spinner';
import Row from '../Row/Row';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const columns = [
    { id: 'arrow', label: '', minWidth: 1 },
    { id: 'date', label: 'Дата приема', minWidth: 10 },
    { id: 'model', label: 'Устройство', minWidth: 100, align: 'center' },
    { id: 'serial', label: 'Cерия/IMEI', minWidth: 10, align: 'center' },
    {
      id: 'repair_type',
      label: 'Вид ремонта',
      minWidth: 20,
      align: 'center',
    },
    {
      id: 'clientName',
      label: 'ФИО клиента',
      minWidth: 70,
      align: 'center',
    },
    {
      id: 'clientPhone',
      label: 'Номер телефона',
      minWidth: 5,
      align: 'center',
    },
    {
      id: 'sendingDate',
      label: 'Дата отправки',
      type: 'date',
      minWidth: 175,
      align: 'center',
    },
    {
      id: 'receivingDate',
      label: 'Дата получения',
      type: 'date',
      minWidth: 175,
      align: 'center',
    },
    {
      id: 'issueDate',
      label: 'Дата выдачи',
      type: 'date',
      minWidth: 175,
      align: 'center',
    },
    {
      id: 'refoundNumber',
      label: 'Номер возврата в 1С',
      minWidth: 175,
      align: 'center',
    },
    {
      id: 'replacementDevice',
      label: 'Подменный фонд',
      minWidth: 175,
      align: 'center',
    },
    {
      id: 'comment',
      label: 'Комментарий',
      type: 'text',
      minWidth: 5,
      align: 'center',
    },
    {
      id: 'print',
      label: 'Печать',
      type: 'print',
      minWidth: 5,
      align: 'center',
    }
  
  ];
  
  export default function StickyHeadTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [rows, setRows] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const useStyles = makeStyles({
      root: {
        width: '100%',
      },
      container: {
        maxHeight: "79vh",
      },
    });  
    const classes = useStyles();
    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_API_URL}/repairs/${props.apiLink}`)
          .then(
            (result) => {
              setIsLoaded(true);
              setRows(result.data.reverse());
            },
            (error) => {
              setIsLoaded(true);
            }
          )
      }, [props.apiLink]);
  
    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.slice(0,9).map((column) => (
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
            {!isLoaded &&
            <TableRow role="checkbox" tabIndex={-1}>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell >
                <Loader type="TailSpin" color="#FF6700" height={80} width={80} />
              </TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
            </TableRow>}
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <Row key={row._id} row={row} columns={columns}/>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {rows.length < 10 ? "" :
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />}
      </Paper>
    );
  }
