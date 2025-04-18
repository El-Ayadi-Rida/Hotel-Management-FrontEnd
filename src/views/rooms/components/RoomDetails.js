import React, { useEffect } from 'react';
import { Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import Plyr from 'plyr-react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import Rating from 'react-rating';
import { book } from 'views/bookings/BookingsSlice';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { USER_ROLE } from 'constants.js';
import CarouselGallery from './CarouselGallery';
import { getRoomById } from '../RoomSlice';

const PurePlyr = React.memo(() => {
  const videoSrc = {
    type: 'video',
    sources: [{ src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4' }],
    poster: '/img/product/large/product-2.webp',
  };

  return <Plyr source={videoSrc} options={{}} />;
});

const RoomDetail = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const title = 'ROOM Detail';
  const description = 'Hotel ROOM Detail Page';

  const { selectedRoom } = useSelector((state) => state.room);
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  
  

  const breadcrumbs = [
    { to: '/', text: 'home' },
  ];

  
  const onBook = async(id) =>{
    const bookingsData= {
      roomId: id,
      checkInDate: "2025-05-20",
      checkOutDate: "2025-05-20",
      config:{
        adults: selectedRoom.adultsv,
        children: selectedRoom.childrenv,
      },
      amount: selectedRoom?.calculatedPrice
    }
    await dispatch(book(bookingsData));
       
    }

    useEffect(async()=>{
      if (!selectedRoom && roomId) {
        await dispatch(getRoomById(roomId));
      }
    },[])

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-sm-0 me-auto">
            <h1 className="mb-0 pb-0 display-4">{title}</h1>
            <BreadcrumbList items={breadcrumbs} basePath='' />
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            <Button variant="primary" className="btn-icon btn-icon-start w-100 w-md-auto"
            onClick={()=>{
              onBook(selectedRoom.id);
            }}
            disabled={!(currentUser && isLogin && currentUser?.role === USER_ROLE.Customer)}
            >
              <CsLineIcons icon="chevron-right" /> <span>Book Now</span>
            </Button>
          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>
      {/* Title and Top Buttons End */}

      <Row className="g-5">
        <Col xxl="8" className="mb-5">
          {/* Preview Start */}
          <h2 className="small-title">Preview</h2>
          <Card className="mb-5">
            <div className="">
              {/* <PurePlyr /> */}
              <CarouselGallery/>
            </div>
            <Card.Body>
              <h4 className="mb-3">Carrot Cake Gingerbread</h4>
             
            </Card.Body>
            <Card.Footer className="border-0 pt-0">
 d
            </Card.Footer>
          </Card>
          {/* Preview End */}

          {/* Table of Contents Start */}


          {/* Reviews Start */}
          {/* <h2 className="small-title">Reviews</h2>
          <Card>
            <Card.Body>
              <Row className="mb-5">
                <Col xs="12" sm="auto" className="mb-3 mb-sm-0">
                  <div className="w-100 sw-sm-19 sw-md-23 border sh-16 rounded-md d-flex flex-column align-items-center justify-content-center">
                    <div className="cta-1 text-alternate mb-2">4.8</div>
                    <div>
                      <Rating
                        className="align-middle"
                        initialRating={5}
                        readonly
                        emptySymbol={<i className="cs-star text-primary" />}
                        fullSymbol={<i className="cs-star-full text-primary" />}
                      />
                      <span className="text-muted"> (22)</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <Row className="align-items-center">
                    <Col>
                      <ProgressBar className="progress-md" now={80} />
                    </Col>
                    <Col xs="auto" className="sw-20 text-end">
                      <span className="me-3 text-muted text-small">%80</span>
                      <Rating
                        className="align-middle"
                        initialRating={5}
                        readonly
                        emptySymbol={<i className="cs-star text-muted" />}
                        fullSymbol={<i className="cs-star-full text-primary" />}
                      />
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col>
                      <ProgressBar className="progress-md" now={10} />
                    </Col>
                    <Col xs="auto" className="sw-20 text-end">
                      <span className="me-3 text-muted text-small">%10</span>
                      <Rating
                        className="align-middle"
                        initialRating={4}
                        readonly
                        emptySymbol={<i className="cs-star text-muted" />}
                        fullSymbol={<i className="cs-star-full text-primary" />}
                      />
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col>
                      <ProgressBar className="progress-md" now={5} />
                    </Col>
                    <Col xs="auto" className="sw-20 text-end">
                      <span className="me-3 text-muted text-small">%5</span>
                      <Rating
                        className="align-middle"
                        initialRating={3}
                        readonly
                        emptySymbol={<i className="cs-star text-muted" />}
                        fullSymbol={<i className="cs-star-full text-primary" />}
                      />
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col>
                      <ProgressBar className="progress-md" now={0} />
                    </Col>
                    <Col xs="auto" className="sw-20 text-end">
                      <span className="me-3 text-muted text-small">%0</span>
                      <Rating
                        className="align-middle"
                        initialRating={2}
                        readonly
                        emptySymbol={<i className="cs-star text-muted" />}
                        fullSymbol={<i className="cs-star-full text-primary" />}
                      />
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col>
                      <ProgressBar className="progress-md" now={5} />
                    </Col>
                    <Col xs="auto" className="sw-20 text-end">
                      <span className="me-3 text-muted text-small">%5</span>
                      <Rating
                        className="align-middle"
                        initialRating={1}
                        readonly
                        emptySymbol={<i className="cs-star text-muted" />}
                        fullSymbol={<i className="cs-star-full text-primary" />}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="mb-n3 border-last-none">
                <Row className="g-0 w-100 border-bottom border-separator-light pb-3 mb-3">
                  <Col xs="auto">
                    <div className="sw-5 me-3">
                      <img src="/img/profile/profile-2.webp" className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                  </Col>
                  <Col className="pe-3">
                    <div>Cherish Kerr</div>
                    <div className="text-muted text-small mb-2">2 days ago</div>
                    <Rating
                      className="align-middle"
                      initialRating={5}
                      readonly
                      emptySymbol={<i className="cs-star text-primary" />}
                      fullSymbol={<i className="cs-star-full text-primary" />}
                    />
                    <div className="text-medium text-alternate lh-1-25">Macaroon!</div>
                  </Col>
                </Row>
                <Row className="g-0 w-100 border-bottom border-separator-light pb-3 mb-3">
                  <Col xs="auto">
                    <div className="sw-5 me-3">
                      <img src="/img/profile/profile-1.webp" className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                  </Col>
                  <Col className="pe-3">
                    <div>Olli Hawkins</div>
                    <div className="text-muted text-small mb-2">3 days ago</div>
                    <Rating
                      className="align-middle"
                      initialRating={5}
                      readonly
                      emptySymbol={<i className="cs-star text-primary" />}
                      fullSymbol={<i className="cs-star-full text-primary" />}
                    />
                    <div className="text-medium text-alternate lh-1-25">Cupcake cake fruitcake. Powder chocolate bar soufflé gummi bears topping donut.</div>
                  </Col>
                </Row>
                <Row className="g-0 w-100 border-bottom border-separator-light pb-3 mb-3">
                  <Col xs="auto">
                    <div className="sw-5 me-3">
                      <img src="/img/profile/profile-3.webp" className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                  </Col>
                  <Col className="pe-3">
                    <div>Kirby Peters</div>
                    <div className="text-muted text-small mb-2">4 days ago</div>
                    <Rating
                      className="align-middle"
                      initialRating={5}
                      readonly
                      emptySymbol={<i className="cs-star text-primary" />}
                      fullSymbol={<i className="cs-star-full text-primary" />}
                    />
                    <div className="text-medium text-alternate lh-1-25">Nice, very tasty.</div>
                  </Col>
                </Row>
                <Row className="g-0 w-100 border-bottom border-separator-light pb-3 mb-3">
                  <Col xs="auto">
                    <div className="sw-5 me-3">
                      <img src="/img/profile/profile-4.webp" className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                  </Col>
                  <Col className="pe-3">
                    <div>Zayn Hartley</div>
                    <div className="text-muted text-small mb-2">1 week ago</div>
                    <Rating
                      className="align-middle"
                      initialRating={5}
                      readonly
                      emptySymbol={<i className="cs-star text-primary" />}
                      fullSymbol={<i className="cs-star-full text-primary" />}
                    />
                    <div className="text-medium text-alternate lh-1-25">
                      Chupa chups topping pastry halvah. Jelly cake jelly sesame snaps jelly beans jelly beans. Biscuit powder brownie powder sesame snaps
                      jelly-o dragée cake. Pie tiramisu cake jelly lemon drops. Macaroon sugar plum apple pie carrot cake jelly beans chocolate.
                    </div>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card> */}
          {/* Reviews End */}
        </Col>
        <Col xxl="4">
          {/* At a Glance Start  */}
          <h2 className="small-title">Capacity</h2>
          <Card className="mb-5">
            <Card.Body>
              <Row className="g-0 align-items-center mb-3">
                <Col xs="auto">
                  <div className="sw-3 sh-4 d-flex justify-content-center align-items-center">
                  <span role="img" aria-label="children">👶</span>
                  </div>
                </Col>
                <Col className="ps-3">
                  <Row className="g-0">
                    <Col>
                      <div className="sh-4 d-flex align-items-center lh-1-25">Children</div>
                    </Col>
                    <Col xs="auto">
                      <div className="sh-4 d-flex align-items-center text-alternate">{selectedRoom?.children}</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="g-0 align-items-center mb-3">
                <Col xs="auto">
                  <div className="sw-3 sh-4 d-flex justify-content-center align-items-center">
                    <span role="img" aria-label="adults">🧍</span>
                  </div>
                </Col>
                <Col className="ps-3">
                  <Row className="g-0">
                    <Col>
                      <div className="sh-4 d-flex align-items-center lh-1-25">Adults</div>
                    </Col>
                    <Col xs="auto">
                      <div className="sh-4 d-flex align-items-center text-alternate">{selectedRoom?.adults}</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="g-0 align-items-center mb-3">
                <Col xs="auto">
                  <div className="sw-3 sh-4 d-flex justify-content-center align-items-center">
                    <span role="img" aria-label="adults">🐾</span>
                  </div>
                </Col>
                <Col className="ps-3">
                  <Row className="g-0">
                    <Col>
                      <div className="sh-4 d-flex align-items-center lh-1-25">Pets</div>
                    </Col>
                    <Col xs="auto">
                      <div className="sh-4 d-flex align-items-center text-alternate">{selectedRoom?.pets ? 'Allowed' : 'Not Allowed'}</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="g-0 align-items-center mb-3">
                <Col xs="auto">
                  <div className="sw-3 sh-4 d-flex justify-content-center align-items-center">
                    <span role="img" aria-label="adults">🛏️</span>
                  </div>
                </Col>
                <Col className="ps-3">
                  <Row className="g-0">
                    <Col>
                      <div className="sh-4 d-flex align-items-center lh-1-25">Room number</div>
                    </Col>
                    <Col xs="auto">
                      <div className="sh-4 d-flex align-items-center text-alternate">{selectedRoom?.roomNumber}</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="g-0 align-items-center mb-3">
                <Col xs="auto">
                  <div className="sw-3 sh-4 d-flex justify-content-center align-items-center">
                  <span role="img" aria-label="adults">💰</span>
                  </div>
                </Col>
                <Col className="ps-3">
                  <Row className="g-0">
                    <Col>
                      <div className="sh-4 d-flex align-items-center lh-1-25">Amount</div>
                    </Col>
                    <Col xs="auto">
                      <div className="sh-4 d-flex align-items-center text-alternate">
                        ${selectedRoom.price} x {selectedRoom?.adultsv || 1} Adult(s)
                          {selectedRoom?.childrenv > 0 && (
                            <>
                              {' + '}
                              ${(selectedRoom.price * 0.5).toFixed(2)} x {selectedRoom.childrenv} Child(ren)
                            </>
                          )}

                             Total :${selectedRoom?.calculatedPrice}


                        
                        </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="g-0 align-items-center">
                <Col xs="auto">
                  <div className="sw-3 sh-4 d-flex justify-content-center align-items-center">
                    <span role="img" aria-label="adults">📍</span>
                  </div>
                </Col>
                <Col className="ps-3">
                  <Row className="g-0">
                    <Col>
                      <div className="sh-4 d-flex align-items-center lh-1-25">Country , City</div>
                    </Col>
                    <Col xs="auto">
                      <div className="sh-4 d-flex align-items-center text-alternate">Morocco , {selectedRoom?.hotel?.location}</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          {/* At a Glance End  */}

          {/* Tags Start */}



        </Col>
      </Row>
    </>
  );
};

export default RoomDetail;
