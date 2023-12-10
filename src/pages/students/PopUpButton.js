import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { H5 } from '../../AbstractElements';

const PopUpButton = ({ student }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div>
      <Button color="primary" onClick={toggleModal}>
        View
      </Button>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Student Details</ModalHeader>
        <ModalBody>
        <Table className='text-center'>
        <tr>
        <img src={student.image} alt="image" style={{height:"10em", width:"10em", borderRadius:"50%"}}/>
        </tr>
        <tr><H5>Name: {student.name}</H5></tr>
        
        </Table>
          <p className='text-center'><strong>ID:</strong> {student.id}</p>
          <p className='text-center'><strong>Registration Number:</strong> {student.registration_no}</p>
          <p className='text-center'><strong>Contact No:</strong> {student.phone}</p>
          <p className='text-center'><strong>Branch:</strong> {student.branch}</p>

          <p className='text-center'><strong>Semester Year:</strong> {student.semesterYear}</p>


          <p className='text-center'><strong>Room No:</strong> {student.room_id === null ? "Not Assigned" : student.room_id}</p>
          {/* Add more details as needed */}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PopUpButton;
