import React, { useState } from 'react';
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

// Example reusable Phone Number input component
interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChange
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // Apply formatting or validation logic if needed
    onChange(value);
  };

  return (
    <TextField
      label="Phone Number"
      value={value}
      onChange={handleInputChange}
      // Additional props like inputProps can be used for regex validation or masking
      // e.g., inputProps={{ pattern: '[0-9]*' }}
    />
  );
};

// Example reusable Email input component
interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // Apply email validation logic if needed
    onChange(value);
  };

  return <TextField label="Email" value={value} onChange={handleInputChange} />;
};

// Main claim form component
const ClaimForm: React.FC = () => {
  // State for managing form data
  const [title, setTitle] = useState('');
  const [dateOfLoss, setDateOfLoss] = useState('');
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
      <Grid item xs={12}>
        <TextField
          label="Title"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Date of Loss"
          type="date"
          required
          value={dateOfLoss}
          onChange={(event) => setDateOfLoss(event.target.value)}
          InputLabelProps={{
            shrink: true
          }}
        />
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
          <TextField
            label="Name"
            value={adverseParty.name}
            onChange={(event) =>
              handleAdversePartyFieldChange('name', event.target.value)
            }
          />
          <PhoneNumberInput
            value={adverseParty.phoneNumber}
            onChange={(value) =>
              handleAdversePartyFieldChange('phoneNumber', value)
            }
          />
          <EmailInput
            value={adverseParty.email}
            onChange={(value) => handleAdversePartyFieldChange('email', value)}
          />
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
          {/* Add other address fields */}
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
          {/* Add other insurance fields */}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Status</FormLabel>
          <RadioGroup
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            row
          >
            <FormControlLabel
              value="underInvestigation"
              control={<Radio />}
              label="Under Investigation"
            />
            <FormControlLabel
              value="readyForCollection"
              control={<Radio />}
              label="Ready for Collection"
            />
            <FormControlLabel
              value="attemptingCollection"
              control={<Radio />}
              label="Attempting Collection"
            />
            <FormControlLabel
              value="paidInFull"
              control={<Radio />}
              label="Paid in Full"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default ClaimForm;
