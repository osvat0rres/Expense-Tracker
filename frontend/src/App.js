
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Body from "./components/Body";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


// Log out the user and redirect to Login
function Logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    return <Navigate to="/login" replace />;
}

// Display the Register form
function RegisterAndLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    return <Register />;
}

function App() {
    const appStyle = {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        margin: 0,
    };

    const mainStyle = {
        flex: 1,
    };

    return (
        <BrowserRouter>
            <div style={appStyle}>
                <Header />

                <main style={mainStyle}>
                    <Routes>
                        {/* Home page */}
                        <Route
                            path="/"
                            element={<Body />}
                        />

                        {/* About page */}
                        <Route
                            path="/about"
                            element={<About />}
                        />

                        {/* Login page */}
                        <Route
                            path="/login"
                            element={
                                <Login
                                    route="/api/token/"
                                    method="login"
                                />
                            }
                        />

                        {/* Registration page */}
                        <Route
                            path="/register"
                            element={<RegisterAndLogout />}
                        />

                        {/* Contact page */}
                        <Route
                            path="/contact"
                            element={<Contact />}
                        />

                        {/* Logout route */}
                        <Route
                            path="/logout"
                            element={<Logout />}
                        />

                        {/* Redirect unknown URLs */}
                        <Route
                            path="*"
                            element={<Navigate to="/" replace />}
                        />
                    </Routes>
                </main>

                {/* Footer appears only on the home page */}
                <Routes>
                    <Route
                        path="/"
                        element={<Footer />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
