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

export const GetUserFolders = async(userId) => {

    const response = await fetch(
        `https://localhost:7186/GetFolders/${userId}`, GetConfig);

    
    if(response.ok){
        const GetFoldersResponse = await response.json();
        return GetFoldersResponse;
    }else{
        return false
    }
    
}

export const AddingFolder = async(UserId, Name) => {

    const response = await fetch(
        `https://localhost:7186/AddFolder`, GetPostConfig({UserId, Name})
        );

    if(response.ok){
        const AddFolderResponse = await response.json();
        return AddFolderResponse;
    }else {
        return false
    }    
}

export const EditingFolder = async(Id, Name) => {

    const response = await fetch(
        `https://localhost:7186/EditFolder/${Id}`, GetPostConfig({Id, Name})
        );

    if(response.ok){
        const EditFolderResponse = await response.json();
        return EditFolderResponse;
    }else {
        return false
    }    
}


export const DeletingFolder = async(Id) => {
    
    const response = await fetch(
        `https://localhost:7186/api/Folders/DeleteFolderById/${Id}`, GetPostConfig({Id})
        );

    if(response.ok){
        const DeleteFolderResponse = await response.json();
        return DeleteFolderResponse;
    }else {
        return false
    }    
      

}

const API = {
    GetUserFolders,
    AddingFolder,
    EditingFolder,
    DeletingFolder
}

export default API;