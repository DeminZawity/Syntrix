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

export const GetFolderFiles = async(FolderId) => {

    const response = await fetch(
        `https://localhost:7186/GetFiles/${FolderId}`, GetConfig);

    
    if(response.ok){
        const GetFilesResponse = await response.json();
        return GetFilesResponse;
    }else{
        return false
    }
}


export const GetFileDetail = async(FileId) => {

    const response = await fetch(
        `https://localhost:7186/GetFile/${FileId}`, GetConfig);

    
    if(response.ok){
        const GetFilesResponse = await response.json();
        return GetFilesResponse;
    }else{
        return false
    }
}


export const AddingFile = async({Name, FolderId, CodeType, Description, Content, IsPublic}) => {

    const response = await fetch(
        `https://localhost:7186/AddFile`, GetPostConfig({Name, FolderId, CodeType, Description, Content, IsPublic})
        );

    if(response.ok){
        const GetFilesResponse = await response.json();
        return GetFilesResponse;
    }else {
        return false
    }    

}


export const EditingFile = async(Id, Name, FolderId, CodeType, Description, Content, IsPublic) => {

    const response = await fetch(
        `https://localhost:7186/EditFile/${Id}`, GetPostConfig({Id, Name, FolderId, CodeType, Description, Content, IsPublic})
        );

    if(response.ok){
        const EditFolderResponse = await response.json();
        return EditFolderResponse;
    }else {
        return false
    }    
}


export const DeletingFile = async(Id) => {
    
    const response = await fetch(
        `https://localhost:7186/api/Files/DeleteFileById/${Id}`, GetPostConfig({Id})
        );

    if(response.ok){
        const DeleteFolderResponse = await response.json();
        return DeleteFolderResponse;
    }else {
        return false
    }    
      

}


const API = {
    GetFolderFiles,
    AddingFile,
    EditingFile,
    DeletingFile,
    GetFileDetail
}

export default API;