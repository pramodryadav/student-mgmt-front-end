import React from 'react';

import BasicTabs from '../../components/Tab';
import useTabs from './hooks/useTabs';
import AggregatePayments from './components/AggregatePayments';
import AllPayments from './components/AllPayments';


const Enrollments: React.FC = () => {
  const {
   
    value,
    handleChangeTab,
    
  } = useTabs();
  return (
    
        <BasicTabs
          handleChange={handleChangeTab}
          value={value}
          tabs={
            [
              {
                label: "Manage Payments",
                content:<AggregatePayments/>
            },
              {
                label: "All Payments",
                content:<AllPayments/>
              }
            ]
          }
        />

  
  )
}

export default Enrollments