export const CONFIG = {
    baseURL:"http://localhost:5000/api",
    endpoints:{
        get_students:"/students/get-students",
        add_student:"/students/create-student",
        edit_student:"/students/update-student",
        delete_student:"/students/delete-student",
        get_courses:"/course/get-courses",
        add_course:"/course/create-course",
        edit_course:"/course/update-course",
        delete_course:"/course/delete-course",
        get_enrollments:"/enroll/get-enrollments",
        add_enrollments:"/enroll/create-enrollment",
        edit_enrollments:"/enroll/update-enrollment",
        delete_enrollments:"/enroll/delete-enrollment",
        get_students_ids:"/students/get-students-ids",
        get_payments:"/fee/get-payments",
        get_aggregate_payments:"/fee/get-aggregate-payments",
        get_payment_by_enrollment:"/fee/get-payment-by-enrollment",
        add_payment:"/fee/create-payment",
        edit_payment:"/fee/update-payment",
        delete_payment:"/fee/delete-payment"



    }
}