import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const AdminProtectedRoute=({children})=>{
    const navigate=useNavigate();
    const isAuth=useSelector(state=>state.auth.isAuthenticated)  
    const role=localStorage.getItem("role");
    return (isAuth  && role==="admin") ? children :  navigate("/");
}   

export default AdminProtectedRoute;