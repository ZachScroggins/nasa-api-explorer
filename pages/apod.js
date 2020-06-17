import { useContext } from 'react';
import ApodContext from '../src/context/apod/apodContext';
import { Type } from '../src/components/Type';
import { motion } from 'framer-motion';
import {
  Box,
  Grid,
  Container,
  Card,
  CardMedia,
  CardContent,
  Divider,
  useMediaQuery,
} from '@material-ui/core';

const apod = () => {
  const matches = useMediaQuery('(min-width:960px)');
  const apodContext = useContext(ApodContext);
  const {
    date,
    explanation,
    hdurl,
    mediaType,
    title,
    url,
    copyright,
    loading,
  } = apodContext;

  if (loading) {
    return (
      <div>
        <h1>loading</h1>
      </div>
    );
  } else if (copyright) {
    return (
      <div>
        <h1>copyright</h1>
      </div>
    );
  } else {
    return (
      <Container maxWidth='lg'>
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Grid container justify='center' alignContent='center'>
            <Grid item>
              <Card>
                <CardMedia src={url} title={title} component='img' />
                <CardContent>
                  <Grid container>
                    <Grid
                      item
                      container
                      justify='flex-start'
                      alignItems='center'
                      xs={12}
                      md={6}
                    >
                      <Type variant='h5'>{title}</Type>
                    </Grid>
                    <Grid
                      item
                      container
                      justify={matches ? 'flex-end' : 'flex-start'}
                      alignItems='center'
                      xs={12}
                      md={6}
                    >
                      <Type color='text.secondary' fontSize={{ md: '20px' }}>
                        {date}
                      </Type>
                    </Grid>
                  </Grid>
                  <Box py={2}>
                    <Divider />
                  </Box>
                  <Type>{explanation}</Type>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    );
  }
};

export default apod;
