import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  Divider,
  Typography,
  colors
} from '@material-ui/core';
import SimpleForm from './SimpleForm';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300],
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  section: {
    '& + &': {
      marginTop: theme.spacing(5)
    }
  }
}));

const Forms = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Divider className={classes.divider} />
      <div className={classes.section}>
        <Typography gutterBottom variant="subtitle2">
          You most field all the inputs.
        </Typography>
        <SimpleForm />
      </div>
    </Container>
  );
};

export default Forms;
