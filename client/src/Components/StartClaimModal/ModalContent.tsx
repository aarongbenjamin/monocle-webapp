import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';
import { LoadingButton } from '@mui/lab';
import { INewClaimRequest } from '../../Models/claim';
import dayjs from 'dayjs';

const theme = createTheme();
function getDate(formData: FormData, fieldName: string): Date | null {
  const dateString = formData.get(fieldName);

  if (typeof dateString === 'string') {
    return dayjs(dateString).toDate();
  }
  return null;
}
const ModalContent = React.forwardRef(
  (
    {
      save,
      saving
    }: {
      saving: boolean;
      save: (newClaim: INewClaimRequest) => Promise<void>;
    },
    ref
  ) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const title = formData.get('title')! as string;
      const dateOfLoss = getDate(formData, 'dateOfLoss')!;
      await save({
        title,
        dateOfLoss
      });
    };
    return (
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{ backgroundColor: 'white', borderRadius: '5px' }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="title"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    disableFuture
                    label="Date of Loss"
                    defaultValue={dayjs()}
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
              <LoadingButton
                loading={saving}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </LoadingButton>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
);

export default ModalContent;
