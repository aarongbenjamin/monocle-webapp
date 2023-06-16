import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormLabel,
  RadioGroup,
  Radio,
  Grid,
  Box
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { NavBarTitleContext } from '../../providers/NavbarTitleProvider';
import PhoneNumberInput from '../../components/PhoneNumberInput/PhoneNumberInput';
import EmailInput from '../../components/EmailInput/EmailInput';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchClaimById } from '../../api/claims/ClaimsAPI';
import { useDateTimeField } from '@mui/x-date-pickers/DateTimeField/useDateTimeField';
import dayjs, { Dayjs } from 'dayjs';

const useClaimDetails = () => {
  // State for managing form data
  const [title, setTitle] = useState('');
  const [dateOfLoss, setDateOfLoss] = useState<Dayjs | null>(null);
  const [facilities, setFacilities] = useState([
    {
      type: '',
      repairCost: '',
      description: ''
    }
  ]);
  const [adverseParty, setAdverseParty] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      unit: '',
      city: '',
      state: '',
      zip: ''
    },
    insurance: {
      companyName: '',
      adjustorName: '',
      phoneNumber: '',
      email: ''
    }
  });

  const [status, setStatus] = useState('');

  return {
    title,
    dateOfLoss,
    facilities,
    adverseParty,
    status,
    setTitle,
    setDateOfLoss,
    setFacilities,
    setAdverseParty,
    setStatus
  };
};

// Main claim form component
const ClaimDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    title,
    dateOfLoss,
    facilities,
    adverseParty,
    status,
    setTitle,
    setDateOfLoss,
    setAdverseParty,
    setStatus,
    setFacilities
  } = useClaimDetails();

  if (!id) {
    throw new Error('id is empty for ClaimDetails');
  }

  const { setNavbarTitle } = useContext(NavBarTitleContext);
  useEffect(() => setNavbarTitle(`Claim - ${id}`));

  const { isLoading, data } = useQuery(
    id,
    async () => await fetchClaimById(id),
    {
      onSuccess: (data) => {
        setTitle(data.title);
        setDateOfLoss(dayjs(data.dateOfLoss));
      },
      refetchOnWindowFocus: false
    }
  );

  const handleFacilityFieldChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedFacilities = [...facilities];
    updatedFacilities[index] = {
      ...updatedFacilities[index],
      [field]: value
    };
    setFacilities(updatedFacilities);
  };

  const handleAddFacility = () => {
    setFacilities([
      ...facilities,
      { type: '', repairCost: '', description: '' }
    ]);
  };

  const handleRemoveFacility = (index: number) => {
    const updatedFacilities = [...facilities];
    updatedFacilities.splice(index, 1);
    setFacilities(updatedFacilities);
  };

  const handleAdversePartyFieldChange = (field: string, value: string) => {
    setAdverseParty((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleAdversePartyAddressChange = (field: string, value: string) => {
    setAdverseParty((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [field]: value
      }
    }));
  };

  const handleAdversePartyInsuranceChange = (field: string, value: string) => {
    setAdverseParty((prevState) => ({
      ...prevState,
      insurance: {
        ...prevState.insurance,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // Validate form fields and save claim information
    // Make API call to save data
    console.log('Form data:', {
      title,
      dateOfLoss,
      facilities,
      adverseParty,
      status
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <TextField
          label="Title"
          fullWidth
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Grid>
      <Grid item xs={3}>
        <DatePicker
          disableFuture
          label="Date of Loss"
          value={dateOfLoss}
          onChange={(value) => setDateOfLoss(value)}
          slotProps={{
            textField: {
              id: 'dateOfLoss',
              name: 'dateOfLoss',
              required: true
            }
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(event) => setStatus(event.target.value as string)}
          >
            <MenuItem value="underInvestigation">Under Investigation</MenuItem>
            <MenuItem value="readyForCollection">Ready for Collection</MenuItem>
            <MenuItem value="attemptingCollection">
              Attempting Collection
            </MenuItem>
            <MenuItem value="paidInFull">Paid in Full</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Box component="fieldset" marginBottom={2}>
          <FormLabel component="legend">Facilities</FormLabel>
          {facilities.map((facility, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={facility.type}
                    onChange={(event) =>
                      handleFacilityFieldChange(
                        index,
                        'type',
                        event.target.value as string
                      )
                    }
                  >
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                    <MenuItem value="option3">Option 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Repair Cost"
                  type="number"
                  value={facility.repairCost}
                  onChange={(event) =>
                    handleFacilityFieldChange(
                      index,
                      'repairCost',
                      event.target.value as string
                    )
                  }
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label="Description"
                  multiline
                  rows={2}
                  value={facility.description}
                  onChange={(event) =>
                    handleFacilityFieldChange(
                      index,
                      'description',
                      event.target.value as string
                    )
                  }
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => handleRemoveFacility(index)}>
                  <Remove />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <IconButton onClick={handleAddFacility}>
            <Add />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box component="fieldset" marginBottom={2}>
          <FormLabel component="legend">Adverse Party</FormLabel>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <TextField
                label="Name"
                value={adverseParty.name}
                onChange={(event) =>
                  handleAdversePartyFieldChange('name', event.target.value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <PhoneNumberInput
                value={adverseParty.phoneNumber}
                onChange={(value) => {
                  handleAdversePartyFieldChange('phoneNumber', value);
                  console.log(value);
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <EmailInput
                value={adverseParty.email}
                onChange={(value) =>
                  handleAdversePartyFieldChange('email', value)
                }
              />
            </Grid>{' '}
            <Grid item xs={3}>
              <TextField
                label="Address Line 1"
                value={adverseParty.address.addressLine1}
                onChange={(event) =>
                  handleAdversePartyAddressChange(
                    'addressLine1',
                    event.target.value
                  )
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Address Line 2"
                value={adverseParty.address.addressLine2}
                onChange={(event) =>
                  handleAdversePartyAddressChange(
                    'addressLine2',
                    event.target.value
                  )
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Unit"
                value={adverseParty.address.unit}
                onChange={(event) =>
                  handleAdversePartyAddressChange('unit', event.target.value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="City"
                value={adverseParty.address.city}
                onChange={(event) =>
                  handleAdversePartyAddressChange('city', event.target.value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="State"
                value={adverseParty.address.state}
                onChange={(event) =>
                  handleAdversePartyAddressChange('state', event.target.value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Zip"
                value={adverseParty.address.zip}
                onChange={(event) =>
                  handleAdversePartyAddressChange('zip', event.target.value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Company Name"
                value={adverseParty.insurance.companyName}
                onChange={(event) =>
                  handleAdversePartyInsuranceChange(
                    'companyName',
                    event.target.value
                  )
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Adjustor Name"
                value={adverseParty.insurance.adjustorName}
                onChange={(event) =>
                  handleAdversePartyInsuranceChange(
                    'adjustorName',
                    event.target.value
                  )
                }
              />
            </Grid>
            <Grid item xs={3}>
              <PhoneNumberInput
                value={adverseParty.insurance.phoneNumber}
                onChange={(value) =>
                  handleAdversePartyInsuranceChange('phoneNumber', value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <EmailInput
                value={adverseParty.insurance.email}
                onChange={(value) =>
                  handleAdversePartyInsuranceChange('email', value)
                }
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default ClaimDetails;
