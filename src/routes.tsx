import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/Error';

import ProtecteRoutes from './ProtectRoutes';
import Login from './pages/Login';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Enrollments from './pages/Enrollments';
import Payments from './pages/Payments';
import PaymentDetail from './pages/Payments/components/PaymentDetail';

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtecteRoutes />,
        errorElement: <ErrorPage />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    { index: true, element: <Students /> },
                    {
                        path: "students",
                        element: <Students/>
                    },
                    {
                        path: "courses",
                        element: <Courses/>
                    },
                    {
                        path: "enrollments",
                        element: <Enrollments/>
                    },
                  
                    {
                        path: "payments",
                        element: <Payments/>
                    },
                    
                    /* the rest of the routes */
                ],
            },
        ],
    },
    
    {
        path:"/login",
        element:<Login/>,
        errorElement: <ErrorPage />
    },
    {
        path:"*",
        element:<PageNotFound/>,
        errorElement: <ErrorPage />
    }
]);

export default function Router() {
    return <RouterProvider router={router} />
}