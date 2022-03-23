import React,{useContext} from 'react'
import {AuthContext} from '../Contexts/AuthContext'  

export default function Login() {

  const {login} = useContext(AuthContext)
  return (
    <div className='login'>
        <h1>Log In with google</h1>
        <button onClick={login}>Log in</button>
    </div>
  )
}
