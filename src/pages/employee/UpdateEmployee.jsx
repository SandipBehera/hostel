import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Label, Input, ModalFooter, Button, Table, Row, Col } from "reactstrap";
import { H5 } from "../../AbstractElements";

const UpdateEmployee = ({ isOpen, toggle, employeeDetails }) => {
  const [formData, setFormData] = useState({
    name: employeeDetails.name || "",
    email: employeeDetails.email || "",
    regNo: employeeDetails.regNo || "",
    designation: employeeDetails.designation || "",
    address: employeeDetails.address || "",
    contact: employeeDetails.contact || "",
    pan: employeeDetails.pan || "",
    aadhar: employeeDetails.aadhar || "",
    bank: employeeDetails.bank || "",
    bankNo: employeeDetails.bankNo || "",
    ifsc: employeeDetails.ifsc || "",
  });

  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleImageClick = () => {
    // Trigger the hidden file input when the image is clicked
    document.getElementById("fileInput").click();
  };

  const handleSubmit = () => {
    // Combine form data and image for submission
    const combinedData = {
      ...formData,
      image: image,
    };

    // Add your API call or data submission logic here using the combinedData
    console.log("Form data submitted:", combinedData);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Employee Details</ModalHeader>
      <ModalBody>
        <Table className="text-center">
          <tr onClick={handleImageClick} style={{ cursor: "pointer" }}>
            <img src={employeeDetails.image} alt="image" />
          </tr>
        </Table>
        <Row>
        <Col>
          <Label>Employee Name</Label>
          <Input name="name" value={formData.name} onChange={handleInputChange} />
        </Col>
        <Col>
          <Label>Email</Label>
          <Input name="email" value={formData.email} onChange={handleInputChange} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label>Registration No</Label>
          <Input name="regNo" value={formData.regNo} onChange={handleInputChange} />
        </Col>
        <Col>
          <Label>Designation</Label>
          <Input name="designation" value={formData.designation} onChange={handleInputChange} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label>Address</Label>
          <Input name="address" value={formData.address} onChange={handleInputChange} />
        </Col>
        <Col>
          <Label>Contact</Label>
          <Input name="contact" value={formData.contact} onChange={handleInputChange} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label>Pan No</Label>
          <Input name="pan" value={formData.pan} onChange={handleInputChange} />
        </Col>
        <Col>
          <Label>Aadhar No</Label>
          <Input name="aadhar" value={formData.aadhar} onChange={handleInputChange} />
        </Col>
      </Row>
      <div className="mt-3 text-center">
        <H5>Bank Details</H5>
      </div>
      <Row>
        <Col>
          <Label>Bank Name</Label>
          <Input name="bank" value={formData.bank} onChange={handleInputChange} />
        </Col>
        <Col>
          <Label>Account No</Label>
          <Input name="bankNo" value={formData.bankNo} onChange={handleInputChange} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label>IFSC No</Label>
          <Input name="ifsc" value={formData.ifsc} onChange={handleInputChange} />
        </Col>
        <Col></Col>
      </Row>
        <Row>
          <Col>
            <Label for="fileInput" style={{display:"none"}}>Upload Image</Label>
            {/* Hidden file input triggered by clicking on the image */}
            <Input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSubmit}>Submit</Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateEmployee;
