import styled from "styled-components";
import {  useNavigate } from "react-router-dom";
import TransparentLogo from "../UI/Images/TransparentLogo.png";
import { Container, Hover, Spacer,   } from "../UI/Models";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from 'react'

export function NavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const ActiveTab = useSelector((state) => state.CurrentTab)

    const UpdateTab = (tab) => {
        dispatch({type : "UPDATE_TAB", payload : tab})
    }

    
    const Tabs = ["Directory","Bookmarks","Resources","Community","Tags","Profile"]

    const HandleTabChange = (tab) => {
        UpdateTab(tab)
        navigate(`/${tab}`)
    }

    return(
        <NavContainer row>
            <LogoContainer justifyStart>
                <LogoPic src={TransparentLogo} alt="Logo" />
            </LogoContainer>
            <NavLinksContainer row>
                {
                    Tabs.map((obj) => (
                        <NavLink pointer centered column onClick={() => HandleTabChange(obj)}>
                            {obj}
                            <Active on={ActiveTab == obj}/>
                        </NavLink>
                    ))
                }
            </NavLinksContainer>
            <LogoutContainer centered>
                <LogoutButton centered pointer>
                    Logout
                </LogoutButton>
            </LogoutContainer>
        </NavContainer>
    );
};


const NavContainer = styled(Container)`
height: 10vh;
width: 100%;
background-color: #0d0d0d;
color: white;
`;

const LogoContainer = styled(Container)`
width: 20%;
`;

const LogoPic = styled.img`
height: 150px;
width: 150px;
`;

const NavLinksContainer = styled(Container)`
width: 65%;
padding-left: 10%;
`;

const LogoutContainer = styled(Container)`
width: 10%;
`;

const NavLink = styled(Container)`
width: 10%;
font-size: 18px;
position:relative;
`;

const LogoutButton = styled(Container)`
font-size: 15px;
font-family: 'Gilroy';
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

const Active = styled(Container)`
width: 70px;
height: 5px;
border-radius:100px;
background-color: transparent;
margin-top:5%;

    ${({on}) => 
    on && 
    `
    background-color: #0487FF;
    `
    }
`;