import React from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid2, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Loader from '../../../components/Loader'

import BasicTable from '../../../components/Table'
import usePayments from '../hooks/usePayments'
import { PaymentInfo } from '../hooks/useAggregatePayment';
import StudenDetails from './StudentDetail';
import { ArrowBack } from '@mui/icons-material';
import Paymentform from './PaymentForm';

interface PaymentDetailProps {
    paymentDetail: PaymentInfo;
    back:()=>void;
 
}

const PaymentDetail: React.FC<PaymentDetailProps> = ({ paymentDetail,back }) => {
    const {
        rows,
        columns,
        handleCloseDialog,
        handleOpenDialog,
        isDialogOpen,
        formik,
        loading,
        isDeleteDialogOpen,
        removePayment,
       totalAmount,
        paymentData
    } = usePayments(paymentDetail);
    return (
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
            <Loader open={loading} />
            <Box sx={{display:"flex",justifyContent:"space-between"}}>
                <Button onClick={back} startIcon={<ArrowBack/>} variant='contained'>Back</Button>
                <Button onClick={handleOpenDialog} startIcon={<AddIcon />} variant='contained'>Add Payment</Button>
        
            </Box>

            <StudenDetails paymentDetail={paymentDetail} totalAmount={totalAmount} />
            <Box display="flex" flexDirection="column" rowGap={1}>
                <BasicTable rows={rows} columns={columns} loading={loading} />
            </Box>

            <Dialog open={isDialogOpen} onClose={handleCloseDialog} >
                <DialogTitle>
                    <Typography variant='h5'>
                       { paymentData ? "Edit Payment" : "Add Payment"}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                  <Paymentform
                    formik={formik}
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
                        <Button onClick={removePayment} variant='contained'>Yes</Button>

                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default PaymentDetail