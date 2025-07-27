import React, { useState } from 'react'
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Sliderbtn from './sliderbtn/Sliderbtn';
import CustomLeftArr from './sliderbtn/CustomLeftArr';
import CustomRightArr from './sliderbtn/CustomRightArr';
import ReviewForm from './ReviewForm';
import axios from 'axios';
import { useEffect } from "react";
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

function ReviewSection() {
const [reviewList, setReviewList] = useState([])
const [showForm, setShowForm] = useState(false);

// const {user,navigate}=useAppContext
const navigate = useNavigate();
const { user } = useAppContext()
const handleReviewSubmit = (review) => {
  console.log("Review added:", review);
  setReviewList((prev) => [review, ...prev]);
};


useEffect(() => {
  const fetchReviews = async () => {
    try {
      const res = await axios.get('/api/reviews');
      setReviewList(res.data);
    } catch (err) {
      console.error("Failed to load reviews:", err);
    }
  };
  fetchReviews();
}, []);


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 3 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };


  const StarRating = ({ rating }) => {
    return (
      <div className='flex gap-1'>
        {
          Array.from({ length: 5 }, (elem, i) => {
            let number = i + 0.5;
            return (
              <span key={i}>
                {
                  rating >= i + 1 ? (
                    <FaStar />
                  ) : rating >= number ? (
                    <FaStarHalfAlt />
                  ) : (
                    <FaRegStar />
                  )
                }
              </span>
            )
          })
        }
      </div>
    )
  }



  return (
    <div className='  w-full flex mt-18  flex-col justify-center'>
      
     
      <div className='flex flex-col  gap-6  h-96  justify-center items-center'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl  font-bold  text-center'>Customer Review</h1>
          <p className=' text-center '>See What our shoppers are saying!</p>
        </div>
        <div className=' flex flex-col w-11/12'>

{reviewList.length > 0 && (
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            // arrows={false}
            infinite={true}
            
      
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl
            customTransition
            transitionDuration={500}
            containerClass="carousel-container"
            customDot={<Sliderbtn />}
            customLeftArrow={<CustomLeftArr />}
            customRightArrow={<CustomRightArr />}
          >

            {
              reviewList.map((val, i) => {
                return (
                  <div key={i} className='py-8 lg:px-16 px-18 flex flex-col gap-3'>

                    <div className='capitalize text-2xl font-semibold'>{val.name}</div>
                    <div className='text-[#d1b40f]'>
                      <StarRating rating={val.rating} />

                    </div>
                    <div className=''>{val.date}</div>
                    <div className='text-sm text-[#6f6f6f] '>{val.comment}</div>
                  </div>
                )
              })
            }

          </Carousel>
)}
        </div>

      {!showForm && (
  // <button
  //   onClick={() => setShowForm(true)}
  //   className="rounded hover:border transition-all duration-200 ease-in-out bg-primary px-7 font-semibold text-white py-2"
  // >
  //   Send a Review
  // </button>
  <button
  onClick={() => {
    if (!user) {
      toast.error("Please login to submit a review.");
      navigate('/login'); // Or show modal login
    } else {
      navigate('/submit-review'); // Navigate to form page
    }
  }}
  className="rounded hover:border transition-all duration-200 ease-in-out bg-primary px-7 font-semibold text-white py-2"
>
  Send a Review
</button>

)}

{showForm && (
  <ReviewForm onReviewSubmit={(review) => {
    handleReviewSubmit(review);
    setShowForm(false); // Optional: hide form after submit
  }}
  onCancel={() => setShowForm(false)}
  />
)}



      </div>
    </div>
  )
}



export default ReviewSection