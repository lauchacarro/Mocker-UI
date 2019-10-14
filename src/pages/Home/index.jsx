import React, { useRef } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Save from '@material-ui/icons/Save';
import Tabs from '../../components/Tabs';
import { Switch, Route, Link } from 'react-router-dom';
import GitHubIcon from '../../icons/GitHubIcon'
import HomeIcon from '../../icons/HomeIcon'
import PostmanIcon from '../../icons/PostmanIcon'
import useStyles from './styles'
import MiniPostman from '../../components/MiniPostman'
const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const childRef = useRef();
  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Mocker Cloud
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {window.location.pathname !== '/' &&
            <Link to={'/'} className={classes.link} >
              <ListItem button key={"Home"}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </Link>
          }
          {window.location.pathname === '/' &&
            <ListItem button key={"Create Mock"} onClick={() => childRef.current.save()}>
              <ListItemIcon><Save /></ListItemIcon>
              <ListItemText primary={"Create Mock"} />
            </ListItem>
          }
          <Link to={'/postman'} className={classes.link} >
            <ListItem button key={"Mini Postman"}>
              <ListItemIcon><PostmanIcon /></ListItemIcon>
              <ListItemText primary={"Mini Postman"} />
            </ListItem>
          </Link>
          <ListItem button key={"GitHub"} onClick={() => window.location.href = "https://github.com/mockercloud/mockercloud.github.io"}>
            <ListItemIcon><GitHubIcon /></ListItemIcon>
            <ListItemText primary={"GitHub"} />
          </ListItem>

        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path='/' component={() => <Tabs ref={childRef} />} />
          <Route path='/postman' component={MiniPostman} />
        </Switch>
      </main>
    </div>
  );
}

export default Home;