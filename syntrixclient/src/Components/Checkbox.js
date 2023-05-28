import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Screen,Container, Hover, Spacer } from "../UI/Models";

export function Checkbox(props) {
    const [isChecked, setIsChecked] = useState(false)


    useEffect(() => {
    },[])


    const isClicked = () => {
        setIsChecked(!isChecked)
        props.onChange(!isChecked)
    }

    return(
        <CheckboxContainer row>
            <CheckboxDiv centered onClick={() => isClicked()}>
                { isChecked && (
                    <Check color={props.data.color} />
                    )
                }
            </CheckboxDiv>
            <Label centered> {props.data.name} </Label>
        </CheckboxContainer>
    );

}

const CheckboxContainer = styled(Container)`
    height: 50px;
    min-width: 100%;

`;

const CheckboxDiv = styled(Container)`
    width: 30px;
    height: 30px;
    margin-left: 20px;
    margin-top: 12px;
    border-radius: 3px;
    background-color: #2F2F2F;
`;

const Label = styled(Container)`
    Font-size: 25px;
    margin-left: 20px;
`;

const Check = styled(Container)`
    border-radius: 3px;
    height: 20px;
    width: 20px;

    ${({ color }) =>
    color &&
    `
        background-color: ${color};
    
    `
    }
`;