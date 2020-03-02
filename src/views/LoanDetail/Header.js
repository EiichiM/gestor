import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, Grid, colors } from '@material-ui/core';
import MaiIcon from '@material-ui/icons/MailOutline';
import PaymentIcon from '@material-ui/icons/Payment';
import DesembolsoIcon from '@material-ui/icons/ExitToAppOutlined';
import CancelacionIcon from '@material-ui/icons/NotInterestedOutlined';
import LegalIcon from '@material-ui/icons/GavelOutlined';
import RestucturacionIcon from '@material-ui/icons/LibraryBooksOutlined';
import FindInPageIcon from '@material-ui/icons/FindInPageOutlined';
import CerrarIcon from '@material-ui/icons/BeenhereOutlined';
import { getRectCenter } from '@fullcalendar/core';

const useStyles = makeStyles(theme => ({
  root: {
  },
  buttonBar: {
    marginLeft: theme.spacing(2)
  },
  mailIcon: {
    marginRight: theme.spacing(1)
  },
  sendButton: {
    marginTop: theme.spacing(2),
    backgroundColor: colors.deepPurple['A200'],
    color: theme.palette.getContrastText(colors.purple[500]),
    '&:hover': {
      backgroundColor: colors.deepPurple[700],
    },
  },
  likedButton: {
    color: colors.red[600]
  },
  shareButton: {
    marginLeft: theme.spacing(1)
  },
  details: {
    padding: theme.spacing(2, 3)
  }
}));

function Header({ className, ...rest }) {
  const classes = useStyles();
  const customer = {
    name: 'Ekaterina Tankova',
    id: '2050000001'
  };

  return (
    <div {...rest} className={clsx(className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h2" gutterBottom variant="overline">
            Folio: {customer.id}
          </Typography>
          <Typography component="h1" variant="h3">
          Customer: {customer.name}
          </Typography>
        </Grid>
        <Grid alignItems="center" container justify="space-around" className={classes.root}>
          <Grid item>
            <Button className={classes.sendButton} variant="contained">
              <PaymentIcon className={classes.mailIcon} />
              Pago
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.sendButton} variant="contained">
              <DesembolsoIcon className={classes.mailIcon} />
              Desembolso
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.sendButton} variant="contained">
              <CancelacionIcon className={classes.mailIcon} />
              Cancelación
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.sendButton} variant="contained">
              <LegalIcon className={classes.mailIcon} />
              Legal
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.sendButton} variant="contained">
              <RestucturacionIcon className={classes.mailIcon} />
              Restucturación
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.sendButton} variant="contained">
              <FindInPageIcon className={classes.mailIcon} />
              Consultas
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.sendButton} variant="contained">
              <CerrarIcon className={classes.mailIcon} />
              Cerrar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
