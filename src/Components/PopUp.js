import React from 'react';

const modal_styles = {
    position:"fixed",
    top:"50%",
    left:"50%",
    transform:"translete(-50%,-50%)"
}

const Popup = ({isOpen,children}) => {

    if (!isOpen) {
        return null
    }


    return (
        <div style={modal_styles}>
            {children}
        </div>
    );
}

export default Popup;
