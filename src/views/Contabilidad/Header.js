import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography} from '@material-ui/core';
import SearchBar from 'src/components/SearchBar';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Header({ className, ...rest }) {
  const classes = useStyles();
  const handleFilter = () => {};

  const handleSearch = () => {};
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h2" gutterBottom variant="overline">
            Page
          </Typography>
          <Typography component="h1" variant="h3">
          Contabilidad
          </Typography>
        </Grid>
        <Grid item>
          <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
        </Grid>
      </Grid>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
