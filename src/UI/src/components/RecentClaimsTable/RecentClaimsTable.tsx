import { FunctionComponent } from 'react';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

const RecentClaimsTable: FunctionComponent = () => {
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
  );
};

export default RecentClaimsTable;
