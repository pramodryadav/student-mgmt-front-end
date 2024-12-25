import { ReactNode } from "react";
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';

interface Course {
    name: string,
    path: string,
    icon: ReactNode
}
export const MENUS: Course[] = [
    {
        name: "Students",
        path: "/students",
        icon: <GroupsRoundedIcon/>
    }
    ,
    {
        name: "Courses",
        path: "/courses",
        icon: <MenuBookRoundedIcon/>
    },
    {
        name: "Enrollments",
        path: "/enrollments",
        icon: <SubscriptionsRoundedIcon/>
    },
    {
        name: "Payments",
        path: "/payments",
        icon: <PaymentsRoundedIcon/>
    }
]