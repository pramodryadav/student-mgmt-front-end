import axios from "../AxiosConfig";
import { CONFIG } from "../config";

const endpoints = CONFIG.endpoints;

const getCourses = async (params={}) => {
       try {
         const res = await axios.get(endpoints["get_courses"],{ params });
         return res;
        
       } catch (error) {
        throw error;
       }   
}

const addCourse = async (params={}) => {
  try {
    const res = await axios.post(endpoints["add_course"],params);
    return res;
   
  } catch (error) {
   throw error;
  }   
}

const editCourse = async (params={}) => {
  try {
    const res = await axios.post(endpoints["edit_course"],params);
    return res;
   
  } catch (error) {
   throw error;
  }   
}

const deleteCourse = async (params={}) => {
  try {
    const res = await axios.post(endpoints["delete_course"],params);
    return res;
   
  } catch (error) {
   throw error;
  }   
}

export {
    getCourses ,
    addCourse,
    deleteCourse,
    editCourse
}