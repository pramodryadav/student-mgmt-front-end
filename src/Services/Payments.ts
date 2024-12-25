import axios from "../AxiosConfig";
import { CONFIG } from "../config";

const endpoints = CONFIG.endpoints;



const getAggregatePayments = async (params = {}) => {
  try {
    const res = await axios.get(endpoints["get_aggregate_payments"], { params });
    return res;

  } catch (error) {
    throw error;
  }
}

const getAllPayments = async (params = {}) => {
  try {
    const res = await axios.get(endpoints["get_payments"], { params });
    return res;

  } catch (error) {
    throw error;
  }
}

const getPaymentByEnrollment = async (params: { enrollment_id: string | number }) => {
  try {
    const res = await axios.get(endpoints["get_payment_by_enrollment"] + `/${params.enrollment_id}`);
    return res;

  } catch (error) {
    throw error;
  }
}



const addPayment = async (params = {}) => {
  try {
    const res = await axios.post(endpoints["add_payment"], params);
    return res;

  } catch (error) {
    throw error;
  }
}

const editPayment = async (params = {}) => {
  try {
    const res = await axios.post(endpoints["edit_payment"], params);
    return res;

  } catch (error) {
    throw error;
  }
}

const deletePayment = async (params = {}) => {
  try {
    const res = await axios.post(endpoints["delete_payment"], params);
    return res;

  } catch (error) {
    throw error;
  }
}





export {
  getAllPayments,
  addPayment,
  deletePayment,
  editPayment,
  getPaymentByEnrollment,
  getAggregatePayments
}