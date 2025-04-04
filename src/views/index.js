import React, { useState, useEffect } from 'react';
import { useWindowSize } from 'hooks/useWindowSize';
import { Row, Col, Button, Form, Card, Modal , InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Rating from 'react-rating';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useGlobalFilter, usePagination, useRowSelect, useRowState, useSortBy, useTable } from 'react-table';
import { USER_ROLE } from 'constants.js';
import { getRooms } from './rooms/RoomSlice';
import ControlsPageSize from './sharedCompoments/ControlsPageSize';
import TablePagination from './sharedCompoments/TablePagination';
import cityOptions from './hotels/components/Cities.json';
import { book } from './bookings/BookingsSlice';


const FilterMenuContent = () => {
  const dispatch = useDispatch();
  const [statusValue, setStatusValue] = useState({ value: '', label: 'Select Status' });
  const [cityValue, setCityValue] = useState({ value: '', label: 'Select City' });
  const [typeValue, setTypeValue] = useState({ value: '', label: 'Select Type' });
  
  const statusOptions = [
    { value: 'Available', label: 'Available' },
    { value: 'Booked', label: 'Booked' },
  ];
  const typeOptions = [
    { value: 'Single', label: 'Single' },
    { value: 'Double', label: 'Double' },
    { value: 'Suite', label: 'Suite' },
  ];
  const validationSchema = Yup.object().shape({
    });

    const initialValues = {
      status: '',
      pets: false,
      adults: 2,
      children: 0,
      location: '',
      type: ''
    };

  const onSubmit = async(values) =>{
    await dispatch(getRooms(values));    
    }
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors , setFieldValue , setValues , resetForm } = formik;
  
  const statusOnChange = (selectedOption) => {
    setFieldValue('status', selectedOption.value);
    setStatusValue(selectedOption);
  };
  const cityOnChange = (selectedOption) => {
    setFieldValue('location', selectedOption.value);
    setCityValue(selectedOption);
  };

  const typeOnChange = (selectedOption) => {
    setFieldValue('type', selectedOption.value);
    setTypeValue(selectedOption);
  };


  const spinUpAdults = () => {
    setFieldValue('adults' , parseInt(typeof values.adults === 'number' ? values.adults : 0, 10) + 1)
  };

  const spinDownAdults = () => {
    setFieldValue('adults' , parseInt(typeof values.adults === 'number' ? values.adults : 0, 10) - 1)
  };
  const spinUpChilds = () => {
    setFieldValue('children' , parseInt(typeof values.children === 'number' ? values.children : 0, 10) + 1)
  };

  const spinDownChilds = () => {
    setFieldValue('children' , parseInt(typeof values.children === 'number' ? values.children : 0, 10) - 1)
  };

  
  return (
    <div className="nav flex-column sw-30 pe-7">
      <Form className="mb-5">
        <div className="mb-3">
          <Form.Label>Room Status</Form.Label>
          <Select classNamePrefix="react-select" name="status" options={statusOptions} value={statusValue} onChange={statusOnChange} placeholder="Select" />
          {errors.status && touched.status && <div className="d-block invalid-tooltip">{errors.status}</div>}
        </div>
        <div className="mb-3">
          <Form.Label>City</Form.Label>
          <Select classNamePrefix="react-select" name="location" options={cityOptions} value={cityValue} onChange={cityOnChange} placeholder="Select city" />
          {errors.location && touched.location && <div className="d-block invalid-tooltip">{errors.location}</div>}
        </div>
        <div className="mb-3">
          <Form.Label>Type</Form.Label>
          <Select classNamePrefix="react-select" name="type" options={typeOptions} value={typeValue} onChange={typeOnChange} placeholder="Select type" />
          {errors.type && touched.type && <div className="d-block invalid-tooltip">{errors.type}</div>}
        </div>
        <div className="mb-3">
            <Form.Label>adults</Form.Label>
            <InputGroup className="spinner">
              <Form.Control name="adults" value={values.adults} onInput={handleChange} />
              <InputGroup.Text id="basic-addon1">
                <button type="button" className="spin-up" onClick={spinUpAdults}>
                  <span className="arrow" />
                </button>
                <button type="button" className="spin-down" onClick={spinDownAdults}>
                  <span className="arrow" />
                </button>
              </InputGroup.Text>
            </InputGroup>            
            {errors.adults && touched.adults && <div className="d-block invalid-tooltip">{errors.adults}</div>}
          </div>
          <div className="mb-3">
            <Form.Label>children</Form.Label>
            <InputGroup className="spinner">
              <Form.Control name="children" value={values.children} onInput={handleChange} />
              <InputGroup.Text id="basic-addon1">
                <button type="button" className="spin-up" onClick={spinUpChilds}>
                  <span className="arrow" />
                </button>
                <button type="button" className="spin-down" onClick={spinDownChilds}>
                  <span className="arrow" />
                </button>
              </InputGroup.Text>
            </InputGroup>            
            {errors.children && touched.children && <div className="d-block invalid-tooltip">{errors.children}</div>}
          </div>
          <div className="mb-3">
            <Form.Label>Pets</Form.Label>
            <Form.Group className="form-group position-relative tooltip-end-top">
              <Form.Check type="switch" id="pets" name='pets' checked={values.pets} onChange={handleChange} label={values.pets? 'With pets': 'without pets'} />
              {errors.pets && touched.pets && <div className="d-block invalid-tooltip">{errors.pets}</div>}
            </Form.Group>
          </div>
      </Form>

      <div className="d-flex flex-row justify-content-between w-100 w-sm-50 w-xl-100">
        <Button variant="outline-primary" className="w-100 me-2">
          Clear
        </Button>
        <Button variant="primary" className="w-100 me-2" onClick={handleSubmit}>
          Filter
        </Button>
      </div>
    </div>
  );
};

const index = () => {
  const dispatch = useDispatch();

  const title = 'ROOMS';
  const description = 'Select and book you room now Page';

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'courses/explore', text: 'Courses' },
  ];

  const { themeValues } = useSelector((state) => state.settings);
  const lgBreakpoint = parseInt(themeValues.lg.replace('px', ''), 10);
  const { width } = useWindowSize();
  const [isLgScreen, setIsLgScreen] = useState(false);
  const [isOpenFiltersModal, setIsOpenFiltersModal] = useState(false);

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'Room Number',
        accessor: 'roomNumber',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
    ];
  }, []);
  const { rooms: data, status, error , addEditStatus } = useSelector((state) => state.room);
  const { isLogin , currentUser } = useSelector((state) => state.auth);
  const tableInstance = useTable(
    {
      columns,
      data,
      entity: 'room',
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );
  const onSubmit = async(id) =>{
    const bookingsData= {
      roomId: id,
      checkInDate: "2025-05-20",
      checkOutDate: "2025-05-20",
    }
    await dispatch(book(bookingsData));
       
    }
  useEffect(() => {
    dispatch(getRooms());
  }, []);


  useEffect(() => {
    if (width) {
      if (width >= lgBreakpoint) {
        if (!isLgScreen) setIsLgScreen(true);
        if (isOpenFiltersModal) setIsOpenFiltersModal(false);
      } else if (isLgScreen) setIsLgScreen(false);
    }
    return () => {};
    // eslint-disable-next-line
  }, [width]);

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-2 mb-md-0 me-auto">
            <div className="w-auto sw-md-30">
              <h1 className="mb-0 pb-0 display-4">{title}</h1>
              {(currentUser && isLogin && currentUser?.role === USER_ROLE.Customer) && <BreadcrumbList items={breadcrumbs} />}
            </div>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col xs="auto" className="d-flex d-lg-none align-items-start mb-2 mb-md-0 order-md-1">
            <Button variant="primary" className="btn-icon btn-icon-only ms-1" onClick={() => setIsOpenFiltersModal(true)}>
              <CsLineIcons icon="menu-left" />
            </Button>
          </Col>
          <Col xs="12" className="col-md d-flex align-items-start justify-content-end justify-content-lg-start">
            <div className="d-inline-block">
              <ControlsPageSize tableInstance={tableInstance} />
            </div>

          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>
      {/* Title and Top Buttons End */}

      <Row className="g-0">
        {isLgScreen && (
          <Col xs="auto" className="d-none d-lg-flex">
            <FilterMenuContent />
          </Col>
        )}
        <Col>
          <Row className="g-3 row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 mb-5">
          {
            tableInstance.page 
            && 
            tableInstance.page.map((room , i)=>{              
            return(
            <Col key={`room-${i}`}>
              <Card className="h-100">
                <Card.Img src="/img/product/small/room.jpg" className="card-img-top sh-22" alt="card image" />
                <Card.Body>
                  <h5 className="heading mb-0">
                    <p  className=" ">
                      {room.original.roomNumber}
                    </p>
                  </h5>
                </Card.Body>
                <Card.Footer className="border-0 pt-0">
  {/* 👥 Guests Info */}
  <div className="mb-2">
    <h6 className="mb-1 text-primary">
      <span role="img" aria-label="adults">🧍</span> Adults: {room.original.adults}
      &nbsp;&nbsp;
      <span role="img" aria-label="children">👶</span> Children: {room.original.children}
    </h6>
    <div className="text-muted small">
      {room.original.pets ? (
        <span role="img" aria-label="pets allowed">🐾 Pets Allowed</span>
      ) : (
        <span role="img" aria-label="no pets">🚫 No Pets</span>
      )}
    </div>
  </div>

  {/* 🏨 Hotel Info */}
  <div className="mb-2 text-muted small">
    <div>
      <span role="img" aria-label="hotel">🏨</span> <strong>Hotel:</strong> {room.original.hotel.name}
    </div>
    <div>
      <span role="img" aria-label="city">📍</span> <strong>City:</strong> {room.original.hotel.location}
    </div>
  </div>

  {/* 💲 Price and Booking */}
  <div className="d-flex justify-content-between align-items-center">
    <div className="fw-bold text-success fs-5">
      ${room.original.price}
    </div>
    <Button variant="primary" onClick={() => onSubmit(room.original.id)} disabled={!(currentUser && isLogin && currentUser?.role === USER_ROLE.Customer)}>
      Book Now
    </Button>
  </div>
</Card.Footer>

              </Card>
            </Col>
              );
            })
          }
          </Row>
          <Row>
            <Col xs="12" className="text-center">
              <TablePagination tableInstance={tableInstance} />            
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Filters Modal Start */}
      {!isLgScreen && (
        <Modal className="modal-left" show={isOpenFiltersModal} onHide={() => setIsOpenFiltersModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h5">Filters</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FilterMenuContent />
          </Modal.Body>
        </Modal>
      )}

      {/* Filters Modal End */}
    </>
  );
};

export default index;
