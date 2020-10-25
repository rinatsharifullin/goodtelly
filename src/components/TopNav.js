import React from 'react';

<<<<<<< HEAD
=======
import PropTypes from 'prop-types';
>>>>>>> acaff8e56e45fd4a23c0ac880f53f2faa73c8cfc
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

<<<<<<< HEAD
import { ReactComponent as Logo } from './static/images/goodtelly-logo.svg';
=======
import { ReactComponent as Logo } from '../static/images/goodtelly-logo.svg';
import Menu from './Menu';
>>>>>>> acaff8e56e45fd4a23c0ac880f53f2faa73c8cfc

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
<<<<<<< HEAD
  nav: { display: 'flex' },
=======
  nav: { display: 'flex', flexGrow: 1 },
>>>>>>> acaff8e56e45fd4a23c0ac880f53f2faa73c8cfc
  navTitle: {
    ...theme.typography.body1,
    marginRight: theme.spacing(2),
  },
  activeNavTitle: {
    ...theme.typography.h6,
    color: theme.palette.primary.main,
  },
}));

<<<<<<< HEAD
const TopNav = () => {
=======
const TopNav = ({ isAuthenticated }) => {
>>>>>>> acaff8e56e45fd4a23c0ac880f53f2faa73c8cfc
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
<<<<<<< HEAD
          </Container>
        </nav>
=======
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
>>>>>>> acaff8e56e45fd4a23c0ac880f53f2faa73c8cfc
      </Toolbar>
    </AppBar>
  );
};

<<<<<<< HEAD
=======
TopNav.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
>>>>>>> acaff8e56e45fd4a23c0ac880f53f2faa73c8cfc
export default TopNav;
