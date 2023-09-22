import SearchIcon from '@mui/icons-material/Search';
import { Box, Input, Button } from '@mui/material';
import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exists } from '../../api/claims/ClaimsAPI';

const SearchBar: FunctionComponent = () => {
  const [claimNumber, setClaimNumber] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (await exists(claimNumber)) {
      navigate(`/claims/${claimNumber}`);
    } else {
      alert('Claim not found');
    }

    
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      style={{
        color: 'white',
        marginBottom: 1,
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <Input
        id="standard"
        placeholder="Claim Number"
        value={claimNumber}
        onChange={(e) => setClaimNumber(e.target.value)}
        sx={{ color: 'white' }}
        disableUnderline
      />
      <Button sx={{ ml: 1, boxShadow: 'none' }} type="submit">
        <SearchIcon />
      </Button>
    </Box>
  );
};

export default SearchBar;
