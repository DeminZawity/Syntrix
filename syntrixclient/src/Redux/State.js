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
    UserColor:"",
    IsAuthenticated: false,
    CurrentTab : "Directory",
    FolderId: null
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
                    CurrentTab : action.payload
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