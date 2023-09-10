import React, { FunctionComponent } from "react";
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    styled
  } from '@mui/material';

const RecentClaimsTable:FunctionComponent = () => {

    return (
        <TableContainer>
          <Table sx={{ marginTop: '1rem' }}>
            <TableHead>
            <TableRow>
                <TableCell>Recent Claims</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Activity Date</TableCell>
                <TableCell>Date of Loss</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
    )
  }

export default RecentClaimsTable;