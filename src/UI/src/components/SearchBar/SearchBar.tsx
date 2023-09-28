import SearchIcon from '@mui/icons-material/Search';
import { Box, Input, Button } from '@mui/material';
import React, { FunctionComponent, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { exists } from '../../api/claims/ClaimsAPI';
import { AlertDetailsContext, Severities } from '../../providers/AlertProvider';

const SearchBar: FunctionComponent = () => {
  const [claimNumber, setClaimNumber] = useState('');

  const { setAlertDetails: setNotification } = useContext(AlertDetailsContext);

  const navigate = useNavigate();

  const isButtonDisabled = claimNumber === '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (await exists(claimNumber)) {
      navigate(`/claims/${claimNumber}`);
    } else {
      setNotification({
        severity: Severities.error,
        description: 'Claim not found'
      });
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
        autoComplete="off"
        placeholder="Claim Number"
        value={claimNumber}
        onChange={(e) => setClaimNumber(e.target.value)}
        onKeyDown={(e) => {
          if (/[a-z]/i.test(e.key) && e.key !== 'Backspace') {
            e.preventDefault();
          }
        }}
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
