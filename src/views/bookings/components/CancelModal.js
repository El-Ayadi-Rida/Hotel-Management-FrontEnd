import React from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { cancelBooking, setSelectedBooking } from '../BookingsSlice';

const CancelModal = ({ tableInstance }) => {
  const dispatch = useDispatch();
  const { status , selectedBooking } = useSelector((state) => state.booking);
  const { isOpenCancelModal, setIsOpenCancelModal } = tableInstance;
  
  const onDCancelConfirm = async() => {
    await dispatch(cancelBooking(selectedBooking.id));
    dispatch(setSelectedBooking(undefined));
    setIsOpenCancelModal(false);

  };
const onHide = () =>{
    dispatch(setSelectedBooking(undefined));
    setIsOpenCancelModal(false);
}

  return (
    <Modal centered className="modal-close-out" show={isOpenCancelModal} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className="fw-bold">Booking id: {selectedBooking?.id}</span>{' '}
        <span>will be Cancled. Are you sure?</span>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>No</Button>
        <Button variant="outline-primary" onClick={onDCancelConfirm}>
          {status === 'loading' ? <Spinner animation="grow" variant="light" style={{ width: '1rem', height: '1rem' }} /> : 'Yes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelModal;
