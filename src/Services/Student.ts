import axios from "../AxiosConfig";
import { CONFIG } from "../config";

const endpoints = CONFIG.endpoints;

const getStudents = async (params={}) => {
       try {
         const res = await axios.get(endpoints["get_students"],{ params });
         return res;
        
       } catch (error) {
        throw error;
       }   
}

const getStudentsIds = async (params={}) => {
  try {
    const res = await axios.get(endpoints["get_students_ids"],{ params });
    return res;
   
  } catch (error) {
   throw error;
  }   
}

const addStudent = async (params={}) => {
  try {
    const res = await axios.post(endpoints["add_student"],params);
    return res;
   
  } catch (error) {
   throw error;
  }   
}

const editStudent = async (params={}) => {
  try {
    const res = await axios.post(endpoints["edit_student"],params);
    return res;
   
  } catch (error) {
   throw error;
  }   
}

const deleteStudent = async (params={}) => {
  try {
    const res = await axios.post(endpoints["delete_student"],params);
    return res;
   
  } catch (error) {
   throw error;
  }   
}

export {
    getStudents ,
    addStudent,
    deleteStudent,
    editStudent,
    getStudentsIds
}