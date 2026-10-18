
import React, { useState } from "react";
import "../style/Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

function Navbar() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const isLoggedIn = Boolean(localStorage.getItem(ACCESS_TOKEN));

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const logOut = () => {
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(ACCESS_TOKEN);

        closeMenu();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <button
                type="button"
                className="menu-toggle"
                onClick={() => setMenuOpen((previous) => !previous)}
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
            >
                {menuOpen ? "×" : "☰"}
            </button>

            <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
                <NavLink
                    to="/"
                    end
                    className="navbar-item"
                    onClick={closeMenu}
                >
                    Home
                </NavLink>

                <NavLink
                    to="/about"
                    className="navbar-item"
                    onClick={closeMenu}
                >
                    About
                </NavLink>

                <NavLink
                    to="/contact"
                    className="navbar-item"
                    onClick={closeMenu}
                >
                    Contact
                </NavLink>

                {isLoggedIn ? (
                    <>
                        <NavLink
                            to="/expense"
                            className="navbar-item"
                            onClick={closeMenu}
                        >
                            Expense
                        </NavLink>

                        <button
                            type="button"
                            className="navbar-item"
                            onClick={logOut}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <NavLink
                        to="/login"
                        className="navbar-item"
                        onClick={closeMenu}
                    >
                        Login
                    </NavLink>
                )}
            </div>
        </nav>
    );
}

export default Navbar;