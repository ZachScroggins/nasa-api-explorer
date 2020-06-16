import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from './Link';
import { Type } from './Type';
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
  const { children, direction } = props;
  // const { children, window } = props;
  const trigger = useScrollTrigger();
  // const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction={direction} in={!trigger}>
      {children}
    </Slide>
  );
}

const titles = ['NASA API Explorer', 'NASA Image and Video Library'];
const routes = ['/', '/images'];
const regex = RegExp(/^\/image/, 'i');

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
    } else if (regex.test(router.pathname)) {
      // } else if (router.pathname === '/images') {
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
    // if (currentIndex !== 0) {
    // router.push(routes[currentIndex - 1]);
    window.history.back();
    // }
  };
  const handleNextPage = () => {
    // if (currentIndex !== routes.length - 1) {
    //   router.push(routes[currentIndex + 1]);
    // }
    window.history.forward();
  };

  const handleToggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    !seen && setSeen(true);
  };

  const pushHome = () => {
    router.push('/');
  };

  const TempDrawerList = () => {
    return (
      <>
        <List>
          <ListItem button component={Link} naked href='/'>
            <ListItemIcon>
              <HomeRoundedIcon
                color={router.pathname === '/' ? 'inherit' : 'primary'}
              />
            </ListItemIcon>
            <ListItemText disableTypography>
              <Type color={router.pathname === '/' ? 'white' : 'primary.light'}>
                Home
              </Type>
            </ListItemText>
          </ListItem>
          <ListItem button component={Link} naked href='/images'>
            <ListItemIcon>
              <ImageSearchRoundedIcon
                color={regex.test(router.pathname) ? 'inherit' : 'primary'}
              />
            </ListItemIcon>
            <ListItemText disableTypography>
              <Type
                color={regex.test(router.pathname) ? 'white' : 'primary.light'}
              >
                NASA Image and Video Library
              </Type>
            </ListItemText>
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
            <ListItemText disableTypography>
              <Type color='primary.light'>Github</Type>
            </ListItemText>
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
            <ListItemText disableTypography>
              <Type color='primary.light'>My Work</Type>
            </ListItemText>
          </ListItem>
        </List>
      </>
    );
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
              <Typography variant='h5' component='h1' noWrap>
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
                scroll={false}
              >
                <Grid item container direction='column' alignItems='center'>
                  <HomeRoundedIcon color='primary' fontSize='large' />
                  <Type
                    variant='body2'
                    // color={currentIndex === 0 ? 'white' : 'primary.light'}
                    color={router.pathname === '/' ? 'white' : 'primary.light'}
                  >
                    Home
                  </Type>
                </Grid>
              </Button>
              <Button
                className={classes.miniDrawerButton}
                component={Link}
                naked
                href='/images'
                scroll={false}
              >
                <Grid item container direction='column' alignItems='center'>
                  <ImageSearchRoundedIcon color='primary' fontSize='large' />
                  <Type
                    variant='body2'
                    color={
                      // currentIndex === 1 ? 'white' : 'primary.light'
                      regex.test(router.pathname) ? 'white' : 'primary.light'
                    }
                  >
                    Images
                  </Type>
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
                  <Type variant='body2' color='primary.light'>
                    Github
                  </Type>
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
                  <Type variant='body2' color='primary.light'>
                    My Work
                  </Type>
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
              <TempDrawerList />
            </div>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {props.children}
          </main>
        </div>
      </Hidden>

      <Hidden mdUp>
        <Hidden smUp>
          <HideOnScroll {...props} direction='down'>
            <AppBar
              position='fixed'
              color='secondary'
              className={classes.appBarTop}
            >
              <Toolbar
                className={classes.topToolBar}
                style={{ paddingLeft: '1.5rem' }}
              >
                <Typography variant='h5' component='h1' noWrap>
                  {appBarTitle}
                </Typography>
              </Toolbar>
            </AppBar>
          </HideOnScroll>
        </Hidden>
        <HideOnScroll {...props} direction='up'>
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
                <Typography variant='h5' component='h1' noWrap>
                  {appBarTitle}
                </Typography>
              </Hidden>
              <div className={classes.grow} />
              {/* <IconButton
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
              </Popper> */}
              <IconButton
                color='inherit'
                aria-label='previous-api' // change to previous page
                onClick={handlePreviousPage}
              >
                <NavigateBeforeRoundedIcon fontSize='large' />
              </IconButton>
              <IconButton
                color='inherit'
                aria-label='navigate-home'
                onClick={pushHome}
              >
                {/* <IconButton color='inherit' component={Link} naked href='/' > */}
                <HomeRoundedIcon />
              </IconButton>
              <IconButton
                edge='end'
                color='inherit'
                aria-label='next-api' // change to next page
                onClick={handleNextPage}
              >
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
            <TempDrawerList />
          </div>
        </Drawer>
        <Hidden smUp>
          <Box pb={6} />
        </Hidden>
        <main className={classes.content}>{props.children}</main>
      </Hidden>
    </>
  );
};

export default Layout;
