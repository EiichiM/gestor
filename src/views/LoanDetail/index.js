import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'src/utils/axios';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  Tabs,
  Tab,
  Divider,
  colors
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import GeneralPage from './General';
import Cuotas from './Cuotas';
import Pagos from './Pagos';
import HitorialRestructuracion from './HitorialRestructuracion';
import General from '../Configuration/General';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

function CustomerManagementDetails({ match, history }) {
  const classes = useStyles();
  const [customer, setCustomer] = useState();

  const { id, tab: currentTab } = match.params;
  const tabs = [
    { value: 'general', label: 'Datos Generales' },
    { value: 'cuotas', label: 'Cuotas' },
    { value: 'payments', label: 'Pagos' },
    { value: 'history', label: 'Historial Restructuracion' }
  ];

  const handleTabsChange = (event, value) => {
    history.push(value);
  };


  useEffect(() => {
    let mounted = true;

    const fetchCustomer = () => {
      axios.get('/api/management/customers/1/summary').then(response => {
        if (mounted) {
          setCustomer(response.data.summary);
        }
      });
    }

    fetchCustomer();

    return () => {
      mounted = false;
    };
  }, []);
  
  if (!currentTab) {
    return <Redirect to={`/loanDetail/${id}/general`} />;
  }

  if (!tabs.find((tab) => tab.value === currentTab)) {
    return <Redirect to="/errors/error-404" />;
  }

  if (!customer) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Customer Management Details"
    >
      <Container maxWidth={false}>
        <Header />
        <Tabs
          className={classes.tabs}
          onChange={handleTabsChange}
          scrollButtons="auto"
          value={currentTab}
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
            />
          ))}
        </Tabs>
        <Divider className={classes.divider} />
        <div className={classes.content}>
          {currentTab === 'general' && <GeneralPage />}
          {currentTab === 'cuotas' && <Cuotas />}
          {currentTab === 'payments' && <Pagos />}
          {currentTab === 'history' && <HitorialRestructuracion />}
        </div>
      </Container>
    </Page>
  );
}

CustomerManagementDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default CustomerManagementDetails;
