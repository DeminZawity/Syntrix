import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Screen, Spacer, Container } from "../UI/Models";
import { OptionsIcon } from "../UI/Icons";
import { useRef } from "react";
import { EditIcon, DeleteIcon } from "../UI/Icons";


export function TagPg (props) {
    const [options, setOption] = useState(false)
    const tagRef = useRef(null);
    const ColorInfo = useSelector((state) => state.UserColor)


    useEffect(() => {
      // Add event listener to handle click outside the component
      const handleClickOutside = (event) => {
        if (tagRef.current && !tagRef.current.contains(event.target)) {
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
        <FolderContainer row pointer>
            <CardHeader centered>
                <ColorFiller color={props.data.color}/>
            </CardHeader>
            <CardBody column centered>
                <BodyHeader justifyStart>{props.data.name}</BodyHeader>
                <Spacer v={10}/>
            </CardBody>
            <CardFooter centered onClick={(e) => handleClick(e)}>
                <OptionsIcon color={"#989898"} />
                {options && 
                    <FOContainer column ref={tagRef}>

                    <Option row onClick={() => props.onEditTag(props.data)}>
                        <IconContainer centered>
                            <EditIcon size={18} color={ColorInfo}/>
                        </IconContainer>
                        <OptionText>
                            Edit
                        </OptionText>
                    </Option>
        
                    <Line></Line>
        
                    <Option row onClick={() => props.onDeleteTag(props.data)}>
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
        </FolderContainer>

    );


}

const FolderContainer = styled(Container)`
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
    font-size: 15px;
`;

const BodyFooter = styled(Container)`
    width: 100%;
    color: #B0B0B0;
`;

const FOContainer = styled(Container)`
    height: 6vh;
    width: 150px;
    position: absolute;
    background-color: #292929;
    border-radius: 5px;
    margin-right: 120px;
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

const Line = styled(Container)`
    border-radius:100px;
    background-color: #1E1E1E;
    wdith: 1px;
    height: .7px;
    margin-left: 8px;
    margin-right: 10px;
`;

const ColorFiller = styled(Container)`
    height: 30px;
    width: 30px;
    border-radius: 100%;

    ${({ color }) =>
    color &&
    `
        background-color: ${color};
        border: 1px solid ${color};
    
    `
    }



`;