import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthProvider =({children})=>{
    const [sessId,setSessId]=useState();
    const [reqToken,setReqToken]=useState();

    return(
        <AuthContext.Provider
            value={{sessId,setSessId, reqToken,setReqToken}}>
                {children}
        </AuthContext.Provider>
    );
};
