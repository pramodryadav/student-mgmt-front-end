import { Box, Button, Grid2, TextField } from '@mui/material'
import React from 'react';
import { FormikProps } from 'formik';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';
import { PaymentFormData } from '../hooks/usePayments';


interface Option {
  value: number | string;
  label: string;
}



interface PaymentFormProps {
  formik: FormikProps<PaymentFormData>;


}

const Paymentform: React.FC<PaymentFormProps> = ({ formik }) => {

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid2 container display="flex" justifyContent="center" spacing={2} borderRadius={2} border="1px solid #ddd" padding={3}>



        <Grid2 size={{ xs: 12, }}>
          <TextField
            size="small"
            label="Amount"
            fullWidth
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, }}>
          <TextField
            size="small"
            label="Month-Year"
            fullWidth
            type="month"
            name="month_year"
           
            value={formik.values.month_year}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.month_year && Boolean(formik.errors.month_year)}
            helperText={formik.touched.month_year && formik.errors.month_year}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, }}>
          <TextField
            size="small"
            label="Payment Date"
            fullWidth
            type="date"
            name="payment_date"
            value={formik.values.payment_date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.payment_date && Boolean(formik.errors.payment_date)}
            helperText={formik.touched.payment_date && formik.errors.payment_date}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, }} display="flex" justifyContent="flex-end">
          <Button variant='contained' type="submit">Submit</Button>
        </Grid2>



      </Grid2>
    </form>
  )
}

export default Paymentform