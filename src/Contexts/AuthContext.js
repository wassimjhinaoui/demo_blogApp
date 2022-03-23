import React, {createContext, useState,useEffect, useCallback } from 'react'
import {auth,provider} from '../firebase-config'
import {signInWithPopup, signOut} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'


export const AuthContext = createContext()

export function AuthProvider(props) {
    const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
    const [currentUser, setCurrentUser] = useState({});

    const navigate = useNavigate()

    const login = useCallback(() =>{
        signInWithPopup(auth,provider)
            .then(()=>setCurrentUser(auth.currentUser))
            .then(res => {
                localStorage.setItem("isAuth",true)
                setIsAuth(true)
                navigate("/")
            })
        
    },[navigate])

    useEffect(() => {
        if (isAuth) {
            login()
        }
    }, [isAuth,login]);

    function signUserOut() {
        signOut(auth).then(() =>{
            localStorage.clear()
            setIsAuth(false)
            navigate("/login")
        })
    }

    const value = {
        isAuth,
        login,
        signUserOut,
        currentUser
    }
  return (
    <AuthContext.Provider value={value}>
        {props.children}
    </AuthContext.Provider>
  )
}
