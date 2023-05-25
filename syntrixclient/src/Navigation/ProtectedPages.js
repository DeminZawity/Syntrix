import { Route, Routes } from "react-router-dom";
import { DirectoryPage } from "../Pages/DirectoryPage";

export function ProtectedPages () {

    return(
        <Routes>
            <Route path="/Directory" element={<DirectoryPage/>}/>
        </Routes>
    );
}