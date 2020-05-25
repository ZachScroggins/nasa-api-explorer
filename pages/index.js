import React, { useEffect } from 'react';

import { Container, Grid, Box, Typography } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';
import FourKIcon from '@material-ui/icons/FourK';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';

// import after firebase config
// import firebase from '../firebase/initFirebase';

export default function Index() {
  // check if you have access to firebase after firebase config
  // useEffect(() => {
  //   console.log(firebase.app());
  // });

  return (
    <Container maxWidth='sm' pt={5}>
      <Box py={2}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant='h5' component='h1'>
              Next.js SSG Material-UI Firebase Starter
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='primary.main' color='primary.contrastText' p={2}>
              primary.main
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='primary.light' color='primary.contrastText' p={2}>
              primary.light
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='primary.dark' color='primary.contrastText' p={2}>
              primary.dark
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='secondary.main' color='secondary.contrastText' p={2}>
              secondary.main
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='secondary.light' color='secondary.contrastText' p={2}>
              secondary.light
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='secondary.dark' color='secondary.contrastText' p={2}>
              secondary.dark
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='error.main' color='error.contrastText' p={2}>
              error.main
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='error.light' color='error.contrastText' p={2}>
              error.light
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='error.dark' color='error.contrastText' p={2}>
              error.dark
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='warning.main' color='warning.contrastText' p={2}>
              warning.main
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='warning.light' color='warning.contrastText' p={2}>
              warning.light
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='warning.dark' color='warning.contrastText' p={2}>
              warning.dark
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='info.main' color='info.contrastText' p={2}>
              info.main
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='info.light' color='info.contrastText' p={2}>
              info.light
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='info.dark' color='info.contrastText' p={2}>
              info.dark
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='success.main' color='success.contrastText' p={2}>
              success.main
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='success.light' color='success.contrastText' p={2}>
              success.light
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='success.dark' color='success.contrastText' p={2}>
              success.dark
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='text.primary' color='background.paper' p={2}>
              text.primary
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='text.secondary' color='background.paper' p={2}>
              text.secondary
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='text.disabled' color='background.paper' p={2}>
              text.disabled
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Typography>Filled</Typography>
          </Grid>
          <Grid item xs={8}>
            <DeleteIcon color='primary' />
            <DeleteForeverIcon color='primary' />
          </Grid>
          <Grid item xs={4}>
            <Typography>Outlined</Typography>
          </Grid>
          <Grid item xs={8}>
            <DeleteOutlinedIcon color='secondary' />
            <DeleteForeverOutlinedIcon color='secondary' />
          </Grid>
          <Grid item xs={4}>
            <Typography>Rounded</Typography>
          </Grid>
          <Grid item xs={8}>
            <DeleteRoundedIcon color='error' />
            <DeleteForeverRoundedIcon color='error' />
          </Grid>
          <Grid item xs={4}>
            <Typography>Two Tone</Typography>
          </Grid>
          <Grid item xs={8}>
            <DeleteTwoToneIcon color='primary' />
            <DeleteForeverTwoToneIcon color='primary' />
          </Grid>
          <Grid item xs={4}>
            <Typography>Sharp</Typography>
          </Grid>
          <Grid item xs={8}>
            <DeleteSharpIcon color='secondary' />
            <DeleteForeverSharpIcon color='secondary' />
          </Grid>
          <Grid item xs={4}>
            <Typography>Edge-cases</Typography>
          </Grid>
          <Grid item xs={8}>
            <ThreeDRotationIcon color='error' />
            <FourKIcon color='error' />
            <ThreeSixtyIcon color='error' />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
