import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Screen, Container, Hover, Spacer } from "../UI/Models";
import { AddIcon } from "../UI/Icons";
import { Folder } from "../Components/Folder";
import { useDispatch } from "react-redux";
import { GetUserFolders } from "../API/Directory";
import { AddingFolder } from "../API/Directory";
import { EditingFolder } from "../API/Directory";
import { DeletingFolder } from "../API/Directory";
import {Input} from "../Components/InputField"
import toast, { Toaster } from "react-hot-toast";
import { AddingBookmark } from "../API/Bookmarks";
import { DeletingBookmark } from "../API/Bookmarks";
import {XIcon} from "../UI/Icons"


export function DirectoryPage() {
    const [folders, setFolders] = useState([]);

    const [updateFolderName,setUpdateFolderName] = useState(null)
    const [updateFolderID,setUpdateFolderID] = useState(null)
    const [isUpdating,setIsUpdating] = useState(false)
    const [isAddingNew,setIsAddingNew] = useState(false)
    const [newFolderName,setNewFolderName] = useState(null)
    const [bookmarkId, setBookmarkId] = useState(null)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const UserInfo = useSelector((state) => state.User)


    const UpdateFolderInfo = (obj) => {
        dispatch({type : "SET_FOLDER", payload : {FolderId: obj.id, FolderName: obj.name}})
    } 


    const OpenFolder = (obj) => {
        UpdateFolderInfo(obj)
        navigate("/FilesPage")
        console.log(obj)

    } 


    const AddFolder = async () => {
        let AddingFolderData = await AddingFolder(UserInfo.id, newFolderName);


        if(AddingFolderData !== false){
            setIsAddingNew(false)
            toast.success(`${newFolderName} Folder created!`)
            GetFolders()
        }
    }

    const EditFolder = (id,name) => {
        setIsUpdating(true)
        setUpdateFolderID(id)
        setUpdateFolderName(name)
    }

    const UpdateFolder = async () => {
        let UpdateFolderData = await EditingFolder(updateFolderID, updateFolderName);

        if(UpdateFolderData !== false){
            setIsUpdating(false)
            toast.success(`${updateFolderName} Folder updated!`)
            GetFolders()
        }
    }

    const deleteFolder = async (Id) => {
        let deletedFolder = await DeletingFolder(Id);

        if(deletedFolder !== false){
            toast.success(`Folder is deleted!`)
            GetFolders()
        }
    }


    const AddBookmark = async (FolderId) => {
        let AddingBookmarkData = await AddingBookmark(UserInfo.id, FolderId);


        if(AddingBookmarkData !== false){
            GetFolders()
        }
    }

    useEffect(() => {
        GetFolders()
    },[])

    const GetFolders = async () => {
        let FolderData = await GetUserFolders(UserInfo.id);
        setFolders(FolderData);
        console.log(FolderData)
    }




    return(
        <>
                    <Toaster
                position="top-right"
                reverseOrder={false}
            />
        <Screen row>
            <Spacer h={250}/>
            <DirectoryContainer>
                <Header row>
                    <FolderCountContainer justifyStart column>
                        <Spacer v={75}/>
                        <FolderCountHeader justifyStart column>
                            <Spacer v={20}/>
                            Folders • {folders.length}
                        </FolderCountHeader>
                    </FolderCountContainer>
                    <AddFolderContainer alignEnd row>
                        {
                            isAddingNew && (
                                <NewFolderContainer alignEnd justifyEnd row>
                                    <IconContainer row centered pointer onClick={() => setIsAddingNew(false)}>
                                        <XIcon size={32} color={"white"} />

                                    </IconContainer>
                                    <Input isSmall onChange={(e) => setNewFolderName(e)} />
                                </NewFolderContainer>
                            )
                        }
                        {
                            isUpdating && (
                                <NewFolderContainer alignEnd justifyEnd row>
                                    <IconContainer row centered pointer onClick={() => setIsUpdating(false)}>
                                        <XIcon size={32} color={"white"} />
                                    </IconContainer>
                                    <Input isSmall value={updateFolderName} onChange={(e) => setUpdateFolderName(e)} />
                                
                                </NewFolderContainer>
                            )
                        }
                        <Spacer v={75}/>
                        {
                            isAddingNew && (
                                <>
                                <AddFolderButton row centered pointer onClick={() => AddFolder()}>
                                    <AddIcon size={30}/>
                                    <Spacer h={5}/>
                                    Create
                                </AddFolderButton>
                            </>
                            )
                        }
                        {
                            isUpdating && (
                                <>
                                    <AddFolderButton row centered pointer onClick={() => UpdateFolder()}>
                                        <AddIcon size={30}/>
                                        <Spacer h={5}/>
                                        Update
                                    </AddFolderButton>
                                </>
                            )
                        }
                         {
                            (isAddingNew === false && isUpdating === false) && (
                                <>
                                    <AddFolderButton row centered pointer onClick={() => setIsAddingNew(true)}>
                                        <AddIcon size={30}/>
                                        <Spacer h={5}/>
                                        Add Folder
                                    </AddFolderButton>
                                </>
                            )
                        }
                    </AddFolderContainer>
                </Header>
                <Body row>

                {
                   folders.map((obj) => (
                    <>
                        <Folder data={obj} onEditFolder={(e) => EditFolder(e.id,e.name)} onDeleteFolder = {(e) => deleteFolder(e.id)} onBookmarkFolder={(e) => AddBookmark(e.id)} onClick={() => OpenFolder(obj)}/>
                        {/* <Spacer h={30}/> */}
                    </>
                   ))     

                }
                </Body>
            </DirectoryContainer>
        </Screen>
        </>
    );

}

const IconContainer = styled(Container)`
margin-bottom:3px;
margin-right:3px;
`

const NewFolderContainer = styled(Container)`
    width:75%;
    height:3vh;
`

const DirectoryContainer = styled(Container)`
height: 80vh;
width: 80vw;
`;

const Header = styled(Container)`
height: 10vh;
`;

const Body = styled(Container)`
padding-top: 40px;
flex-wrap:wrap;
column-gap: 10px;
row-gap: -40px !important;

`;

const FolderCountContainer = styled(Container)`
width: 50%;
`;

const AddFolderContainer = styled(Container)`

width: 50%;
position:relative;
padding-bottom:10px;
`;

const FolderCountHeader = styled(Container)`
height: 4vh;
width: 10vw;
color: #8D8D8D;
font-size: 18px;
`;

const AddFolderButton = styled(Container)`
height: 3vh;
width: 8vw;
font-size: 16px;
background-color: #0487FF;
border: 1px solid #0487FF;
border-radius: 5px;
transition: background-color 0.5s ease, color 0.5s ease, transform 0.5s ease;
position:absolute;
right:10px;
bottom:10px;

&:hover {
    transform: scale(1.1);
  }
`;