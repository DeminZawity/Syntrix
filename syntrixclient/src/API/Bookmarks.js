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

export const GetUserBookmarks = async(userId) => {

    const response = await fetch(
        `https://localhost:7186/GetBookmarks/${userId}`, GetConfig);

    
    if(response.ok){
        const GetBookmarksResponse = await response.json();
        return GetBookmarksResponse;
    }else{
        return false
    }
    
}

export const AddingBookmark = async(UserId, FolderId) => {

    const response = await fetch(
        `https://localhost:7186/AddBookmark`, GetPostConfig({UserId, FolderId})
        );

    if(response.ok){
        const AddBookmarkResponse = await response.json();
        return AddBookmarkResponse;
    }else {
        return false
    }    
}



export const DeletingBookmark = async(Id) => {
    const response = await fetch(
        `https://localhost:7186/api/Bookmarks/DeleteBookmarkById/${Id}`, GetPostConfig({Id})
        );

    if(response.ok){
        const AddBookmarkResponse = await response.json();
        return AddBookmarkResponse;
    }else {
        return false
    }    
}

const API = {
    AddingBookmark,
    DeletingBookmark,
    GetUserBookmarks
}

export default API;