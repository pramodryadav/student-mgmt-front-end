import { Box, Button, Grid2, TextField } from '@mui/material'
import React from 'react';
import { FormikProps } from 'formik';

interface CourseFormValues {
  id: number | undefined;
  course_name: string;
  fee: string;

}

interface CourseFormProps {
  formik: FormikProps<CourseFormValues>;
}

const CourseForm: React.FC<CourseFormProps> = ({ formik }) => {

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid2 container display="flex" justifyContent="center" spacing={2} borderRadius={2} border="1px solid #ddd" padding={3}>

     
          <Grid2 size={{ xs: 12, }}>
            <TextField
              size="small"
              label="Course Name"
              fullWidth
              name="course_name"
              value={formik.values.course_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.course_name && Boolean(formik.errors.course_name)}
              helperText={formik.touched.course_name && formik.errors.course_name}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, }}>
            <TextField
              size="small"
              label="Fee"
              fullWidth
              name="fee"
              value={formik.values.fee}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fee && Boolean(formik.errors.fee)}
              helperText={formik.touched.fee && formik.errors.fee}
            />
          </Grid2>


          <Grid2 size={{ xs: 12, }} display="flex" justifyContent="flex-end">
          <Button variant='contained' type="submit">Submit</Button>
          </Grid2>

      

      </Grid2>
    </form>
  )
}

export default CourseForm