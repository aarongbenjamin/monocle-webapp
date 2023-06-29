import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  FormLabel,
  Grid,
  Box,
  Modal
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { NavBarTitleContext } from '../../providers/NavbarTitleProvider';
import PhoneNumberInput from '../../components/PhoneNumberInput/PhoneNumberInput';
import EmailInput from '../../components/EmailInput/EmailInput';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchClaimById, updateClaim } from '../../api/claims/ClaimsAPI';
import dayjs, { Dayjs } from 'dayjs';
import {
  AdverseParty,
  ClaimStatus,
  Facility,
  IClaim
} from '../../models/claim';
import { IsLoadingContext } from '../../providers/IsLoadingProvider';
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay';
import {
  isValidateErrorResponse,
  ValidationErrorResponse
} from '../../models/validationError';
import { LoadingButton } from '@mui/lab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ReactRouterPrompt from 'react-router-prompt';
import {
  Controller,
  FieldValues,
  Form,
  FormSubmitHandler,
  SubmitHandler,
  useFieldArray,
  useForm
} from 'react-hook-form';
type ClaimFormData = Omit<IClaim, '_id' | 'createdDate' | 'lastUpdatedDate'> & {
  dateOfLoss: Dayjs | null;
};

// Main claim form component
const ClaimDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    throw new Error('id is empty for ClaimDetails');
  }
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);
  const [saveErrors, setSaveErrors] = useState<
    ValidationErrorResponse | undefined
  >();
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, formState, control, setValue } =
    useForm<ClaimFormData>({
      defaultValues: async () => {
        setIsLoading(true);
        const data = await fetchClaimById(id);
        setIsLoading(false);
        return {
          dateOfLoss: dayjs(data.dateOfLoss),
          lastUpdatedDate: data.lastUpdatedDate,
          facilities: data.facilities || [],
          adverseParty: {
            name: data.adverseParty?.name || '',
            phoneNumber: data.adverseParty?.phoneNumber || '',
            email: data.adverseParty?.email || '',
            address: {
              addressLine1: data.adverseParty?.address?.addressLine1 || '',
              addressLine2: data.adverseParty?.address?.addressLine2 || '',
              unit: data.adverseParty?.address?.unit || '',
              city: data.adverseParty?.address?.city || '',
              state: data.adverseParty?.address?.state || '',
              zip: data.adverseParty?.address?.zip || ''
            },
            insurance: {
              companyName: data.adverseParty?.insurance?.companyName || '',
              adjustorName: data.adverseParty?.insurance?.adjustorName || '',
              phoneNumber: data.adverseParty?.insurance?.phoneNumber || '',
              email: data.adverseParty?.insurance?.email || ''
            }
          },
          status: data.status
        };
      }
    });
  const {
    fields,
    append: appendFacility,
    remove: removeFacility
  } = useFieldArray({
    control: control,
    name: 'facilities'
  });

  const { setNavbarTitle } = useContext(NavBarTitleContext);
  useEffect(() => setNavbarTitle(`Claim - ${id}`));

  const handleSave: SubmitHandler<ClaimFormData> = async (data, event) => {
    event?.preventDefault();

    setSaving(true);
    const result = await updateClaim(id, {
      dateOfLoss: data.dateOfLoss,
      facilities: data.facilities,
      adverseParty: data.adverseParty,
      status: data.status
    });
    setSaving(false);
    if (isValidateErrorResponse(result)) {
      setSaveErrors(result);
    } else {
      setSaveErrors(undefined);
    }
  };

  return isLoading ? (
    <span></span>
  ) : (
    <Box component="form" onSubmit={handleSubmit(handleSave)}>
      {/* <ReactRouterPrompt when={true}>
        {({ isActive, onConfirm, onCancel }) => (
          <Modal open={isActive}>
            <div>
              <p>Do you really want to leave?</p>
              <button onClick={onCancel}>Cancel</button>
              <button onClick={onConfirm}>Ok</button>
            </div>
          </Modal>
        )}
      </ReactRouterPrompt> */}
      <Grid container justifyContent="space-between" xs={12}>
        <Grid item>
          <IconButton aria-label="Go Back" onClick={() => navigate('/claims')}>
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
          {saveErrors && <ErrorDisplay error={saveErrors} />}
        </Grid>

        <Grid item container spacing={3} xs={12}>
          <Grid item>
            <Controller
              name="status"
              control={control}
              defaultValue={ClaimStatus.UnderInvestigation}
              render={({ field }) => (
                <FormControl>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={field.value}
                    onChange={(event) => {
                      const status = event.target.value as ClaimStatus;
                      field.onChange(status);
                    }}
                    onBlur={field.onBlur}
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
                    <MenuItem value={ClaimStatus.PaidInFull}>
                      Paid in Full
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name="dateOfLoss"
              control={control}
              render={({ field }) => (
                <DatePicker
                  disableFuture
                  label="Date of Loss"
                  value={field.value}
                  onChange={field.onChange}
                  sx={{
                    width: '175px'
                  }}
                  slotProps={{
                    textField: {
                      id: 'dateOfLoss',
                      name: 'dateOfLoss',
                      required: true
                    }
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box component="fieldset" marginBottom={2}>
            <FormLabel component="legend">Facilities</FormLabel>
            {fields.map((field, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={3}>
                  <Controller
                    name={`facilities.${index}.type`}
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                          label="Type"
                          value={field.value}
                          onChange={(event) => {
                            field.onChange(event.target.value);
                          }}
                        >
                          <MenuItem value="option1">Option 1</MenuItem>
                          <MenuItem value="option2">Option 2</MenuItem>
                          <MenuItem value="option3">Option 3</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Controller
                    name={`facilities.${index}.repairCost`}
                    control={control}
                    render={({ field }) => (
                      <TextField label="Repair Cost" type="number" {...field} />
                    )}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Controller
                    name={`facilities.${index}.description`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Description"
                        multiline
                        rows={2}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton onClick={() => removeFacility(index)}>
                    <Remove />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <IconButton
              onClick={() =>
                appendFacility({ type: '', repairCost: '', description: '' })
              }
            >
              <Add />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box component="fieldset" marginBottom={2}>
            <FormLabel component="legend">Adverse Party</FormLabel>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Controller
                  name="adverseParty.name"
                  control={control}
                  render={({ field }) => <TextField label="Name" {...field} />}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  name="adverseParty.phoneNumber"
                  control={control}
                  render={({ field }) => <PhoneNumberInput {...field} />}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  name="adverseParty.email"
                  control={control}
                  render={({ field }) => <TextField label="Email" {...field} />}
                />
              </Grid>

              <Grid item xs={3}>
                <Controller
                  name="adverseParty.address.addressLine1"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Address Line 1" />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  name="adverseParty.address.addressLine2"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Address Line 2" />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  name="adverseParty.address.unit"
                  control={control}
                  render={({ field }) => <TextField {...field} label="Unit" />}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  name="adverseParty.address.city"
                  control={control}
                  render={({ field }) => <TextField {...field} label="City" />}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  name="adverseParty.address.state"
                  control={control}
                  render={({ field }) => <TextField {...field} label="State" />}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  name="adverseParty.address.zip"
                  control={control}
                  render={({ field }) => <TextField {...field} label="Zip" />}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  name="adverseParty.insurance.companyName"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Company Name" />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  name="adverseParty.insurance.adjustorName"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Adjustor Name" />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  name="adverseParty.insurance.phoneNumber"
                  control={control}
                  render={({ field }) => <PhoneNumberInput {...field} />}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  name="adverseParty.insurance.email"
                  control={control}
                  render={({ field }) => <TextField label="Email" {...field} />}
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
