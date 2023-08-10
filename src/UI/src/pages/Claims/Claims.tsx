import { useContext, useEffect } from 'react';
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
        if (!data) {
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

    navigate(`/claims/${newClaim._id}`);
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
                  key={claim._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={(event) => {
                    navigate(`/claims/${claim._id}`);
                    setTitle(`Claim - ${claim._id}`);
                  }}
                >
                  <TableCell className="claimNumber">{claim._id}</TableCell>
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
