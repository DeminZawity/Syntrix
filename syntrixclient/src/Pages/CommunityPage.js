import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CommunityFile } from "../Components/CommunityFile"
import { Input } from "../Components/InputField";
import { getContrastColor } from "../Utilities/Color";
import { Screen, Hover, Spacer, Container } from "../UI/Models";
import { SearchIcon } from "../UI/Icons";
import { GetAllPublicFiles, SearchPublicFiles } from "../API/Community";


export function CommunityPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const UserInfo = useSelector((state) => state.User)
    const ColorInfo = useSelector((state) => state.UserColor)

    const [publicFiles, setPublicFiles] = useState([])
    const [name, setName] = useState("")


    const UpdateFileInfo = (obj) => {
        dispatch({type : "SET_FILE", payload : {FileId: obj.id, FileName: obj.name, FileFolderId: obj.folderId, FileCodeType: obj.codeType, FileDescription: obj.description, FileContent: obj.content, FileIsPublic: obj.isPublic}})
    } 


    const OpenFile = (obj) => {
        UpdateFileInfo(obj)
        navigate("/CommunityFileDetails")
    }





    const GetPublicFiles = async () => {
        let PublicFilesData = await GetAllPublicFiles();
        setPublicFiles(PublicFilesData)
        console.log(PublicFilesData)
    }

    const GetSearchedFiles = async (obj) => {
        if(obj === ""){
            let PublicFilesData = await GetAllPublicFiles();
            setPublicFiles(PublicFilesData)
        } else {
            let SearchedFiles = await SearchPublicFiles(obj)
            setPublicFiles(SearchedFiles)
        }
    }

    useEffect(() => {
        GetPublicFiles()
    },[])

    return(
        <Screen row>
            <Spacer h={250}/>
            <CommunityContainer>

                <CHeader row>
                    <SearchContainer centered>
                        <SearchInput onChange={(e) => setName(e.target.value)} placeholder="Find Code Snippets in your Community"/>
                    </SearchContainer>
                    <SIconContainer centered pointer onClick={() => GetSearchedFiles(name)}>
                        <SIcon centered textColor={getContrastColor(ColorInfo)} color={ColorInfo}>
                            <SearchIcon size={25}/>
                        </SIcon>
                    </SIconContainer>
                </CHeader>

                <CBody>
                    <SubHeader>
                        <SubText>Community Files • </SubText>
                    </SubHeader>
                    <PublicFilesContainer row>
                        {
                            publicFiles.map((obj) => (
                                <>
                                    <CommunityFile data={obj} onClick={() => OpenFile(obj)}/>
                                </>
                            ))
                            
                        }
                    </PublicFilesContainer>
                </CBody>

            </CommunityContainer>
        </Screen>
    );
}

const CommunityContainer = styled(Container)`
    height: 80vh;
    width: 80vw;
`;

const CHeader = styled(Container)`
    height: 8%;;
`;

const SearchContainer = styled(Container)`
    width: 50%;
`;
const SIconContainer = styled(Container)`
    width: 5%;
`;
const SearchInput = styled.input`
    width: 100%;
    height: 50%;
    background-color: #333333;
    outline:none;
    border:none;
    color: white;
    font-family:"Gilroy";
    font-size: 22px;
    border-radius: 3px;
    padding-left: 10px;
    padding-right: 10px;
`;

const SIcon = styled(Container)`
    border: 1px solid green;
    height: 50%;
    width: 50%;
    border-radius: 3px;

    ${({ color }) =>
    color &&
    `
        background-color: ${color};
        border: 1px solid ${color};
    
    `
    }

 ${({ textColor }) =>
    textColor &&
    `
    color : ${textColor};
    `
    }
`;

const CBody = styled(Container)`
    height: 92%;
`;
const SubHeader = styled(Container)`
    height: 5%;
`;

const SubText = styled.p`
color: #8D8D8D;
font-size: 18px;
`;

const PublicFilesContainer = styled(Container)`
flex-wrap:wrap;
column-gap: 10px;
row-gap: -40px !important;

`;