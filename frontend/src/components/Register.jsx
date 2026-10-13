
import React, { useState } from "react";
import "../style/Login.css";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Send registration information to Django
            await api.post("/register/", {
                username,
                email,
                password,
            });

            alert("Account created successfully!");

            // Redirect to Login
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);

            const message = error.response?.data
                ? JSON.stringify(error.response.data)
                : "Unable to register. Please try again.";

            alert(message);
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
                    <h2 id="login">Create Account</h2>

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

                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

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
                            {loading ? "Creating Account..." : "Register"}
                        </button>

                        <p>Already have an account?</p>

                        <button
                            type="button"
                            id="register"
                            onClick={() => navigate("/login")}
                        >
                            Sign In
                        </button>
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

export default Register;
