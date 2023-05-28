import React,{useState} from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';


const Dropdown = (props) => {

    const [codeType,setCodeType] = useState(props.type ? props.type : null)

    useEffect(() => {
        setCodeType(props.type)
    },[props.type])

  return (
    <DropdownContainer value={codeType} onChange={(e) => props.onChange(e.target.value)}>
      <option value="html">HTML</option>
      <option value="css">CSS</option>
      <option value="json">JSON</option>
      <option value="javascript">Javascript</option>
      <option value="csharp">C#</option>
      <option value="python">Python</option>
      <option value="less">Less</option>
      <option value="swift">Swift</option>
      <option value="typescript">TypeScript</option>
      <option value="java">Java</option>
    </DropdownContainer>
  );
};

export default Dropdown;


const DropdownContainer = styled.select`
  background-color: #333333;
  width: 95%;
  padding: 8px;
  border: none;
  color: white;
  font-size: 16px;
  marign-left:20px;
  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  option {
    &:first-child {
      color: gray;
    }
  }
`;