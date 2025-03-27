import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import HtmlHead from 'components/html-head/HtmlHead';
import { USER_ROLE } from 'constants.js';
import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import KeyMetrics from './KeyMetrics';

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
    
    {/* KeyMetrics Start */}
    <KeyMetrics/>
    {/* KeyMetrics End */}


    <div>{currentUser?.role === USER_ROLE.Admin ? 'Admin Dashboard' : 'Customer Dashboard'}</div>
  </>
  )
}

export default dashboard