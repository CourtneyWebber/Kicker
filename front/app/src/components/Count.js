import * as React from 'react';
import Title from './Title';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

function createData(id, description, count) {
    return { id, description, count };
}

const rows = [
    createData(
        0,
        "This month",
        6
    ),
    createData(
        1,
        "This year",
        60
    ),
    createData(
        2,
        "Since starting",
        360
    )
];

//Basic table showing cumulative goals.
export default function Count() {
    return (
        <React.Fragment>
            <Title>Goals Kicked</Title>
            <Table size="large">
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.count}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}