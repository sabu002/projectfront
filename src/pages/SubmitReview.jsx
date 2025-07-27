import React from 'react';
import ReviewForm from '../components/ReviewForm';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SubmitReview = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  if (!user) {
    toast.error("Login required to submit review.");
    navigate('/login');
    return null;
  }

  return (
    <div className="pt-30">
      <h1 className="text-2xl font-bold mb-4">Submit Your Review</h1>
      {/* <ReviewForm
        onReviewSubmit={(review) => {
          toast.success("Review submitted successfully!");
          navigate('/reviews'); // Go back to review section
        }}
        onCancel={() => navigate('/reviews')}
      /> */}
      <ReviewForm
  onReviewSubmit={(review) => {
    toast.success("Review submitted successfully!");
    navigate('/about#reviews'); 
  }}
  onCancel={() => navigate('/about#reviews')}
/>
    </div>
  );
};

export default SubmitReview;