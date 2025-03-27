import React from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedBooking, updateBooking } from '../BookingsSlice';

const ConfirmModal = ({ tableInstance }) => {
  const dispatch = useDispatch();
  const { status , selectedBooking } = useSelector((state) => state.booking);
  const { isOpenConfirmModal, setIsOpenConfirmModal } = tableInstance;
  
  const onDCancelConfirm = async() => {
    await dispatch(updateBooking({id: selectedBooking?.id ,status: 'Confirmed'}))
    dispatch(setSelectedBooking(undefined));
    setIsOpenConfirmModal(false);

  };
const onHide = () =>{
    dispatch(setSelectedBooking(undefined));
    setIsOpenConfirmModal(false);
}

  return (
    <Modal centered className="modal-close-out" show={isOpenConfirmModal} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className="fw-bold">Booking id: {selectedBooking?.id}</span>{' '}
        <span>will be Confirmed. Are you sure?</span>
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

export default ConfirmModal;
