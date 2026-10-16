import React, { useState, useEffect} from "react";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import { data } from "react-router-dom";


function Contact(){

    const [review, setReview] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(true); 
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    
    {/* This fucntion check if the user is log in.
        The token is store and if and is pass to the variable
        if there is a token save, then the boolen return true */}
    const token = localStorage.getItem(ACCESS_TOKEN)
    const isLoggedIn = Boolean(token)


    {/* This function return all existing reviews from the backend*/}

    const loadReviews = async () => {
        try{
            const response = await api.get("/review/reviews/");
            setReview(response.data);
            setError("");
        } catch (err){
            console.error("Error loading reviews: ",
                err.response?.data || err.message);
                setError("Unable to load reviews. Plase try again.");
        }finally{
            setLoading(false);
        }
    };
    useEffect(() =>{
        loadReviews();

    }, []);

    {/* This handles reviews submission */}
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!comment.trim()){
            setError("Please enter a comment.");
            return;
        }

        setSubmitting(true);

        try{
            await api.post("/review/reviews/", {
                rating: Number(rating),
                comment: comment.trim(),
            });

            setMessage("Review sumitted seccessfully")
            setComment("");
            setRating(5);

            await loadReviews();
        }catch (err){
            const data = err.response?.data;
            setError(
                data?.detail ||
                data?.comment?.[0] ||
                data?.rating?.[0] ||
                "Unable to submit your review. Please check your login and try again."
            );
        }finally {
            setSubmitting(false); 
        }
    };


    return(
       <main className="contact-page">
           <section className="review-container">
                <h1>Customer Reviews</h1>
                <p className="review-intro">
                    Share your experience and see what others think
                </p>

                {isLoggedIn && (
                    <form className="review-form" onSubmit={handleSubmit}>
                        <h2>Write a Review</h2>

                        <label htmlFor="rating">Rating</label>
                        <select select id="rating" value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <option value={5}>5 - Excellent</option>
                            <option value={4}>4 - Very Good</option>
                            <option value={3}>3 - Good</option>
                            <option value={2}>2 - Fair</option>
                            <option value={1}>1 - Poor</option>
                        </select>

                        <label htmlFor="comment">Your comment</label>
                        <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)}
                            placeholder="Tell us about your experince.." rows={5} maxLength={1000} minLength={10} required/>

                        <button type="submit" disabled={submitting}>
                            {submitting ? "Submitting.." : "Submit Review"}
                        </button>
                    </form>
                )}
                {!isLoggedIn && (
                    <p className="login-notice">
                        please log in to submit a review. You can still read reviews below.
                    </p>
                )}
                {error && <p className="review-erorr">{error}</p>}
                {message && <p className="review-success">{message}</p>}
                <section className="review-list">
                    <p>What are people saying</p>

                    {loading ? ( <p>Loading reviews...</p>)
                    : review.length === 0 ? (
                        <p>No reviews yet. Bet the first to share your experince!</p>
                    ) :( 
                        review.map((review) => (
                            <article className="review-card" key={review.id}>
                                <div className="review-card-header">
                                    <h3>{review.username || "Customer"}</h3>
                                    <span>
                                        {"★".repeat(Number(review.rating))}
                                        {"☆".repeat(5 - Number(review.rating))}
                                    </span>
                                </div>
                                <p>{review.comment}</p>

                                {review.created_at && (
                                    <small>
                                        {new Date(review.created_at).toLocaleDateString()}
                                    </small>
                                )}

                            </article>
                        ))
                    )
                    }

                </section>
            </section> 
       </main>
    )
}

export default Contact;