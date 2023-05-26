import styled from "styled-components";

export const Container = styled.div`

font-family: 'Gilroy', sans-serif;

  ${({ brd }) =>
  brd &&
  `
border:1px solid red;
  `}

  ${({ row }) =>
    row &&
    `
  display:flex;
  flex-direction: row;
`}

  ${({ pointer }) =>
    pointer &&
    `
  cursor: pointer;
`}

  ${({ column }) =>
    column &&
    `
display:flex;
flex-direction: column;
`}
${({ justifyCenter }) =>
    justifyCenter &&
    `
display:flex;
justify-content: center;
`}
${({ alignCenter }) =>
    alignCenter &&
    `
display:flex; 
align-items: center;
`}
${({ justifyEnd }) =>
    justifyEnd &&
    `
display:flex;
justify-content: flex-end;
`}
${({ alignEnd }) =>
    alignEnd &&
    `
display:flex;
align-items: flex-end;
`}
${({ justifyStart }) =>
    justifyStart &&
    `
display:flex;
justify-content: flex-start;
`}
${({ alignStart }) =>
    alignStart &&
    `
display:flex;
align-items: flex-Start;
`}
${({ centered }) =>
    centered &&
    `
display:flex;
justify-content:center;
align-content: center;
align-items:center;
`}
`;

export const Screen = styled(Container)`
    background-color: #0d0d0d;
    height: 90vh;
    width: 100vw;
    color: white;
`

export const BakcgroundScreen = styled(Container)`
    background-color: #0d0d0d;
    height: 100vh;
    width: 100vw;
    color: white;
`

export const Spacer = styled(Container)`
  ${({ v }) =>
    v &&
    `
      height: ${v}px;
  `}
  ${({ h }) =>
    h &&
    `
  width: ${h}px;
  `}
`;



export const Hover = styled(Container)`
  ${({ pointer }) =>
    pointer &&
    `
      cursor: pointer;
  `}
`;


export const TextField = styled(Container)`
  width: 500px;
  height: 60px;
  border-radius: 5px;
  border: 3px solid #6A6A6A;

    ${({ isSmall }) =>
    isSmall &&
    `
      border: 1px solid #6A6A6A;
      height:3vh;
  `}
`;


