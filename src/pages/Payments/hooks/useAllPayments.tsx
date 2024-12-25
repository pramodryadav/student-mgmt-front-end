import React, { ReactNode, useEffect, useState } from "react";
import * as XLSX from "xlsx";

import { getAllPayments } from "../../../Services/Payments";
import { SelectChangeEvent } from "@mui/material";




export interface Payment_Record {
    "id": number;
    "Name": string;
    "Amount": string;
    "Month": string;
    "Year": string;
    "Payment Date": string;
    "Remark":string;
    [key: string]: ReactNode;

}
type Month =
    | "January" | "February" | "March" | "April" | "May" | "June"
    | "July" | "August" | "September" | "October" | "November" | "December" | '';

const useAllPayments = () => {

    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<Payment_Record[]>([]);
    const [month, setMonth] = useState<Month>('');
    const [columns, setColumns] = useState<(keyof Payment_Record)[]>([
        "Name",
        "Amount",
        "Month",
        "Year",
        "Payment Date",
        "Remark"

    ]);
    const months = [
        {label: 'January',value: 'January'},
        {label: 'February',value: 'February'},
        {label: 'March',value: 'March'},
        {label: 'April',value: 'April'},
        {label: 'May',value: 'May'},
        {label: 'June',value: 'June'},
        {label: 'July',value: 'July'},
        {label: 'August',value: 'August'}, 
        {label: 'September', value: 'September'}, 
        {label:'October',value:'October'}, 
        {label:'November',value:'November'}, 
        {label:'December',value:'December'}
    ]

    useEffect(() => {
        fetchPayments(month)

    }, [month]);



    const fetchPayments = async (month: Month) => {
        try {
            setLoading(true);
            const params = {
                month: month ? month : null
            }
            const res = await getAllPayments(params);
            setLoading(false);

            const payments = res.data?.data;

            // Check if res.data is an array
            const formattedPayments = Array.isArray(payments)
                ? payments.map(payment => ({
                    id: payment.payment_id,
                    Name: payment.student_name,
                    "Amount": payment.amount,
                    "Month": payment.month,
                    "Year": payment.year,
                    "Payment Date": payment.payment_date,
                    "Remark":payment.remark

                }))
                : []; // Fallback to an empty array if data is not an array


            setRows(formattedPayments)
        } catch (error) {

            setLoading(false);

        }
    }

    const handleExport = () => {
        // Convert the data into a worksheet
        const worksheet = XLSX.utils.json_to_sheet(rows);
    
        // Create a new workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");
    
        // Write the workbook and trigger a download
        XLSX.writeFile(workbook, "PaymentRecords.xlsx");
      };

    const handleChangeMonth = (e: SelectChangeEvent) => {
        const selectedMonth = e.target.value as Month; // Cast the value to the Month type
        setMonth(selectedMonth);
    };

    const handleReset = () => {
        setMonth('')
    }



    return {
        rows,
        columns,
        loading,
        month,
        handleChangeMonth,
        months,
        handleExport,
        handleReset

    }

}

export default useAllPayments