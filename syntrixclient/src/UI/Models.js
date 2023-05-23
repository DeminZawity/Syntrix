import styled from "styled-components";

export const Container = styled.div`
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



export const BakcgroundScreen = styled(Container)`
    background-color: #0E0E0E;
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