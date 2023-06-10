import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import axios from 'axios';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled
} from '@mui/material';
import { standardDateFormat } from '../../util/format-date';
import { useQuery } from 'react-query';
import { IClaim } from '../../Models/claim';
import { ClaimsContext } from '../../Providers/ClaimsProvider';

const StyledTableRow = styled(TableRow)`
  &:hover {
    cursor: pointer;
    background-color: lightgray;
  }
  &:hover .title {
    text-decoration: underline;
    color: blue;
  }
`;

const Claims = () => {
  const { claims, setClaims } = useContext(ClaimsContext);

  const { isLoading } = useQuery(
    'ClaimsList',
    async () => {
      console.log('Fetching claims');
      const response = await axios.get<IClaim[]>('/api/claims');
      return response.data!;
    },
    {
      onSuccess: setClaims
    }
  );

  return isLoading ? (
    <CircularProgress />
  ) : (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Date of Loss</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {claims.map((claim) => (
            <StyledTableRow
              key={claim._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell className="title">{claim.title}</TableCell>
              <TableCell>{standardDateFormat(claim.createdDate)}</TableCell>
              <TableCell>{standardDateFormat(claim.dateOfLoss)}</TableCell>
              <TableCell></TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Claims;
