import React, { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext';
import { DarkModeContext } from '../Contexts/DarkModeContext';
import {Timestamp} from 'firebase/firestore'

export default function Post({data,deletePost}) {
    const {currentUser,isAuth} = useContext(AuthContext);
    const [darkMode] = useContext(DarkModeContext);
    const darkClass = darkMode ? "dark" : ""
    if (data.timestamp === null) {
        return <div>Loading</div>
    }
    const timestamp = new Timestamp(data.timestamp.seconds,data.timestamp.nanoseconds) 
    const date = timestamp.toDate()

    
  return (
    <div className={darkClass+' post'}>
        <div className='post--header'>
            <h1>{data.title}</h1>
            {isAuth && data.author.id === currentUser.uid &&
            <div className='deletePost'>
                <button onClick={deletePost} className='trashcan'><i className="fa-solid fa-trash-can"></i></button>
            </div>}
        </div>
        <div className='post--container'>
            <p>{data.post}</p>
        </div>
        <div className='post--autor'>@{data.author.name} <span className='time'>posted at {date.getHours()}:{date.getMinutes()} {date.getFullYear()}/{date.getMonth()}/{date.getDay()}</span></div>
    </div>
  )
}
