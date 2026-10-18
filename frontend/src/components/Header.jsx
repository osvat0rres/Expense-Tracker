
import React from "react";
import Navbar from "./Navbar";
import "../style/Header.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <section className="header-top">
                {/* Logo */}
                <section className="header-top__logo">
                    <Link to="/" className="header-logo">
                        Expenses
                    </Link>
                </section>

                {/* Navigation */}
                <section className="header-top__navbar">
                    <section className="header-top__navigation">
                        <Navbar />
                    </section>
                </section>
            </section>

            {/* Colorful separator */}
            <hr className="header-top__separator" />

            {/* Contact information */}
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