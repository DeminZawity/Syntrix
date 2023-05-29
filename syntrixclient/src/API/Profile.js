const GetConfig = {
    credentials: "include",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }

const GetPostConfig = (body) => {
    var config = {
        body : JSON.stringify(body),
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
    }
    return config
}

export const GetUserById = async(UserId) => {

    const response = await fetch(
        `https://localhost:7186/GetUser/${UserId}`, GetConfig);

    
    if(response.ok){
        const GetUserResponse = await response.json();
        return GetUserResponse;
    }else{
        return false
    }
}

export const EditingUser = async(Id, FirstName, LastName, Email, Title) => {

    const response = await fetch(
        `https://localhost:7186/EditUser/${Id}`, GetPostConfig({Id, FirstName, LastName, Email, Title})
        );

    if(response.ok){
        const EditUserResponse = await response.json();
        return EditUserResponse;
    }else {
        return false
    }    
}


const API = {
    GetUserById,
    EditingUser
}

export default API;