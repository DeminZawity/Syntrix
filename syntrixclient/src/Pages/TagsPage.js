import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect,useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Screen, Container, Hover, Spacer } from "../UI/Models";
import { AddIcon, XIcon } from "../UI/Icons";
import { TagPg } from "../Components/TagPg";
import { AddingTag, DeletingTag, GetUserTags } from "../API/Tags";
import { Input } from "../Components/InputField";
import { HexColorPicker } from "react-colorful";
import { Fade } from "@mui/material";
import { EditingTag } from "../API/Tags";


export function TagsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const colorPickerREF = useRef(null);
    const [tags, setTags] = useState([]);
    const [isUpdating,setIsUpdating] = useState(false)
    const [isAddingNew,setIsAddingNew] = useState(false)

    const [selectedColor, setSelectedColor] = useState("#FFF")
    const [isColorPickerOn, setIsColorPickerOn] = useState(false)

    const [newTagName, setNewTagName] = useState(null)

    const [updatedTagName, setUpdatedTagName] = useState(null)
    const [updatedTagId, setUpdatedTagId] = useState(null)
    const [updatedTagColor, setUpdatedTagColor] = useState(null)


    const UserInfo = useSelector((state) => state.User)

    useEffect(() => {
        GetTags()
    },[])


    useEffect(() => {
      // Add event listener to handle click outside the component
      const handleClickOutside = (event) => {
        if (colorPickerREF.current && !colorPickerREF.current.contains(event.target)) {
          setIsColorPickerOn(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        // Clean up the event listener when the component unmounts
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);



    const GetTags = async () => {
        let TagsData = await GetUserTags(UserInfo.id)
        setTags(TagsData)
        console.log(TagsData)
    }


    const AddTag = async () => {
        let AddingTagData = await AddingTag(UserInfo.id, newTagName, selectedColor)
    
        if(AddingTagData !== false){
            setIsAddingNew(false)
            toast.success(`${newTagName} Tag created!`)
            GetTags()
        }
    }

    const EditTag = (id,name,color) => {
        setIsUpdating(true)
        setUpdatedTagId(id)
        setUpdatedTagName(name)
        setSelectedColor(color)

    }


    const UpdateTag = async () => {
        let EditingTagData = await EditingTag(updatedTagId, updatedTagName,selectedColor)

        if(EditingTagData !== false){
            setIsUpdating(false)
            toast.success(`${EditingTagData.name} Tag updated!`)
            GetTags()
        }
    }


    const DeleteTag = async (Id) => {
        let DeletedTag = await DeletingTag(Id)

        if(DeletedTag !== false){
            toast.success(`Tag is deleted!`)
            GetTags()
        }

    }

    return(
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        
            <Screen row>
                <Spacer h={250}/>
                <TPContainer>
                    <Header row>
                        <TagsCountContainer justifyStart column>
                            <Spacer v={75}/>
                            <TagCountHeader>
                                Tags • {tags.length}
                            </TagCountHeader>
                        </TagsCountContainer>
                        <AddTagContainer alignEnd row>
                            {
                                isAddingNew && (
                                    <NewTagContainer alignEnd justifyEnd row>
                                        <IconContainer row centered pointer onClick={() => setIsAddingNew(false)}>
                                            <XIcon size={32} color={"white"} />
                                        </IconContainer>
                                        <Spacer h={15} />
                                        <ColorPickerContainer centered row>
                                            <ColorPicker pointer color={selectedColor} onClick={() => setIsColorPickerOn(!isColorPickerOn)
                                            }/>
                                            <Spacer h={80}/>
                                            <Fade in={isColorPickerOn} style={{transitionDelay : "150ms"}}>
                                                <HexColorContainer ref={colorPickerREF}>
                                                    <HexColorPicker color={selectedColor} onChange={setSelectedColor}/>
                                                </HexColorContainer>
                                            </Fade>
                                        </ColorPickerContainer>
                                        <Input isSmall onChange={(e) => setNewTagName(e)}/>
                                    </NewTagContainer>
                                )
                            }
                            {
                                isUpdating && (

                                    <NewTagContainer alignEnd justifyEnd row>
                                        <IconContainer row centered pointer onClick={() => setIsUpdating(false)}>
                                            <XIcon size={32} color={"white"} />
                                        </IconContainer>
                                        <Spacer h={15} />
                                        <ColorPickerContainer centered row>
                                            <ColorPicker pointer color={selectedColor} onClick={() => setIsColorPickerOn(!isColorPickerOn)
                                            }/>
                                            <Spacer h={80}/>
                                            <Fade in={isColorPickerOn} style={{transitionDelay : "150ms"}}>
                                                <HexColorContainer ref={colorPickerREF}>
                                                    <HexColorPicker color={selectedColor} onChange={setSelectedColor}/>
                                                </HexColorContainer>
                                            </Fade>
                                        </ColorPickerContainer>
                                        <Input isSmall value={updatedTagName} onChange={(e) => setUpdatedTagName(e)}/>
                                    </NewTagContainer>
                                )
                            }
                        <Spacer v={75}/>

                            {
                                isAddingNew && (
                                    <>
                                        <AddTagButton row centered pointer onClick={() => AddTag()}>
                                            <AddIcon size={30}/>
                                            <Spacer h={5}/>
                                            Create
                                        </AddTagButton>
                                    </>

                                )
                            }
                            {
                                isUpdating && (
                                    <>
                                        <AddTagButton row centered pointer onClick={() => UpdateTag()}>
                                            <AddIcon size={30}/>
                                            <Spacer h={5}/>
                                            Update
                                        </AddTagButton>
                                    </>
                                )
                            }
                            {
                                (isAddingNew === false && isUpdating === false) && (
                                    <>
                                        <AddTagButton row centered pointer  onClick={() => setIsAddingNew(true)}>
                                            <AddIcon size={30}/>
                                            <Spacer h={5}/>
                                            Add Tag
                                        </AddTagButton>
                                    </>
                                )
                            }


                        </AddTagContainer>
                    </Header>
                    <Body row>
                        {
                            tags.map((obj) => (
                                <>
                                    <TagPg data={obj} onEditTag={(e) => EditTag(e.id, e.name, e.color)} onDeleteTag = {(e) => DeleteTag(e.id)}/>
                                </>
                            ))
                        }
                    </Body>
                </TPContainer>
            </Screen>
        
        </>
    );
}

const TPContainer = styled(Container)`
    height: 80vh;
    width: 80vw;
`;

const Header = styled(Container)`
    height: 10vh;
`;


const TagsCountContainer = styled(Container)`
width: 50%;
`;

const AddTagContainer = styled(Container)`

width: 50%;
position:relative;
padding-bottom:10px;
`;

const AddTagButton = styled(Container)`
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

const TagCountHeader = styled(Container)`
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

const NewTagContainer = styled(Container)`
    width:75%;
    height:3vh;
`

const IconContainer = styled(Container)`
margin-bottom:3px;
margin-right:3px;
`


const ColorPickerContainer = styled(Container)`
  height: 40px;
  max-width:55px;
`;

const ColorPicker = styled(Container)`
  min-height: 30px;
  min-width: 30px;
  border-radius: 100%;

  ${({ color }) =>
    color &&
    `
        background-color: ${color};
        border: 1px solid ${color};
    
    `
    }
`;


const HexColorContainer = styled(Container)`
    height: 40px;
    width: 40px;
    border-radius: 100%;
    z-index: 9;
`;