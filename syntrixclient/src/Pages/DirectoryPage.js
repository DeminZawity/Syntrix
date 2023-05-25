import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Screen, Container, Hover, Spacer } from "../UI/Models";
import { AddIcon } from "../UI/Icons";
import { Folder } from "../Components/Folder";
import { useDispatch } from "react-redux";
import { GetUserFolders } from "../API/Authentication";

export function DirectoryPage() {
    const [folders, setFolders] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const UserInfo = useSelector((state) => state.User)

    useEffect(() => {
        GetFolders()
    },[])

    const GetFolders = async () => {
        let FolderData = await GetUserFolders(UserInfo.id);
        setFolders(FolderData);
        console.log(FolderData)
    }


    return(
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
                    <AddFolderContainer alignEnd column>
                        <Spacer v={75}/>
                        <AddFolderButton row centered pointer>
                            <AddIcon size={30}/>
                            <Spacer h={5}/>
                            Add Folder
                        </AddFolderButton>
                    </AddFolderContainer>
                </Header>
                <Body row>
                {
                   folders.map((obj) => (
                    <>
                        <Folder data={obj}/>
                        <Spacer h={30}/>
                    </>
                   ))     

                }


                </Body>
            </DirectoryContainer>
        </Screen>
    );

}


const DirectoryContainer = styled(Container)`
height: 80vh;
width: 80vw;
`;

const Header = styled(Container)`
height: 10vh;
`;

const Body = styled(Container)`
height: 70vh;
padding-top: 40px;

`;

const FolderCountContainer = styled(Container)`
width: 50%;
`;

const AddFolderContainer = styled(Container)`
width: 50%;
`;

const FolderCountHeader = styled(Container)`
height: 4vh;
width: 10vw;
color: #8D8D8D;
font-size: 18px;
`;

const AddFolderButton = styled(Container)`
height: 5vh;
width: 8vw;
font-size: 20px;
background-color: #0487FF;
border: 1px solid #0487FF;
border-radius: 5px;
transition: background-color 0.5s ease, color 0.5s ease, transform 0.5s ease;

&:hover {
    transform: scale(1.1);
  }
`;