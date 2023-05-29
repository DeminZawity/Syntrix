import {applyMiddleware, createStore} from "redux";
import { persistStore,persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import  storage  from "redux-persist/lib/storage";

const initialState = {
    User:{
        firstName:"",
        lastName:"",
        email:"",
        title:"",
    },
    UserColor:"#0487FF",
    IsAuthenticated: false,
    CurrentTab : "Directory",
    CurrentWorkingFolder:{
        FolderId: null,
        FolderName: null,
    },
    CurrentWorkingFile:{
        FileId: null,
        FileName: null,
        FileFolderId: null,
        FileCodeType: null,
        FileDescription: null,
        FileContent: null,
        FileIsPublic: null,
    }
}

const Bridge = (state = initialState, action) => {
    switch(action.type){
        case "LOGIN_USER":
            return {
                ...state, 
                User: action.payload,
                IsAuthenticated: true,
            };
        case "UPDATE_TAB":
            return {
                ...state,
                CurrentTab : action.payload
            };
        case "SET_FOLDER":
                return {
                ...state,
                CurrentWorkingFolder: action.payload,
                };
       case "SET_FILE":
                return {
                ...state,
                CurrentWorkingFile: action.payload,
                };
        case "SET_COLOR":
                    return {
                    ...state,
                    UserColor: action.payload,
                    };
        default:
            return state;
    }
}

const persistConfig = {
    transform : [
        encryptTransform({
            secretKey : "alsjdhfaklsdf987yasdf@",
            onError : function(err){
                console.log('_err')
            },
        }),
    ],
    key : 'main-root',
    storage,
}


const persistBridgeConfig = persistReducer(persistConfig,Bridge)

const STORE = createStore(persistBridgeConfig, applyMiddleware());

const Persitor = persistStore(STORE)

export {Persitor}

export default STORE;