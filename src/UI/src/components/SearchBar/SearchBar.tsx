import SearchIcon from '@mui/icons-material/Search';
import { Box, Input, InputAdornment, InputLabel, Button } from '@mui/material';
import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exists } from '../../api/claims/ClaimsAPI';


const SearchBar: FunctionComponent = () => {
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();

 async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await exists(searchValue);
    
    result ? navigate(`/claims/${searchValue}`) : alert('what the heck bro');
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
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
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
