import React, { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext';
import { DarkModeContext } from '../Contexts/DarkModeContext';

export default function Post({data,deletePost}) {
    const {currentUser,isAuth} = useContext(AuthContext);
    const [darkMode] = useContext(DarkModeContext);
    const darkClass = darkMode ? "dark" : ""
    
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
        <div className='post--autor'>@{data.author.name}</div>
    </div>
  )
}
