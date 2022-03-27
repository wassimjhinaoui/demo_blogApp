import { collection, doc,deleteDoc, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import React,{useEffect, useState,useCallback,useContext} from 'react'
import { db } from '../firebase-config';
import Post from './Post'
import { AuthContext } from '../Contexts/AuthContext';
import { DarkModeContext } from '../Contexts/DarkModeContext';
import Loading from './Loading';

function isEmpty(obj) {
    if (!obj) {
        return true
    }
    return Object.keys(obj).length === 0;
}

const Profile = () => {
    const {isAuth,currentUser,signUserOut} = useContext(AuthContext)
    const [posts, setPosts] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [darkMode] = useContext(DarkModeContext);
    const darkClass = darkMode ? "dark" : ""

  const deletePost = useCallback(async (id) => {
      const postDoc = doc(db,"posts",id)
      await deleteDoc(postDoc)
      setDeleted(true)
    },
    []
  )
  
  useEffect(()=>{
    if (isEmpty(currentUser) || !isAuth) {
        return
    }
    setDeleted(false)
    const postCollectionRef = collection(db,"posts")
    const q = query(postCollectionRef,where("author.id","==",currentUser.uid),orderBy('timestamp','desc'))
    const unsub = onSnapshot(q,(snapshot)=>
      setPosts(snapshot.docs.map(doc => ({...doc.data(),id:doc.id})))
    )
    setLoading(false)
    return unsub
  },[deleted,currentUser,isAuth])
  if (isEmpty(currentUser)) {
      return <Loading/>
  }
    
    return (
        <div className='profile-container'>
            <div className={'profile-header '+darkClass}>
                <img src={currentUser.photoURL} alt="" />
                <span className='user-credentials'>
                    <h1>{currentUser.displayName}</h1>
                    <h4 className='abc'>{currentUser.email}</h4>
                    <button onClick={signUserOut}>LogOut</button>
                </span>
            </div>
            { 
                !loading ? posts.map(post => (<Post key={post.id} loading={loading} deletePost={()=>deletePost(post.id)} data={post} />)) : 
                            <Loading />
            }
        </div>
    );
}

export default Profile;
