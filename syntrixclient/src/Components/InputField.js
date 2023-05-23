import React from "react";
import styled from "styled-components";
import { Container, Spacer, TextField } from "../UI/Models";


export function Input(props) {
    return(
    <TextField row>
        <InputWrap centered>
            <InputArea placeholder={props.placeholder} type={props.type} onChange={(e) => props.onChange(e.target.value)} />
        </InputWrap>
    </TextField>
    );
}

const InputWrap = styled(Container)`
  width: 85%;
`;

const InputArea = styled.input`
  height: 80%;
  width: 98%;
  background: transparent;
  border: none;
  color: white;
  font-size: 15px;

  &:focus {
    outline: none;
  }
`;