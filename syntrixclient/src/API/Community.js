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

export const GetAllPublicFiles = async() => {

    const response = await fetch(
        `https://localhost:7186/api/Files/GetAllPublicFiles`, GetConfig);

    
    if(response.ok){
        const GetPublicFilesResponse = await response.json();
        return GetPublicFilesResponse;
    }else{
        return false
    }
}

export const SearchPublicFiles = async(Name) => {

    const response = await fetch(
        `https://localhost:7186/api/Files/SearchPublicFilesByName/${Name}`, GetConfig);

    
    if(response.ok){
        const GetPublicFilesResponse = await response.json();
        return GetPublicFilesResponse;
    }else{
        return false
    }
}

const API = {
    GetAllPublicFiles,
    SearchPublicFiles
}

export default API;