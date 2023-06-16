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
import { IClaim } from '../../models/claim';
import {
  ClaimsContext,
  SelectedClaimContext
} from '../../providers/ClaimsProvider';
import { useNavigate } from 'react-router-dom';
import { NavBarTitleContext } from '../../providers/NavbarTitleProvider';
import { fetchClaims } from '../../api/claims/ClaimsAPI';

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

  const navigate = useNavigate();
  const { isLoading } = useQuery('ClaimsList', fetchClaims, {
    onSuccess: setClaims
  });
  useEffect(() => setTitle('Claims'));

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
              onClick={(event) => {
                navigate(`/claims/${claim._id}`);
                setTitle(`Claim - ${claim._id}`);
              }}
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
