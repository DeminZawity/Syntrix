import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Screen,Container, Hover, Spacer } from "../UI/Models";

export function VideoPlayer(props) {
    const frameRef = useRef();

    const StopVideo = () => {
        if (frameRef.current){
            const video = new window.YT.Player(frameRef.current)
            video.stopVideo();
        }

    }


    return(
        <VPContainer>
            <iframe
            id ="video player"
            title = "resource video"
            src = {props.url}
            ref = {frameRef}

            />
        </VPContainer>
    )
}

const VPContainer = styled(Container)`
`;