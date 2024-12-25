import { ReactNode, useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, ButtonGroup } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { addCourse, deleteCourse, editCourse, getCourses } from "../../../Services/Course";


interface CourseData {
    id: number | undefined;
    course_name: string;
    fee: string
}

interface Course_Record {
    "id": number,
    "Name": string,
    "Fee": string,
    "Action": ReactNode,
    [key: string]: ReactNode;

}
const useCourses = () => {

    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<Course_Record[]>([]);
    const [columns, setColumns] = useState<(keyof Course_Record)[]>([
        "Name",
        "Fee",
        "Action"
    ]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [courseData, setCourseData] = useState<CourseData | null>(null);

    useEffect(() => {
        fetchCourses();
    }, [])

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const res = await getCourses();
            setLoading(false);

            const courses = res.data?.data;
        
            // Check if res.data is an array
            const formattedCourse = Array.isArray(courses)
                ? courses.map(course => ({
                    id: course.id,
                    Name: course.course_name,
                    Fee: course.fee,
                   
                    "Action": <ButtonGroup variant="outlined" aria-label="Basic button group">
                        <Button onClick={() => handleEdit(course)}><EditIcon /></Button>
                        <Button onClick={() => handleDelete(course)}><DeleteIcon /></Button>

                    </ButtonGroup>
                }))
                : []; // Fallback to an empty array if data is not an array


            setRows(formattedCourse)
        } catch (error) {

            setLoading(false);

        }
    }
    console.log("courseData", courseData);

    const handleEdit = (course: CourseData) => {
        // set edit data to open dialog with prefilled course details
        setCourseData(course);
        setIsDialogOpen(true);
    };

    const handleDelete = (course: CourseData) => {
        // set delete data 
        setCourseData(course);
        setIsDeleteDialogOpen(true);
    };

    const formik = useFormik({
        initialValues: {
            id: courseData?.id || undefined,
            course_name: courseData?.course_name || "",
            fee: courseData?.fee || "",
           
        },
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
            course_name: Yup.string().matches(/^[a-zA-Z ]+$/, "Please enter valid course name").required("Please enter course name"),
            fee: Yup.string().matches(/\d/, "Please enter valid fee value").required("Please enter fee"),
          

        }),
        onSubmit: values => {
            courseData ? upateCourse(values) : createCourse(values)
        }

    })

    const createCourse = async (values: CourseData) => {
        try {
            setLoading(true);
            handleCloseDialog();
            const res = await addCourse(values);
            formik.resetForm();
            fetchCourses();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const upateCourse = async (values: CourseData) => {
        try {
            setLoading(true);
            handleCloseDialog();
            const res = await editCourse(values);
            formik.resetForm();
            fetchCourses();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const removeCourse = async () => {
        try {
            setLoading(true);
            handleCloseDialog();
            const res = await deleteCourse({ id: courseData?.id });
            fetchCourses();
            formik.resetForm();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }


    const handleOpenDialog = () => {
        setCourseData(null); // Clear any edit data when adding a new course
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setIsDeleteDialogOpen(false);
    };




    return {
        rows,
        columns,
        handleCloseDialog,
        handleOpenDialog,
        isDialogOpen,
        formik,
        courseData,
        loading,
        isDeleteDialogOpen,
        removeCourse
    }

}

export default useCourses