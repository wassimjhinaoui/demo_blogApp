import React,{useState,useContext, useEffect} from 'react'
import {addDoc, collection} from 'firebase/firestore'
import { db } from '../firebase-config';
import { AuthContext } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../Contexts/DarkModeContext';

export default function CreatePost() {
    const [formData, setFormData] = useState({
        title:"",
        post:"",
    });

    const [darkMode] = useContext(DarkModeContext);
    const darkClass = darkMode ? "dark" : ""

    const {currentUser,isAuth} = useContext(AuthContext);

    
    function handelChange(e) {
        const {name,value} = e.target
        setFormData(prev => ({
            ...prev,
            [name] : value
        }))
    }
    
    const navigate = useNavigate()
    
    const postCollectionRef = collection(db,"posts")
    async function CreatePost(e) {
        e.preventDefault()
        await addDoc(postCollectionRef, 
                        {
                            title :formData.title,
                            post : formData.post,
                            author:{name: currentUser.displayName , id :currentUser.uid }
                        }
                     )
                     console.log(currentUser)
        navigate('/')
    }

    useEffect(()=>{
        if (!isAuth) {
            navigate('/login')
        }
    
    },[])
  return (
    <form className={'create--post ' + darkClass}>
        <span>
            <label htmlFor='title' >Title</label>
            <input type="text" id='title' name="title" value={formData.title} onChange={handelChange} />
        </span>
        <span>
            <label htmlFor='post' >post</label>
            <textarea id='post' name="post" value={formData.post} onChange={handelChange} />
        </span>
        <button onClick={CreatePost}>Add post</button>
    </form>
  )
}
