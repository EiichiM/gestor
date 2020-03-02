import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  colors
} from '@material-ui/core';
import axios from 'src/utils/axios';
import Label from 'src/components/Label';
import GenericMoreButton from 'src/components/GenericMoreButton';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1150
  }
}));

function Invoices({ className, ...rest }) {
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

  const createdLoan = JSON.parse(window.sessionStorage.getItem('createdLoanItem'))

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="PAGO DE CUOTAS"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar
            options={{ sscrollXMarginOffset: 893, maxScrollbarLength: 1000 }}
          >
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Cuota</TableCell>
                    <TableCell>Fecha Ideal</TableCell>
                    <TableCell>Fecha Real</TableCell>
                    <TableCell>Estado Cuota</TableCell>
                    <TableCell>Estado Pago</TableCell>
                    <TableCell>Días de Atraso</TableCell>
                    <TableCell>Pago Total </TableCell>
                    <TableCell>Mora Pago</TableCell>
                    <TableCell>Interes Pago</TableCell>
                    <TableCell>Monto Pago</TableCell>
                    <TableCell>Monto PDTE</TableCell>
                    <TableCell>Capital PDTE</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {createdLoan.fees.map(fee => (
                    <TableRow key={fee.idFee}>
                      <TableCell>#{fee.idFee}</TableCell>
                      <TableCell>
                        {moment(fee.expectedDate).format('DD/MM/YYYY | HH:MM')}
                      </TableCell>
                      <TableCell>{fee.expectedDate}</TableCell>
                      <TableCell>{fee.status.idStatus==1?'Pendiente':'Pagado'}</TableCell>
                     
                      <TableCell>
                        <Label
                          color={statusColors[fee.status.idStatus]}
                          variant="outlined"
                        >
                          {fee.status.idStatus}
                        </Label>
                      </TableCell>
                     


                      <TableCell>
                        {'---'}
                        {/*moment(invoice.date).format('DD/MM/YYYY | HH:MM')*/}
                      </TableCell>


                      <TableCell>
                        {fee.feeAmount}
                      </TableCell>
                     
                      <TableCell>
                        {'N/A'}
                        {/*moment(invoice.date).format('DD/MM/YYYY | HH:MM')*/}
                      </TableCell>
                      <TableCell>
                        {fee.interest}
                        {/*moment(invoice.date).format('DD/MM/YYYY | HH:MM')*/}
                      </TableCell>{' '}
                      <TableCell>
                        {fee.paymentAmount}
                        {/*moment(invoice.date).format('DD/MM/YYYY | HH:MM')*/}
                      </TableCell>
                      <TableCell>
                        {fee.pendingAmount}
                        {/*moment(invoice.date).format('DD/MM/YYYY | HH:MM')*/}
                      </TableCell>
                      <TableCell>
                        {fee.pendingCapital}
                        {/*moment(invoice.date).format('DD/MM/YYYY | HH:MM')*/}
                      </TableCell>
                      
                      <TableCell align="right">
                        <Button
                          color="primary"
                          component={RouterLink}
                          size="small"
                          to={'/management/invoices/1'}
                          variant="outlined"
                        >
                          View
                        </Button>
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

Invoices.propTypes = {
  className: PropTypes.string
};

export default Invoices;
