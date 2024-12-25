import React from 'react';
import BasicTable from '../../components/Table';
import useStudent from './hooks/useStudent';
import { Box, Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StudentForm from './component/StudentForm';
import Loader from '../../components/Loader';

const Students: React.FC = () => {
  const {
    rows,
    columns,
    handleCloseDialog,
    handleOpenDialog,
    isDialogOpen,
    isDeleteDialogOpen,
    formik,
    studentData,
    loading,
    removeStudent
  } = useStudent();

  console.log("loading",loading);
  

  return (
    <>
      <Loader open={loading} />
      <Box display="flex" flexDirection="column" rowGap={1}>
        <Box display="flex" justifyContent="end">
          <Button onClick={handleOpenDialog} startIcon={<AddIcon />} variant='contained'>Add Student</Button>
        </Box>
        <BasicTable rows={rows} columns={columns} loading={loading} />
      </Box>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography variant='h5'>
            {studentData ? "Edit Student" : "Add Student"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <StudentForm formik={formik} />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDialog}>
        
        <DialogContent>
        <Typography variant='h6'>
            Are you sure you want to delete the student ?
          </Typography>
          <Box marginTop={2} display="flex" justifyContent="end" columnGap={1}>
            <Button onClick={handleCloseDialog} variant='contained'>Cancel</Button>
            <Button onClick={removeStudent} variant='contained'>Yes</Button>

          </Box>
        </DialogContent>
      </Dialog>

    </>
  );
};

export default Students;