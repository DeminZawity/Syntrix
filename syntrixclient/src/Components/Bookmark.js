import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Container, Spacer } from "../UI/Models";
import { FolderIcon, OptionsIcon, DeleteIcon } from "../UI/Icons";
import { useRef } from "react";


export function Bookmark (props) {
    const [options, setOption] = useState(false)
    const bookmarkRef = useRef(null);
    const ColorInfo = useSelector((state) => state.UserColor)

    useEffect(() => {
        // Add event listener to handle click outside the component
        const handleClickOutside = (event) => {
          if (bookmarkRef.current && !bookmarkRef.current.contains(event.target)) {
            setOption(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          // Clean up the event listener when the component unmounts
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
  
  
      const handleClick = (e) => {
          e.stopPropagation();
          setOption(true)
      }



      return(
        <BookmarkContainer row pointer onClick={() => props.onClick()}>
            <CardHeader centered>
                <FolderIcon size={40} color={ColorInfo}/>
            </CardHeader>
            <CardBody column centered>
                <BodyHeader justifyStart>{props.data.folderName}</BodyHeader>
                <Spacer v={10}/>
                <BodyFooter justifyStart>{props.data.fileCount} Files</BodyFooter>
            </CardBody>
            <CardFooter centered onClick={(e) => handleClick(e)}>
                <OptionsIcon color={"#989898"} />
                {options &&
                    <FOContainer column ref={bookmarkRef}>
                        <Option row onClick={() => props.onDeleteBookmark(props.data)}>
                            <IconContainer centered>
                                <DeleteIcon size={18} color={ColorInfo}/>
                            </IconContainer>
                            <OptionText>
                                Delete
                            </OptionText>
                        </Option>

                    </FOContainer>
                }
            </CardFooter>
        </BookmarkContainer>
      );
}


const BookmarkContainer = styled(Container)`
    border: 1px solid #3D3D3D;
    height: 8vh;
    width: 15vw;
    background-color: #3D3D3D;
    margin-bottom:15px;
    border-radius: 5px;
    position: relative;

    &:hover{
        border:1px solid rgba(118, 118, 118, 0.62);
    }
`;


const CardHeader = styled(Container)`
    width: 25%;
`;

const CardBody = styled(Container)`
    width: 65%;
`;

const CardFooter = styled(Container)`
    width: 10%;
    overflow: auto;
`;

const BodyHeader = styled(Container)`
    width: 100%;
    font-size: 20px;
`;

const BodyFooter = styled(Container)`
    width: 100%;
    color: #B0B0B0;
`;

const FOContainer = styled(Container)`
    height: 3vh;
    width: 150px;
    position: absolute;
    background-color: #292929;
    border-radius: 5px;
    margin-right: 115px;
`;

const Option = styled(Container)`
    height: 3vh;    
`;

const IconContainer = styled(Container)`
    width: 20%;
`;

const OptionText = styled(Container)`
    font-size: 15px;
    width: 80%;
    padding-top: 9px;
`;