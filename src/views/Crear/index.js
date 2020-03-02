import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import FormCreate from './Forms';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

function CustomerManagementList() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Crear Prestamo"
    >
      <Container maxWidth={false}>
        <Header />
        <FormCreate />
      </Container>
    </Page>
  );
}

export default CustomerManagementList;
