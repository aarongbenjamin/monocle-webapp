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
  styled,
  LinearProgress
} from '@mui/material';
import {
  standardDateFormat,
  standardDateTimeFormat
} from '../../util/formatDate';
import { useQuery } from 'react-query';
import { IClaim } from '../../models/claim';
import {
  ClaimsContext,
  SelectedClaimContext
} from '../../providers/ClaimsProvider';
import { useNavigate } from 'react-router-dom';
import { NavBarTitleContext } from '../../providers/NavbarTitleProvider';
import { fetchClaims } from '../../api/claims/ClaimsAPI';
import { IsLoadingContext } from '../../providers/IsLoadingProvider';

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
  const { setNavbarTitle: setTitle } = useContext(NavBarTitleContext);

  const { setIsLoading } = useContext(IsLoadingContext);
  const navigate = useNavigate();
  useQuery('ClaimsList', async () => {
    setIsLoading(true);
    const data = await fetchClaims();
    setIsLoading(false);
    return data;
  }, {
    onSuccess: (data) => {
      if (!data ) {
        setClaims([]);
      } else {
        setClaims(data);
      }
    }
  });
  useEffect(() => setTitle('Claims'));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Date of Loss</TableCell>
            <TableCell>Last Activity Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {claims.map((claim) => (
            <StyledTableRow
              key={claim._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={(event) => {
                navigate(`/claims/${claim._id}`);
                setTitle(`Claim - ${claim._id}`);
              }}
            >
              <TableCell className="title">{claim.title}</TableCell>
              <TableCell>{standardDateFormat(claim.dateOfLoss)}</TableCell>
              <TableCell>
                {standardDateTimeFormat(claim.lastUpdatedDate)}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Claims;
