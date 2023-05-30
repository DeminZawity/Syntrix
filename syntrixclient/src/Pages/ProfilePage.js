import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect,useRef } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { GetUserById, EditingUser } from "../API/Profile";
import { Screen, Container, Hover, Spacer } from "../UI/Models";
import { Input } from "../Components/InputField";
import { HexColorPicker } from "react-colorful";

export function ProfilePage() {
    const UserInfo = useSelector((state) => state.User)
    const ColorInfo = useSelector((state) => state.UserColor)
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [email, setEmail] = useState(null)
    const [title, setTitle] = useState(null)
    const [isUpdatingFirst, setIsUpdatingFirst] = useState(false)
    const [isUpdatingLast, setIsUpdatingLast] = useState(false)
    const [isUpdatingEmail, setIsUpdatingEmail] = useState(false)
    const [isUpdatingTitle, setIsUpdatingTitle] = useState(false)
    const [ currentColor, setCurrentColor] = useState(ColorInfo !== null ? ColorInfo :"#FFF")
    const [isSettingColor, setIsSettingColor] = useState(false)
    const colorPickerREF = useRef(null);


    const GetUserInformation = async () => {
        let UserData = await GetUserById(UserInfo.id);
        setFirstName(UserData.firstName)
        setLastName(UserData.lastName)
        setEmail(UserData.email)
        setTitle(UserData.title)
    }

    const UpdateAppColor = () => {
        dispatch({type : "SET_COLOR", payload : currentColor})
    } 



    const UpdateUser = async () => {
        let UpdateUserData = await EditingUser(UserInfo.id, firstName, lastName, email, title);

        if(UpdateUserData !== false){
            setIsUpdatingFirst(false)
            setIsUpdatingLast(false)
            setIsUpdatingEmail(false)
            setIsUpdatingTitle(false)
            toast.success(`User Profile updated!`)
            GetUserInformation()
        }
    }


    const saveCustomColor = () => {
        setIsSettingColor(false);
        UpdateAppColor();
    }



    useEffect(() => {
        GetUserInformation()
    },[])



    return(
        <>
                                    <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Screen centered>
                <ProfileContainer>
                    <PHeader row>
                        <CharContainer centered>
                            <Char centered textColor={ColorInfo}>{firstName?.charAt(0)}</Char>
                        </CharContainer>
                        <TitleContainer column>
                            <TName alignEnd>{firstName} {lastName}</TName>
                            <TTile>{title}</TTile>
                        </TitleContainer>
                    </PHeader>
                    <PCard centered>
                        <CenteringDetails column>
                            <CardDetail row>
                                {
                                    isUpdatingFirst && (
                                        <DetailContainer column>
                                            <CDHeader alignEnd>First Name</CDHeader>
                                            <CDinput value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                        </DetailContainer>
                                    )
                                }
                                {
                                    (isUpdatingFirst === false) && (
                                        <DetailContainer column>
                                            <CDHeader alignEnd>First Name</CDHeader>
                                            <CDName alignEnd>{firstName}</CDName>
                                        </DetailContainer>
                                    )
                                }
                                                                {
                                    isUpdatingFirst && (
                                        <EditButtonContainer centered>
                                            <EditButton pointer centered onClick={() => UpdateUser()}>
                                                Save
                                            </EditButton>
                                        </EditButtonContainer>
                                    )
                                }
                                {
                                    (isUpdatingFirst === false) && (
                                        <EditButtonContainer centered>
                                            <EditButton pointer centered onClick={() => setIsUpdatingFirst(true)}>
                                                Edit
                                            </EditButton>
                                        </EditButtonContainer>
                                    )
                                }
                            </CardDetail>
                            <CardDetail row>
                            {
                                    isUpdatingLast && (
                                        <DetailContainer column>
                                            <CDHeader alignEnd>Last Name</CDHeader>
                                            <CDinput value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                        </DetailContainer>
                                    )
                                }
                                {
                                    (isUpdatingLast === false) && (
                                        <DetailContainer column>
                                            <CDHeader alignEnd>Last Name</CDHeader>
                                            <CDName alignEnd>{lastName}</CDName>
                                        </DetailContainer>
                                    )
                                }
                                                                {
                                    isUpdatingLast && (
                                        <EditButtonContainer centered>
                                            <EditButton pointer centered onClick={() => UpdateUser()}>
                                                Save
                                            </EditButton>
                                        </EditButtonContainer>
                                    )
                                }
                                {
                                    (isUpdatingLast === false) && (
                                        <EditButtonContainer centered>
                                            <EditButton pointer centered onClick={() => setIsUpdatingLast(true)}>
                                                Edit
                                            </EditButton>
                                        </EditButtonContainer>
                                    )
                                }
                            </CardDetail>
                            <CardDetail row>

                            {
                                    isUpdatingTitle && (
                                        <DetailContainer column>
                                            <CDHeader alignEnd>Title</CDHeader>
                                            <CDinput value={title} onChange={(e) => setTitle(e.target.value)}/>
                                        </DetailContainer>
                                    )
                                }
                                {
                                    (isUpdatingTitle === false) && (
                                        <DetailContainer column>
                                            <CDHeader alignEnd>Title</CDHeader>
                                            <CDName alignEnd>{title}</CDName>
                                        </DetailContainer>
                                    )
                                }
                                                                {
                                    isUpdatingTitle && (
                                        <EditButtonContainer centered>
                                            <EditButton pointer centered onClick={() => UpdateUser()}>
                                                Save
                                            </EditButton>
                                        </EditButtonContainer>
                                    )
                                }
                                {
                                    (isUpdatingTitle === false) && (
                                        <EditButtonContainer centered>
                                            <EditButton pointer centered onClick={() => setIsUpdatingTitle(true)}>
                                                Edit
                                            </EditButton>
                                        </EditButtonContainer>
                                    )
                                }
                            </CardDetail>
                            <CardDetail row>

                            {
                                    isUpdatingEmail && (
                                        <DetailContainer column>
                                            <CDHeader alignEnd>Email</CDHeader>
                                            <CDinput value={email} onChange={(e) => setEmail(e.target.value)}/>
                                        </DetailContainer>
                                    )
                                }
                                {
                                    (isUpdatingEmail === false) && (
                                        <DetailContainer column>
                                            <CDHeader alignEnd>Email</CDHeader>
                                            <CDName alignEnd>{email}</CDName>
                                        </DetailContainer>
                                    )
                                }
                                                                {
                                    isUpdatingEmail && (
                                        <EditButtonContainer centered>
                                            <EditButton pointer centered onClick={() => UpdateUser()}>
                                                Save
                                            </EditButton>
                                        </EditButtonContainer>
                                    )
                                }
                                {
                                    (isUpdatingEmail === false) && (
                                        <EditButtonContainer centered>
                                            <EditButton pointer centered onClick={() => setIsUpdatingEmail(true)}>
                                                Edit
                                            </EditButton>
                                        </EditButtonContainer>
                                    )
                                }
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
                                    <Color color={currentColor}/>
                                    {
                                        isSettingColor && (
                                            <HexColorContainer ref={colorPickerREF}>
                                                <HexColorPicker color={currentColor} onChange={setCurrentColor}/>
                                            </HexColorContainer>
                                        )
                                    }
                                </PFColorDiv>
                            </PFDetail>
                            <EditButtonContainer centered>
                                    {
                                        isSettingColor ? (
                                        <EditButton pointer centered onClick={() => saveCustomColor()}>
                                            Save
                                        </EditButton>
                                        ) : (
                                            <EditButton pointer centered onClick={() => setIsSettingColor(true)}>
                                                Edit
                                            </EditButton>

                                        )
                                    }

                                </EditButtonContainer>
                        </PFCard>
                    </PFooter>
                </ProfileContainer>
            </Screen>
        </>
    );
}
const HexColorContainer = styled(Container)`
    height: 40px;
    width: 40px;
    border-radius: 100%;
    z-index: 9;
    margin-left: 25px;
`;
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
    ${({ textColor }) =>
    textColor &&
    `
    color : ${textColor};
    `
    }
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

    ${({ color }) =>
    color &&
    `
        background-color: ${color};
        border: 1px solid ${color};
    
    `
    }
`;


const CDinput = styled.input`
    height: 40px;
    margin-top: 10px;
    border-radius: 3px;
    background-color: #525252;
    outline:none;
    border:none;
    color: white;
    font-family:"Gilroy";
    font-size: 22px;
`;