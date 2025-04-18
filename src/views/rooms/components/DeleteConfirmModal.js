import React from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoom, setSelectedRoom } from '../RoomSlice';

const DeleteConfirmModal = ({ tableInstance }) => {
  const dispatch = useDispatch();
  const { status , selectedRoom } = useSelector((state) => state.room);
  const { isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal } = tableInstance;
  console.log(selectedRoom);
  
  const onDeleteConfirm = async() => {
    if (selectedRoom.id) {
      console.log("room ID :::" , selectedRoom.id);
      
      await dispatch(deleteRoom(selectedRoom?.id));
    }
    dispatch(setSelectedRoom(undefined));
    setIsOpenDeleteConfirmModal(false);

  };
const onHide = () =>{
    dispatch(setSelectedRoom(undefined));
    setIsOpenDeleteConfirmModal(false);
}

  return (
    <Modal centered className="modal-close-out" show={isOpenDeleteConfirmModal} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className="fw-bold">{selectedRoom?.name}</span>{' '}
        <span>will be deleted. Are you sure?</span>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>No</Button>
        <Button variant="outline-primary" onClick={onDeleteConfirm}>
          {status === 'loading' ? <Spinner animation="grow" variant="light" style={{ width: '1rem', height: '1rem' }} /> : 'Yes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmModal;
