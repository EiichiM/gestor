import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import axios from 'axios';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import validate from 'validate.js';
import MaskedInput from 'react-text-mask';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Link,
  Checkbox,
  FormHelperText,
  Grid,
  Typography,
  MenuItem,
  Divider
} from '@material-ui/core';

const schema = {
  policy: {
    presence: { allowEmpty: false, message: 'is required' },
    checked: true
  },
  annualInterest: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  bank: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  chargeAccount: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  cvlCrm: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  formalzationDate: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  originationScore: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  propertyLocation: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  idCustomer: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  loanAmount: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  guaranteeValue: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  notarialCharges: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  appraisalExpenses: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  disbursedAmount: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  idContractType: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  idLoanOriginator: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  idLoanType: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  idTerm: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  paymentsNumber: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  names: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  fathersLastName: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  mothersLastName: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  identificationNumber: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  documentNumber: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  scoring: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  idCountry: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  idDocumentType: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  idPersonType: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  street: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  extNumber: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  city: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  intNumber: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  zipCode: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  idContactTypee: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  idStates: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  mail: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  idContactTypeMail: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  socialNetwork: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  idContactTypeNetwork: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  telephoneNumber: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  ext: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  contactTypeTelephone: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  idStatus: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  
};
const LoanType = [
  {
    value: 'Hipotecario',
    label: 'Hipotecario'
  },
  {
    value: 'Personal',
    label: 'Personal'
  }
];

const ContractType = [
  {
    value: 'Solucion',
    label: 'Solucion'
  },
  {
    value: 'Mejora tu hipoteca',
    label: 'Mejora tu hipoteca'
  },
  {
    value: 'Hogar',
    label: 'Hogar'
  }
];

const LoanOriginator = [
  {
    value: 'First home solution',
    label: 'First home solution'
  },
  {
    value: 'Capital funding lab',
    label: 'Capital funding lab'
  }
];

const termsSelect =[
  {value:3,
  label:3
},
  {
    value:6,
    label:6
  },
  {
    value:9,
    label:9
  },
  {
    value:12,
    label:12
  },
  {
    value:18,
    label:18
  },
  {
    value:24,
    label:24
  }
];

const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1 },
  policy: {
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  submitButton: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRigth: theme.spacing(2)
  },
  select: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    }
  },
  date: {
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    }
  }
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  var maskElement;
  switch (props.name) {
    case 'annualInterest':
      maskElement = [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, ' ', '%'];
      break;
    case 'loanAmount':
      maskElement = [
        '$',
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        '.',
        /[0-9]/,
        ///[0-9]/
      ];
      break;
    case 'guaranteeValue':
      maskElement = [
        '$',
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        //'.',
        ///[0-9]/,
        ///[0-9]/
      ];
      break;
    case 'notarialCharges':
      maskElement = [
        '$',
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        //'.',
        ///[0-9]/,
        ///[0-9]/
      ];
      break;
    case 'appraisalExpenses':
      maskElement = [
        '$',
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        //'.',
        ///[0-9]/,
        ///[0-9]/
      ];
      break;
    case 'disbursedAmount':
      maskElement = [
        '$',
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        //'.',
        ///[0-9]/,
        ///[0-9]/
      ];
      break;
    default:
      maskElement = [];
      break;
  }

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={maskElement}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}
TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};

function SimpleForm({ className, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  
  const [values, setValues] = useState({
    textmask: '  .   %',
    numberformat: '1320'
  });

  const handleChanges = name => event => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const handleChange = event => {
    event.persist();

    setFormState(prevFormState => ({
      ...prevFormState,
      values: {
        ...prevFormState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...prevFormState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSummit = event => {
    event.preventDefault();
    handleLoan(this.loan);
    history.push(`/loanDetail/${1}`);
  };

  const handleLoan = loan => {
    if (loan !== null) {
      const clientHeaders = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      });
      return axios({
        method: 'post',
        url: `http://ibanusers-dev.us-east-2.elasticbeanstalk.com/loan`,
        body: JSON.stringify(loan),
        headers: { clientHeaders }
      })
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            res
              .json()
              .then(createdLoan => {
                console.log(createdLoan);
                //document.write(data.users.names + " " + data.users.fathersLastName + " " + data.users.mothersLastName + "|" + data.users.email+ "|"+data.countries.name + "|" + data.countries.badges.name);
                // setLoan(createdLoan);
              })
              .catch(res => console.log(res));
          }
          return console.log(
            'Looks like there was a problem. Status Code: ' + res.status
          );
        })
        .catch(
          err => console.log(`error :(  ${err}`)
          // err => console.log(err)
        );
    }
  };

  const hasError = field =>
    !!(formState.touched[field] && formState.errors[field]);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(prevFormState => ({
      ...prevFormState,
      isValid: !errors,
      errors: errors || {}
    }));
  }, [formState.values]);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent
        className={classes.root}
        onSubmit={handleSummit}
      >
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('annualInterest')}
              helperText={
                hasError('annualInterest')
                  ? formState.errors.annualInterest[0]
                  : null
              }
              label="Interes Anual"
              margin="normal"
              name="annualInterest"
              onChange={handleChanges}
              //value={formState.values.annualInterest || ('' && values.textmask)}
              variant="outlined"
              fullWidth
              /*InputProps={{
                inputComponent: TextMaskCustom
              }}*/
            ></TextField>
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('bank')}
              helperText={hasError('bank') ? formState.errors.bank[0] : null}
              label="Banco"
              margin="normal"
              name="bank"
              onChange={handleChange}
              value={formState.values.bank || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('chargeAccount')}
              helperText={
                hasError('chargeAccount')
                  ? formState.errors.chargeAccount[0]
                  : null
              }
              type="number"
              label="Cuenta Cargo"
              margin="normal"
              name="chargeAccount"
              onChange={handleChange}
              value={formState.values.chargeAccount || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('cvlCrm')}
              helperText={
                hasError('cvlCrm') ? formState.errors.cvlCrm[0] : null
              }
              label="CVL de CRM"
              margin="normal"
              name="cvlCrm"
              onChange={handleChange}
              value={formState.values.cvlCrm || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('formalzationDate')}
              helperText={
                hasError('formalzationDate')
                  ? formState.errors.formalzationDate[0]
                  : null
              }
              id="date"
              label="Fecha de formalizacion"
              type="date"
              name="formalzationDate"
              onChange={handleChange}
              value={formState.values.formalzationDate || ''}
              variant="outlined"
              fullWidth
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('originationScore')}
              helperText={
                hasError('originationScore')
                  ? formState.errors.originationScore[0]
                  : null
              }
              label="Score"
              margin="normal"
              name="originationScore"
              onChange={handleChange}
              value={formState.values.originationScore || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('propertyLocation')}
              helperText={
                hasError('propertyLocation')
                  ? formState.errors.propertyLocation[0]
                  : null
              }
              label="Ubicacion de la propiedad"
              margin="normal"
              name="propertyLocation"
              onChange={handleChange}
              value={formState.values.propertyLocation || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('idCustomer')}
              helperText={
                hasError('idCustomer') ? formState.errors.idCustomer[0] : null
              }
              label="Numero de cliente"
              margin="normal"
              name="idCustomer"
              onChange={handleChange}
              value={formState.values.idCustomer || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('loanAmount')}
              helperText={
                hasError('loanAmount') ? formState.errors.loanAmount[0] : null
              }
              label="Monto del prestamo"
              margin="normal"
              name="loanAmount"
              onChange={handleChanges}
              //value={formState.values.loanAmount || ('' && values.textmask)}
              variant="outlined"
              fullWidth
              /*InputProps={{
                inputComponent: TextMaskCustom
              }}*/
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('guaranteeValue')}
              helperText={
                hasError('guaranteeValue')
                  ? formState.errors.guaranteeValue[0]
                  : null
              }
              label="Valor de la garantia"
              margin="normal"
              name="guaranteeValue"
              onChange={handleChanges}
              //value={formState.values.guaranteeValue || ('' && values.textmask)}
              variant="outlined"
              fullWidth
              /*InputProps={{
                inputComponent: TextMaskCustom
              }}*/
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('notarialCharges')}
              helperText={
                hasError('notarialCharges')
                  ? formState.errors.notarialCharges[0]
                  : null
              }
              label="Gastos notariales"
              margin="normal"
              name="notarialCharges"
              onChange={handleChanges}
              //value={formState.values.notarialCharges || ('' && values.textmask)}
              variant="outlined"
              fullWidth
              /*InputProps={{
                inputComponent: TextMaskCustom
              }}*/
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('appraisalExpenses')}
              helperText={
                hasError('appraisalExpenses')
                  ? formState.errors.appraisalExpenses[0]
                  : null
              }
              label="Gastos de avaluo"
              margin="normal"
              name="appraisalExpenses"
              onChange={handleChanges}
              //value={formState.values.appraisalExpenses || ('' && values.textmask)}
              variant="outlined"
              fullWidth
              /*InputProps={{
                inputComponent: TextMaskCustom
              }}*/
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('disbursedAmount')}
              helperText={
                hasError('disbursedAmount')
                  ? formState.errors.disbursedAmount[0]
                  : null
              }
              label="Monto a desembolsar"
              margin="normal"
              name="disbursedAmount"
              onChange={handleChanges}
              //value={formState.values.disbursedAmount || ('' && values.textmask)}
              variant="outlined"
              fullWidth
              /*InputProps={{
                inputComponent: TextMaskCustom
              }}*/
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('idContractType')}
              helperText={
                hasError('idContractType')
                  ? formState.errors.idContractType[0]
                  : null
              }
              label="Tipo de contrato"
              margin="normal"
              name="idContractType"
              onChange={handleChange}
              //value={formState.values.idContractType || ''}
              variant="outlined"
              select
              fullWidth
            >
              {ContractType.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('idLoanOriginator')}
              helperText={
                hasError('idLoanOriginator')
                  ? formState.errors.idLoanOriginator[0]
                  : null
              }
              label="Loan Originator"
              margin="normal"
              name="idLoanOriginator"
              onChange={handleChange}
              value={formState.values.idLoanOriginator || ''}
              variant="outlined"
              select
              fullWidth
            >
              {LoanOriginator.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('idLoanType')}
              helperText={
                hasError('idLoanType') ? formState.errors.idLoanType[0] : null
              }
              label="Tipo de prestamo"
              margin="normal"
              name="idLoanType"
              onChange={handleChange}
              value={formState.values.idLoanType || ''}
              variant="outlined"
              select
              fullWidth
            >
              {LoanType.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('idTerm')}
              helperText={
                hasError('idTerm') ? formState.errors.idTerm[0] : null
              }
              id="date"
              label="Plazo Id"
              type="date"
              name="idTerm"
              onChange={handleChange}
              value={formState.values.idTerm || ''}
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
            >
            </TextField>
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('paymentsNumber')}
              helperText={
                hasError('paymentsNumber')
                  ? formState.errors.paymentsNumber[0]
                  : null
              }
              type="number"
              label="Plazo"
              select
              margin="normal"
              name="paymentsNumber"
              onChange={handleChange}
              value={formState.values.paymentsNumber || ''}
              variant="outlined"
              fullWidth
            >{termsSelect.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
            </TextField>
          </Grid>

          <Divider/>
          
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('paymentsNumber')}
              helperText={
                hasError('paymentsNumber')
                  ? formState.errors.paymentsNumber[0]
                  : null
              }
              label="Nombre"
              margin="normal"
              name="names"
              onChange={handleChange}
              value={formState.values.names || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('fathersLastName')}
              helperText={
                hasError('fathersLastName')
                  ? formState.errors.fathersLastName[0]
                  : null
              }
              label="Apellido paterno"
              margin="normal"
              name="fathersLastName"
              onChange={handleChange}
              value={formState.values.fathersLastName || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('mothersLastName')}
              helperText={
                hasError('mothersLastName')
                  ? formState.errors.mothersLastName[0]
                  : null
              }
              label="Apellido Materno"
              margin="normal"
              name="mothersLastName"
              onChange={handleChange}
              value={formState.values.mothersLastName || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('identificationNumber')}
              helperText={
                hasError('identificationNumber')
                  ? formState.errors.paymentsNumber[0]
                  : null
              }
              type="number"
              label="Numero de identificacion"
              margin="normal"
              name="identificationNumber"
              onChange={handleChange}
              value={formState.values.identificationNumber || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('documentNumber')}
              helperText={
                hasError('documentNumber')
                  ? formState.errors.documentNumber[0]
                  : null
              }
              type="number"
              label="Numero Documento"
              margin="normal"
              name="documentNumber"
              onChange={handleChange}
              value={formState.values.documentNumber || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('scoring')}
              helperText={
                hasError('scoring')
                  ? formState.errors.scoring[0]
                  : null
              }
              type="number"
              label="Scoring"
              margin="normal"
              name="scoring"
              onChange={handleChange}
              value={formState.values.scoring || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('idCountry')}
              helperText={
                hasError('idCountry')
                  ? formState.errors.idCountry[0]
                  : null
              }
              label="País"
              margin="normal"
              name="idCountry"
              onChange={handleChange}
              value={formState.values.idCountry || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('idDocumentType')}
              helperText={
                hasError('idDocumentType')
                  ? formState.errors.idDocumentType[0]
                  : null
              }
              label="Tipo de documento"
              margin="normal"
              name="idDocumentType"
              onChange={handleChange}
              value={formState.values.idDocumentType || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('idPersonType')}
              helperText={
                hasError('idPersonType')
                  ? formState.errors.idPersonType[0]
                  : null
              }
              label="Tipo persona"
              margin="normal"
              name="idPersonType"
              onChange={handleChange}
              value={formState.values.idPersonType || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider/>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('street')}
              helperText={
                hasError('street')
                  ? formState.errors.street[0]
                  : null
              }
              label="Calle"
              margin="normal"
              name="street"
              onChange={handleChange}
              value={formState.values.street || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('extNumber')}
              helperText={
                hasError('extNumber')
                  ? formState.errors.extNumber[0]
                  : null
              }
              type="number"
              label="Numero exterior"
              margin="normal"
              name="extNumber"
              onChange={handleChange}
              value={formState.values.extNumber || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('city')}
              helperText={
                hasError('city')
                  ? formState.errors.city[0]
                  : null
              }
              label="Ciudad"
              margin="normal"
              name="city"
              onChange={handleChange}
              value={formState.values.city || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('intNumber')}
              helperText={
                hasError('intNumber')
                  ? formState.errors.intNumber[0]
                  : null
              }
              type="number"
              label="Numero interior"
              margin="normal"
              name="intNumber"
              onChange={handleChange}
              value={formState.values.intNumber || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('zipCode')}
              helperText={
                hasError('zipCode')
                  ? formState.errors.zipCode[0]
                  : null
              }
              type="number"
              label="Codigo postal"
              margin="normal"
              name="zipCode"
              onChange={handleChange}
              value={formState.values.zipCode || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('contactType')}
              helperText={
                hasError('contactType')
                  ? formState.errors.contactType[0]
                  : null
              }
              type="number"
              label="Tipo de contacto"
              margin="normal"
              name="contactType"
              onChange={handleChange}
              value={formState.values.contactType || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('idStates')}
              helperText={
                hasError('idStates')
                  ? formState.errors.paymentsNumber[0]
                  : null
              }
              type="number"
              label="Estado"
              margin="normal"
              name="idStates"
              onChange={handleChange}
              value={formState.values.idStates || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider/>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('email')}
              helperText={hasError('email') ? formState.errors.email[0] : null}
              label="Email address"
              margin="normal"
              name="email"
              onChange={handleChange}
              value={formState.values.email || ''}
              variant="outlined"
              fullWidth
              autoComplete
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('idContactType')}
              helperText={
                hasError('idContactType')
                  ? formState.errors.idContactType[0]
                  : null
              }
              type="number"
              label="Tipo de Contacto"
              margin="normal"
              name="idContactType"
              onChange={handleChange}
              value={formState.values.idContactType || ''}
              variant="outlined"
              fullWidth
            />
            </Grid>
          <Divider/>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('socialNetwork')}
              helperText={
                hasError('socialNetwork')
                  ? formState.errors.socialNetwork[0]
                  : null
              }
              label="Red social"
              margin="normal"
              name="socialNetwork"
              onChange={handleChange}
              value={formState.values.socialNetwork || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('idContactTypeNetwork')}
              helperText={
                hasError('idContactTypeNetwork')
                  ? formState.errors.idContactTypeNetwork[0]
                  : null
              }
              label="Tipo contacto"
              margin="normal"
              name="idContactTypeNetwork"
              onChange={handleChange}
              value={formState.values.idContactTypeNetwork || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          
          <Divider/>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('telephoneNumber')}
              helperText={
                hasError('telephoneNumber')
                  ? formState.errors.telephoneNumber[0]
                  : null
              }
              type="number"
              label="Numero de Telefono"
              margin="normal"
              name="telephoneNumber"
              onChange={handleChange}
              value={formState.values.telephoneNumber || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('ext')}
              helperText={
                hasError('ext')
                  ? formState.errors.ext[0]
                  : null
              }
              type="number"
              label="Ext"
              margin="normal"
              name="ext"
              onChange={handleChange}
              value={formState.values.ext || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('contactTypeTelephone')}
              helperText={
                hasError('contactTypeTelephone')
                  ? formState.errors.ext[0]
                  : null
              }
              type="number"
              label="Tipo de contacto"
              margin="normal"
              name="contactTypeTelephone"
              onChange={handleChange}
              value={formState.values.contactTypeTelephone || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <TextField
              error={hasError('idStatus')}
              helperText={
                hasError('idStatus')
                  ? formState.errors.idStatus[0]
                  : null
              }
              label="Estatus"
              margin="normal"
              name="idStatus"
              onChange={handleChange}
              value={formState.values.idStatus || ''}
              variant="outlined"
              fullWidth
            />
          </Grid>
          
          <Grid
            item
            xs={12}
            md={6}
            spacing={0}
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <div className={classes.policy}>
              <Checkbox
                checked={formState.values.policy || false}
                className={classes.policyCheckbox}
                color="primary"
                name="policy"
                onChange={handleChange}
              />
              <Typography color="textSecondary" variant="body1">
                I have read the{' '}
                <Link
                  color="secondary"
                  component={RouterLink}
                  to="#"
                  underline="always"
                  variant="h6"
                >
                  Terms and Conditions
                </Link>
              </Typography>
            </div>
          </Grid>
          {hasError('policy') && (
            <FormHelperText error>{formState.errors.policy[0]}</FormHelperText>
          )}
          <Grid
            item
            xs={12}
            md={4}
            spacing={0}
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Button
              className={classes.submitButton}
              color="secondary"
              disabled={!formState.isValid}
              size="large"
              type="submit"
              variant="contained"
            >
              Crear
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

SimpleForm.propTypes = {
  className: PropTypes.string
};

export default SimpleForm;
