import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import HtmlHead from 'components/html-head/HtmlHead';
import { USER_ROLE } from 'constants.js';
import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import KeyMetrics from './KeyMetrics';
import BookingsOverTime from './charts/BookingsOverTime';
import RoomStatus from './charts/RoomStatus';
import TopCustomers from './charts/TopCustomers';
import BookingByHotel from './charts/BookingByHotel';
import CustomerKeyMetrics from './CustomerKeyMetrics';
import BookingsByHotelC from './charts/BookingsByHotelC';

const dashboard = () => {
  const {currentUser} = useSelector((state)=> state.auth);
  const title = 'Dashboard';
  const description = 'Hotel managment App Dashboard Page';

  const breadcrumbs = [{ to: '', text: 'Home' }];

  return (
  <>
    <HtmlHead title={title} description={description} />
    {/* Title and Top Buttons Start */}
    <div className="page-title-container">
      <Row>
        {/* Title Start */}
        <Col md="7">
          <h1 className="mb-0 pb-0 display-4">Welcome, {currentUser?.role}!</h1>
          <BreadcrumbList items={breadcrumbs} />
        </Col>
        {/* Title End */}
      </Row>
    </div>
    {/* Title and Top Buttons End */}
    {
    currentUser?.role === USER_ROLE.Admin &&
    <>
    {/* KeyMetrics Start */}
    <KeyMetrics/>
    {/* KeyMetrics End */}

    <h1 className="small-title">1</h1>
  <Row className="g-2 mb-5">
    {/* Bookings Over Time Start */}
        <Col xl="6">
          <h2 className="small-title">Bookings Over Time</h2>
          <Card className="sh-50 h-xl-100-card">
            <Card.Body className="h-100">
              <BookingsOverTime />
            </Card.Body>
          </Card>
        </Col>
    {/* Bookings Over Time */}
    {/* Room Status Start */}
        <Col xl="6">
          <h2 className="small-title">Room Status</h2>
          <Card className="sh-50 h-xl-100-card">
            <Card.Body className="h-100">
              <RoomStatus />
            </Card.Body>
          </Card>
        </Col>
    {/* Room Status */}
      </Row>
      <h1 className="small-title">2</h1>
  <Row className="g-2 mb-5">
    {/* Top Customer Start */}
        <Col xl="6">
          <h2 className="small-title">Top Customer</h2>
          <Card className="sh-50 h-xl-100-card">
            <Card.Body className="h-100">
              <TopCustomers />
            </Card.Body>
          </Card>
        </Col>
    {/* Top Customer End */}
    {/* booking by hotel Start */}
        <Col xl="6">
          <h2 className="small-title">Booking By Hotel</h2>
          <Card className="sh-50 h-xl-100-card">
            <Card.Body className="h-100">
              <BookingByHotel />
            </Card.Body>
          </Card>
        </Col>
    {/* booking by hotel End */}
      </Row>
      </>
    }
    {currentUser?.role === USER_ROLE.Customer &&
    <>
    <CustomerKeyMetrics/>
  <Row className="g-2 mb-5">
    {/* booking by hotel Start */}
        <Col >
          <h2 className="small-title">Booking By Hotel</h2>
          <Card className="sh-50 h-xl-100-card">
            <Card.Body className="h-100">
              <BookingsByHotelC />
            </Card.Body>
          </Card>
        </Col>
    {/* booking by hotel End */}
      </Row>

    </>
    }


  </>
  )
}

export default dashboard