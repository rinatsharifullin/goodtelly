import React from 'react';

import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import { ReactComponent as Logo } from '../static/images/goodtelly-logo.svg';
import Menu from './Menu';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.common.white,
  },
  toolBar: {
    minHeight: '72px',
  },
  logo: {
    margin: `0px ${theme.spacing(2)}px`,
  },
  nav: { display: 'flex', flexGrow: 1 },
  navTitle: {
    ...theme.typography.body1,
    marginRight: theme.spacing(2),
  },
  activeNavTitle: {
    ...theme.typography.h6,
    color: theme.palette.primary.main,
  },
}));

const TopNav = ({ isAuthenticated }) => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <div className={classes.logo}>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>
        <nav className={classes.nav}>
          <Container maxWidth="lg">
            <Button
              className={classes.navTitle}
              component={NavLink}
              to="/movie"
              activeClassName={classes.activeNavTitle}
            >
              Movies
            </Button>
            <Button
              className={classes.navTitle}
              component={NavLink}
              to="/tv"
              activeClassName={classes.activeNavTitle}
            >
              TV Shows
            </Button>
            {isAuthenticated ? (
              <Button
                className={classes.navTitle}
                component={NavLink}
                to="/list"
                activeClassName={classes.activeNavTitle}
              >
                My List
              </Button>
            ) : null}
          </Container>
        </nav>
        {isAuthenticated ? (
          <Menu />
        ) : (
          <Button component={NavLink} to="/signin">
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

TopNav.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
export default TopNav;
