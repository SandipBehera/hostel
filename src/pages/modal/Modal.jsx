import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Label, FormGroup, Button } from 'reactstrap';

const CustomModal = ({ isOpen, toggleModal }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSave = () => {
    // Perform any actions needed on save
    console.log('Input Value:', inputValue);
    console.log('Selected Option:', selectedOption);

    // Close the modal
    toggleModal();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Modal Header</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="exampleInput">Input:</Label>
          <Input
            type="text"
            id="exampleInput"
            placeholder="Enter text here"
            value={inputValue}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Dropdown:</Label>
          <Input
            type="select"
            id="exampleSelect"
            value={selectedOption}
            onChange={handleDropdownChange}
          >
            <option value="">Select an option</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </Input>
        </FormGroup>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default CustomModal;

