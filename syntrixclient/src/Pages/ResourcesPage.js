import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { getContrastColor } from "../Utilities/Color";
import { Container, Screen, Hover, Spacer } from "../UI/Models";
import { Input } from "../Components/InputField";
import { Resource } from "../Components/Resource";
import { GetResources, AddingResource, EditingResource, DeletingResource } from "../API/Resources";
import { XIcon, AddIcon } from "../UI/Icons";


export function ResouresPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [resources, setResources] = useState([]);
    const [newResourceName, setNewResourceName] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const ColorInfo = useSelector((state) => state.UserColor)
    const UserInfo = useSelector((state) => state.User)

    const UpdateResourceInfo = (obj) => {
        dispatch({type : "SET_RESOURCE", payload : {ResourceId: obj.id, ResourceUserId: obj.userId, ResourceName: obj.name, ResourceDescription: obj.description, ResourceLink: obj.link}})
    } 

    const OpenResource = (obj) => {
        UpdateResourceInfo(obj)
        navigate("/ResourceDetails")
    }

    const GetUserResources = async () => {
        let ResourcesData = await GetResources(UserInfo.id);
        setResources(ResourcesData)
        console.log(ResourcesData)
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

    useEffect(() => {
        GetUserResources()
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