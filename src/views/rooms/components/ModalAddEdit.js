import React, { useState, useEffect } from 'react';
import { Button, Col, Form, InputGroup, Modal, Row, Spinner } from 'react-bootstrap';
import Select from 'react-select';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getHotels } from 'views/hotels/HotelSlice';
import { createRoom, setSelectedRoom, updateRoom } from '../RoomSlice';


const ModalAddEdit = ({ tableInstance }) => {
  const dispatch = useDispatch();
  const { addEditStatus , addEditError , selectedRoom } = useSelector((state) => state.room);
  const { hotels } = useSelector((state) => state.hotel);
  const [statusValue, setStatusValue] = useState({ value: '', label: 'Select Status' });
  const [typeValue, setTypeValue] = useState({ value: '', label: 'Select Type' });
  const [hotelValue, setHotelValue] = useState({ value: '', label: 'Select Hotel' });
  const [hotelOptions, setHotelOptions] = useState([]);

  const statusOptions = [
    { value: 'Available', label: 'Available' },
    { value: 'Booked', label: 'Booked' },
  ];

  const typeOptions = [
    { value: 'Single', label: 'Single' },
    { value: 'Double', label: 'Double' },
    { value: 'Suite', label: 'Suite' },
  ];

  const { setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;

  const validationSchema = Yup.object().shape({
    hotelId: Yup.string().required('Hotel id is required'),
    roomNumber: Yup.number()
    .typeError('Room number must be a number') // when input is not numeric
    .required('Room number is required')
    .positive('Room number must be positive')
    .integer('Room number must be an integer'),
    price: Yup.number()
    .typeError('Price must be a number')
    .required('Price is required')
    .positive('Price must be a positive value')
    .test('is-decimal', 'Price must be a valid decimal number', (value) =>
      /^\d+(\.\d{1,2})?$/.test(value?.toString())
    ),
    type: Yup.string().required('Type id is required'),
    status: Yup.string().required('Status id is required'),
    children: Yup.number()    
    .positive('children number must be positive')
    .required('children id is required'),
    adults: Yup.number()
    .positive('adults number must be positive')
    .required('adults id is required'),
    });

  const initialValues = {
    hotelId: '',
    roomNumber: '',
    type: '',
    price: '',
    status: '',
    pets: false,
    adults: 2,
    children: 0,

  };

  const onSubmit = async(values) =>{
    if (selectedRoom) {
      await dispatch(updateRoom(values));
    } else {
      await dispatch(createRoom(values));
    }
    dispatch(setSelectedRoom(null));
    setIsOpenAddEditModal(false);
    
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors , setFieldValue , setValues , resetForm } = formik;

  const getHotelsOptions = (hotelsList) => {
    return hotelsList.map(hotel => ({
      value: hotel.id,
      label: hotel.name
      }));
  };

  useEffect(() => {
    dispatch(getHotels());
  }, [dispatch]);

  useEffect(() => {
    setHotelOptions(getHotelsOptions(hotels)); 
  }, [hotels]);

  useEffect(() => {
    console.log('Values before::',values);
    
    if (isOpenAddEditModal && selectedRoom) {
      setValues(selectedRoom);
      if(selectedRoom?.type) setTypeValue(typeOptions.find((option)=> option.value === selectedRoom.type));
      if(selectedRoom?.status) setStatusValue(statusOptions.find((option)=> option.value === selectedRoom.status));
      setHotelValue(getHotelsOptions(hotels).find((option)=> option.value === selectedRoom.hotelId));
    }else{
      setValues(initialValues);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenAddEditModal, selectedRoom]);


  const onHide = () =>{
    dispatch(setSelectedRoom(undefined));
    setIsOpenAddEditModal(false);
    resetForm();
  }

  const typeOnChange = (selectedOption) => {
    setFieldValue('type', selectedOption.value);
    setTypeValue(selectedOption);
  };

  const statusOnChange = (selectedOption) => {
    setFieldValue('status', selectedOption.value);
    setStatusValue(selectedOption);
  };

  const HotelOnChange = (selectedOption) => {
    setFieldValue('hotelId', selectedOption.value);
    setHotelValue(selectedOption);
  };

  const renderButtonContent = () => {
    if (addEditStatus === 'loading') {
      return (
        <Spinner animation="border" size="sm" variant="primary" className="dzu-spinner-border" />
      );
    }
    return selectedRoom ? 'Edit Room' : 'Add Room';
  };

  const formatOptionLabel = ({ label , value }) => (
    <Row className="g-0 position-relative">
    <Col className="d-flex align-items-center">
        <div className="stretched-link body-link">{label}</div>
    </Col>
  </Row>
  );
  const isDisabled = () =>{
    if (selectedRoom) {
      return true
    }
    return false
  }

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
    <Modal className="modal-right" show={isOpenAddEditModal} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{selectedRoom ? 'Edit' : 'Add'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="tooltip-end-top">
          <div className="mb-3 tooltip-end-top">
            <Form.Label>Hotel</Form.Label>
            <Select classNamePrefix="react-select" 
            name="hotelId" 
            options={hotelOptions} 
            value={hotelValue} 
            onChange={HotelOnChange} 
            formatOptionLabel={formatOptionLabel}
            isDisabled={isDisabled()}
            placeholder="Select" />
            {errors.hotelId && touched.hotelId && <div className="d-block invalid-tooltip">{errors.hotelId}</div>}
          </div>
          <div className="mb-3">
            <Form.Label>Room Type</Form.Label>
            <Select classNamePrefix="react-select" name="type" options={typeOptions} value={typeValue} onChange={typeOnChange} placeholder="Select" />
            {errors.type && touched.type && <div className="d-block invalid-tooltip">{errors.type}</div>}
          </div>
          <div className="mb-3">
            <Form.Label>Room Status</Form.Label>
            <Select classNamePrefix="react-select" name="status" options={statusOptions} value={statusValue} onChange={statusOnChange} placeholder="Select" />
            {errors.status && touched.status && <div className="d-block invalid-tooltip">{errors.status}</div>}
          </div>
          <div className="mb-3">
            <Form.Label>Room Number</Form.Label>
            <Form.Control type="number" name="roomNumber" onChange={handleChange} value={values.roomNumber} placeholder="Hotel room Number ..."/>
            {errors.roomNumber && touched.roomNumber && <div className="d-block invalid-tooltip">{errors.roomNumber}</div>}
          </div>
          <div className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" onChange={handleChange} value={values.price} placeholder="Room price ..."/>
            {errors.price && touched.price && <div className="d-block invalid-tooltip">{errors.price}</div>}
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
              <Form.Check type="switch" id="pets" name='pets' checked={values.pets} onChange={handleChange} label="Set as Active" />
              {errors.pets && touched.pets && <div className="d-block invalid-tooltip">{errors.pets}</div>}
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <p className='text-danger'>{addEditError && addEditError}</p>
        <Button variant="outline-primary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
        {renderButtonContent()}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddEdit;
