import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Screen, Container, Hover, Spacer } from "../UI/Models";
import { AddIcon, BackIcon, XIcon,EditIcon } from "../UI/Icons"
import CodeEditor from "../Components/CodeEditor";
import { DeleteIcon } from "../UI/Icons";
import { Tag } from "../Components/Tag";
import  Fade  from "@mui/material/Fade";
import { Checkbox } from "../Components/Checkbox";
import { GetUserTags } from "../API/Tags";
import {AddTagToFile,GetFileTags,DeleteFileTag} from "../API/Tags"
import { ExistingTag } from "../Components/ExistingTag";
import { GetFolderFiles, GetFileDetail, EditingFile } from "../API/Files";
import Dropdown from "../Components/Dropdown";
import { getContrastColor } from "../Utilities/Color";
import { ExistingCommunityTag } from "../Components/ExistingCommunityTag";



export function CommunityFileDetailsPage() {
    const GetCurrentFile = useSelector((state) => state.CurrentWorkingFile)
    const GetCurrentFolder = useSelector((state) => state.CurrentWorkingFolder)
    const UserInfo = useSelector((state) => state.User)
    const ColorInfo = useSelector((state) => state.UserColor)
    const [tags, setTags] = useState(null)
    const [fileTags,setFileTags] = useState([])
    const [fileName,setFileName] = useState("")
    const [code,setCode] = useState(null)
    const [description,setDescription] = useState(null)
    const [codeType,setCodeType] = useState(null)
    const [isEditingName,setIsEditingName] = useState(false)
    const navigate = useNavigate();


    const GetFileData = async () => {
        let FileData = await GetFileDetail(GetCurrentFile.FileId)
        // console.log(FileData)
        if(FileData != false){
            // console.log(FileData)
            setFileName(FileData.name);
            setCode(FileData.content)
            setDescription(FileData.description)

            setCodeType(FileData.codeType)
        }
    }



    const GetTags = async () => {
        let TagsData = await GetUserTags(UserInfo.id)
        let FormattedTags = TagsData.map(obj => ({...obj, isSelected : false}))

        let UserFileTag = await GetFileTags(GetCurrentFile.FileId)
        setFileTags(UserFileTag)

        var existingTags = UserFileTag.map((obj) => obj.tagId)

        var tagsWithoutExisting = FormattedTags.filter((obj) => !existingTags.includes(obj.id))

        setTags(tagsWithoutExisting)
    }




    useEffect(() => {
        GetTags()
        GetFileData()
    },[])

    return(
        <>
        <Screen row>
        <Spacer h={200}/>

            <FDContainer>
                <Header row >
                    <IconContainer centered pointer>
                        <BackIcon size={30} onClick={() => navigate(`/Community`)}/>
                    </IconContainer>
                    <Title row justifyStart alignCenter>
                        <FileName>{fileName}</FileName>
                    </Title>
                </Header>
                <Body row >
                    <CodeContainer column>
                        <CCHeader>
                            <Spacer v={10}/>
                            Code Snippet
                        </CCHeader>
                        <CCBlock>
                            <BLOCK>
                                {
                                    (code != null || code != undefined) && (
                                        <CodeEditor disabled={false} onChange={(e) => setCode(e)} content={code} type={codeType}/>
                                    )
                                }
                            </BLOCK>
                        </CCBlock>
                    </CodeContainer>
                    <DetailsContainer column  >
                        <Spacer v={30}/>
                        <DecriptionContainer column>
                            <DHeader>Description</DHeader>
                            <Spacer v={10}/>
                            <DTextContainer centered>
                                <DText>{description}</DText>
                            </DTextContainer>
                        </DecriptionContainer>
                        <Spacer v={20}/>
                        <DecriptionContainer column>
                            <DHeader>Code Type</DHeader>
                            <Spacer v={10}/>
                            <DTextContainer centered>
                                <DText>{codeType}</DText>
                            </DTextContainer>
                        </DecriptionContainer>
                        <Spacer v={20}/>
                        <TagsContainer  >
                            <THeader justifyStart>Tags</THeader>
                            <TInput   column>
                                <TagsComp row alignCenter>
                                    
                                    {fileTags != null  && fileTags.map((obj) => (
                                        <ExistingCommunityTag data={obj}/>
                                    ))}
                                </TagsComp>
                                <Spacer v={40}/>
            
                            </TInput>
                        </TagsContainer>
                    </DetailsContainer>
                </Body>

            </FDContainer>

        </Screen>
        </>
    )
}


const FileNameInput = styled.input`
    height:90%;
    border-radius:4px;
    background:transparent;
    font-family:"Gilroy";
    font-size:22px;
    color:white;
    outline:none;
    border:none;
    min-width:55px;
    width: ${(props) => props.inputWidth}px;
    
    ${({ isEditing }) =>
    isEditing &&
    `
    background-color: #333333;
    
    `
    }
`

const DText = styled.p`
    color: white;
    display: flex;
    flex-wrap: wrap;
    font-size: 15px;
    font-family:"Gilroy";
    width: 90%;
`;

const DTextContainer = styled(Container)`
    margin-left: 20px;
    background-color: #333333;
    display: flex;
    flex-wrap: wrap;
`;

const FileName = styled.p`
    font-size:22px;
    color:white;
`;

const EditIconContainer = styled(Container)`
    height:100%;
    width:60px;
`

const Header = styled(Container)`
    height: 5%;
`;
const IconContainer = styled(Container)`
    width: 3%;
`;
const Title = styled(Container)`
    font-size: 25px;
    width:60%;
`;
const CodeContainer = styled(Container)`
    height: 99%;
    width: 70%;
`;

const DetailsContainer = styled(Container)`
    /* height: 99%; */
    width: 30%;
`;
const Body = styled(Container)`
    height: 95%;
    width: 100%;
`;
const FDContainer = styled(Container)`
    height: 85vh;
    width: 85vw;
    position: relative;
`;

const CCHeader = styled(Container)`
    height: 3%;
    width: 95%;
    color: #8D8D8D;
    padding-left: 70px;
`;
const CCBlock = styled(Container)`
    height: 90%;
    width: 95%;
    padding-left: 70px;
`;

const BLOCK= styled(Container)`
    height:100%;
`;

const DecriptionContainer= styled(Container)`
    /* height: 40%; */
    width: 100%;
`;

const CodeTypeContainer= styled(Container)`
    height: 10%;
    width: 100%;
        padding-left: 20px;
`;

const VisabilityContainer= styled(Container)`
    height: 10%;
    width: 100%;
`;

const TagsContainer= styled(Container)`
    height: 30%;
    width: 100%;
`;
const SaveButtonContainer= styled(Container)`
    height: 10%;
    width: 100%;
    padding-left: 20px;
`;

const DHeader= styled(Container)`
    height: 30px;
    font-size: 22px;
    margin-left: 20px;
`;

const DInput= styled.textarea`
    margin-left: 20px;
    margin-right: 20px;
    height: 85%;
    border:1px solid #131313;
    border-radius:4px;
    padding-top:10px;
    padding-left:5px;
    text-indent: 2em;
    outline:none;
    background-color: #333333;
    color: white;
    display: flex;
    flex-wrap: wrap;
    font-size: 15px;
    font-family:"Gilroy";
`;

const CTHeader= styled(Container)`
    height: 28%;
    font-size: 22px;
`;

const CTInput= styled.textarea`
    margin-left: 20px;
    margin-right: 20px;
    width: 94%;
    background-color: #333333;
    height: 40%;
    font-family:"Gilroy";
    font-size:14px;
    color:white;
`;

const VHeader= styled(Container)`
    height: 28%;
    font-size: 22px;
    padding-left: 20px;
`;

const VInput= styled(Container)`
`;


const THeader= styled(Container)`
    height: 10%;
    font-size: 22px;
    padding-left: 20px;
`;

const TInput= styled(Container)`
    height: 90%;
    padding-left: 20px;
    padding-top: 20px;
    padding-right: 20px;
`;

const VIDetail= styled(Container)`

    height: 70px;
    width: 50%;
`;

const VIText= styled(Container)`
    padding-top: 25px;
    padding-left: 10px;
    width: 50%;
    font-size: 18px;
`;

const VIInput= styled.input`
    width: 25px;
    margin-left: 30px;
`;

const TagsComp = styled(Container)`
    flex-wrap: wrap;
`;

const Tg = styled(Container)`
    border: 2px solid #1A5AFD;
    background-color: #2A63F5;
    border-radius: 3px;
    height: 30px;
    margin-top: 15px;
    padding-left: 25px;
    padding-right: 25px;

`;
const TgTrash = styled(Container)`
    border: 2px solid #1A5AFD;
    background-color: #2A63F5;
    border-radius: 3px;
    height: 30px;
    width: 40px;
    margin-top: 15px;
`;

const AddTag = styled(Container)`
    height: 30px;
    width: 30px;
    font-size: 17px;
    border-radius: 3px;
    margin-bottom:-15px;

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

const SaveButton = styled(Container)`
    border: 1px solid #0487FF;
    background-color: #0487FF;
    border-radius: 3px;
    height: 50px;
    font-size: 20px;
    margin-right: 40px;

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

const ATContainer = styled(Container)`
    height: 100%;
    width: 100%;
`;

const ATHeader = styled(Container)`
    padding-top: 20px;
    font-size: 35px;
`;

const ATSubHeader = styled(Container)`
    font-size: 20px;
    padding-top: 20px;
    padding-left: 15px;
`;

const ATBody = styled(Container)`
    height: 80%;

`;

const ATCheckbox = styled.input`
    height: 20px;
`;

const ATName = styled(Container)`
    margin-left: 15px;
    font-size: 17px;
`;

const ModalContainer = styled(Container)`
    position: absolute;
    top: 0;
    left: 35%;
    width: 550px;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    background-color: #131313;
    border: 2px solid #131313;
`;

const ATDetail = styled(Container)`
    height: 40px;
    flex-wrap:wrap;  
`;

const ATFooter = styled(Container)`
    height: 10%;
`;

const SaveTagsButton = styled(Container)`
    border: 1px solid #0487FF;
    height: 60px;
    width: 400px;
    font-size: 20px;
    border-radius: 3px;
    background-color: #0487FF;

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
