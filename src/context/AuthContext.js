import { createContext,useReducer} from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE={
    user:{
        _id:
        "6370a67808e49875b3ffbe3a",
        username:
        "imad",
        email:
        "imad@gmail.com",
        password:
        "$2b$10$eaVYyZwgGjjwYK4QJ4FM7uJzJakTtQ9Ley9yO9SroE0vKKZsSnEDO",
        
        profilePicture:
        "",
        coverPicture:
        "",
        
        followers:
        [],
        
        following:[],
        
        isAdmin:
        false,
        
    
    },
    isFetching:false,
    error:false
};
export const AuthContext= createContext(INITIAL_STATE)
export const AuthContextProvider=({children})=>{
    const [state,dispatch]=useReducer(AuthReducer,INITIAL_STATE);
    return(
        <AuthContext.Provider value={{
user:state.user,
isFetching:state.isFetching,
error:state.error,
dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}