import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { Row, Col, Button, Dropdown, Card, Badge, Form } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { getBookingByCustomer } from 'views/bookings/BookingsSlice';
import { getCustomerById } from './CustomerSlice';

const CustomersDetail = () => {
  const { customerId } = useParams();
  const dispatch = useDispatch();
  const title = 'Customer Detail';
  const description = 'Booking Customer Detail Page';
  const breadcrumbs = [
    { to: '/admin/customers', text: 'Customers' },
  ];

  const { singleCustomer } = useSelector((state) => state.customer);
  const { customerBookingsCount , customerBookings } = useSelector((state) => state.booking);
  

  console.log('customerId::',customerId);
  
  useEffect(() => {
    if (customerId) {
      dispatch(getCustomerById(customerId));
      dispatch(getBookingByCustomer(customerId));
    }
  }, [customerId , dispatch]);


  // Tags

  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <div className="page-title-container">
            <Row>
              <Col xs="12" md="7">
                <h1 className="mb-0 pb-0 display-4">{title}</h1>
                <BreadcrumbList items={breadcrumbs} />
              </Col>
            </Row>
          </div>
          {/* Title End */}

        </Row>
      </div>

      <Row>
        <Col xl="4">
          <h2 className="small-title">Personal Info</h2>
          <Card className="mb-5">
            <Card.Body className="mb-n5">
              <div className="d-flex align-items-center flex-column mb-5">
                <div className="mb-5 d-flex align-items-center flex-column">
                  <div className="sw-6 sh-6 mb-3 d-inline-block bg-primary d-flex justify-content-center align-items-center rounded-xl">
                    <div className="text-white">{singleCustomer?.username?.substring(0, 2)}</div>
                  </div>
                  <div className="h5 mb-1">{singleCustomer?.username}</div>
                </div>
              </div>
              <div className="mb-5">
                <Row className="g-0 align-items-center mb-2">
                  <Col xs="auto">
                    <div className="border border-primary sw-5 sh-5 rounded-xl d-flex justify-content-center align-items-center">
                      <CsLineIcons icon="boxes" className="text-primary" />
                    </div>
                  </Col>
                  <Col className="ps-3">
                    <Row className="g-0">
                      <Col>
                        <div className="sh-5 d-flex align-items-center lh-1-25">Bookings Count</div>
                      </Col>
                      <Col xs="auto">
                        <div className="sh-5 d-flex align-items-center">{customerBookingsCount}</div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              <div className="mb-5">
                <p className="text-small text-muted mb-2">INFO</p>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 me-1">
                      <CsLineIcons icon="user" size="17" className="text-primary" />
                    </div>
                  </Col>
                  <Col className="text-alternate">{singleCustomer?.username}</Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 me-1">
                      <CsLineIcons icon="email" size="17" className="text-primary" />
                    </div>
                  </Col>
                  <Col className="text-alternate">{singleCustomer?.email}</Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xl="8">
          {/* Recent Orders Start */}
          {/* Recent Orders End */}

          {/* History Start */}
          <h2 className="small-title">Booking History</h2>
          <Card className="mb-5">
            <Card.Body>
              {
                customerBookings && 
                customerBookings.map((book , index)=>{
                  return(
              <Row className="g-0" key={`booking-${index}`}>
                <Col xs="auto" className="sw-1 d-flex flex-column justify-content-center align-items-center position-relative me-4">
                  <div className="w-100 d-flex sh-1" />
                  <div className="rounded-xl shadow d-flex flex-shrink-0 justify-content-center align-items-center">
                    <div className="bg-gradient-light sw-1 sh-1 rounded-xl position-relative" />
                  </div>
                  <div className="w-100 d-flex h-100 justify-content-center position-relative">
                    <div className="line-w-1 bg-separator h-100 position-absolute" />
                  </div>
                </Col>
                <Col className="mb-4">
                  <div className="h-100">
                    <div className="d-flex flex-column justify-content-start">
                      <div className="d-flex flex-column">
                        <Button variant="link" className="p-0 pt-1 heading text-start">
                          {book?.room?.hotel.name} Room number: {book?.room?.roomNumber}
                        </Button>
                        <div className="text-alternate">
                        From: {DateTime.fromISO(book?.checkInDate).toLocaleString(DateTime.DATE_MED)}
                        &nbsp;to&nbsp;
                        {DateTime.fromISO(book?.checkOutDate).toLocaleString(DateTime.DATE_MED)}
                          </div>
                        <div className="text-alternate">
                        STATUS: {book?.status} 
                          </div>
                        <div className="text-muted mt-1">
                        Location: {book?.room?.hotel.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
                  )
                })
              }
            </Card.Body>
          </Card>
          {/* History End */}
        </Col>
      </Row>
    </>
  );
};

export default CustomersDetail;
