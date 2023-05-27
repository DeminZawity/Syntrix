import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Screen, Container, Hover, Spacer } from "../UI/Models";
import { AddIcon } from "../UI/Icons";
import { File } from "../Components/File";
import { GetFolderFiles } from "../API/Files";
import { DeletingFile } from "../API/Files";


export function FilesPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [files, setFiles] = useState([]);
    const FilesInfo = useSelector((state) => state.CurrentWorkingFile)
    const FolderInfo = useSelector((state) => state.CurrentWorkingFolder)

    const GetFiles = async () => {
        let FilesData = await GetFolderFiles(FolderInfo.FolderId);
        setFiles(FilesData)
        console.log(FilesData)
    }

    const UpdateFileInfo = (obj) => {
        dispatch({type : "SET_FILE", payload : {FileId: obj.id, FileName: obj.name, FileFolderId: obj.folderId, FileCodeType: obj.codeType, FileDescription: obj.description, FileContent: obj.content, FileIsPublic: obj.isPublic}})
    } 


    const DeleteFile = async (Id) => {
        let deletedFile = await DeletingFile(Id);

        if(deletedFile !== false){
            toast.success(`File is deleted!`)
            GetFiles()
        }
    }


    const OpenFile = (obj) => {
        UpdateFileInfo(obj)
        navigate("/FileDetails")
        console.log(obj)
    }


    useEffect(() => {
        GetFiles()
        console.log(FolderInfo)
    },[])


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
                        <Spacer v={40}/>
                        <FolderName>
                            {FolderInfo.FolderName}
                        </FolderName>
                        {/* <Spacer v={75}/> */}
                        <FolderCountHeader justifyStart column>
                            <Spacer v={40}/>
                            Files • {files.length}
                        </FolderCountHeader>
                </FolderCountContainer>
                    <Spacer v={75}/>
                    <AddFolderContainer>
                        <AddFolderButton row centered pointer onClick={() => navigate(`/FileDetails`)}>
                            <AddIcon size={25}/>
                            <Spacer h={5} />
                                Add File
                         </AddFolderButton>
                    </AddFolderContainer>

                </Header>
                <Body row>
                    {
                        files.map((obj) => (
                            <>
                                <File data={obj} onClick={() => OpenFile(obj)}
                                onEditFile={(e) => OpenFile(obj)} onDeleteFile = {(e) => DeleteFile(e.id)}/>
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

const FolderName = styled(Container)`
font-size: 25px;`;