
import React from "react";
import "../style/Body.css";
import { useNavigate } from "react-router-dom";
import Extra from "./Extra";



function Body(){
     const navigate = useNavigate();

    return(
        <div>
            <main className="body">
                    <section className="announcement-box">

                        <section className="announcement-image">
                            <img src="/" alt="Expense tracker illurstation"></img>
                        </section>

                        <section className="announcement-conten">
                            <p className="announcement-subtitle">
                                welcome
                            </p>
                            <h1 className="announcement-title">
                                Take Controle of Your Exepense
                            </h1>
                            <p>
                                Keep tack of your spending, manage your budges and 
                                stay in control of your finances
                            </p>
                            <button type="button"  className="announcement-button"
                                        onClick={() => navigate("/login")}>
                                        Get Started
                                    </button>
                        </section>
                    </section>
                </main>
            <Extra />
        </div>
    
    )
}

export default Body;