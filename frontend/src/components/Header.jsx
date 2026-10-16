import React from "react";
import Navbar from "./Navbar";
import '../style/Header.css';

function Header(){
    return(
        <header className="header">
            <section className="header-top">
                {/* Logo */}
                <section className="header-top__logo">
                    <a href="/" className="header-logo">Expenses</a>
                </section>
                {/*Navigation */}
                <section className="header-top__nav">
                    <section className="header-top__navigation">
                        <Navbar/>
                    </section>
                </section>
            </section>
            <hr className="header-top__separator"></hr>
            
            <section className="header-bottom">
                <section className="header-bottom__phone">
                    <p>Phone Number</p>
                </section>

                <section className="header-bottom__email">
                    <p>shop.info@gmail.com</p>
                </section>
            </section>
        </header>
       
    );
}

export default Header;