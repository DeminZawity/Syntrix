import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getContrastColor } from "../Utilities/Color";
import { Container, Screen, Hover, Spacer } from "../UI/Models";
import { GetUserBookmarks, DeletingBookmark } from "../API/Bookmarks";
import { Bookmark } from "../Components/Bookmark";


export function BookmarksPage() {
    const UserInfo = useSelector((state) => state.User)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [bookmarks, setBookamrks] = useState([])


    const GetBookmarks = async () => {
        let BookmarkData = await GetUserBookmarks(UserInfo.id);
        setBookamrks(BookmarkData);
        console.log(BookmarkData)
    }

    const DeleteBookmark = async (Id) => {
        let DeletedBookmark = await DeletingBookmark(Id);

        if(DeletedBookmark !== false){
            toast.success(`Bookmark is deleted!`)
            GetBookmarks()
        }
    }

    const UpdateFolderInfo = (obj) => {
        dispatch({type : "SET_FOLDER", payload : {FolderId: obj.folderId, FolderName: obj.folderName}})
    } 


    const OpenFolder = (obj) => {
        UpdateFolderInfo(obj)
        navigate("/FilesPage")
        // console.log(obj)

    } 



    useEffect(() => {
        GetBookmarks()
    },[])


    return(
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />    
            <Screen row>
            <Spacer h={250}/>
            <BookmarkContainer>
                <Header row>
                    <BookmarkCountContainer justifyStart column>
                        <Spacer v={75}/>
                        <BookmarkCountHeader justifyStart column>
                            <Spacer v={20}/>
                            Bookmarks • {bookmarks.length}
                        </BookmarkCountHeader>
                    </BookmarkCountContainer>
                </Header>
                <Body row>
                    {
                        bookmarks.map((obj) => (
                            <>
                                <Bookmark data={obj} onClick={() => OpenFolder(obj)} onDeleteBookmark = {(e) => DeleteBookmark(e.id)}/>
                            </>
                        ))
                    }
                </Body>
            </BookmarkContainer>
            </Screen>
        </>
    );
}

const BookmarkContainer = styled(Container)`
height: 80vh;
width: 80vw;
`;

const Header = styled(Container)`
height: 10vh;
`;

const BookmarkCountContainer = styled(Container)`
width: 50%;
`;

const BookmarkCountHeader = styled(Container)`
height: 4vh;
width: 10vw;
color: #8D8D8D;
font-size: 18px;
`;

const Body = styled(Container)`
padding-top: 40px;
flex-wrap:wrap;
column-gap: 10px;
row-gap: -40px !important;

`;