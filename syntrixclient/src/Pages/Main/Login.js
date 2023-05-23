import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BakcgroundScreen, Container, Hover, Spacer } from "../../UI/Models";
import Logo from '../../UI/Images/Logo.gif';
import { Input } from "../../Components/InputField";


export function LoginPage() {
    const navigate = useNavigate();

    return (
        <BakcgroundScreen>
            <MainContainer>



                <NavContainer row>
                    <Title justifyStart >
                        <LogoPic src={Logo} alt="Logo" />
                    </Title>
                </NavContainer>



                <BodyContainer row>

                    <Spacer h={300}/>


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

                    <Spacer h={400}/>

                    <LoginTextContainer>
                        <LHeader>
                            <Spacer v={35}/>
                            <LheaderText>Please Login Below</LheaderText>
                        </LHeader>
                        <LBody column>
                            <Spacer v={60}/>
                            <LbodyCard>
                                <LbodyHeader>Email</LbodyHeader>
                                <Spacer v={10}/>
                                <LbodyForm>
                                    <Input placeholder={"John.Doe@gmail.com"} type={"email"}/>
                                </LbodyForm>
                            </LbodyCard>
                            <Spacer v={30}/>
                            <LbodyCard>
                                <LbodyHeader>Password</LbodyHeader>
                                <Spacer v={10}/>
                                <LbodyForm>
                                    <Input placeholder={"*******"} type={"password"}/>
                                </LbodyForm>
                            </LbodyCard>
                        </LBody>
                        <LFooter justifyEnd>
                            <LoginButton centered pointer onClick={() => navigate(`/Login`)}>
                                <LoginText centered>Login</LoginText>
                            </LoginButton>
                        </LFooter>
                    </LoginTextContainer>


                </BodyContainer>



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
border-radius: 2px;
transition: background-color 0.5s ease, color 0.5s ease, transform 0.5s ease;

&:hover {
    transform: scale(1.1);
    background:white;
    color:black;
    font-weight: bold;
  }
`;

const LoginText = styled(Container)`
font-size: 15px;
font-family: 'Gilroy'
`;


const BodyContainer = styled(Container)`
margin-top: 70px;
height: 70vh;
width: 98.8vw;
`;

const BodyTextContainer = styled(Container)`
width: 35vw;
height: 70vh;
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

const LoginTextContainer = styled(Container)`
width: 30%;
`;

const LHeader = styled(Container)`
height: 10%;
`;

const LBody = styled(Container)`
height: 35%;
`;

const LFooter = styled(Container)`
height: 15%;
width: 510px;
`;

const LheaderText = styled.text`
font-size: 45px;
font-family:"Gilroy-Bold"
`;

const LbodyCard = styled(Container)``;

const LbodyHeader = styled(Container)`
font-size: 23px;
`;

const LbodyForm = styled(Container)``;

