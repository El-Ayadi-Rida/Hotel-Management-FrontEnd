import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import Rating from 'react-rating';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../RoomSlice';

const ReviewForm = ({roomId}) => {
  const dispatch = useDispatch();
  const { addEditStatus, addEditError } = useSelector((state) => state.room);
  const { currentUser } = useSelector((state) => state.auth);  

  const validationSchema = Yup.object().shape({
    comment: Yup.string().required('Review comment is required'),
    rating: Yup.number()
    .required('Rating is required')
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5'),
  });

  const initialValues = {comment: '' , rating: 1 };

  const onSubmit = async (values) => {
    
    if (values) {
          console.log(values);
        const args = {
            roomId,
            values    
        }
      await dispatch(createReview(args));
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit});
  const { handleSubmit, handleChange, values, touched, errors , setFieldValue, setFieldTouched ,resetForm  } = formik;

  const handleRatingChange = (val) => {
    setFieldValue('rating', val);
    setFieldTouched('rating');
  }

  useEffect(() => {
    if (addEditStatus === 'succeded') {
      resetForm();
    }
  }, [addEditStatus]);
  

  return (
    <Form onSubmit={handleSubmit} className="tooltip-end-top">
      <div className="mb-3 top-label">
        <Form.Control 
        type="text" 
        name="comment" 
        value={values.comment} 
        onChange={handleChange} 
        disabled={addEditStatus === 'loading'} />
        <Form.Label>Review Content</Form.Label>
        {errors.comment && touched.comment && <div className="error">{errors.comment}</div>}
      </div>
      <div className="mb-3 top-label">
          <div className="rating-container form-floating" >
          <Form.Control className='d-none' type="number" name="rating" />
              {addEditStatus !== 'loading' && <Rating
              initialRating={values.rating}
              onChange={handleRatingChange}
              emptySymbol={<i className="cs-star text-primary" />}
              fullSymbol={<i className="cs-star-full text-primary" />}
              disabled={addEditStatus === 'loading'}
              />}
          </div>
          <Form.Label>Rating</Form.Label>
        {errors.rating && touched.rating && <div className="error">{errors.rating}</div>}
      </div>
      <Button type="submit" variant="primary">
        {addEditStatus === 'loading' ? <Spinner animation="grow" size="sm" /> : "Submit a review" }
      </Button>
    </Form>
  );
};

export default ReviewForm;