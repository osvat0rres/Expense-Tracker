import React, { useState, useEffect } from "react";
import api from "../api";
import "../style/Expense.css"

function Expense() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        category: "bills",
        spend: "",
        description: "",
        spend_date: "",
    });

    // Get expenses belonging to the logged-in user
    const fetchExpenses = async () => {
        try {
            const response = await api.get("/expenses/");
            setExpenses(response.data);
        } catch (err) {
            console.error(err);
            setError("Could not load expenses. Please log in again if needed.");
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/user/");
                setUsername(response.data.username)
            }catch(err) {
                console.error("Couild could not get user: ", err)
            }
        };
        fetchUser();
    }, [])

    useEffect(() => {
        fetchExpenses();
    }, []);

    // Update form fields when the user types
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Submit the new expense to Django
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await api.post("/expenses/", {
                ...formData,
                spend_date: new Date(formData.spend_date).toISOString(),
            });

            setFormData({
                title: "",
                category: "bills",
                spend: "",
                description: "",
                spend_date: "",
            });

            await fetchExpenses();
        } catch (err) {
            console.error(err);
            setError(
                JSON.stringify(
                    err.response?.data || "Could not save expense."
                )
            );
        } finally {
            setLoading(false);
        }
    };
return (
    <main className="expense-page">
        {/*mian header */}
        <header className="expense-header">
            <div>
                <p className="welcome-text">
                    Welcome back, {username}!
                </p>
                <h1>Expense Tracker</h1>
                <p className="page-description">
                    Track your spending and take control of your money.
                </p>
            </div>
        </header>
        
        {/*The top part where you enter the inputs and where you display them*/}
        <div className="expense-layout">
            <section className="expense-panel">
                <div className="panel-heading">
                    <h2>Add an Expense</h2>
                    <p>Enter the details of your transaction.</p>
                </div>

                 {/*Input fileds*/}
                <form onSubmit={handleSubmit} className="formSection">
                    <div className="expense-title-field">
                        <label htmlFor="title">Expense Title</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="e.g. Grocery shopping"
                            value={formData.title}
                            onChange={handleChange}
                            maxLength={100}
                            required
                        />
                    </div>

                    <div className="category">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="bills">Bills</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="gas">Gas</option>
                            <option value="rent">Rent</option>
                            <option value="utilities">Utilities</option>
                            <option value="credit card">Credit Card</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="amount">
                        <label htmlFor="spend">Amount ($)</label>
                        <input
                            id="spend"
                            type="number"
                            name="spend"
                            placeholder="0.00"
                            value={formData.spend}
                            onChange={handleChange}
                            min="0.01"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="description">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="What was this expense for?"
                            value={formData.description}
                            onChange={handleChange}
                            maxLength={500}
                            required
                        />
                    </div>

                    <div className="date-of-expense">
                        <label htmlFor="spend_date">Date of Expense</label>
                        <input
                            id="spend_date"
                            type="datetime-local"
                            name="spend_date"
                            value={formData.spend_date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "＋ Add Expense"}
                    </button>
                </form>

                {error && (
                    <p className="expense-error" role="alert">
                        {error}
                    </p>
                )}
            </section>

            {/*Pass expenses*/}
            <section className="expenses-panel">
                <div className="panel-heading">
                    <h2>Your Expenses</h2>
                    <p>Review your recent transactions.</p>
                </div>

                {expenses.length === 0 ? (
                    <div className="empty-expenses">
                        <div className="empty-icon">＄</div>
                        <h3>No expenses yet</h3>
                        <p>Your expenses will appear here after you add one.</p>
                    </div>
                ) : (
                    <div className="expense-list">
                        {expenses.map((expense) => (
                            <article
                                className="expense-card"
                                key={expense.id}
                            >
                                <div className="expense-card-top">
                                    <h3>{expense.title}</h3>
                                    <span className="expense-amount">
                                        ${Number(expense.spend).toFixed(2)}
                                    </span>
                                </div>

                                <span className="expense-category">
                                    {expense.category}
                                </span>

                                <p className="expense-card-description">
                                    {expense.description}
                                </p>

                                <p className="expense-date">
                                    {new Date(
                                        expense.spend_date
                                    ).toLocaleString()}
                                </p>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    </main>
);

}
export default Expense;
