import React, { useContext } from 'react'
import {AuthContext} from '../Contexts/AuthContext'

export default function LogOut() {
    const {signUserOut} = useContext(AuthContext)
  return (
    <div className='login'>
        <h1>Log out from your account</h1>
        <button onClick={signUserOut}>LogOut</button>
    </div>
  )
}
