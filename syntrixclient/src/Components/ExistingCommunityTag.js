import styled from "styled-components";
import { DeleteIcon } from "../UI/Icons";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Screen,Container, Hover, Spacer } from "../UI/Models";
import { getContrastColor } from "../Utilities/Color";
import { CommunityTag } from "./CommunityTag";

export function ExistingCommunityTag(props) {
    return(
        <TagContainer row>
            <Tg centered color={getContrastColor(props.data.fileColor)} background={props.data.fileColor}>{props.data.tagName}</Tg>
            <Spacer h={8}/>
        </TagContainer>
    );

}


const TagContainer = styled(Container)`
`

const Tg = styled(Container)`
    border: 2px solid #1A5AFD;
    background-color: #2A63F5;
    border-radius: 3px;
    height: 30px;
    margin-top: 15px;
    padding-left: 25px;
    padding-right: 25px;

    ${({ background }) =>
    background &&
    `
        background-color: ${background};
        border: 2px solid ${background};
    `
    }
    ${({ color }) =>
    color &&
    `
    color : ${color};
    `
    }

`;
const TgTrash = styled(Container)`
    border: 2px solid #1A5AFD;
    background-color: #2A63F5;
    border-radius: 3px;
    height: 30px;
    width: 40px;
    margin-top: 15px;

    ${({ background }) =>
    background &&
    `
        background-color: ${background};
        border: 2px solid ${background};
    
    `
    }
`;