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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'

function Copyright(props) {
  const { t } = useTranslation();
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
      {t('sushi_order_system')}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp({setValue, t}) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('email'))
    await fetch('/register/', {method: 'POST',headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }, body: JSON.stringify(
        {
            operator_name: data.get('email'),
            password: data.get('password'),
            operator_code: data.get('operator_code')
          }
    )}).then((response) => {
        return response.text()}
    )
    .then((data) => {
        console.log(data);
        if(data=='True'){
        setValue(4);
    }
else{
    setValue(5);
}})
  };

  const handleSigIn = () => {
    setValue(4);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('sign_up')}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="operator_code"
                  required
                  fullWidth
                  id="operator_code"
                  label={t('operator_code')}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="operator_name"
                  required
                  fullWidth
                  id="operator_name"
                  label={t('operator_name')}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={t('email_address')}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={t('password')}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t('sign_up')}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={handleSigIn} variant="body2">
                  {t('Already_have_an_operatoer_code')}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}