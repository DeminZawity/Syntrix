import { Route, Routes } from "react-router-dom";
import { DirectoryPage } from "../Pages/DirectoryPage";
import { FilesPage } from "../Pages/FilesPage";
import { FileDetailsPage } from "../Pages/FileDetailsPage";
import { TagsPage } from "../Pages/TagsPage";
import { ProfilePage } from "../Pages/ProfilePage";
import { BookmarksPage } from "../Pages/BookmarksPage";
import { ResouresPage } from "../Pages/ResourcesPage";
import { CommunityPage } from "../Pages/CommunityPage";
import { CommunityFileDetailsPage } from "../Pages/CommunityFileDetailsPage";

export function ProtectedPages () {

    return(
        <Routes>
            <Route path="/Directory" element={<DirectoryPage/>}/>
            <Route path="/FilesPage" element={<FilesPage/>}/>
            <Route path="/FileDetails" element={<FileDetailsPage/>}/>
            <Route path="/CommunityFileDetails" element={<CommunityFileDetailsPage/>}/>
            <Route path="/Tags" element={<TagsPage/>}/>
            <Route path="/Profile" element={<ProfilePage/>}/>
            <Route path="/Bookmarks" element={<BookmarksPage/>}/>
            <Route path="/Resources" element={<ResouresPage/>}/>
            <Route path="/Community" element={<CommunityPage/>}/>
        </Routes>
    );
}