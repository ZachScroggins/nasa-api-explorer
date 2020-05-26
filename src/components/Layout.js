import { useState, useEffect, useRef } from 'react';
import Link from './Link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import ImageSearchRoundedIcon from '@material-ui/icons/ImageSearchRounded';
import GitHubIcon from '@material-ui/icons/GitHub';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import {
  AppBar,
  CssBaseline,
  Toolbar,
  IconButton,
  useScrollTrigger,
  Slide,
  Hidden,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Grid,
  Button,
  Badge,
  Popper,
  ClickAwayListener,
  Grow,
  Paper,
} from '@material-ui/core';
import { useRouter } from 'next/router';

const drawerWidth = '20rem';

const useStyles = makeStyles(theme => ({
  appBarBottom: {
    top: 'auto',
    bottom: 0,
  },
  appBarTop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: '2.625rem',
  },
  miniDrawer: {
    width: '5rem',
  },
  miniDrawerButton: {
    width: '100%',
    textTransform: 'none',
  },
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  topButton: {
    height: '5rem',
  },
  topToolBar: {
    paddingLeft: '1.688rem',
  },
  typography: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
}));

function HideOnScroll(props) {
  const { children } = props;
  // const { children, window } = props;
  const trigger = useScrollTrigger();
  // const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction='up' in={!trigger}>
      {children}
    </Slide>
  );
}

const titles = ['NASA API Explorer', 'NASA Image and Video Library'];
const routes = ['/', '/images'];

const Layout = props => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const anchorRef = useRef(null);
  const [appBarTitle, setAppBarTitle] = useState(titles[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (router.pathname === '/') {
      setCurrentIndex(0);
    } else if (router.pathname === '/images') {
      setCurrentIndex(1);
    }
  }, [router.pathname]);

  useEffect(() => {
    setAppBarTitle(titles[currentIndex]);
  }, [currentIndex]);

  const handleLeftDrawerOpen = () => {
    setOpen(true);
  };

  const handleLeftDrawerClose = () => {
    setOpen(false);
  };

  const handleBottomDrawerOpen = () => {
    setBottomOpen(true);
  };

  const handleBottomDrawerClose = () => {
    setBottomOpen(false);
  };

  const handlePreviousPage = () => {
    if (currentIndex !== 0) {
      router.push(routes[currentIndex - 1]);
    }
  };
  const handleNextPage = () => {
    if (currentIndex !== routes.length - 1) {
      router.push(routes[currentIndex + 1]);
    }
  };

  const handleToggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    !seen && setSeen(true);
  };

  return (
    <>
      <CssBaseline />
      <Hidden smDown>
        <div className={classes.root}>
          <AppBar position='fixed' className={classes.appBarTop}>
            <Toolbar className={classes.topToolBar}>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleLeftDrawerOpen}
                edge='start'
                className={classes.menuButton}
              >
                <MenuRoundedIcon />
              </IconButton>
              <Typography variant='h5' component='h2' noWrap>
                {appBarTitle}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            id='miniDrawer'
            variant='permanent'
            className={classes.miniDrawer}
            classes={{
              paper: classes.miniDrawer,
            }}
          >
            <div className={classes.toolbar} />
            <Grid
              container
              direction='column'
              alignItems='center'
              justify='center'
            >
              <Button
                className={`${classes.miniDrawerButton} ${classes.topButton}`}
                component={Link}
                naked
                href='/'
              >
                <Grid item container direction='column' alignItems='center'>
                  <HomeRoundedIcon color='primary' fontSize='large' />
                  <Typography
                    variant='body2'
                    color={router.pathname === '/' ? 'initial' : 'primary'}
                  >
                    Home
                  </Typography>
                </Grid>
              </Button>
              <Button
                className={classes.miniDrawerButton}
                component={Link}
                naked
                href='/images'
              >
                <Grid item container direction='column' alignItems='center'>
                  <ImageSearchRoundedIcon color='primary' fontSize='large' />
                  <Typography
                    variant='body2'
                    color={
                      router.pathname === '/images' ? 'initial' : 'primary'
                    }
                  >
                    Images
                  </Typography>
                </Grid>
              </Button>
              <Box pb={1}>
                <Divider />
              </Box>
              <Button
                className={classes.miniDrawerButton}
                component={Link}
                naked
                href='https://github.com/ZachScroggins/nasa-api-explorer'
              >
                <Grid item container direction='column' alignItems='center'>
                  <GitHubIcon color='primary' fontSize='large' />
                  <Typography variant='body2' color='primary'>
                    Github
                  </Typography>
                </Grid>
              </Button>
              <Button
                className={classes.miniDrawerButton}
                component={Link}
                naked
                href='https://github.com/ZachScroggins'
              >
                <Grid item container direction='column' alignItems='center'>
                  <ArrowBackRoundedIcon color='primary' fontSize='large' />
                  <Typography variant='body2' color='primary'>
                    My Work
                  </Typography>
                </Grid>
              </Button>
            </Grid>
          </Drawer>

          <Drawer
            id='temp-drawer'
            anchor='left'
            open={open}
            onClose={handleLeftDrawerClose}
            className={classes.drawer}
            classes={{
              paper: classes.drawerOpen,
            }}
          >
            <div
              className={classes.toolbar}
              style={{ backgroundColor: theme.palette.primary.main }}
            >
              <IconButton onClick={handleLeftDrawerClose}>
                <NavigateBeforeRoundedIcon fontSize='large' />
              </IconButton>
            </div>
            <Divider />
            <div onClick={handleLeftDrawerClose}>
              <List>
                <ListItem button component={Link} naked href='/'>
                  <ListItemIcon>
                    <HomeRoundedIcon
                      color={router.pathname === '/' ? 'inherit' : 'primary'}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary='Home'
                    primaryTypographyProps={{
                      color: router.pathname === '/' ? 'initial' : 'primary',
                    }}
                  />
                </ListItem>
                <ListItem button component={Link} naked href='/images'>
                  <ListItemIcon>
                    <ImageSearchRoundedIcon
                      color={
                        router.pathname === '/images' ? 'inherit' : 'primary'
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary='NASA Image and Video Library'
                    primaryTypographyProps={{
                      color:
                        router.pathname === '/images' ? 'initial' : 'primary',
                    }}
                  />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem
                  button
                  component={Link}
                  naked
                  href='https://github.com/ZachScroggins/nasa-api-explorer'
                >
                  <ListItemIcon>
                    <GitHubIcon color='primary' />
                  </ListItemIcon>
                  <ListItemText
                    primary='Github'
                    primaryTypographyProps={{ color: 'primary' }}
                  />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  naked
                  href='https://github.com/ZachScroggins'
                >
                  <ListItemIcon>
                    <ArrowBackRoundedIcon color='primary' />
                  </ListItemIcon>
                  <ListItemText
                    primary='My Work'
                    primaryTypographyProps={{ color: 'primary' }}
                  />
                </ListItem>
              </List>
            </div>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {props.children}
          </main>
        </div>
      </Hidden>

      <Hidden mdUp>
        <HideOnScroll {...props}>
          <AppBar
            position='fixed'
            color='primary'
            className={classes.appBarBottom}
          >
            <Toolbar>
              <IconButton
                edge='start'
                color='inherit'
                aria-label='open drawer'
                onClick={handleBottomDrawerOpen}
              >
                <MenuRoundedIcon />
              </IconButton>
              <Hidden xsDown>
                <Typography variant='h5' component='h2' noWrap>
                  {appBarTitle}
                </Typography>
              </Hidden>
              <div className={classes.grow} />
              <IconButton
                color='inherit'
                ref={anchorRef}
                aria-label='toggle-notifications'
                onClick={handleToggleNotifications}
              >
                <Badge color='secondary' badgeContent={!seen ? 1 : 0}>
                  <NotificationsRoundedIcon />
                </Badge>
              </IconButton>
              <Popper
                id='notifications-popup'
                anchorEl={anchorRef.current}
                open={notificationsOpen}
                placement='top-end'
                transition
                disablePortal
                role={undefined}
              >
                {({ TransitionProps }) => (
                  <ClickAwayListener
                    onClickAway={() => {
                      setNotificationsOpen(false);
                    }}
                  >
                    <Grow in={notificationsOpen} {...TransitionProps}>
                      <Paper>
                        <Typography className={classes.typography}>
                          Use the arrows to navigate between APIs
                        </Typography>
                      </Paper>
                    </Grow>
                  </ClickAwayListener>
                )}
              </Popper>
              <IconButton color='inherit' component={Link} naked href='/'>
                <HomeRoundedIcon />
              </IconButton>
              <IconButton color='inherit' onClick={handlePreviousPage}>
                <NavigateBeforeRoundedIcon fontSize='large' />
              </IconButton>
              <IconButton edge='end' color='inherit' onClick={handleNextPage}>
                <NavigateNextRoundedIcon fontSize='large' />
              </IconButton>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Drawer
          id='temp-drawer'
          anchor='bottom'
          open={bottomOpen}
          onClose={handleBottomDrawerClose}
        >
          <div onClick={handleBottomDrawerClose}>
            <List>
              <ListItem button component={Link} naked href='/'>
                <ListItemIcon>
                  <HomeRoundedIcon
                    color={router.pathname === '/' ? 'inherit' : 'primary'}
                  />
                </ListItemIcon>
                <ListItemText
                  primary='Home'
                  primaryTypographyProps={{
                    color: router.pathname === '/' ? 'initial' : 'primary',
                  }}
                />
              </ListItem>
              <ListItem button component={Link} naked href='/images'>
                <ListItemIcon>
                  <ImageSearchRoundedIcon
                    color={
                      router.pathname === '/images' ? 'inherit' : 'primary'
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary='NASA Image and Video Library'
                  primaryTypographyProps={{
                    color:
                      router.pathname === '/images' ? 'initial' : 'primary',
                  }}
                />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem
                button
                component={Link}
                naked
                href='https://github.com/ZachScroggins/nasa-api-explorer'
              >
                <ListItemIcon>
                  <GitHubIcon color='primary' />
                </ListItemIcon>
                <ListItemText
                  primary='Github'
                  primaryTypographyProps={{ color: 'primary' }}
                />
              </ListItem>
              <ListItem
                button
                component={Link}
                naked
                href='https://github.com/ZachScroggins'
              >
                <ListItemIcon>
                  <ArrowBackRoundedIcon color='primary' />
                </ListItemIcon>
                <ListItemText
                  primary='My Work'
                  primaryTypographyProps={{ color: 'primary' }}
                />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>{props.children}</main>
      </Hidden>
    </>
  );
};

export default Layout;
