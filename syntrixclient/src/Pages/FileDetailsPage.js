import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Screen, Container, Hover, Spacer } from "../UI/Models";
import { BackIcon } from "../UI/Icons"
import CodeEditor from "../Components/CodeEditor";
import { DeleteIcon } from "../UI/Icons";
import { Tag } from "../Components/Tag";
import  Fade  from "@mui/material/Fade";


export function FileDetailsPage() {
    const [isAddModalOn, setIsAddModalOn] = useState(false)


    return(
        <Screen row>
        <Spacer h={200}/>

            <FDContainer>
            <Fade in={isAddModalOn} style={{transitionDelay:"500ms"}}>
                <ModalContainer>
                    <ATContainer column>
                        <ATHeader centered>Add Tag</ATHeader>
                        <ATSubHeader>Select all that apply</ATSubHeader>
                        <ATBody>
                            <ATDetail row>
                                <ATCheckbox type="checkbox" centered/>
                                <ATName centered>React</ATName>
                            </ATDetail>
                        </ATBody>
                        <ATFooter centered>
                            <SaveTagsButton centered>Save Tags</SaveTagsButton>
                        </ATFooter>
                    </ATContainer>
                </ModalContainer>
            </Fade>

 
                <Header row >
                    <IconContainer centered>
                        <BackIcon size={30}/>
                    </IconContainer>
                    <Title column alignStart>
                        <Spacer v={12}/>
                        How to create your own custom react hook 
                    </Title>
                </Header>
                <Body row >
                    <CodeContainer column>
                        <CCHeader>
                            <Spacer v={10}/>
                            Code Snippet
                        </CCHeader>
                        <CCBlock>
                            <BLOCK>
                                <CodeEditor />
                            </BLOCK>
                        </CCBlock>
                    </CodeContainer>
                    <DetailsContainer column  >
                        <DecriptionContainer column  >
                            <DHeader justifyStart>Description</DHeader>
                            <DInput />
                        </DecriptionContainer>
                        <CodeTypeContainer  >
                            <CTHeader justifyStart>Code Type
                            </CTHeader>
                            <CTInput/>
                        </CodeTypeContainer>
                        <VisabilityContainer  >
                            <VHeader justifyStart>Visibility</VHeader>
                            <VInput row>
                                <VIDetail row>
                                    <VIInput name="visibilityRadio" type="radio"/>
                                    <VIText justifyStart>Public</VIText>
                                </VIDetail>
                                <VIDetail row>
                                    <VIInput name="visibilityRadio" type="radio"/>
                                    <VIText justifyStart>Private</VIText>
                                </VIDetail>
                            </VInput>
                        </VisabilityContainer>
                        <TagsContainer  >
                            <THeader justifyStart>Tags</THeader>
                            <TInput   column>
                                <TagsComp row>
                                    <Tg centered>React</Tg>
                                    <Spacer h={8}/>
                                    <TgTrash centered>
                                        <DeleteIcon size={25} color={"white"}/>
                                    </TgTrash>
                                    <Spacer h={8}/>
                                    <Tg centered>Development</Tg>
                                    <Spacer h={8}/>
                                    <TgTrash centered>
                                        <DeleteIcon size={25} color={"white"}/>
                                    </TgTrash>
                                    <Spacer h={8}/>
                                    <Tg centered>Front-End</Tg>
                                    <Spacer h={8}/>
                                    <TgTrash centered>
                                        <DeleteIcon size={25} color={"white"}/>
                                    </TgTrash>
                                </TagsComp>
                                <Spacer v={40}/>
                                <AddTag centered onClick={() =>setIsAddModalOn(true)}>
                                    Add Tag
                                </AddTag>
                            </TInput>
                        </TagsContainer>
                        <SaveButtonContainer  >
                            <SaveButton centered> Save</SaveButton>
                        </SaveButtonContainer>
                    </DetailsContainer>
                </Body>

            </FDContainer>

        </Screen>
    )
}

const Header = styled(Container)`
    height: 5%;
`;
const IconContainer = styled(Container)`
    width: 3%;
`;
const Title = styled(Container)`
    font-size: 25px;
`;
const CodeContainer = styled(Container)`
    height: 99%;
    width: 70%;
`;

const DetailsContainer = styled(Container)`
    height: 99%;
    width: 30%;
`;
const Body = styled(Container)`
    height: 95%;
    width: 100%;
`;
const FDContainer = styled(Container)`
    height: 85vh;
    width: 85vw;
    position: relative;
`;

const CCHeader = styled(Container)`
    height: 3%;
    width: 95%;
    color: #8D8D8D;
    padding-left: 70px;
`;
const CCBlock = styled(Container)`
    height: 90%;
    width: 95%;
    padding-left: 70px;
`;

const BLOCK= styled(Container)`
    height:100%;
`;

const DecriptionContainer= styled(Container)`
    height: 40%;
    width: 100%;
`;

const CodeTypeContainer= styled(Container)`
    height: 10%;
    width: 100%;
`;

const VisabilityContainer= styled(Container)`
    height: 10%;
    width: 100%;
`;

const TagsContainer= styled(Container)`
    height: 30%;
    width: 100%;
`;
const SaveButtonContainer= styled(Container)`
    height: 10%;
    width: 100%;
    padding-left: 20px;
`;

const DHeader= styled(Container)`
    height: 7%;
    font-size: 22px;
    padding-left: 20px;
`;

const DInput= styled.textarea`
    margin-left: 20px;
    margin-right: 20px;
    height: 85%;
    background-color: #131313;
    color: white;
    display: flex;
    flex-wrap: wrap;
    font-size: 15px;
`;

const CTHeader= styled(Container)`
    height: 28%;
    font-size: 22px;
    padding-left: 20px;
`;

const CTInput= styled.textarea`
    margin-left: 20px;
    margin-right: 20px;
    width: 94%;
    background-color: #131313;
    height: 40%;
`;

const VHeader= styled(Container)`
    height: 28%;
    font-size: 22px;
    padding-left: 20px;
`;

const VInput= styled(Container)`
`;


const THeader= styled(Container)`
    height: 10%;
    font-size: 22px;
    padding-left: 20px;
`;

const TInput= styled(Container)`
    height: 90%;
    padding-left: 20px;
    padding-top: 20px;
    padding-right: 20px;
`;

const VIDetail= styled(Container)`

    height: 70px;
    width: 50%;
`;

const VIText= styled(Container)`
    padding-top: 25px;
    padding-left: 10px;
    width: 50%;
    font-size: 18px;
`;

const VIInput= styled.input`
    width: 25px;
    margin-left: 30px;
`;

const TagsComp = styled(Container)`
    flex-wrap: wrap;
`;

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

const AddTag = styled(Container)`
    border: 1px solid #0682F4;
    height: 40px;
    width: 610px;
    font-size: 17px;
    border-radius: 3px;
    background-color: #0682F4;
`;

const SaveButton = styled(Container)`
    border: 1px solid #0487FF;
    background-color: #0487FF;
    border-radius: 3px;
    height: 50px;
    font-size: 20px;
    margin-right: 40px;
`;

const ATContainer = styled(Container)`
    height: 100%;
    width: 100%;
`;

const ATHeader = styled(Container)`
    padding-top: 20px;
    font-size: 35px;
`;

const ATSubHeader = styled(Container)`
    font-size: 20px;
    padding-top: 20px;
    padding-left: 15px;
`;

const ATBody = styled(Container)`
    height: 80%;

`;

const ATCheckbox = styled.input`
    height: 20px;
`;

const ATName = styled(Container)`
    margin-left: 15px;
    font-size: 17px;
`;

const ModalContainer = styled(Container)`
    position: absolute;
    top: 0;
    left: 35%;
    width: 550px;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    background-color: #131313;
    border: 2px solid #131313;
`;

const ATDetail = styled(Container)`
    height: 40px;  
`;

const ATFooter = styled(Container)`
    height: 10%;
`;

const SaveTagsButton = styled(Container)`
    border: 1px solid #0487FF;
    height: 60px;
    width: 400px;
    font-size: 20px;
    border-radius: 3px;
    background-color: #0487FF;
`;
