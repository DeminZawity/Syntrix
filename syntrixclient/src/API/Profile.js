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

const API = {
    GetUserById
}

export default API;