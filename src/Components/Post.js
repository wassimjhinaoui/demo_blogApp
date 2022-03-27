import React, { useContext , useState } from 'react'
import { AuthContext } from '../Contexts/AuthContext';
import { DarkModeContext } from '../Contexts/DarkModeContext';
import {doc, setDoc, Timestamp,serverTimestamp} from 'firebase/firestore'
import { db } from '../firebase-config';
import { SemipolarLoading } from 'react-loadingg';
import Loading from './Loading';
// import Popup from './PopUp';

export default function Post({data,deletePost}) {
    const {currentUser,isAuth} = useContext(AuthContext);
    const [darkMode] = useContext(DarkModeContext);
    const [editingoading, setEditingLoading] = useState(false);
    // const [isOpen, setIsOpen] = useState(false);
    const darkClass = darkMode ? "dark" : ""
    if (data.timestamp === null) {
        return <Loading/>
    }
    const timestamp = new Timestamp(data.timestamp.seconds,data.timestamp.nanoseconds) 
    const date = timestamp.toDate()

    async function editPost() {
        // setIsOpen(true)
        const title = prompt("New title",data.title)
        const post = prompt("new post",data.post)
        const docRef = doc(db,"posts",data.id)

        setEditingLoading(true)

        await setDoc(docRef, 
                        {
                            title :title,
                            post : post,
                            author:data.author,
                            timestamp :serverTimestamp()
                        }
                     )
        setEditingLoading(false)
    }

    if (editingoading) {
        return <Loading/>
    }

    
  return (
    <div className={darkClass+' post'}>
        <div className='post--header'>
            <h1>{data.title}</h1>
            {isAuth && data.author.id === currentUser.uid &&
            <div className='deletePost'>
                <button onClick={editPost} className='trashcan'><i className="fa-solid fa-pen-to-square"></i></button>
                <button onClick={deletePost} className='trashcan'><i className="fa-solid fa-trash-can"></i></button>
                {/* <Popup isOpen={isOpen}>
                    some text
                </Popup> */}
            </div>}
        </div>
        <div className='post--container'>
            <p>{data.post}</p>
        </div>
        <div className='post--autor'>@{data.author.name} <span className='time'>posted at {date.getHours()}:{date.getMinutes()} {date.getFullYear()}/{date.getMonth()}/{date.getDay()}</span></div>
    </div>
  )
}
