import { Box, Button, Grid2, TextField } from '@mui/material'
import React from 'react';
import { FormikProps } from 'formik';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';

interface Option {
  value: number | string;
  label: string;
}

interface EnrollmentFormValues {
  id: number | string;
  student_id: number | string;
  course_id: number | string ;
  enrollment_date: string;

}

interface EnrollmentFormProps {
  formik: FormikProps<EnrollmentFormValues>;
  students: Option[];
  courses: Option[];
}

const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ formik, students, courses }) => {
 
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid2 container display="flex" justifyContent="center" spacing={2} borderRadius={2} border="1px solid #ddd" padding={3}>
        <Grid2 size={{ xs: 12, }}>


          <FormControl size='small'  fullWidth>
            <InputLabel id={`students-label`}>Students</InputLabel>
            <Select
           
              name="student_id"
              value={formik.values.student_id}
              label="Students"
              onChange={formik.handleChange}
              sx={{ width: '500px' }}
              onBlur={formik.handleBlur}
              
             
            >
              {students.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.student_id && formik.errors.student_id && (
              <FormHelperText sx={{color:"red"}}>{formik.errors.student_id}</FormHelperText>
            )}
          </FormControl>

        </Grid2>

        <Grid2 size={{ xs: 12, }}>

          <FormControl size='small' fullWidth>
            <InputLabel id={`courses-label`}>Courses</InputLabel>
            <Select
              sx={{ width: '500px' }}
              value={formik.values.course_id}
              label="Courses"
              onChange={formik.handleChange}
              name="course_id"
              onBlur={formik.handleBlur}

            >
              {courses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.course_id && formik.errors.course_id && (
              <FormHelperText sx={{color:"red"}}>{formik.errors.course_id}</FormHelperText>
            )}
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, }}>
          <TextField
            size="small"
            label="Enrollment Date"
            fullWidth
            type="date"
            name="enrollment_date"
            value={formik.values.enrollment_date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.enrollment_date && Boolean(formik.errors.enrollment_date)}
            helperText={formik.touched.enrollment_date && formik.errors.enrollment_date}
          />
        </Grid2>


        <Grid2 size={{ xs: 12, }} display="flex" justifyContent="flex-end">
          <Button variant='contained' type="submit">Submit</Button>
        </Grid2>



      </Grid2>
    </form>
  )
}

export default EnrollmentForm