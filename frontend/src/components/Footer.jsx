import React from "react";


function Footer(){
    const footerStyle = {
        background: "linear-gradient(90deg, #628be3, #c9b5ea, #f5dbe8)", 
        paddingBottom: "3vh",
        textAlign: "left",
        fontSize: "20px",

    };

    const allRights = {
        fontFamily: "Arial, Helvetica, sans-serif"
    }
    return(
        <footer style={footerStyle}>
            <p style={allRights}>@All rights reserved</p>
        </footer>
    )
}

export default Footer; 