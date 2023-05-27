import { Route, Routes } from "react-router-dom";
import { DirectoryPage } from "../Pages/DirectoryPage";
import { FilesPage } from "../Pages/FilesPage";
import { FileDetailsPage } from "../Pages/FileDetailsPage";

export function ProtectedPages () {

    return(
        <Routes>
            <Route path="/Directory" element={<DirectoryPage/>}/>
            <Route path="/FilesPage" element={<FilesPage/>}/>
            <Route path="/FileDetails" element={<FileDetailsPage/>}/>
        </Routes>
    );
}