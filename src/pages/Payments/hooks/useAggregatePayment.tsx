import React, { ReactNode, useEffect, useMemo, useState } from "react";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Button, ButtonGroup } from "@mui/material";

import { getAggregatePayments } from "../../../Services/Payments";

export interface PaymentInfo {

    "enrollment_id": number | string;
    "student_name": string;
    "course_name": string;
    "total_paid": string;

}


export interface Aggregate_Payment {
    "id": number;
    "Name": string;
    "Course": string;
    "Total Paid": string;
    "Action": ReactNode;
    [key: string]: ReactNode;

}

const useAggregatePayments = () => {

    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<Aggregate_Payment[]>([]);
    const [columns, setColumns] = useState<(keyof Aggregate_Payment)[]>([
        "Name",
        "Course",
        "Total Paid",
        "Action"
    ]);


    const [paymentDetail, setPaymentDetail] = useState<PaymentInfo | null>(null)


    useEffect(() => {
        fetchPayments()

    }, []);

    const handleViewPaymentDetail = (values: PaymentInfo) => {
        console.log("vlaues", values);
        setPaymentDetail(values);
    }

    const handleClosePaymentDetail = () => {
        fetchPayments();
        setPaymentDetail(null);
    }



    const fetchPayments = async () => {
        try {
            setLoading(true);
            const res = await getAggregatePayments();
            setLoading(false);

            const payments = res.data?.data;

            // Check if res.data is an array
            const formattedPayments = Array.isArray(payments)
                ? payments.map(payment => ({
                    id: payment.enrollment_id,
                    Name: payment.student_name,
                    "Course": payment.course_name,
                    "Total Paid": payment.total_paid,
                    "Action": <ButtonGroup variant="contained" aria-label="Basic button group">
                        <Button startIcon={<CurrencyRupeeIcon/>} onClick={() => handleViewPaymentDetail(payment)} >
                            Pay
                        </Button>

                    </ButtonGroup>
                }))
                : []; // Fallback to an empty array if data is not an array


            setRows(formattedPayments)
        } catch (error) {

            setLoading(false);

        }
    }

  



    return {
        rows,
        columns,
        loading,
        paymentDetail,
        handleClosePaymentDetail
    }

}

export default useAggregatePayments