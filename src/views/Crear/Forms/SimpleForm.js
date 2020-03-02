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
  Hidden,
  Input
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
  }
};
const LoanType = [
  {
    value: 1,
    label: 'Hipotecario'
  },
  {
    value: 2,
    label: 'Personal'
  }
];

const ContractType = [
  {
    value: 1,
    label: 'Solucion'
  },
  {
    value: 2,
    label: 'Mejora tu hipoteca'
  },
  {
    value: 3,
    label: 'Hogar'
  }
];

const LoanOriginator = [
  {
    value: 1,
    label: 'First home solution'
  },
  {
    value: 2,
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
  /*const regexp = new RegExp(`^-?[0-9]*$`)
    const target = event.target
    const value = target.value
    const name = target.name
    this.errorsConst = this.state.errors*/

  var maskElement;
  switch (props.name) {
    case 'annualInterest':
      maskElement = [
        '%',
        ' ', 
      ];
      /*if (value.length === 0) {
        this.hasError[props.name].value = true
        this.hasError[props.name].text = "This value is not a valid Phone number"
      } else {
        if (value.length <= 6 || value.length >= 11) {
          this.hasError[props.name].value = true
          this.hasError[props.name].text = ""
        } else {
          if (!regexp.test(value)) {
            this.hasError[props.name].value = true
            this.hasError[props.name].text = "Only numbers are allowed"
          } else {
            this.hasError[props.name].value = false
            this.hasError[props.name].text = ""
          }
        }
      }*/
      break;
    case 'chargeAccount':
      maskElement=[
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
      ];
      break;
      case 'cvlCrm':
        maskElement = [
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
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        ]
      break
      case 'originationScore':
      maskElement = [
      /[a-zA-Z0-9]/,
      /[a-zA-Z0-9]/,
      /[a-zA-Z0-9]/,
        ]
      break
      case 'idCustomer':
        maskElement =[
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
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        ]
        break
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
        /[0-9]/
      ]
      break
    case 'guaranteeValue':
      maskElement = [
        '$',
        ' '
      ]
      
      break
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
        '.',
        /[0-9]/,
        /[0-9]/
      ]
      break
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
        '.',
        /[0-9]/,
        /[0-9]/
      ]
      break
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
        '.',
        /[0-9]/,
        /[0-9]/
      ]
      break
    default:
      maskElement = []
      break
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

function myReplace(values){
  var val = values;
  console.log(val);
  return values;
      //return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

}

function SimpleForm({ className, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  
  const [values, setValues] = useState({
    textmask: '  .   %',
    numberformat: '1320'
  });

  // const handleChanges = name => event => {
  //   setValues({
  //     ...values,
  //     [name]: event.target.value
  //   });
  // };

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const handleChange  = event => {
    
    /*setValues({
      ...values,
      [event.target.name]: event.target.value
    });*/
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
      },
      /*value:{
        [event.target.value]:
          event.target.values === '/[a-zA-Z0-9]/'
          
      }*/
      
      
    }));

    //Only for term is mandatory to do number of payments
    if(event.target.name === 'idTerm'){
      setFormState(prevFormState => ({
        ...prevFormState,
        values: {
          ...prevFormState.values,
          ['paymentsNumber']: event.target.value
        },
        touched: {
          ...prevFormState.touched,
          ['paymentsNumber']: true
        }
      }));

    }
  };

  const handleSummit = event => {
    event.preventDefault();
    handleLoan(formState.values);
    //history.push({pathname:`/loanDetail/${1}`, state: { detail: createdLoan}});
  };

  function handleLoan(loan) {
    if (loan !== null) {
      const clientHeaders = new Headers({
        
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Headers':"'Content-Type'",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'

      });

      axios.post(`http://iban-loans-dev.us-east-2.elasticbeanstalk.com/loans/create`,
        JSON.stringify(loan),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST'
          }
        })
        .then(response => {
          if (response.status === 200) {
                console.log(response.data);
                window.sessionStorage.setItem('createdLoanItem', JSON.stringify(response.data))
                history.push({ pathname: `/loanDetail/${1}`});
                alert('Exito al generar el prestamo')
          }
        })
        .catch(
          //alert('Hubo un error al generar el prestamo')
          //err => console.log(`error :(  ${err}`)
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
              onChange={handleChange}
              //value={formState.values.annualInterest || ('' && values.textmask)}
              variant="outlined"
              fullWidth
              /*InputProps={{
                inputComponent: TextMaskCustom,
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
              label="Cuenta Cargo"
              margin="normal"
              name="chargeAccount"
              onChange={handleChange}
              //value={formState.values.chargeAccount || ('' && values.textmask)}
              variant="outlined"
              fullWidth
              /*InputProps={{
                inputComponent: TextMaskCustom,
              }}*/
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
              //value={formState.values.cvlCrm || ('' && values.textmask)}
              variant="outlined"
              fullWidth
              /*InputProps={{
                inputComponent: TextMaskCustom,
              }}*/
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
              //value={formState.values.formalzationDate || ''}
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
              //value={formState.values.originationScore || ('' && values.textmask)}
              variant="outlined"
              fullWidth
              /*InputProps={{
                inputComponent: TextMaskCustom,
              }}*/
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
              //value={formState.values.idCustomer || ('' && values.textmask)}
              variant="outlined"
              fullWidth
              /*InputProps={{
                inputComponent: TextMaskCustom,
              }}*/
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              value={formState.values.idContractType || ''}
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
              id="idTerm"
              label="Plazo"
              select
              name="idTerm"
              onChange={handleChange}
              value={formState.values.idTerm || ''}
              variant="outlined"
              fullWidth
            >
              {termsSelect.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              </TextField>
          </Grid>
          <Input type="Hidden" id='paymentsNumber' name='paymentsNumber'></Input>
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
              //onSubmit={handleSummit}
              onClick={handleSummit}
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
