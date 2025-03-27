import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { getHotels } from './hotels/HotelSlice';
import { getRooms } from './rooms/RoomSlice';
import { getBookings } from './bookings/BookingsSlice';

const KeyMetrics = () => {
  const dispatch = useDispatch();

  const { count: hotelCount , status: hotelStatus} = useSelector((state) => state.hotel);
  const { count: roomCount, status: roomStatus } = useSelector((state) => state.room);
  const { count: bookingsCount, enrollmentsStatus: bookingsStatus } = useSelector((state) => state.booking);


  useEffect(() => {
    dispatch(getHotels());
    dispatch(getRooms());
    dispatch(getBookings());
  }, [dispatch]);

  return (
    <>
      <h2 className="small-title">Key Metrics</h2>
      <Row className="g-2 mb-5">
        <Col xl="4">
          <NavLink to='/app/admin/hotels'>
            <Card className="bg-gradient-light hover-border-primary">
              <Card.Body className="py-4">
                <Row className="g-0 align-items-center">
                  <Col xs="auto">
                    <div className="border border-foreground sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                      <CsLineIcons icon="book" className="text-white" />
                    </div>
                  </Col>
                  <Col>
                    <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3 text-white">All Hotels</div>
                  </Col>
                  <Col xs="auto" className="ps-3">
                    <div className="display-5 text-white">
                      {hotelStatus === 'loading' ? <Spinner animation="grow" size="sm" /> : hotelCount}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </NavLink>
        </Col>
        <Col xl="4">
          <NavLink to='/app/admin/rooms'>
            <Card className="hover-border-primary">
              <Card.Body className="py-4">
                <Row className="g-0 align-items-center">
                  <Col xs="auto">
                    <div className="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                      <CsLineIcons icon="user" className="text-white" />
                    </div>
                  </Col>
                  <Col>
                    <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3">All Rooms</div>
                  </Col>
                  <Col xs="auto" className="ps-3">
                    <div className="display-5 text-primary">{roomStatus === 'loading' ? <Spinner animation="grow" size="sm" /> : roomCount}</div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </NavLink>
        </Col>
        <Col xl="4">
          <NavLink to='/app/admin/bookings'>
            <Card className="hover-border-primary">
              <Card.Body className="py-4">
                <Row className="g-0 align-items-center">
                  <Col xs="auto">
                    <div className="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                      <CsLineIcons icon="user" className="text-white" />
                    </div>
                  </Col>
                  <Col>
                    <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3">All Bookings</div>
                  </Col>
                  <Col xs="auto" className="ps-3">
                    <div className="display-5 text-primary">{bookingsStatus === 'loading' ? <Spinner animation="grow" size="sm" /> : bookingsCount}</div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </NavLink>
        </Col>
      </Row>
    </>
  );
};

export default KeyMetrics;
