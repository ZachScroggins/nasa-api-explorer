import { Type } from '../src/components/Type';
import Link from '../src/components/Link';
import { Container, Box, Button, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  nasaLink: {
    // fontWeight: '300',
    // textDecoration: 'underline',
  },
}));

const Index = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth='xs'>
        <Box py={{ xs: 1 }}>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Type
                variant='h2'
                align='center'
                fontWeight='fontWeightBold'
                fontSize='2.8rem'
              >
                Explore NASA Imagery and Data
              </Type>
            </Grid>
            <Grid item>
              <Type
                variant='h4'
                align='center'
                fontWeight='fontWeightLight'
                color='textSecondary'
              >
                A free and open source project, built with REST APIs from{' '}
                <Box fontWeight='fontWeightLight'>
                  <Link
                    href='https://api.nasa.gov'
                    color='textPrimary'
                    className={classes.nasaLink}
                    underline='hover'
                  >
                    api.nasa.gov
                  </Link>
                </Box>
              </Type>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                size='large'
                component={Link}
                href='/images'
              >
                Start Exploring
              </Button>
            </Grid>
            <Grid item>
              <Button variant='outlined' color='primary' fullWidth size='large'>
                Learn More
              </Button>
            </Grid>
            <Grid item>
              <Type>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
                facilis est obcaecati nobis aperiam atque suscipit. Magni dolor,
                officia dignissimos repellendus unde iusto inventore voluptatem
                reiciendis. Accusamus, voluptates. Fugit, perspiciatis. Lorem
                ipsum dolor, sit amet consectetur adipisicing elit. Nam facilis
                est obcaecati nobis aperiam atque suscipit. Magni dolor, officia
                dignissimos repellendus unde iusto inventore voluptatem
                reiciendis. Accusamus, voluptates. Fugit, perspiciatis. Lorem
                ipsum dolor, sit amet consectetur adipisicing elit. Nam facilis
                est obcaecati nobis aperiam atque suscipit. Magni dolor, officia
                dignissimos repellendus unde iusto inventore voluptatem
                reiciendis. Accusamus, voluptates. Fugit, perspiciatis.
              </Type>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Index;
