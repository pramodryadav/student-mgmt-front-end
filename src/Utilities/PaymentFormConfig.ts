import * as Yup from "yup";




// Define validation schema for the form
export const paymentFormValidationSchema = Yup.object().shape({
  enrollment_id: Yup.string()
    .typeError("Please select a valid student")
    .required("Student is required"),
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
});
