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



export const GetUserTags = async(userId) => {

    const response = await fetch(
        `https://localhost:7186/GetTags/${userId}`, GetConfig);

    
    if(response.ok){
        const GetUserTagsResponse = await response.json();
        return GetUserTagsResponse;
    }else{
        return false
    }

}


export const AddingTag = async(UserId, Name, Color) => {

    const response = await fetch(
        `https://localhost:7186/AddTag`, GetPostConfig({UserId, Name, Color})
        );

    if(response.ok){
        const AddTagResponse = await response.json();
        return AddTagResponse;
    }else {
        return false
    }   

}


export const EditingTag = async(Id, Name, Color) => {

    const response = await fetch(
        `https://localhost:7186/EditTag/${Id}`, GetPostConfig({Id, Name, Color})
        );

    if(response.ok){
        const EditTagResponse = await response.json();
        return EditTagResponse;
    }else {
        return false
    }    
}


export const DeletingTag = async(Id) => {
    
    const response = await fetch(
        `https://localhost:7186/api/Tags/DeleteTagById/${Id}`, GetPostConfig({Id})
        );

    if(response.ok){
        const DeleteTagResponse = await response.json();
        return DeleteTagResponse;
    }else {
        return false
    }    
      

}


const API = {
    GetUserTags,
    AddingTag,
    EditingTag,
    DeletingTag
}

export default API;