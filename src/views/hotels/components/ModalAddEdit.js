import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createHotel, setSelectedHotel, updateHotel } from '../HotelSlice';


const ModalAddEdit = ({ tableInstance }) => {
  const dispatch = useDispatch();
  const { addEditStatus , addEditError , selectedHotel } = useSelector((state) => state.hotel);
  const { setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    location: Yup.string().required('location is required'),
    description: Yup.string().required('description is required'),
  });

  const initialValues = {
    name: '',
    location: '',
    description: '',
  };

  const onSubmit = async(values) =>{
    if (selectedHotel) {
      await dispatch(updateHotel(values));
    } else {
      await dispatch(createHotel(values));
    }
    dispatch(setSelectedHotel(null));
    setIsOpenAddEditModal(false);
    
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors , setFieldValue , setValues , resetForm } = formik;

  useEffect(() => {
    console.log("selectedHotel::" , selectedHotel);
    
    if (isOpenAddEditModal && selectedHotel) {
      setValues(selectedHotel);
    }else{
      setValues(initialValues);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenAddEditModal, selectedHotel]);

  const onHide = () =>{
    dispatch(setSelectedHotel(undefined));
    setIsOpenAddEditModal(false);
    resetForm();
  }
  const renderButtonContent = () => {
    if (addEditStatus === 'loading') {
      return (
        <Spinner animation="border" size="sm" variant="primary" className="dzu-spinner-border" />
      );
    }
    return selectedHotel ? 'Save Changes' : 'Add Hotel';
  };

  return (
    <Modal className="modal-right" show={isOpenAddEditModal} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{selectedHotel ? 'Edit' : 'Add'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="tooltip-end-top">
          <div className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" onChange={handleChange} value={values.name} placeholder="Hotel name ..."/>
            {errors.name && touched.name && <div className="d-block invalid-tooltip">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" name="location" onChange={handleChange} value={values.location} placeholder="Hotel location ..."/>
            {errors.location && touched.location && <div className="d-block invalid-tooltip">{errors.location}</div>}
          </div>
          <div className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" onChange={handleChange} value={values.description} placeholder="Hotel description ..."/>
            {errors.description && touched.description && <div className="d-block invalid-tooltip">{errors.description}</div>}
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
