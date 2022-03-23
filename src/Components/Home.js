import { getDocs,collection, doc,deleteDoc } from 'firebase/firestore';
import React,{useEffect, useState,useCallback} from 'react'
import { db } from '../firebase-config';
import Post from './Post'

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [deleted, setDeleted] = useState(false);


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
    async function getPosts() {
      const data =await getDocs(postCollectionRef)
      setPosts(data.docs.map(doc => ({...doc.data(),id:doc.id})))
    }
    getPosts()
  },[deleted])

  return (
    <div className='homePage'>
      {posts.map(post => (<Post key={post.id} deletePost={()=>deletePost(post.id)} data={post} />))}
    </div>
  )
}
