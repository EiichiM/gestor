import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
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
  }
}));

const getSum = (invoices, type) => {
  const filtered = invoices.filter(invoice => invoice.type === type);
  const total = filtered
    .reduce((total, invoice) => total + invoice.value, 0)
    .toFixed(2);

  return [filtered, total];
};

function Invoices({ customer, className, ...rest }) {
  const classes = useStyles();
  const [paidInvoices, paidTotal] = getSum(customer.invoices, 'paid');
  const [draftInvoices, draftTotal] = getSum(customer.invoices, 'draft');
  const [dueInvoices, dueTotal] = getSum(customer.invoices, 'due');
  const [refundedInvoices, refundedTotal] = getSum(
    customer.invoices,
    'refunded'
  );
  const [incomeInvoices, incomeTotal] = getSum(customer.invoices, 'income');

  const createdLoan = JSON.parse(window.sessionStorage.getItem('createdLoanItem'))

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Información Adicional" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><b>Valor C. Adicional</b></TableCell>
              <TableCell>
                {customer.iban}
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell><b>Cuota Inicial</b></TableCell>
              <TableCell>
                {createdLoan.fees!=null?createdLoan.fees[0].feeWithTaxes:'N/A'})
              </TableCell>
            </TableRow>
            {/* <TableRow>
              <TableCell><b>Interés Efectivo</b></TableCell>
              <TableCell>
                {draftInvoices.length} ({customer.currency}
                {draftTotal})
              </TableCell>
            </TableRow> */}
            <TableRow selected>
              <TableCell><b>Tipo de Contrato</b></TableCell>
              <TableCell>
                {createdLoan.contractTypes.idContractType == 1 ? 'Solución': 'Mejora tu hipoteca'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><b>Pago al Día</b></TableCell>
              <TableCell>
                $0
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell><b>Cancelación</b></TableCell>
              <TableCell>
                ---
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><b>DMG</b></TableCell>
              <TableCell>
                ---
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell><b>Comición Perdida</b></TableCell>
              <TableCell>
                ---
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

Invoices.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired
};

export default Invoices;
