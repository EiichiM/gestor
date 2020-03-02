import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';


const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

function RRHH() {
  const classes = useStyles();


  return (
    <Page
      className={classes.root}
      title="Recursos Humanos"
    >
      <Container maxWidth={false}>
        <Header />
      </Container>
    </Page>
  );
}

export default RRHH;
