import React, { useState, useEffect } from "react";
import api from "../api";

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
        <div>
            <h1>Welcome {username}</h1>
            <h1>Expense Tracker </h1>
            <p>Add and manage your expenses.</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Expense Title</label>
                    <input type="text" name="title" placeholder="e.g. Grocery shopping" value={formData.title}
                        onChange={handleChange}  maxLength={100} required />
                </div>

                <div>
                    <label>Category</label>
                    <select
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

                <div>
                    <label>Amount ($)</label>
                    <input type="number" name="spend" placeholder="0.00" value={formData.spend} 
                     onChange={handleChange} min="0.01" step="0.01" required />
                </div>

                <div>
                    <label>Description</label>
                    <textarea name="description" placeholder="Add details about this expense"
                        value={formData.description} onChange={handleChange} maxLength={500} required />
                </div>

                <div>
                    <label>Date of Expense</label>
                    <input type="datetime-local" name="spend_date" value={formData.spend_date}
                        onChange={handleChange} required  />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Add Expense"}
                </button>
            </form>

            <p style={{color: "red"}} >{error}</p>

            <hr />

            <h2>Your Expenses</h2>

            {expenses.length === 0 ? (
                <p>No expenses added yet.</p>
            ) : (
                expenses.map((expense) => (
                    <div key={expense.id} >
                        <h3>{expense.title}</h3>
                        <p>Category: {expense.category}</p>
                        <p>Amount: ${Number(expense.spend).toFixed(2)}</p>
                        <p>{expense.description}</p>
                        <p>
                            Date:{" "}
                            {new Date(expense.spend_date).toLocaleString()}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Expense;
