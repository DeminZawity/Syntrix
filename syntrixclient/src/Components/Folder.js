import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Container, Spacer } from "../UI/Models";
import { FolderIcon, OptionsIcon } from "../UI/Icons";


export function Folder (props) {



    return(
        <FolderContainer row pointer>
            <CardHeader centered>
                <FolderIcon size={40} color={"#0487FF"}/>
            </CardHeader>
            <CardBody column centered>
                <BodyHeader justifyStart>{props.data.name}</BodyHeader>
                <Spacer v={10}/>
                <BodyFooter justifyStart>{props.data.fileCount} Files</BodyFooter>
            </CardBody>
            <CardFooter centered>
                <OptionsIcon color={"#989898"}/>
            </CardFooter>
        </FolderContainer>

    );


}

const FolderContainer = styled(Container)`
    border: 1px solid #3D3D3D;
    height: 8vh;
    width: 15vw;
    background-color: #3D3D3D;
    border-radius: 5px;
    transition: background-color 0.5s ease, color 0.5s ease, transform 0.5s ease;

    &:hover {
        transform: scale(1.01);
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
`;

const BodyHeader = styled(Container)`
    width: 100%;
    font-size: 20px;
`;

const BodyFooter = styled(Container)`
    width: 100%;
    color: #B0B0B0;
`;