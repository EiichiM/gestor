import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Typography,
  TextField,
  Switch,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

function CustomerEditModal({ open, onClose, customer, className, ...rest }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    ...customer
  });

  const handleFieldChange = event => {
    event.persist();
    setValues(currentValues => ({
      ...currentValues,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    }));
  };

  if (!open) {
    return null;
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <form>
          <CardHeader title="Edit Customer" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Folio"
                  name="folio"
                  onChange={handleFieldChange}
                  value={values.folio}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Nombre "
                  name="name"
                  onChange={handleFieldChange}
                  value={values.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Nombre (2)"
                  name="name2"
                  onChange={handleFieldChange}
                  value={values.name2}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Phone number"
                  name="phone"
                  onChange={handleFieldChange}
                  value={values.phone}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email address"
                  name="email"
                  onChange={handleFieldChange}
                  value={values.email}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Monto"
                  name="monto"
                  onChange={handleFieldChange}
                  value={values.monto}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Plazo"
                  name="plazo"
                  onChange={handleFieldChange}
                  value={values.plazo}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Interes Anual"
                  name="interesAnual"
                  onChange={handleFieldChange}
                  value={values.interesAnual}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Fecha de Desembolso"
                  name="fechaDesembolso"
                  onChange={handleFieldChange}
                  value={values.fechaDesembolso}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Fecha de Contrato"
                  name="fechaContrato"
                  onChange={handleFieldChange}
                  value={values.fechaContrato}
                  variant="outlined"
                  disabled
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions className={classes.actions}>
            <Button onClick={onClose}>Close</Button>
            <Button color="primary" onClick={onClose} variant="contained">
              Save
            </Button>
          </CardActions>
        </form>
      </Card>
    </Modal>
  );
}

CustomerEditModal.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

CustomerEditModal.defaultProps = {
  open: false,
  onClose: () => {}
};

export default CustomerEditModal;
