import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { GetUserById } from "../API/Profile";
import { Screen, Container, Hover, Spacer } from "../UI/Models";
import { Input } from "../Components/InputField";

export function ProfilePage() {
    const UserInfo = useSelector((state) => state.User)


    return(
        <>
            <Screen centered>
                <ProfileContainer>
                    <PHeader row>
                        <CharContainer centered>
                            <Char centered>D</Char>
                        </CharContainer>
                        <TitleContainer column>
                            <TName alignEnd> Demin Zawity</TName>
                            <TTile>React Developer</TTile>
                        </TitleContainer>
                    </PHeader>
                    <PCard centered>
                        <CenteringDetails column>
                            <CardDetail row>
                                <DetailContainer column>
                                    <CDHeader alignEnd>First Name</CDHeader>
                                    <CDName alignEnd>Demin</CDName>
                                </DetailContainer>
                                <EditButtonContainer centered>
                                    <EditButton centered>
                                        Edit
                                    </EditButton>
                                </EditButtonContainer>
                            </CardDetail>
                            <CardDetail row>
                                <DetailContainer column>
                                    <CDHeader alignEnd>Last Name</CDHeader>
                                    <CDName alignEnd>Zawity</CDName>
                                </DetailContainer>
                                <EditButtonContainer centered>
                                    <EditButton centered>
                                        Edit
                                    </EditButton>
                                </EditButtonContainer>
                            </CardDetail>
                            <CardDetail row>
                                <DetailContainer column>
                                    <CDHeader alignEnd>Title</CDHeader>
                                    <CDName alignEnd>React Developer</CDName>
                                </DetailContainer>
                                <EditButtonContainer centered>
                                    <EditButton centered>
                                        Edit
                                    </EditButton>
                                </EditButtonContainer>
                            </CardDetail>
                            <CardDetail row>
                                <DetailContainer column>
                                    <CDHeader alignEnd>Email</CDHeader>
                                    <CDName alignEnd>Demin.Zawity@gmail.com</CDName>
                                </DetailContainer>
                                <EditButtonContainer centered>
                                    <EditButton centered>
                                        Edit
                                    </EditButton>
                                </EditButtonContainer>
                            </CardDetail>
                        </CenteringDetails>
                    </PCard>
                    <PFooter centered>
                        <PFCard row>
                            <PFDetail>
                                <PFTitle>
                                    App Theme Color
                                </PFTitle>
                                <PFColorDiv alignEnd>
                                    <Color></Color>
                                </PFColorDiv>
                            </PFDetail>
                            <EditButtonContainer centered>
                                    <EditButton centered>
                                        Edit
                                    </EditButton>
                                </EditButtonContainer>
                        </PFCard>
                    </PFooter>
                </ProfileContainer>
            </Screen>
        </>
    );
}

const ProfileContainer = styled(Container)`
    height: 90%;
    width: 35%;

`;
const CenteringDetails = styled(Container)`
    height: 90%;
    width: 90%;
    padding-top: 90px;
`;

const PHeader = styled(Container)`
    height: 15%;
    width: 100%;
`;
const PCard = styled(Container)`
    height: 50%;
    border-radius: 10px;
    background-color: #333333;
    width: 90%;
    margin-left: 10px;
    margin-top: 10px;
`;
const PFooter = styled(Container)`
    height: 15%;
    width: 90%;
    margin-left: 10px;
    margin-top: 25px;
    border-radius: 10px;
    background-color: #333333;
`;
const PSave = styled(Container)``;

const CharContainer = styled(Container)`
    height: 100%;
    width: 20%;
`;
const Char = styled(Container)`
    height: 100px;
    width: 100px;
    border-radius: 100%;
    font-size: 40px;
    font-family:"Gilroy-Bold";
    background-color: #333333;
    color: #0487FF;
`;
const TitleContainer = styled(Container)`
    height: 100%;
    width: 100%;
    margin-left: 20px;
`;
const TName = styled(Container)`
    height: 55%;
    font-family:"Gilroy-Bold";
    font-size: 30px;
    padding-top: 10px;
`;
const TTile = styled(Container)`
    height: 45%;
    font-size: 18px;
    color: #7B7B7B;
`;
const CardDetail = styled(Container)`
    height: 20%;
    padding-left: 40px;
    font-size: 22px;
`;
const DetailContainer = styled(Container)`
    width: 80%;
`;
const CDHeader = styled(Container)`
    height: 30%;
    color: #989898;
`;
const CDName = styled(Container)`
    font-family:"Gilroy-Bold";
    height: 40%;
`;
const EditButtonContainer = styled(Container)`
    width: 40%;
`;
const EditButton = styled(Container)`
    font-size: 14px;
    height: 40px;
    width: 120px;
    background-color: #404244;
    border: 1px solid black;
    margin-bottom: 20px;
`;

const PFCard = styled(Container)`
    height: 50%;
    width: 90%;
`; 

const PFHeader = styled(Container)`
`; 

const PFTitle = styled(Container)`
    font-size: 22px;
    color: #989898;
`; 

const PFDetail = styled(Container)`
    width: 80%;
    padding-left: 40px;
`;

const PFColorDiv = styled(Container)`
    height: 80%;
`;
const Color = styled(Container)`
    background-color: white;
    border-radius: 100%;
    height: 50px;
    width: 50px;
`;