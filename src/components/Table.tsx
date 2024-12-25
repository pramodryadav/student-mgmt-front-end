import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress } from '@mui/material';

interface TableProps<T extends Record<string, React.ReactNode>> {
    rows: T[];              // Accepts any array of objects
    columns: (keyof T)[];   // Keys in columns should match properties in each row
    loading:boolean;
}
export default function BasicTable<T extends Record<string, React.ReactNode>>({ rows, columns,loading }:TableProps<T>) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {
                            columns.map((column) => (<TableCell key={String(column)}>{String(column)}</TableCell>))
                        }

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length>0 ? rows.map((row) => (
                        <TableRow
                            key={String(row.id)}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {
                                columns.map((column) => (
                                    <TableCell key={`${row.id}-${String(column)}`} component="th" scope="row">
                                        {row[column]}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    )):
                    <TableRow>
                         <TableCell colSpan={columns.length} align='center'  component="th" scope="row">
                                    {  loading ?<CircularProgress /> :"No record found..."}
                        </TableCell>
                    </TableRow>
                }
                </TableBody>
            </Table>
        </TableContainer>
    );
}