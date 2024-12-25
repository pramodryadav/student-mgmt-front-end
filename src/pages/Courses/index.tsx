import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import Loader from '../../components/Loader'

import BasicTable from '../../components/Table'
import useCourses from './hooks/useCourse'
import CourseForm from './components/CourseForm';

const Courses: React.FC = () => {
  const {
    rows,
    columns,
    handleCloseDialog,
    handleOpenDialog,
    isDialogOpen,
    formik,
    courseData,
    loading,
    isDeleteDialogOpen,
    removeCourse


  } = useCourses();
  return (
    <>
    <Loader open={loading} />
      <Box display="flex" flexDirection="column" rowGap={1}>
        <Box display="flex" justifyContent="end">
          <Button onClick={handleOpenDialog} startIcon={<AddIcon />} variant='contained'>Add Course</Button>
        </Box>
        <BasicTable rows={rows} columns={columns} loading={loading} />
      </Box>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography variant='h5'>
            {courseData ? "Edit Student" : "Add Student"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <CourseForm formik={formik} />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDialog}>
        
        <DialogContent>
        <Typography variant='h6'>
            Are you sure you want to delete the student ?
          </Typography>
          <Box marginTop={2} display="flex" justifyContent="end" columnGap={1}>
            <Button onClick={handleCloseDialog} variant='contained'>Cancel</Button>
            <Button onClick={removeCourse} variant='contained'>Yes</Button>

          </Box>
        </DialogContent>
      </Dialog>
      </>
  )
}

export default Courses