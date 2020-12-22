import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import RepairmentsWrapper from './../RepairmentsWrapper/RepairmentsWrapper';

class Repairs extends Component {
    render() {
        return (
            <Paper>
                <TableContainer>
                    <Table>
                    <TableBody>
                    <RepairmentsWrapper repairmentsType={{text:"Готовы к выдаче", apiLink:"recived"}} open={true}/>
                    <RepairmentsWrapper repairmentsType={{text:"Ожидают отправку", apiLink:"just-acepted"}}/>
                    <RepairmentsWrapper repairmentsType={{text:"Ожидаем получения", apiLink:"sended"}}/>
                    <RepairmentsWrapper repairmentsType={{text:"Выданы", apiLink:"issued"}}/>
                    </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        );
    }
}

export default Repairs;
