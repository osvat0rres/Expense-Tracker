
import React from "react";
import '../style/Navbar.css';
import { Link } from "react-router-dom";

function Navbar(){
    return(
       <section>
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/about" className="navbar-item">About</Link>
            <Link to="/contact" className="navbar-item">Contact</Link>
            <Link to="/login" className="navbar-item">Login</Link>

       </section>
    )
}

export default Navbar;

