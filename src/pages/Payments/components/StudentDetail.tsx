import React from 'react';
import { Box, Grid2, Typography } from '@mui/material';
import { PaymentInfo } from '../hooks/useAggregatePayment';

interface StudenDetailsProps {
    paymentDetail: PaymentInfo,
    totalAmount:number
}

const StudenDetails : React.FC<StudenDetailsProps> = ({paymentDetail,totalAmount}) => {
  return (
   
      <Grid2 container spacing={3} p={3} border={1} borderColor="grey.300" borderRadius={2}>
        {/* Sender Name */}
        <Grid2 size={{xs:12,sm:6,md:4}} >
          <Typography variant="subtitle1" fontWeight="bold">
            Student Name:
          </Typography>
          <Typography variant="body1">{paymentDetail.student_name}</Typography>
        </Grid2>

        {/* Sender Mobile */}
        <Grid2 size={{xs:12,sm:6,md:4}} >
          <Typography variant="subtitle1" fontWeight="bold">
            Course Name:
          </Typography>
          <Typography variant="body1">{paymentDetail.course_name}</Typography>
        </Grid2>

        {/* Transfer Amount */}
        <Grid2 size={{xs:12,sm:6,md:4}} >
          <Typography variant="subtitle1" fontWeight="bold">
            Total Paid:
          </Typography>
          <Typography variant="body1">₹ {totalAmount}</Typography>
        </Grid2>
      </Grid2>
   
  );
};

export default StudenDetails;
