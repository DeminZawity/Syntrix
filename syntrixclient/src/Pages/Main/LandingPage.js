import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BakcgroundScreen, Container, Hover, Spacer } from "../../UI/Models";
import { CommunityIcon, TimeSaverIcon, SecurityIcon } from "../../UI/Icons";
import Logo from '../../UI/Images/Logo.gif';
import { useSelector } from "react-redux";
import { useEffect } from "react";

export function LandingPage() {
    const navigate = useNavigate();

    // ------- REDUX VARIABLES ----------------

    const UserInfo = useSelector((state) => state.User)

    useEffect(() => {
        console.log(UserInfo)
    },[])

    return (
        <BakcgroundScreen>
            <MainContainer>

                <NavContainer row>
                    <Title justifyStart >
                        <LogoPic src={Logo} alt="Logo" />
                    </Title>
                    <LoginButtonContainer justifyEnd>
                        <LoginButton centered pointer onClick={() => navigate(`/Login`)}>
                            <LoginText centered>Login</LoginText>
                        </LoginButton>
                    </LoginButtonContainer>
                </NavContainer>



                <BodyContainer column centered>
                    <BodyTextContainer column>
                        <BodyHeader column>
                            <BodyLineOne>Streamline your</BodyLineOne>
                            <BodyLineTwo>Dev Workflow</BodyLineTwo>
                        </BodyHeader>
                        <BodyMiddle>
                            <BodyMiddleText>A web Developers new favorite tool. An application to help you store your code snippets. Here, you can save all your old code snippets to look at in the future instead of sifting through your old projects.</BodyMiddleText>
                        </BodyMiddle>
                        <BodyFooter>
                            <RegisterAccountButton centered pointer onClick={() => navigate(`/Register`)}>Create an Account</RegisterAccountButton>
                        </BodyFooter>
                    </BodyTextContainer>
                </BodyContainer>



                <FooterContainer centered>
                    <CardContainer row centered>
                        <FooterCard>
                            <Fheader>
                                <IconContainer centered>
                                    <TimeSaverIcon size={50}/>
                                </IconContainer>
                            </Fheader>
                            <FTitle>
                                <FtitleText>
                                    Time Saver
                                </FtitleText>
                            </FTitle>
                            <FBody>
                                <FBodyText>
                                    You are able to save time by storing all your code snippets to look back on instead of wasting time searching through your old projects.
                                </FBodyText>    
                            </FBody>
                        </FooterCard>
                        <Spacer h={70}/>
                        <FooterCard>
                        <Fheader>
                                <IconContainer centered>
                                    <CommunityIcon size={50}/>
                                </IconContainer>
                            </Fheader>
                            <FTitle>
                                <FtitleText>
                                    Community
                                </FtitleText>
                            </FTitle>
                            <FBody>
                                <FBodyText>
                                    You can search through other’s code snippets and see what they have created. Coming soon!
                                </FBodyText>    
                            </FBody>
                        </FooterCard>
                        <Spacer h={70}/>
                        <FooterCard>
                        <Fheader>
                                <IconContainer centered>
                                    <SecurityIcon size={45}/>
                                </IconContainer>
                            </Fheader>
                            <FTitle>
                                <FtitleText>
                                    Security
                                </FtitleText>
                            </FTitle>
                            <FBody>
                                <FBodyText>
                                    You can choose whether your code snippet is available to the public or not. Coming soon!
                                </FBodyText>    
                            </FBody>
                        </FooterCard>
                    </CardContainer>
                </FooterContainer>



            </MainContainer>
        </BakcgroundScreen>
    );

}


const MainContainer = styled(Container)`
height: 95vh;
`;

const LogoPic = styled.img`
height: 200px;
width: 200px;
border: 1px solid #0E0E0E;
`;
const NavContainer = styled(Container)`
height: 10vh;
width: 99%;
`;

const Title = styled(Container)`
width: 50%;
`;

const TitleText = styled(Container)`
width: 30%;
font-size: 35px;
margin-top: 50px;
`;

const LoginButtonContainer = styled(Container)`
width: 50%;
`;

const LoginButton = styled(Container)`
border: 2px solid white;
height: 3vh;
width: 7vw;
margin-top: 50px;
margin-right: 20px;
border-radius: 2px;
transition: background-color 0.5s ease, color 0.5s ease, transform 0.5s ease;

&:hover {
    transform: scale(1.1);
    background:white;
    color:black;
  }
`;

const LoginText = styled(Container)`
font-size: 15px;
font-family: 'Gilroy'
`;


const BodyContainer = styled(Container)`
margin-top: 70px;
height: 50vh;
width: 98.8vw;
`;

const BodyTextContainer = styled(Container)`
width: 75vw;
height: 50vh;
`;


const BodyHeader = styled(Container)`
font-size: 80px;
font-weight: bold;
height: 15vh;

`;

const BodyLineOne = styled(Container)`
height: 7vh;
font-family:"Gilroy-Bold"
`;

const BodyLineTwo = styled(Container)`
color: #0487FF;
height: 7vh;
font-family:"Gilroy-Bold"
`;

const BodyMiddle = styled(Container)``;

const BodyMiddleText = styled.p`
width: 30vw;
color: #8D8D8D;
font-size: 25px;
font-family: 'Gilroy';
`;

const BodyFooter = styled(Container)`
height: 6vh;
width: 25vw;
`;

const RegisterAccountButton = styled(Container)`
border: 1px solid #FFFFFF;
border-radius: 2px;
color: black;
background-color: #FFFFFF;
margin-top: 25px;
height: 75px;
width: 55%;
font-size: 20px;
transition: background-color 0.5s cubic-bezier(.17,.67,.83,.67), color 0.5s ease, transform 0.5s ease-in;

&:hover {
    color: black;
    background-color: #0487FF;
    border: 1px solid #0487FF;
    font-weight: bold;
    transform: scale(1.1);
  }
`;

const FooterContainer = styled(Container)`
height: 30vh;
width: 98vw;
`;

const CardContainer = styled(Container)`
height: 28vh;
width: 75vw;
`;

const FooterCard = styled(Container)`
border: 3px solid #4D4D4D;
border-radius: 8px;
height: 27vh;
width: 15vw;
`;

const Fheader = styled(Container)`
height: 30%;
`;

const FTitle = styled(Container)`
height: 15%;
`;

const FBody = styled(Container)`
height: 50%;
`;

const IconContainer = styled(Container)`
border: 1px solid #4D4D4D;
height: 6vh;
width: 4vw;
margin-top: 20px;
margin-left: 20px;
background-color: #4D4D4D;
border-radius: 3px;
`;

const FtitleText = styled(Container)`
margin-left: 20px;
height: 3vh;
width: 10vw;
font-weight: bold;
font-size: 30px;
`;

const FBodyText = styled(Container)`
margin-left: 20px;
margin-right: 30px;
font-size: 18px;
`;