import React,{useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Table } from 'reactstrap';
const PopUp = () => {
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
      <ModalHeader toggle={toggleModal}>Popup Title</ModalHeader>
      <ModalBody>
        {/* Content of the popup goes here */}
        <p>Hostel</p>
        <Table>
        <thead>
        <tr>
          <th>Floor</th>
          <th>Room</th>
          <th>Vacant Room</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
        </tr>
      </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  </div>

  )
}

export default PopUp