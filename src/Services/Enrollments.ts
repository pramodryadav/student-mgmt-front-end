import axios from "../AxiosConfig";
import { CONFIG } from "../config";

const endpoints = CONFIG.endpoints;

const getEnrollments = async (params={}) => {
       try {
         const res = await axios.get(endpoints["get_enrollments"],{ params });
         return res;
        
       } catch (error) {
        throw error;
       }   
}

const addEnrollment = async (params={}) => {
  try {
    const res = await axios.post(endpoints["add_enrollments"],params);
    return res;
   
  } catch (error) {
   throw error;
  }   
}

const editEnrollment = async (params={}) => {
  try {
    const res = await axios.post(endpoints["edit_enrollments"],params);
    return res;
   
  } catch (error) {
   throw error;
  }   
}

const deleteEnrollment = async (params={}) => {
  try {
    const res = await axios.post(endpoints["delete_enrollments"],params);
    return res;
   
  } catch (error) {
   throw error;
  }   
}





export {
    getEnrollments ,
    addEnrollment,
    deleteEnrollment,
    editEnrollment
}