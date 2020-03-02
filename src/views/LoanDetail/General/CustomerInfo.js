import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
  colors
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import TableIcon from '@material-ui/icons/LineWeight';
import PersonIcon from '@material-ui/icons/PersonOutline';
import Label from 'src/components/Label';
import CustomerEditModal from './CustomerEditModal';

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
  link: {
    textDecoration: 'none',
    color: theme.palette.common.black
  }
}));

function CustomerInfo({ customer, className, ...rest }) {
  const classes = useStyles();
  const [openEdit, setOpenEdit] = useState(false);

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const createdLoan = JSON.parse(
    window.sessionStorage.getItem('createdLoanItem')
  );

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <div className={classes.header}>
        <CardHeader title="Customer info" />
        {/* <Button onClick={handleEditOpen}>
          <EditIcon className={classes.buttonIcon} />
        </Button> */}
      </div>
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <b>Folio</b>
              </TableCell>
              <TableCell>{createdLoan.customers.idCustomer}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>
                <b>Nombre</b>
              </TableCell>
              <TableCell>
                {createdLoan.customers.names}{' '}
                {createdLoan.customers.fathersLastName}{' '}
                {createdLoan.customers.mothersLastName}
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>
                <b>Phone</b>
              </TableCell>
              <TableCell>
                {createdLoan.customers.telephoneCustomer != null
                  ? createdLoan.customers.telephoneCustomer[0].telephoneNumber
                  : ''}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell>
                {createdLoan.customers.mailCustomer != null
                  ? createdLoan.customers.mailCustomer[0].mail
                  : ''}
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>
                <b>Monto</b>
              </TableCell>
              <TableCell>
                {createdLoan.loanConditions != null
                  ? createdLoan.loanConditions[0].loanAmount
                  : ''}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Plazo</b>
              </TableCell>
              <TableCell>{createdLoan.terms.paymentsNumber}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>
                <b>Interes Anual</b>
              </TableCell>
              <TableCell>{createdLoan.annualInterest}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Valor de la garantia</b>
              </TableCell>
              <TableCell>
                {createdLoan.loanConditions != null
                  ? createdLoan.loanConditions[0].guaranteeValue
                  : ''}
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>
                <b>Gastos legales</b>
              </TableCell>
              <TableCell>
                {createdLoan.loanConditions != null
                  ? createdLoan.loanConditions[0].legalExpenses
                  : ''}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Divider />
        <Button>
          <TableIcon className={classes.buttonIcon} />
          <a
            className={classes.link}
            target="_blank"
            href={createdLoan.documentList!=null?createdLoan.documentList[0]:''}  //Link Amortizacion
          >
            Tabla de Amortización
          </a>
        </Button>
      </CardContent>
      <CustomerEditModal
        customer={customer}
        onClose={handleEditClose}
        open={openEdit}
      />
    </Card>
  );
}

CustomerInfo.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired
};

export default CustomerInfo;
