// EditForm.js
import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Button, FormGroup, Label, Input } from "reactstrap";

const EditForm = ({ isOpen, toggle, onEdit, data ,item,setData,setEdit}) => {
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
      const newdata=data.map(li=>li.sl_no===item.sl_no? {...li,[name]:value}:li)  
      setData(newdata)   
  };

  const handleEdit = () => {
    setEdit(-1)
   
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Room Details</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="name">H-Name</Label>
          <Input type="text" name="name" id="name" value={item.name} onChange={handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="floors">Number of Floors</Label>
          <Input type="text" name="floors" id="floors" value={item.floors} onChange={handleInputChange} />
        </FormGroup>
        <Button color="primary" onClick={handleEdit}>
          Save Changes
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default EditForm;
