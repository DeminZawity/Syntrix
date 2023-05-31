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

export const GetResources = async(userId) => {

    const response = await fetch(
        `https://localhost:7186/GetResources/${userId}`, GetConfig);

    
    if(response.ok){
        const GetResourcesResponse = await response.json();
        return GetResourcesResponse;
    }else{
        return false
    }

}

export const AddingResource = async({UserId, Name, Description, Link}) => {

    const response = await fetch(
        `https://localhost:7186/AddResource`, GetPostConfig({UserId, Name, Description, Link})
        );

    if(response.ok){
        const AddResourceResponse = await response.json();
        return AddResourceResponse;
    }else {
        return false
    }    
}

export const EditingResource = async(Id, Name, Description, Link) => {

    const response = await fetch(
        `https://localhost:7186/EditResource/${Id}`, GetPostConfig({Name, Description, Link})
        );

    if(response.ok){
        const EditResourceResponse = await response.json();
        return EditResourceResponse;
    }else {
        return false
    }    
}

export const DeletingResource = async(Id) => {
    
    const response = await fetch(
        `https://localhost:7186/api/Resources/DeleteResourceById/${Id}`, GetPostConfig({Id})
        );

    if(response.ok){
        const DeleteResourceResponse = await response.json();
        return DeleteResourceResponse;
    }else {
        return false
    }    
      

}

const API = {
    GetResources,
    AddingResource,
    EditingResource,
    DeletingResource
}

export default API;