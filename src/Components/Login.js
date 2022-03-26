import React,{useContext} from 'react'
import {AuthContext} from '../Contexts/AuthContext'  

export default function Login() {

  const {login,isLogingIn} = useContext(AuthContext)
  return (
    <div className='login'>
        <h1>Log In with google</h1>
        <button className='login-with-google-btn' disabled={isLogingIn} onClick={login}>Sign in with Google</button>
    </div>
  )
}
