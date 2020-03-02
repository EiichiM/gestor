import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Cookies from 'js-cookie';
import axios from 'axios';
import ProfileDetails from './ProfileDetails';
import GeneralSettings from './GeneralSettings';

const useStyles = makeStyles(() => ({
  root: {}
}));

function General({ className, ...rest }) {
  const classes = useStyles();
  const [profile, setProfile] = useState(null);

  const user = Cookies.getJSON('user');

  useEffect(() => {
    let mounted = true;

    const fetchProfile = () => {
      setProfile(user);
    };

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, []);

  if (!profile) {
    return null;
  }

  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <ProfileDetails profile={profile} />
      </Grid>
      <Grid item lg={8} md={6} xl={9} xs={12}>
        <GeneralSettings profile={profile} />
      </Grid>
    </Grid>
  );
}

General.propTypes = {
  className: PropTypes.string
};

export default General;
