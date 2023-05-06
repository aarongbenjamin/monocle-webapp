import React, { FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { standardDateFormat } from '../../util/format-date';
import { useQuery } from 'react-query';
interface IClaim {
  _id: string;
  title: string;
  createdDate: string;
  incidentDate: string;
}
const Claims: FunctionComponent = () => {
  const { isLoading, data } = useQuery('ClaimsList', async () => {
    const response = await axios.get('/api/claims');
    return response.data as IClaim[];
  });
  return isLoading ? (
    <CircularProgress />
  ) : (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Incident Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data!.map((claim) => (
            <TableRow
              key={claim._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{claim.title}</TableCell>
              <TableCell>{standardDateFormat(claim.createdDate)}</TableCell>
              <TableCell>{standardDateFormat(claim.incidentDate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Claims;
