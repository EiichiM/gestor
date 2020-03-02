import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
  colors
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > * + *': {
      marginLeft: 0
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  column: {
    backgroundColor: colors.pink[100]
  }
}));

const createdLoan = JSON.parse(window.sessionStorage.getItem('createdLoanItem'))

function CustomerInfo({ customer, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Cuota Actual" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><b>Estado Actual</b></TableCell>
              <TableCell>{createdLoan.fees!=null?(createdLoan.fees[0].status.idStatus==1?'Vigente':'Vencido'):'Vigente'}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell><b>Vencimiento</b></TableCell>
              <TableCell>{createdLoan.fees!=null?createdLoan.fees[0].expectedDate:'dd/MM/yyyy'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><b>Nº de Cuota</b></TableCell>
              <TableCell>{createdLoan.fees!=null?createdLoan.fees[0].idFee:'0'}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell><b>Fecha de Pago</b></TableCell>
              <TableCell>{createdLoan.fees!=null?createdLoan.fees[0].expectedDate:'dd/MM/yyyy'}</TableCell>
            </TableRow>
            <TableRow className={classes.column}>
              <TableCell><b>Fecha Último Pago</b></TableCell>
              <TableCell>{}</TableCell>
            </TableRow>
            <TableRow className={classes.column}>
              <TableCell><b>Monto del Pago</b></TableCell>
              <TableCell>{createdLoan.fees!=null?createdLoan.fees[0].feeWithTaxes:'N/A'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

CustomerInfo.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired
};

export default CustomerInfo;
