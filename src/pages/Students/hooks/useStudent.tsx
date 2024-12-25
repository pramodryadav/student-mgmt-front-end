import { ReactNode, useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { addStudent, deleteStudent, editStudent, getStudents } from "../../../Services/Student";
import { Button, ButtonGroup } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";


interface StudentData {
    id: number | undefined;
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    mobileno: string;
    remark:string;
}

interface Student_Record {
    "id": number;
    "Name": string;
    "Mobile": string;
    "Email": string;
    "Address": string;
    "Remark":string;
    "Action": ReactNode;
    [key: string]: ReactNode;

}
const useStudent = () => {

    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<Student_Record[]>([]);
    const [columns, setColumns] = useState<(keyof Student_Record)[]>([
        "Name",
        "Mobile",
        "Email",
        "Address",
        "Remark",
        "Action"
    ]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [studentData, setStudentData] = useState<StudentData | null>(null);

    useEffect(() => {
        fetchStudents();
    }, [])

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await getStudents();
            setLoading(false);
        
            const students = res.data?.data;

            // Check if res.data is an array
            const formattedStudents = Array.isArray(students)
                ? students.map(student => ({
                    id: student.id,
                    Name: `${student.first_name} ${student.last_name}`,
                    Email: student.email,
                    Address: student.address,
                    Mobile: student.mobileno,
                    Remark:student.remark,
                    "Action": <ButtonGroup variant="outlined" aria-label="Basic button group">
                        <Button onClick={() => handleEdit(student)}><EditIcon /></Button>
                        <Button onClick={()=>handleDelete(student)}><DeleteIcon /></Button>

                    </ButtonGroup>
                }))
                : []; // Fallback to an empty array if data is not an array


            setRows(formattedStudents)
        } catch (error) {
            setLoading(false);

        }
    }
    console.log("studentData", studentData);

    const handleEdit = (student: StudentData) => {
        // set edit data to open dialog with prefilled student details
        setStudentData(student);
        setIsDialogOpen(true);
    };

    const handleDelete = (student: StudentData) => {
        // set delete data 
        setStudentData(student);
        setIsDeleteDialogOpen(true);
    };

    const formik = useFormik({
        initialValues: {
            id: studentData?.id || undefined,
            first_name: studentData?.first_name || "",
            last_name: studentData?.last_name || "",
            mobileno: studentData?.mobileno || "",
            email: studentData?.email || "",
            address: studentData?.address || "",
            remark:studentData?.remark || ""
        },
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
            first_name: Yup.string().matches(/^[a-zA-Z]+$/, "Please enter valid first name").required("Please enter first name"),
            last_name: Yup.string().matches(/^[a-zA-Z]+$/, "Please enter valid Last name").required("Please enter Last name"),
            mobileno: Yup.string().matches(/^[6-9]\d{9}$/, "Please enter valid mobile number").required("Please enter mobile number"),
            email: Yup.string().email("Invalid email"),

        }),
        onSubmit: values => {
            studentData ? upateStudent(values) : createStudent(values)
        }

    })

    const createStudent = async (values: StudentData) => {
        try {
            setLoading(true);
            handleCloseDialog();
            const res = await addStudent(values);
            formik.resetForm();
            fetchStudents();
            setLoading(false);
        } catch (error:any) {
            const message = error.response?.data?.error ? error.response?.data?.error : error.message;
            toast.error(message);
            formik.resetForm();
            setLoading(false);
        }
    }

    const upateStudent = async (values: StudentData) => {
        try {
            setLoading(true);
            handleCloseDialog();
            const res = await editStudent(values);
            formik.resetForm();
            fetchStudents();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const removeStudent = async () => {
        try {
            setLoading(true);
            handleCloseDialog();
            const res = await deleteStudent({ id: studentData?.id });
            fetchStudents();
            formik.resetForm();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }


    const handleOpenDialog = () => {
        setStudentData(null); // Clear any edit data when adding a new student
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
        studentData,
        loading,
        isDeleteDialogOpen,
        removeStudent
    }

}

export default useStudent