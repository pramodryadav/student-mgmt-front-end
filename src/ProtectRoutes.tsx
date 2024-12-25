import { Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function ProtectedRoutes() {
    let token = localStorage.getItem("token");
    return !token ? <Sidebar /> : <Navigate to="/login" replace />
}