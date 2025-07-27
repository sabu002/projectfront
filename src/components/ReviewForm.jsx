import { useState } from 'react';
import axios from 'axios'; // Make sure axios is configured

function ReviewForm({ onReviewSubmit,onCancel }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      name,
      rating,
      comment,
      date: new Date().toLocaleDateString()
    };

    try {
      const res = await axios.post('/api/reviews', newReview); // Adjust API path if needed
      onReviewSubmit(res.data); // Update UI
      setName('');
      setRating(0);
      setComment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mb-10">
      <input
        type="text"
        placeholder="Your Name"
        className="border px-4 py-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Rating (0 to 5)"
        className="border px-4 py-2"
        value={rating}
        onChange={(e) => setRating(parseFloat(e.target.value))}
        step="0.5"
        min="0"
        max="5"
        required
      />
      <textarea
        placeholder="Your Comment"
        className="border px-4 py-2"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <div className="flex gap-4">
        <button type="submit" className="bg-primary text-white py-2 px-6 rounded">
          Submit Review
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-800 py-2 px-6 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}


export default ReviewForm