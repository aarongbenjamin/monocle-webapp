import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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
  Box,
  LinearProgress,
  Backdrop
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { NavBarTitleContext } from '../../providers/NavbarTitleProvider';
import PhoneNumberInput from '../../components/PhoneNumberInput/PhoneNumberInput';
import EmailInput from '../../components/EmailInput/EmailInput';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchClaimById, updateClaim } from '../../api/claims/ClaimsAPI';
import { useDateTimeField } from '@mui/x-date-pickers/DateTimeField/useDateTimeField';
import dayjs, { Dayjs } from 'dayjs';
import { AdverseParty, ClaimStatus, Facility } from '../../models/claim';
import { IsLoadingContext } from '../../providers/IsLoadingProvider';
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay';
import {
  isValidateErrorResponse,
  ValidationErrorResponse
} from '../../models/validationError';
import { LoadingButton } from '@mui/lab';
import { red } from '@mui/material/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const useClaimDetails = () => {
  // State for managing form data
  const [title, setTitle] = useState('');
  const [dateOfLoss, setDateOfLoss] = useState<Dayjs | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([
    { type: '', description: '', repairCost: '' }
  ]);
  const [adverseParty, setAdverseParty] = useState<AdverseParty>({
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      unit: '',
      zip: ''
    },
    email: '',
    insurance: {
      adjustorName: '',
      companyName: '',
      email: '',
      phoneNumber: ''
    },
    name: '',
    phoneNumber: ''
  });

  const [status, setStatus] = useState<ClaimStatus | string>('');

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
  const navigate = useNavigate();
  const { setIsLoading } = useContext(IsLoadingContext);
  const [saveErrors, setSaveErrors] = useState<
    ValidationErrorResponse | undefined
  >();
  const [saving, setSaving] = useState(false);
  useEffect(() => {});
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

  useQuery(
    id,
    async () => {
      setIsLoading(true);
      const data = await fetchClaimById(id);
      setIsLoading(false);
      return data;
    },
    {
      onSuccess: (data) => {
        setTitle(data.title);
        setDateOfLoss(dayjs(data.dateOfLoss));
        setStatus(data.status);
        setAdverseParty(data.adverseParty ?? {});
        setFacilities(data.facilities ?? [{}]);
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

  const handleAdversePartyFieldChange = (field: string, value?: string) => {
    setAdverseParty((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleAdversePartyAddressChange = (field: string, value?: string) => {
    setAdverseParty((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [field]: value
      }
    }));
  };

  const handleAdversePartyInsuranceChange = (field: string, value?: string) => {
    setAdverseParty((prevState) => ({
      ...prevState,
      insurance: {
        ...prevState.insurance,
        [field]: value
      }
    }));
  };

  const handleSave = async (event: any) => {
    event.preventDefault();

    setSaving(true);
    const result = await updateClaim(id, {
      title,
      dateOfLoss: dateOfLoss?.toDate(),
      facilities,
      adverseParty,
      status: status as ClaimStatus
    });
    setSaving(false);
    if (isValidateErrorResponse(result)) {
      setSaveErrors(result);
    } else {
      setSaveErrors(undefined);
    }
  };

  return (
    <Box component="form"  onSubmit={handleSave}>
      <Grid container justifyContent='space-between' xs={12}>
      <Grid item>
        <IconButton aria-label='Go Back' onClick={() => navigate('/claims')}>
        <ArrowBackIcon />
      </IconButton>
      </Grid>
              <Grid item> 
              <LoadingButton
                loading={saving}
                variant="contained"
                color="primary"
                type="submit"
              >
                Save
              </LoadingButton>
              </Grid>
            </Grid>
      <Grid container spacing={3} sx={{ mt: '1px' }}>
        <Grid item container justifyContent="space-between" xs={12}>
          <Grid item container justifyContent="space-between">
            <Grid item xs={12}>
              <TextField
                label="Title"
                required
                fullWidth
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Grid>
          </Grid>

          {saveErrors && <ErrorDisplay error={saveErrors!} />}
        </Grid>

        <Grid item container spacing={3} xs={12}>
          <Grid item>
            <FormControl>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                label="Status"
              >
                <MenuItem value={ClaimStatus.UnderInvestigation}>
                  Under Investigation
                </MenuItem>
                <MenuItem value={ClaimStatus.ReadyForCollection}>
                  Ready for Collection
                </MenuItem>
                <MenuItem value={ClaimStatus.AttemptingCollection}>
                  Attempting Collection
                </MenuItem>
                <MenuItem value={ClaimStatus.PaidInFull}>Paid in Full</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <DatePicker
              disableFuture
              label="Date of Loss"
              value={dateOfLoss}
              onChange={(value) => setDateOfLoss(value)}
              sx={{
                width: '150px'
              }}
              slotProps={{
                textField: {
                  id: 'dateOfLoss',
                  name: 'dateOfLoss',
                  required: true
                }
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={12}>
          <Box component="fieldset" marginBottom={2}>
            <FormLabel component="legend">Facilities</FormLabel>
            {facilities.map((facility, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      label="Type"
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
                  value={adverseParty?.name}
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
                  value={adverseParty?.email}
                  onChange={(value) =>
                    handleAdversePartyFieldChange('email', value)
                  }
                />
              </Grid>{' '}
              <Grid item xs={3}>
                <TextField
                  label="Address Line 1"
                  value={adverseParty?.address?.addressLine1}
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
                  value={adverseParty?.address?.addressLine2}
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
                  value={adverseParty?.address?.unit}
                  onChange={(event) =>
                    handleAdversePartyAddressChange('unit', event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="City"
                  value={adverseParty?.address?.city}
                  onChange={(event) =>
                    handleAdversePartyAddressChange('city', event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="State"
                  value={adverseParty?.address?.state}
                  onChange={(event) =>
                    handleAdversePartyAddressChange('state', event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Zip"
                  value={adverseParty?.address?.zip}
                  onChange={(event) =>
                    handleAdversePartyAddressChange('zip', event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Company Name"
                  value={adverseParty?.insurance?.companyName}
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
                  value={adverseParty?.insurance?.adjustorName}
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
                  value={adverseParty?.insurance?.phoneNumber}
                  onChange={(value) =>
                    handleAdversePartyInsuranceChange('phoneNumber', value)
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <EmailInput
                  value={adverseParty?.insurance?.email}
                  onChange={(value) =>
                    handleAdversePartyInsuranceChange('email', value)
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClaimDetails;
