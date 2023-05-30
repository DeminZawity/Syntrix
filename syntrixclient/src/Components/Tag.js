import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Screen, Container, Hover, Spacer } from "../UI/Models";
import { DeleteIcon } from "../UI/Icons";

export function Tag(props) {
    const ColorInfo = useSelector((state) => state.UserColor)


    return(
        <>
            <Tg centered>{props.data.name}</Tg>
            <Spacer h={8}/>
            <TgTrash centered>
                <DeleteIcon size={25} color={ColorInfo}/>
            </TgTrash>
            <Spacer h={8}/>
        </>
    );

}

const Tg = styled(Container)`
    border: 2px solid #1A5AFD;
    background-color: #2A63F5;
    border-radius: 3px;
    height: 30px;
    margin-top: 15px;
    padding-left: 25px;
    padding-right: 25px;

`;
const TgTrash = styled(Container)`
    border: 2px solid #1A5AFD;
    background-color: #2A63F5;
    border-radius: 3px;
    height: 30px;
    width: 40px;
    margin-top: 15px;
`;