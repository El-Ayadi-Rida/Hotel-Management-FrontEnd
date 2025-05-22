import React, { useEffect, useState } from 'react';
import { Row, Col, Card, ProgressBar, Spinner } from 'react-bootstrap';
import Rating from 'react-rating';
import { useDispatch, useSelector } from 'react-redux';
import ReviewItem from './ReviewItem';
import ReviewForm from './ReviewForm';


const Reviews = ({roomId , reviews}) => {
  const { currentUser, isLogin } = useSelector((state) => state.auth);  
  const dispatch = useDispatch();
  const [isAllowed , setIsAllowed] = useState(true);
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = (totalRating / reviews.length).toFixed(1);
  const ratingCounts = reviews.reduce((acc, review) => {
    const roundedRating = Math.round(review.rating);
    acc[roundedRating] = (acc[roundedRating] || 0) + 1;
    return acc;
  }, {});

  // Prepare the percentages 
  const ratingPercentages = {};
  for (let i = 1; i <= 5; i += 1) {
    ratingPercentages[i] = ((ratingCounts[i] || 0) / reviews.length) * 100;
  }
  useEffect(() => {

  }, [dispatch]);

  
    return (
        <>
 {/* Reviews Start */}
 <h2 className="small-title">Reviews</h2>
          <Card>
            <Card.Body>
              <Row className="mb-5">
                <Col xs="12" sm="auto" className="mb-3 mb-sm-0">
                  <div className="w-100 sw-sm-19 sw-md-23 border sh-16 rounded-md d-flex flex-column align-items-center justify-content-center">
                    <div className="cta-1 text-alternate mb-2">{averageRating || 0.0}</div>
                    <div>
                      <Rating
                        className="align-middle"
                        initialRating={averageRating}
                        readonly
                        emptySymbol={<i className="cs-star text-primary" />}
                        fullSymbol={<i className="cs-star-full text-primary" />}
                      />
                      <span className="text-muted"> ({reviews?.length})</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  {[5, 4, 3, 2, 1].map(star => (
                    <Row className="align-items-center" key={star}>
                      <Col>
                        <ProgressBar className="progress-md" now={ratingPercentages[star]} />
                      </Col>
                      <Col xs="auto" className="sw-20 text-end">
                        <span className="me-3 text-muted text-small">{ratingPercentages[star].toFixed(0)}%</span>
                        <Rating
                          className="align-middle"
                          initialRating={star}
                          readonly
                          emptySymbol={<i className="cs-star text-muted" />}
                          fullSymbol={<i className="cs-star-full text-primary" />}
                        />
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
                  <div className="mb-n3 border-last-none">
                  {reviews &&
                      reviews.map((review, tIndex) => {
                        return <ReviewItem key={`review.${review?.reviewId}`} review={review} />;
                      })}
                  </div>    

              {
                (isLogin && isAllowed && currentUser) ? <ReviewForm roomId={roomId}/> : <></>
              }
            </Card.Body>  
          </Card>
          {/* Reviews End */}
        </>
    );
};

export default Reviews;