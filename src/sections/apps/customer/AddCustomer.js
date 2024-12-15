import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';


// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project imports
import AlertCustomerDelete from './AlertCustomerDelete';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';

import { ThemeMode } from 'config';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { CameraOutlined, DeleteFilled } from '@ant-design/icons';

const avatarImage = require.context('assets/images/users', true);

// constant
const getInitialValues = (customer) => {
  const newCustomer = {
    name: '',
    email: '',
    location: '',
    Board: ''
  };

  if (customer) {
    newCustomer.name = customer.fatherName;
    newCustomer.location = customer.address;
    return _.merge({}, newCustomer, customer);
  }

  return newCustomer;
};

const allStatus = ['Central','State','International'];

// ==============================|| CUSTOMER ADD / EDIT / DELETE ||============================== //

const AddCustomer = ({ customer, onCancel }) => {
  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    onCancel();
  };

  const theme = useTheme();
  const isCreating = !customer;

  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState(avatarImage(`./avatar-${isCreating && !customer?.avatar ? 1 : customer.avatar}.png`));

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const CustomerSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Name is required'),
    Board: Yup.string().required('Board is required'),
    email: Yup.string().max(255).required('Email is required').email('Must be a valid email'),
    location: Yup.string().max(500)
  });

  const formik = useFormik({
    initialValues: getInitialValues(customer),
    validationSchema: CustomerSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        // const newCustomer = {
        //   name: values.name,
        //   email: values.email,
        //   location: values.location,
        //   Board: values.Board
        // };

        if (customer) {
          // dispatch(updateCustomer(customer.id, newCustomer)); - update
          dispatch(
            openSnackbar({
              open: true,
              message: 'Customer update successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        } else {
          // dispatch(createCustomer(newCustomer)); - add
          dispatch(
            openSnackbar({
              open: true,
              message: 'Customer add successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        }

        setSubmitting(false);
        onCancel();
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle>{customer ? 'Edit Customer' : 'New Customer'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={4} md={2}>
                  <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                    <FormLabel
                      htmlFor="change-avtar"
                      sx={{
                        position: 'relative',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        '&:hover .MuiBox-root': { opacity: 1 },
                        cursor: 'pointer'
                      }}
                    >
                      <Avatar alt="Avatar 1" src={avatar} sx={{ width: 72, height: 72, border: '1px dashed' }} />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Stack spacing={0.5} alignItems="center">
                          <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                          <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                        </Stack>
                      </Box>
                    </FormLabel>
                    <TextField
                      type="file"
                      id="change-avtar"
                      placeholder="Outlined"
                      variant="outlined"
                      sx={{ display: 'none' }}
                      onChange={(e) => setSelectedImage(e.target.files?.[0])}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={4} md={6}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-name">Name</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-name"
                          placeholder="Enter Institute Name"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-email">Email</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-email"
                          placeholder="Enter Customer Email"
                          {...getFieldProps('email')}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-Board">Board</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding"
                            displayEmpty
                            {...getFieldProps('Board')}
                            onChange={(event) => setFieldValue('Board', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle1">Select Board</Typography>;
                              }

                              return <Typography variant="subtitle2">{selected}</Typography>;
                            }}
                          >
                            {allStatus.map((column) => (
                              <MenuItem key={column} value={column}>
                                <ListItemText primary={column} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.Board && errors.Board && (
                          <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                            {errors.Board}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                      <InputLabel  htmlFor="About">About</InputLabel>
                      <TextField placeholder="Enter Institute description" fullWidth multiline rows={2} />
                      <InputLabel htmlFor="customer-location">Location</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-location"
                          multiline
                          rows={2}
                          placeholder="Enter Location"
                          {...getFieldProps('location')}
                          error={Boolean(touched.location && errors.location)}
                          helperText={touched.location && errors.location}
                        />
                         <Stack spacing={1.25}>
                        <InputLabel htmlFor="state">State</InputLabel>
                        <TextField
                          fullWidth
                          id="state"
                          placeholder="Enter State"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                        <InputLabel htmlFor="city">City</InputLabel>
                        <TextField
                          fullWidth
                          id="city"
                          placeholder="Enter City"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Stack>
                        <InputLabel htmlFor="Website-Url">Website</InputLabel>
                        <TextField
                          fullWidth
                          id="Website-Url"
                          rows={2}
                          placeholder="Enter Website Url"
                          {...getFieldProps('location')}
                          error={Boolean(touched.location && errors.location)}
                          helperText={touched.location && errors.location}
                        />
                      </Stack>
                    </Grid>
                    {/* <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Stack spacing={0.5}>
                          <Typography variant="subtitle1">Make Contact Info Public</Typography>
                          <Typography variant="caption" color="textSecondary">
                            Means that anyone viewing your profile will be able to see your contacts details
                          </Typography>
                        </Stack>
                        <FormControlLabel control={<Switch defaultChecked sx={{ mt: 0 }} />} label="" labelPlacement="start" />
                      </Stack>
                      <Divider sx={{ my: 2 }} />
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Stack spacing={0.5}>
                          <Typography variant="subtitle1">Available to hire</Typography>
                          <Typography variant="caption" color="textSecondary">
                            Toggling this will let your teammates know that you are available for acquiring new projects
                          </Typography>
                        </Stack>
                        <FormControlLabel control={<Switch sx={{ mt: 0 }} />} label="" labelPlacement="start" />
                      </Stack>
                    </Grid> */}
                  </Grid>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="ownership">Ownership</InputLabel>
                        <TextField
                          fullWidth
                          id="ownership"
                          placeholder="Enter Ownership Name"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="total-students">Total Students</InputLabel>
                        <TextField
                          fullWidth
                          id="total-students"
                          placeholder="Enter Total Students"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="total-staffs">Total Staffs</InputLabel>
                        <TextField
                          fullWidth
                          id="total-staffs"
                          placeholder="Enter Total Staffs"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="subscription-fee">Subscription Fee</InputLabel>
                        <TextField
                          fullWidth
                          id="subscription-fee"
                          placeholder="Enter Subscription Fee"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  {!isCreating && (
                    <Tooltip title="Delete Customer" placement="top">
                      <IconButton onClick={() => setOpenAlert(true)} size="large" color="error">
                        <DeleteFilled />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button color="error" onClick={onCancel}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                      {customer ? 'Edit' : 'Add'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
       
      </FormikProvider>
      {!isCreating && <AlertCustomerDelete title={customer.fatherName} open={openAlert} handleClose={handleAlertClose} />}
    </>
  );
};

AddCustomer.propTypes = {
  customer: PropTypes.any,
  onCancel: PropTypes.func
};

export default AddCustomer;
