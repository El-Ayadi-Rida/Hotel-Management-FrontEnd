import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Rating from 'react-rating';

const ReviewItem = ({ review }) => {
  const { reviewId, comment, rating , user , createdAt} = review;
  // const {imageMetadata , creationDate , userName } = user;
  console.log('user:::',user);
  


  return (
<Row className="g-0 w-100 border-bottom border-separator-light pb-3 mb-3">
    <Col xs="auto">
      <div className="sw-5 me-3">
        <img src={user?.imageMetadata?.imgurUrl || "/img/profile/profile-2.webp"}  className="img-fluid rounded-xl" alt="thumb" />
      </div>
    </Col>
    <Col className="pe-3">
      <div>{user?.userName || 'Cherish Kerr'}</div>
      <div className="text-muted text-small mb-2">{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</div>
      <Rating
        className="align-middle"
        initialRating={rating}
        readonly
        emptySymbol={<i className="cs-star text-primary" />}
        fullSymbol={<i className="cs-star-full text-primary" />}
      />
      <div className="text-medium text-alternate lh-1-25">{comment}</div>
    </Col>
</Row>
  );
};

export default React.memo(ReviewItem);
