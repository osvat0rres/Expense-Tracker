
import React, { useState } from "react";
import "../style/Login.css";
import api from "../api";
import { useNavigate } from "react-router-dom";
import validator from 'validator';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isPaswordValid, setIsPasswordValid] = useState(false);

    const navigate = useNavigate();

    const validation = (value) => {
        const isValid = validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1
        });

        setIsPasswordValid(isValid);
        if (isValid){
            setErrorMessage("The password is strong");
        }else{
            setErrorMessage(
                <ul>
                    <li>Need 1 lowercase letter</li>
                    <li>Needs 1 upercase letter</li>
                    <li>Needs 1 symbol</li>
                    <li>Needs 1 number</li>
                    <li>Minimun lenght: 8 characters</li>
                </ul>

            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1
        })) {
            validation(password);
            return;
        }
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
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validation(e.target.value);
                            }}
                            required
                        /> <br/>
                        {errorMessage === '' ? null : <span style={{fontWeight:'bold', color:'red',}}>{errorMessage}</span>}

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
