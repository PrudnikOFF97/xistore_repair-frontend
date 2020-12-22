import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import RepairmentsList from './../RepairmentsList/RepairmentsList';


class RepairmentsWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
          repairmentsType: props.repairmentsType,
          rows: [],
          open: !!props.open,
        };
    }
    render() {
        return (
            <>
                <TableRow>
                    <TableCell colSpan={0}>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.setState({open: !this.state.open})}>
                            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            {this.state.repairmentsType.text}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0, width: "100vw" }}>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <RepairmentsList apiLink={this.state.repairmentsType.apiLink}></RepairmentsList>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        );
    }
}

export default RepairmentsWrapper;
