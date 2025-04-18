import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { getBookingByCustomer } from './bookings/BookingsSlice';

const CustomerKeyMetrics = () => {
  const dispatch = useDispatch();
    const {currentUser} = useSelector((state)=> state.auth);
    const { customerBookings , status } = useSelector((state) => state.booking);
  


  useEffect(() => {
    dispatch(getBookingByCustomer(currentUser?.id));
  }, [dispatch]);

  return (
    <>
      <h2 className="small-title">Key Metrics</h2>
      <Row className="g-2 mb-5">
        <Col xl="4">
          <>
            <Card className="bg-gradient-light hover-border-primary">
              <Card.Body className="py-4">
                <Row className="g-0 align-items-center">
                  <Col xs="auto">
                    <div className="border border-foreground sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                      <CsLineIcons icon="book" className="text-white" />
                    </div>
                  </Col>
                  <Col>
                    <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3 text-white">Confirmed Bookings</div>
                  </Col>
                  <Col xs="auto" className="ps-3">
                    <div className="display-5 text-white">
                      {status === 'loading' ? <Spinner animation="grow" size="sm" /> : customerBookings?.filter((b)=> b.status === 'Confirmed').length}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </>
        </Col>
        <Col xl="4">
          <>
            <Card className="hover-border-primary">
              <Card.Body className="py-4">
                <Row className="g-0 align-items-center">
                  <Col xs="auto">
                    <div className="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                      <CsLineIcons icon="user" className="text-white" />
                    </div>
                  </Col>
                  <Col>
                    <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3">Pending Bookings</div>
                  </Col>
                  <Col xs="auto" className="ps-3">
                    <div className="display-5 text-primary">{status === 'loading' ? <Spinner animation="grow" size="sm" /> : customerBookings?.filter((b)=> b.status === 'Pending').length}</div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </>
        </Col>
        <Col xl="4">
          <>
            <Card className="hover-border-primary">
              <Card.Body className="py-4">
                <Row className="g-0 align-items-center">
                  <Col xs="auto">
                    <div className="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                      <CsLineIcons icon="user" className="text-white" />
                    </div>
                  </Col>
                  <Col>
                    <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3">Cancelled Bookings</div>
                  </Col>
                  <Col xs="auto" className="ps-3">
                    <div className="display-5 text-primary">{status === 'loading' ? <Spinner animation="grow" size="sm" /> : customerBookings?.filter((b)=> b.status === 'Cancelled').length}</div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </>
        </Col>
      </Row>
    </>
  );
};

export default CustomerKeyMetrics;
