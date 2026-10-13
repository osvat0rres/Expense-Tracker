import React, { useState } from "react";
import "../style/Login.css";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

function Login({ route, method }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const isLogin = method === "login";
    const name = isLogin ? "Login" : "Register";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post(route, {
                username,
                email,
                password,
            });

            if (isLogin) {
                localStorage.setItem(
                    ACCESS_TOKEN,
                    res.data.access
                );

                localStorage.setItem(
                    REFRESH_TOKEN,
                    res.data.refresh
                );

                navigate("/");
            } else {
                // Registration successful
                navigate("/login");
            }
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data
                    ? JSON.stringify(error.response.data)
                    : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mainBox">
            <div className="login-content">
                <h2 className="main-header">
                    Welcome to Expense
                </h2>

                <form onSubmit={handleSubmit}>
                    <h2 id="login">{name}</h2>

                    <div className="main-body">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            required
                        />

                        {!isLogin && (
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />
                        )}

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                        <button type="submit" disabled={loading}>
                            {loading ? "Please wait..." : name}
                        </button>

                        {isLogin ? (
                            <>
                                <p>Don't have an account?</p>

                                <button
                                    type="button"
                                    id="register"
                                    onClick={() => navigate("/register")}
                                >
                                    Register
                                </button>
                            </>
                        ) : (
                            <>
                                <p>Already have an account?</p>

                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                >
                                    Sign In
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>

            <section className="login-image">
                <img
                    src="/expense-illustration.png"
                    alt="Expense tracking illustration"
                />
            </section>
        </div>
    );
}

export default Login;

