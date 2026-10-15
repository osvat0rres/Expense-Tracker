import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"

function ProtectedRoute({children}){
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])


    const refreshToken = async () => {
    const refresh = localStorage.getItem(REFRESH_TOKEN);

    if (!refresh) {
        setIsAuthorized(false);
        return;
    }

    try {
        const res = await api.post("/api/token/refresh/", {
            refresh: refresh,
        });

        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
    } catch (error) {
        console.error("Token refresh failed:", error);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setIsAuthorized(false);
    }
};

    //This function will check if we need to referesh and acces token

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)


        if(!token){
            setIsAuthorized(false)
            return
        }
        const decode = jwtDecode(token)
        const tokenExpiration = decode.exp
        const now = Date.now() / 1000

        if (tokenExpiration < now){
            await refreshToken()
        }else {
            setIsAuthorized(true)
        }
    }

    
    if (isAuthorized === null){
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute;