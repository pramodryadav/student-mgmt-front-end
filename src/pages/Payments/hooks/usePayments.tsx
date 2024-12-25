import { ReactNode, useEffect, useMemo, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, ButtonGroup } from "@mui/material";
import { useFormik } from "formik";

import dayjs from "dayjs";
import * as Yup from "yup";

import { addPayment, deletePayment, editPayment, getPaymentByEnrollment } from "../../../Services/Payments";
import { paymentFormValidationSchema } from "../../../Utilities/PaymentFormConfig";
import { PaymentInfo } from "./useAggregatePayment";



const months = ['January','February','March','April','May','June','July','August','September','October','November','December']


export interface PaymentFormData {
    id:number | string;
    enrollment_id: number | string;
    payment_date:string;
    amount:string;
    month_year:string;
}

interface PaymentData {
    id:number | string;
    enrollment_id: number | string;
    payment_date:string;
    amount:string |string;
    year:number | string;
    month:string;
}

interface Payment_Record {
    "id": number;
    "Amount": string;
    "Month":string;
    "Year":string;
    "Payment Date": string;
    "Action": ReactNode;
    [key: string]: ReactNode;

}

const usePayments = (paymentDetail:PaymentInfo) => {

    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<Payment_Record[]>([]);
    const [columns, setColumns] = useState<(keyof Payment_Record)[]>([
        
        "Amount",
        "Month",
        "Year",
        "Payment Date",
        "Action"
    ]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
   

    const monthIndex = paymentData?.month ? months.indexOf(paymentData?.month) + 1 : 1; // Fallback to January (index 0)


    useEffect(() => {
      if(paymentDetail.enrollment_id){
        fetchPayments(paymentDetail.enrollment_id)
      }
    }, [paymentDetail.enrollment_id]);

    const fetchPayments = async (id:string | number) => {
        try {
            setLoading(true);
            const res = await getPaymentByEnrollment({enrollment_id:id});
            console.log("res",res);
            
            setLoading(false);

            const payments = res.data?.data;

            // Check if res.data is an array
            const formattedPayments = Array.isArray(payments)
                ? payments.map(payment => ({
                    id: payment.id,
                    "Amount": payment.amount,
                    "Month":payment.month,
                    "Year":payment.year,
                    "Payment Date": payment.payment_date,

                    "Action": <ButtonGroup variant="outlined" aria-label="Basic button group">
                        <Button onClick={() => handleEdit(payment)}><EditIcon /></Button>
                        <Button onClick={() => handleDelete(payment)}><DeleteIcon /></Button>

                    </ButtonGroup>
                }))
                : []; // Fallback to an empty array if data is not an array


            setRows(formattedPayments)
        } catch (error) {

            setLoading(false);

        }
    }
   

    const handleEdit = (paymentRecord: PaymentData) => {
        // set edit data to open dialog with prefilled enrollment details
    setPaymentData(paymentRecord);
        setIsDialogOpen(true);
    };

    const handleDelete = (paymentRecord: PaymentData) => {
        // set delete data 
        setPaymentData(paymentRecord);
        setIsDeleteDialogOpen(true);
    };
    
    
    const formik = useFormik<PaymentFormData>({
        initialValues: {
            id:paymentData?.id || "",
            enrollment_id:  paymentData?.enrollment_id || paymentDetail.enrollment_id || "",
            payment_date:paymentData?.payment_date || dayjs().format("YYYY-MM-DD"),
            amount:paymentData?.amount || "",
            month_year: paymentData ? `${paymentData?.year}-${monthIndex.toString().padStart(2, '0')}` :  dayjs().format("YYYY-MM")
        },
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
            payment_date: Yup.date()
              .typeError("Please enter a valid date")
              .required("Please select a date"),
            amount: Yup.number()
              .typeError("Amount must be a valid number")
              .min(1, "Amount must be at least 1")
              .required("Amount is required"),
            month_year: Yup.string()
              .matches(/^\d{4}-(0[1-9]|1[0-2])$/, "Month/Year must be in the format MM/YYYY")
              .required("Month/Year is required"),
          }),
        onSubmit: values => {
            paymentData ? updatePayment(values) :  createPayment(values)
        }

    });

    console.log("formik values",formik.values)


    const createPayment = async (values: PaymentFormData) => {
        try {
            setLoading(true);
            handleCloseDialog();

            const [ year,month] = values.month_year.split("-"); // Extract year and month from the input
            const monthIndex = parseInt(month, 10) - 1;
            const params = {
                ...values,
                year:parseInt(year, 10), 
                month:months[monthIndex], 
              
            }
            const res = await addPayment(params);
            formik.resetForm();
            if(paymentDetail.enrollment_id){
                fetchPayments(paymentDetail.enrollment_id);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }


  

    
    const updatePayment = async (values: PaymentFormData) => {
        try {
            setLoading(true);
            handleCloseDialog();
            
            const res = await editPayment(values);
            formik.resetForm();
            if(paymentDetail.enrollment_id){
                fetchPayments(paymentDetail.enrollment_id);
            }
           
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const removePayment = async () => {
        try {
            setLoading(true);
            handleCloseDialog();
            const params = {
                id:paymentData?.id
            }
            const res = await deletePayment(params);
            if(paymentDetail.enrollment_id){
                fetchPayments(paymentDetail.enrollment_id);
            }
           
            formik.resetForm();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }


    const handleOpenDialog = () => {
        setPaymentData(null); // Clear any edit data when adding a new payment
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setIsDeleteDialogOpen(false);
        formik.resetForm();
        setPaymentData(null);
    };

    const totalAmount = useMemo(()=>{
        return  rows.reduce((total,currAmt)=>{
            return total + Number(currAmt.Amount);
        },0)
  },[rows])


    return {
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
        paymentData,
    }

}

export default usePayments