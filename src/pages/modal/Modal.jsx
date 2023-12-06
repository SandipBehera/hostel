import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Label, FormGroup, Button } from 'reactstrap';

const StrapModal = ({ isOpen, toggleModal }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [msg, setMsg] = useState("");

    const openModal = () => {
        setModalOpen(!modalOpen);
        resetButtonStates();
      };

 

  const handleSave = () => {
    console.log('Input Value:', inputValue);
    console.log('Selected Option:', selectedOption);

 
    toggleModal();
  };

  return (
    <Modal
                  isOpen={modalOpen}
                  toggle={openModal}
                  onClose={resetButtonStates}
                >
                  <ModalHeader toggle={openModal}>Reason</ModalHeader>
                  <ModalBody>
                  <FormGroup>
                  
            
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="reason"
                        value="Reason 1"
                        checked={msg === 'Reason 1'}
                        onChange={(e) => setMsg(e.target.value)}
                      />
                      {' '}
                      Reason 1
                    </Label>
                  </FormGroup>
            
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="reason"
                        value="Reason 2"
                        checked={msg === 'Reason 2'}
                        onChange={(e) => setMsg(e.target.value)}
                      />
                      {' '}
                      Reason 2
                    </Label>
                  </FormGroup>
            
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="reason"
                        value="Reason 3"
                        checked={msg === 'Reason 3'}
                        onChange={(e) => setMsg(e.target.value)}
                      />
                      {' '}
                      Reason 3
                    </Label>
                  </FormGroup>
            
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="reason"
                        value="Reason 4"
                        checked={msg === 'Reason 4'}
                        onChange={(e) => setMsg(e.target.value)}
                      />
                      {' '}
                      Reason 4
                    </Label>
                  </FormGroup>
            
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="reason"
                        value="Reason 5"
                        checked={msg === 'Reason 5'}
                        onChange={(e) => setMsg(e.target.value)}
                      />
                      {' '}
                      Reason 5
                    </Label>
                  </FormGroup>
            
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="reason"
                        value="Others"
                        checked={msg === 'Others'}
                        onChange={(e) => setMsg(e.target.value)}
                      />
                      {' '}
                      Others
                    </Label>
                  </FormGroup>
            
                  {msg === 'Others' && (
                    <Input
                      value={otherMessage}
                      onChange={(e) => setOtherMessage(e.target.value)}
                      type="text"
                      className="mt-3"
                      placeholder="Write a reason"
                    />
                  )}
                </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="secondary"
                      onClick={() => {
                        makeAttandance(stud.username, 0, msg),
                          openModal();
                          setAbsentButtonDisabled(true);
                      }}
                    >
                      Submit
                    </Button>
                    {/* Additional buttons or actions can be added here */}
                  </ModalFooter>
                </Modal>
  );
};

export default StrapModal;

