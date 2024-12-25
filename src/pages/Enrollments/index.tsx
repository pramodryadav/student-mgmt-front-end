import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import Loader from '../../components/Loader'

import BasicTable from '../../components/Table'
import useEnrollments from './hooks/useEnrollments'
import EnrollmentForm from './components/EnrollmentForm';


const Enrollments: React.FC = () => {
  const {
    rows,
    columns,
    handleCloseDialog,
    handleOpenDialog,
    isDialogOpen,
    formik,
    enrollmentData,
    loading,
    isDeleteDialogOpen,
    removeEnrollment,
    students,
        courses


  } = useEnrollments();
  return (
    <>
    <Loader open={loading} />
      <Box display="flex" flexDirection="column" rowGap={1}>
        <Box display="flex" justifyContent="end">
          <Button onClick={handleOpenDialog} startIcon={<AddIcon />} variant='contained'>Enroll</Button>
        </Box>
        <BasicTable rows={rows} columns={columns} loading={loading}/>
      </Box>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} >
        <DialogTitle>
          <Typography variant='h5'>
            {enrollmentData ? "Edit Enrollment" : "Add Enrollment"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <EnrollmentForm 
          formik={formik} 
          students={students}
          courses={courses}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDialog}>
        
        <DialogContent>
        <Typography variant='h6'>
            Are you sure you want to delete the student ?
          </Typography>
          <Box marginTop={2} display="flex" justifyContent="end" columnGap={1}>
            <Button onClick={handleCloseDialog} variant='contained'>Cancel</Button>
            <Button onClick={removeEnrollment} variant='contained'>Yes</Button>

          </Box>
        </DialogContent>
      </Dialog>
      </>
  )
}

export default Enrollments