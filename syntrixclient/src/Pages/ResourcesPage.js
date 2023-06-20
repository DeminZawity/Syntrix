import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect,useRef } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { getContrastColor } from "../Utilities/Color";
import { Container, Screen, Hover, Spacer } from "../UI/Models";
import { Input } from "../Components/InputField";
import { Resource } from "../Components/Resource";
import { GetResources, AddingResource, EditingResource, DeletingResource, GetResourceDetail } from "../API/Resources";
import { XIcon, AddIcon } from "../UI/Icons";
import  Fade  from "@mui/material/Fade";
import { convertToEmbeddedLink } from "../Utilities/YoutubeLink";

export function ResouresPage() {
    const videoRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [resources, setResources] = useState([]);
    const [newResourceName, setNewResourceName] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isModalOn, setIsModalOn] = useState(false)
    const [selectedResource,setSelectedResource] = useState(null)

    const [isEditing, setIsEditing] = useState(false);
    const [updatedResourceName, setUpdatedResourceName] = useState("");
    const [updatedResourceDescription, setUpdatedResourceDescription] = useState("");
    const [updatedResourceLink, setUpdatedResourceLink] = useState("");


    const ColorInfo = useSelector((state) => state.UserColor)
    const UserInfo = useSelector((state) => state.User)


    const GetResourceData = async () => {
        let ResourceData = await GetResourceDetail(selectedResource.ResourceId)
        // console.log(ResourceData)
        if(ResourceData != false){
            // console.log(ResourceData)
            setUpdatedResourceName(ResourceData.name);
            setUpdatedResourceDescription(ResourceData.description)
            setUpdatedResourceLink(ResourceData.link)
        }
    }




    const OpenResource = (obj) => {
        setSelectedResource(obj)
        // console.log(obj)
        setUpdatedResourceName(obj.name);
        setUpdatedResourceDescription(obj.description)
        setUpdatedResourceLink(obj.link)
        // UpdateResourceInfo(obj)
        // setCurrentResource(obj)
        setIsModalOn(true)
    }

    const GetUserResources = async () => {
        let ResourcesData = await GetResources(UserInfo.id);
        setResources(ResourcesData)
        // console.log(ResourcesData)
    }

    const AddResource = async () => {

        const ResourceObject = {
            UserId : UserInfo.id,
            Name : newResourceName,
            Description: "",
            Link:""
        }


        let AddingResourceData = await AddingResource(ResourceObject);


        if(AddingResourceData !== false){
            setIsAddingNew(false)
            toast.success(`${newResourceName} resource created!`)
            GetUserResources()
        }
    }

    const DeleteResource = async (Id) => {
        let deletedResource = await DeletingResource(Id);

        if(deletedResource !== false){
            toast.success(`Resource is deleted!`)
            GetUserResources()
        }
    }

    const saveChanges = async () => {

        let SaveReource = await EditingResource(selectedResource.id, updatedResourceName, updatedResourceDescription, updatedResourceLink)

        if(SaveReource != false){
            setIsModalOn(false)
            setIsEditing(false)
            GetUserResources()
            toast.success("Resource Saved Successfully")
        }
    }


    const ClosingModal = () => {
        setIsModalOn(false)
        setTimeout(() => {
            setIsEditing(false)
            setSelectedResource(null)
            setUpdatedResourceName("");
            setUpdatedResourceDescription("")
            setUpdatedResourceLink("")
        },500)

    }

    useEffect(() => {
        GetUserResources()
        // GetResourceData()
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
                <Fade in={isModalOn} style={{transitionDelay:"140ms"}}>
                    <ModalContainer>
                        <ATContainer column>
                            {
                                isEditing ? (
                                <>
                                
                                <MHeader>
                                    <IconWrapper justifyEnd pointer>
                                        <XIcon size={40} onClick={() => ClosingModal()}/>
                                    </IconWrapper>
                                    <MLabel alignEnd>Title</MLabel>
                                    <MLinkInput value={updatedResourceName} onChange={(e) => setUpdatedResourceName(e.target.value)}/>
                                </MHeader>
                                    <Spacer v={60}/>
                                <MBody>
                                    <MBDescription>
                                        <MBLabel alignEnd>Description</MBLabel>
                                        <MDInput value={updatedResourceDescription} onChange={(e) => setUpdatedResourceDescription(e.target.value)}/>
                                    </MBDescription>
                                    <Spacer v={50}/>
                                    <MBLink>
                                        <MBLabel alignEnd>Link</MBLabel>
                                    <MLinkInput value={updatedResourceLink} onChange={(e) => setUpdatedResourceLink(e.target.value)}/>
                                    </MBLink>
                                </MBody>
                                <MSaveContainer alignEnd>
                                            <MSaveButton centered pointer onClick={() => saveChanges()} textColor={getContrastColor(ColorInfo)} color={ColorInfo}>Save Changes</MSaveButton>
                                </MSaveContainer>
                                    
                                </>
                                ) : (
                                <>
                                
                                <MHeader >
                                    <IconWrapper justifyEnd pointer>
                                        <XIcon size={40} onClick={() => setIsModalOn(false)}/>
                                    </IconWrapper>
                                    <Spacer v={15} />
                                    <MLabel alignEnd>Title</MLabel>
                                    <MDescription>{updatedResourceName}</MDescription>
                                </MHeader>
                                    <Spacer v={70}/>
                                <MBody >
                                    <MBDescription>
                                        <MBLabel alignEnd>Description</MBLabel>
                                        <MDText>{updatedResourceDescription}</MDText>
                                    </MBDescription>
                                    <Spacer v={50}/>
                                    <MBLink>
                                        <MBLabel alignEnd>Link</MBLabel>
                                        <MLText>{updatedResourceLink}</MLText>
                                    </MBLink>
                                    <Spacer v={50}/>
                                    {
                                        (updatedResourceLink.includes("youtube") && selectedResource != null) && (
                                            <Container>
                                                <iframe width="560" title="ResourceThumbnail" height="315" src={convertToEmbeddedLink(updatedResourceLink)} frameborder="0" allowfullscreen class="youtubeiframe" ref={videoRef}></iframe>
                                            </Container>
                                        )
                                    }
                                </MBody>
                                <MSaveContainer alignEnd>
                                            <MSaveButton centered onClick={() => setIsEditing(true)} textColor={getContrastColor(ColorInfo)} color={ColorInfo}>Edit</MSaveButton>
                                </MSaveContainer>

                                </>
                                )
                            }
                            

                        </ATContainer>
                    </ModalContainer>
                </Fade>
                <Header row>
                    <FolderCountContainer justifyStart column>
                        <Spacer v={40}/>
                        <FolderCountHeader justifyStart column>
                            <Spacer v={40}/>
                            Resources • {resources.length}
                        </FolderCountHeader>
                    </FolderCountContainer>
                        <Spacer v={75}/>
                        <AddFolderContainer alignEnd row>
                            {
                                isAddingNew && (
                                    <NewFolderContainer alignEnd justifyEnd row>
                                        <IconContainer row centered pointer onClick={() => setIsAddingNew(false)}>
                                            <XIcon size={32} color={"white"} />

                                        </IconContainer>
                                        <Input isSmall onChange={(e) => setNewResourceName(e)} />
                                    </NewFolderContainer>
                                )
                            }

                            {
                                isAddingNew && (
                                    <>
                                        <AddFolderButton row centered pointer textColor={getContrastColor(ColorInfo)} color={ColorInfo} onClick={() => AddResource()}>
                                            <Spacer h={5} />
                                                Create Resource
                                        </AddFolderButton>
                                    </>
                                )
                            }

                            {
                                (isAddingNew === false) && (
                                    <>
                                        <AddFolderButton row centered pointer textColor={getContrastColor(ColorInfo)} color={ColorInfo} onClick={() => setIsAddingNew(true)}>
                                            <AddIcon size={25}/>
                                            <Spacer h={5} />
                                                Add Resource
                                        </AddFolderButton>                         
                                    </>
                                )
                            }
                        </AddFolderContainer>
                </Header>
                <Body row>
                    {
                        resources.map((obj) => (
                            <>
                                <Resource data={obj} onClick={() => OpenResource(obj)}  onDeleteResource = {(e) => DeleteResource(e.id)}/>
                            </>
                        ))
                    }
                </Body>
            </DirectoryContainer>
        </Screen>
        </>
    );

}

const IconWrapper = styled(Container)`
    width: 100%;
`;

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
    position: relative;
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
margin-top: 23px;
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

const FolderName = styled(Container)`
font-size: 25px;`;

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
    background-color: #1E1E1E;
    border-radius: 5px;
    padding: 20px;
`;

const ATContainer = styled(Container)`
    height: 100%;
    width: 100%;
`;

const ATHeader = styled(Container)`
    padding-top: 20px;
    font-size: 35px;
`;

const MHeader = styled(Container)`
   /* min-height: 15%; */
`;

const MLabel = styled(Container)`

    font-size: 22px;
    color: #9E9E9E;
`;

const MDescription = styled.p`
    font-size: 30px;
    padding-top: 2px;
`;

const MBody = styled(Container)`
    /* height: 60%; */
`;

const MBDescription = styled(Container)`
    min-height: 10%;
`;

const MBLink = styled(Container)`
    /* height: 20%; */
`;

const MBLabel = styled(Container)`
    font-size: 22px;
    color: #9E9E9E;
    padding-bottom: 15px;
`;


const MDText = styled(Container)`
    font-size: 15px;
    font-family:"Gilroy";
    min-height: 80%;
    width: 98%;
`;

const MDInput = styled.textarea`
    border:1px solid #131313;
    border-radius:4px;
    text-indent: 2em;
    outline:none;
    background-color: #333333;
    color: white;
    display: flex;
    flex-wrap: wrap;
    font-size: 15px;
    font-family:"Gilroy";
    min-height: 80%;
    width: 98%;
    padding: 10px;
`;

const MLinkInput = styled.input`
    height: 40px;
    width: 98%;
    margin-top: 10px;
    background-color: #333333;
    font-family:"Gilroy";
    outline:none;
    border:none;
    color: white;
    padding: 10px;
`;

const MLText = styled(Container)`
    min-height: 40px;
    width: 98%;
`;

const MSaveContainer = styled(Container)`
    height: 70%;
`;

const MSaveButton = styled(Container)`
    height: 60px;
    width: 99%;
    transition: background-color 0.5s ease, color 0.5s ease, transform 0.5s ease;
    font-size: 20px;
    user-select: none;

&:hover {
    transform: scale(1.03);
  }


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

const MTitleInput = styled.input``;