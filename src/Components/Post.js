import React, { useContext , useState } from 'react'
import { AuthContext } from '../Contexts/AuthContext';
import { DarkModeContext } from '../Contexts/DarkModeContext';
import {doc, setDoc, Timestamp,serverTimestamp} from 'firebase/firestore'
import { db } from '../firebase-config';
import Loading from './Loading';
import Popup from './PopUp';

export default function Post({data,deletePost}) {
    const {currentUser,isAuth} = useContext(AuthContext);
    const [darkMode] = useContext(DarkModeContext);
    const [editingoading, setEditingLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const darkClass = darkMode ? "dark" : ""
    const [editData, setEditData] = useState({
        title : data.title,
        post : data.post
    });
    if (data.timestamp === null) {
        return <Loading/>
    }
    const timestamp = new Timestamp(data.timestamp.seconds,data.timestamp.nanoseconds) 
    const date = timestamp.toDate()

    async function editPost() {
        // 
        // const title = prompt("New title",data.title)
        // const post = prompt("new post",data.post)

        const docRef = doc(db,"posts",data.id)

        setEditingLoading(true)

        await setDoc(docRef, 
                        {
                            title :editData.title,
                            post : editData.post,
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
            <h1 className='title'>{data.title}</h1>
            {isAuth && data.author.id === currentUser.uid &&
            <div className='deletePost'>
                <button onClick={() => setIsOpen(true)} className='trashcan'><i className="fa-solid fa-pen-to-square"></i></button>
                <button onClick={deletePost} className='trashcan'><i className="fa-solid fa-trash-can"></i></button>
                <Popup 
                    isOpen={isOpen} 
                    onClose={() => setIsOpen(false)}
                    editData={editData}
                    setEditData={setEditData} 
                    editPost={editPost}
                />
            </div>}
        </div>
        <div className='post--container'>
            <p>{data.post}</p>
        </div>
        <div className='post--autor'>@{data.author.name} <span className='time'>posted at {date.getHours()}:{date.getMinutes()} {date.getFullYear()}/{date.getMonth()}/{date.getDate()}</span></div>
    </div>
  )
}
