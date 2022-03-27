import React from 'react';
import ReactDOM from "react-dom";

const modal_styles = {
    position:"fixed",
    top:"50%",
    left:"50%",
    transform:"translate(-50%, -50%)",
    zIndex:1000,
    boxShadow: "0px 3px 10px black",
    margin: "5px",
    padding:" 10px",
    backgroundColor:" rgb(248, 248, 248)",
    height:"60%",
    width:"60%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:"50%"
    
}
const overlay_styles = {
    position:"fixed",
    top:0,
    left:0,
    bottom:0,
    right:0,
    backgroundColor:"rgba(0,0,0,.7)",
    zIndex:1000
}

const Popup = ({isOpen,onClose,editData,setEditData,editPost}) => {
    function handelChange(e) {
        const {name,value} = e.target
        setEditData(prev => ({
            ...prev,
            [name] : value
        }))
    }
    function edit(e) {
        e.preventDefault()
        editPost()
        onClose()
    }
    if (!isOpen) {
        return null
    }


    return ReactDOM.createPortal (
        <>
        <div style={overlay_styles}></div>
        <div style={modal_styles}>
            <button onClick={onClose} className="close-button"><i class="fa-solid fa-circle-xmark"></i></button>
            <form onSubmit={edit} className="popup-form" >
                <span>
                    <label htmlFor='title' >Title</label>
                    <input type="text" id='title' name="title" value={editData.title} onChange={handelChange} />
                </span>
                <span>
                    <label htmlFor='post' >post</label>
                    <textarea id='post' name="post" value={editData.post} onChange={handelChange} />
                </span>
                <button  onClick={()=> console.log(editData)}>Update</button>
            </form>
        </div>
        </>
    ,document.getElementById('portal'));
}

export default Popup;
