import SearchIcon from '@mui/icons-material/Search';
import { Box, Input, Button } from '@mui/material';
import React, { FunctionComponent, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { exists } from '../../api/claims/ClaimsAPI';
import { NotificationContext } from '../../providers/NotificationProvider';

const SearchBar: FunctionComponent = () => {
  const [claimNumber, setClaimNumber] = useState('');

  const { setNotificationOpen } = useContext(NotificationContext);


  const navigate = useNavigate();

  const isButtonDisabled = claimNumber === '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (await exists(claimNumber)) {
      navigate(`/claims/${claimNumber}`);
    } else {
      setNotificationOpen(true);
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
        autoComplete='off'
        placeholder="Claim Number"
        value={claimNumber}
        onChange={(e) => setClaimNumber(e.target.value)}
        sx={{ color: 'white' }}
        disableUnderline
      />
      <Button 
      sx={{ ml: 1, boxShadow: 'none' }} 
      type="submit"
      disabled={isButtonDisabled}
      >
        <SearchIcon />
      </Button>
    </Box>
  );
};

export default SearchBar;
