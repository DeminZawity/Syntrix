import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = (props) => {
    const IsAuthenticated = useSelector((state) => state.IsAuthenticated);


    if(IsAuthenticated === true) {
        return props.children
    } else {
        return <Navigate to="/Home" replace/>
    }
};

export default Protected;