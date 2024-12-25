import { Box, Button, Grid2, TextField, Typography } from '@mui/material'
import React from 'react';
import { FormikProps } from 'formik';

interface StudentFormValues {
  id: number | undefined;
  first_name: string;
  last_name: string;
  mobileno: string;
  email: string;
  address: string;
  remark:string;
}

interface StudentFormProps {
  formik: FormikProps<StudentFormValues>;
}

const StudentForm: React.FC<StudentFormProps> = ({ formik }) => {

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid2 container display="flex" justifyContent="center" spacing={2} borderRadius={2} border="1px solid #ddd" padding={3}>

     
          <Grid2 size={{ xs: 12, }}>
            <TextField
              size="small"
              label="First Name"
              fullWidth
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.first_name && Boolean(formik.errors.first_name)}
              helperText={formik.touched.first_name && formik.errors.first_name}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, }}>
            <TextField
              size="small"
              label="Last Name"
              fullWidth
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.last_name && Boolean(formik.errors.last_name)}
              helperText={formik.touched.last_name && formik.errors.last_name}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, }}>
            <TextField
              size="small"
              label="Mobile"
              fullWidth
              name="mobileno"
              value={formik.values.mobileno}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobileno && Boolean(formik.errors.mobileno)}
              helperText={formik.touched.mobileno && formik.errors.mobileno}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, }}>
            <TextField
              size="small"
              label="Email"
              fullWidth
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, }}>
            <TextField
              size="small"
              label="Address"
              fullWidth
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, }}>
            <TextField
              size="small"
              label="Remark"
              fullWidth
              name="remark"
              value={formik.values.remark}
              onChange={formik.handleChange}
      
             
            />
          </Grid2>

          <Grid2 size={{ xs: 12, }} display="flex" justifyContent="flex-end">
          <Button variant='contained' type="submit">Submit</Button>
          </Grid2>

      

      </Grid2>
    </form>
  )
}

export default StudentForm