import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  TableHead,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  colors
} from '@material-ui/core';
import axios from 'src/utils/axios';
import Label from 'src/components/Label';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1150
  },
  methodCell: {
    width: 100
  },
  statusCell: {
    width: 64
  }
}));

function Logs({ className, ...rest }) {
  const classes = useStyles();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchInvoices = () => {
      axios.get('/api/management/customers/1/invoices').then(response => {
        if (mounted) {
          setInvoices(response.data.invoices);
        }
      });
    };

    fetchInvoices();

    return () => {
      mounted = false;
    };
  }, []);

  const statusColors = {
    pending: colors.orange[600],
    paid: colors.green[600],
    rejected: colors.red[600]
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Card>
        <CardHeader title="Historial de Pagos" />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha de Pago</TableCell>
                    <TableCell>Importe de pago</TableCell>
                    <TableCell>Cuenta</TableCell>
                    <TableCell>Forma de Pago</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.map(invoice => (
                    <TableRow key={invoice.id}>

                      <TableCell>
                        {moment(invoice.date).format('DD/MM/YYYY | HH:MM')}
                      </TableCell>
                      <TableCell>
                        {invoice.currency}
                        {invoice.value}
                      </TableCell>
                      <TableCell>#{invoice.id.split('-').shift()}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell>
                        <Label
                          color={statusColors[invoice.status]}
                          variant="outlined"
                        >
                          {invoice.status}
                        </Label>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
      </Card>
    </div>
  );
}

Logs.propTypes = {
  className: PropTypes.string
};

export default Logs;
