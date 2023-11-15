
import React,{useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const PopUpButton = () => {
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
        <p>This is the content of the popup.</p>
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

export default PopUpButton