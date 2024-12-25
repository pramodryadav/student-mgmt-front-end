import { ReactNode, useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { addEnrollment, deleteEnrollment, editEnrollment, getEnrollments } from "../../../Services/Enrollments";
import { Button, ButtonGroup } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

import { getStudentsIds } from "../../../Services/Student";
import { getCourses } from "../../../Services/Course";


interface Option {
    value: number;
    label: string;
}

interface EnrollmentData {
    id: number | string;
    student_id: number | string;
    course_id: number | string;
    enrollment_date: string;
}

interface Enrollment_Record {
    "id": number;
    "Name": string;
    "Course Name": string;
    "Enrollment Date": string;
    "Action": ReactNode;
    [key: string]: ReactNode;

}
const useEnrollments = () => {

    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<Enrollment_Record[]>([]);
    const [columns, setColumns] = useState<(keyof Enrollment_Record)[]>([
        "Name",
        "Course Name",
        "Enrollment Date",
        "Action"
    ]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [enrollmentData, setEnrollmentData] = useState<EnrollmentData | null>(null);
    const [students, setStudents] = useState<Option[]>([]);
    const [courses, setCourses] = useState<Option[]>([]);



    useEffect(() => {
        fetchEnrollments();
        fetchCourses();
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await getStudentsIds();
            const data = res.data?.data || [];
            const formattedStudents = data.map((student: { name: string, id: number }) => ({ label: student.name, value: student.id }));


            setStudents(formattedStudents)
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }



    const fetchCourses = async () => {
        try {
            setLoading(true);
            const res = await getCourses();
            const data = res.data?.data || [];
            const formattedCourses = data.map((course: { course_name: string, id: number }) => ({ label: course.course_name, value: course.id }));

            setCourses(formattedCourses)
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }





    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const res = await getEnrollments();
            setLoading(false);

            const enrollments = res.data?.data;

            // Check if res.data is an array
            const formattedEnrollments = Array.isArray(enrollments)
                ? enrollments.map(enrollment => ({
                    id: enrollment.id,
                    Name: enrollment.student_name,
                    "Course Name": enrollment.course_name,
                    "Enrollment Date": enrollment.enrollment_date,

                    "Action": <ButtonGroup variant="outlined" aria-label="Basic button group">
                        <Button onClick={() => handleEdit(enrollment)}><EditIcon /></Button>
                        <Button onClick={() => handleDelete(enrollment)}><DeleteIcon /></Button>

                    </ButtonGroup>
                }))
                : []; // Fallback to an empty array if data is not an array


            setRows(formattedEnrollments)
        } catch (error) {
            setLoading(false);


        }
    }
    

    const handleEdit = (enrollment: EnrollmentData) => {
        // set edit data to open dialog with prefilled enrollment details
        setEnrollmentData(enrollment);
        setIsDialogOpen(true);
    };

    const handleDelete = (enrollment: EnrollmentData) => {
        // set delete data 
        setEnrollmentData(enrollment);
        setIsDeleteDialogOpen(true);
    };

    const formik = useFormik<EnrollmentData>({
        initialValues: {
            id: enrollmentData?.id  || "",
            student_id: enrollmentData?.student_id || "",
            course_id: enrollmentData?.course_id || "",
            enrollment_date: enrollmentData?.enrollment_date || dayjs().format("YYYY-MM-DD"),

        },
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
            student_id: Yup.number().typeError("Please select a valid student").required("Student is required"),
            course_id: Yup.number().typeError("Please select a valid course").required("Course is required"),
            enrollment_date: Yup.date().typeError("Please enter a valid date").required("Please select a date"),


        }),
        onSubmit: values => {
            enrollmentData ? updateEnrollment(values) : createEnrollment(values)
        }

    }) 

    const createEnrollment = async (values: EnrollmentData) => {
        try {
            setLoading(true);
            handleCloseDialog();
            const res = await addEnrollment(values);
            formik.resetForm();
            fetchEnrollments();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const updateEnrollment = async (values: EnrollmentData) => {
        try {
            setLoading(true);
            handleCloseDialog();
            const res = await editEnrollment(values);
            formik.resetForm();
            fetchEnrollments();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const removeEnrollment = async () => {
        try {
            setLoading(true);
            handleCloseDialog();
            const res = await deleteEnrollment({ id: enrollmentData?.id });
            fetchEnrollments();
            formik.resetForm();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }


    const handleOpenDialog = () => {
        setEnrollmentData(null); // Clear any edit data when adding a new enrollment
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setIsDeleteDialogOpen(false);
        formik.resetForm();
    };






    return {
        rows,
        columns,
        handleCloseDialog,
        handleOpenDialog,
        isDialogOpen,
        formik,
        enrollmentData,
        loading,
        isDeleteDialogOpen,
        removeEnrollment,
        students,
        courses
    }

}

export default useEnrollments