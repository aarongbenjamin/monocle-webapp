import { useContext, useEffect, useState } from 'react';
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
import {
  standardDateFormat,
  standardDateTimeFormat
} from '../../util/formatDate';
import { useQuery } from 'react-query';
import { ClaimsContext } from '../../providers/ClaimsProvider';
import { useNavigate } from 'react-router-dom';
import { NavBarTitleContext } from '../../providers/NavbarTitleProvider';
import { createClaim, fetchClaims } from '../../api/claims/ClaimsAPI';
import { IsLoadingContext } from '../../providers/IsLoadingProvider';
import { formatStatus } from '../../util/formatStatus';
import RecentClaimsTable from '../../components/RecentClaimsTable/RecentClaimsTable';
import { IClaim } from '../../models/claim'

const StyledTableRow = styled(TableRow)`
  &:hover {
    cursor: pointer;
    background-color: lightgray;
  }
  &:hover .claimNumber {
    text-decoration: underline;
    color: blue;
  }
`;

const Claims = () => {

  const { claims, setClaims } = useContext(ClaimsContext);
  const { setNavbarTitle: setTitle } = useContext(NavBarTitleContext);
  
  const loadRecentClaims = () => {
    const recentSearchesJSON: string | null = localStorage.getItem('recentSearches');
    if (recentSearchesJSON == null) return [];
    return JSON.parse(recentSearchesJSON);
  }

  const recentClaims: IClaim[] = loadRecentClaims();

  const addRecentClaim = (claimId: string, recentClaim: IClaim) => {
    const recentClaimIds: string[] = recentClaims.map((claim: IClaim) => claim.id);
    const isNotDuplicate: boolean = !recentClaimIds.includes(claimId);
   
    if (isNotDuplicate) {
      if (recentClaims.length > 4) { recentClaims.pop(); }
      localStorage.setItem('recentSearches', JSON.stringify([recentClaim, ...recentClaims]))
    } else {
      const filteredRecentClaims: IClaim[] = recentClaims.filter((claim: IClaim) => claim.id !== claimId)
      localStorage.setItem('recentSearches', JSON.stringify([recentClaim, ...filteredRecentClaims]))
    }
  }

  const { setIsLoading } = useContext(IsLoadingContext);
  const navigate = useNavigate();
  useQuery(
    'ClaimsList',
    async () => {
      setIsLoading(true);
      const data = await fetchClaims();
      setIsLoading(false);
      return data;
    },
    {
      onSuccess: (data) => {
        if (!data || data.length === 0) {
          setClaims([]);
        } else {
          setClaims(data);
        }
      }
    }
  );
  useEffect(() => setTitle('Claims'));
  const handleAddClaimClick = async () => {
    const newClaim = await createClaim();

    navigate(`/claims/${newClaim.id}`);
  };

  return (
    <Grid container flexDirection="column" rowSpacing={2}>
      <Grid item container justifyContent="flex-end">
        <Button variant="contained" onClick={handleAddClaimClick}>
          Add Claim
        </Button>
      </Grid>
      <Grid item>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Claim Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Activity Date</TableCell>
                <TableCell>Date of Loss</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {claims.map((claim) => (
                <StyledTableRow
                  key={claim.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={(event) => {
                    navigate(`/claims/${claim.id}`);
                    setTitle(`Claim - ${claim.id}`);
                    addRecentClaim(claim.id, claim);
                  }}
                >
                  <TableCell className="claimNumber">{claim.id}</TableCell>
                  <TableCell>{formatStatus(claim.status)}</TableCell>
                  <TableCell>
                    {standardDateTimeFormat(claim.lastUpdatedDate)}
                  </TableCell>
                  <TableCell>{standardDateFormat(claim.dateOfLoss)}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
            <TableBody>
              {recentClaims.map((claim: IClaim) => (
                <StyledTableRow
                  key={claim.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={(event) => {
                    navigate(`/claims/${claim.id}`);
                    setTitle(`Claim - ${claim.id}`);
                  }}
                >
                  <TableCell className="claimNumber">{claim.id}</TableCell>
                  <TableCell>{formatStatus(claim.status)}</TableCell>
                  <TableCell>
                    {standardDateTimeFormat(claim.lastUpdatedDate)}
                  </TableCell>
                  <TableCell>{standardDateFormat(claim.dateOfLoss)}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Claims;
