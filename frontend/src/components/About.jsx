import React from "react";
import "../style/About.css"

function About(){
    return(
        <main className="about-page">
            <section>
                <div className="warning-card">
                    <h2>!</h2>
                </div>

                <h1 className="warning">Privacy Warning</h1>
                <p className="warning-message">
                    This page is for testimg purposes only.
                    Please do not enter or share any perisinal, 
                    senasative, or confidential information.
                </p>
                <div className="warning-notices">
                    <strong>Important:</strong> Keep your personal 
                    information safe while using this acpplication
                </div>
            </section>
        </main>
    );
}

export default About;