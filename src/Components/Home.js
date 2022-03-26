import { collection, doc,deleteDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import React,{useEffect, useState,useCallback,useContext} from 'react'
import { db } from '../firebase-config';
import Post from './Post'
import CreatePost from './CreatePost'
import { AuthContext } from '../Contexts/AuthContext';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const {isAuth} = useContext(AuthContext)


  const deletePost = useCallback(async (id) => {
      const postDoc = doc(db,"posts",id)
      await deleteDoc(postDoc)
      setDeleted(true)
    },
    []
  )
  
  useEffect(()=>{
    setDeleted(false)
    const postCollectionRef = collection(db,"posts")
    const q = query(postCollectionRef,orderBy('timestamp','desc'))
    const unsub = onSnapshot(q,(snapshot)=>
      setPosts(snapshot.docs.map(doc => ({...doc.data(),id:doc.id})))
    )
    setLoading(false)
    return unsub
  },[deleted])

  return (
    <div className='homePage'>
      {isAuth &&  <CreatePost setLoading={setLoading}/>}
      { 
        !loading && posts.map(post => (<Post key={post.id} loading={loading} deletePost={()=>deletePost(post.id)} data={post} />))
      }
    </div>
  )
}
