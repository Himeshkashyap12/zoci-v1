import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ProtectedRoute=({children})=>{
    const navigate=useNavigate();
    const isAuth=useSelector(state=>state.auth.isAuthenticated)  
    const role=localStorage.getItem("role")
    return ( isAuth && role==="user" )? children :  navigate("/")
}   

export default ProtectedRoute;