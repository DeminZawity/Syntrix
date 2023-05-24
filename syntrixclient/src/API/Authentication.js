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


export const Login = async(Email,Password) => {

    const response = await fetch(
        `https://localhost:7186/api/Users/Login/${Email}/${Password}`,GetConfig);

    
    if(response.ok){
        const loginResponse = await response.json();
        return loginResponse;
    }else{
        return false
    }
    
}

export const Register = async(FirstName, LastName, Title, Email, Password) => {

    const response = await fetch(
        `https://localhost:7186/AddUser`, GetPostConfig({FirstName,LastName,Title,Email,Password})
        );

    if(response.ok){
        const RegisterResponse = await response.json();
        return RegisterResponse;
    }else {
        return false
    }    
}




const API = {
    Login,
    Register
}

export default API;