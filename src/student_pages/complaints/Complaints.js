import React, { Fragment, useState } from 'react';
import { Card, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import { WebApi } from '../../api';

const Complaints = () => {
  const [formData, setFormData] = useState({
    issueType: '',
    issuedBy: '',
    hostelId: '',
    roomNo: '',
    assignedTo: '',
    status: '',
    details: ''
  });
  const branchId = localStorage.getItem("branchId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fdata = {
      issue_type: formData.issueType,
      issue_by : formData.issuedBy,
      room_no : formData.roomNo,
      assigned_to : formData.assignedTo,
      status : formData.status,
      details : formData.details,
      branch_id : branchId
    }
    try {
      const response = await fetch(`${WebApi}/create_complaint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fdata)
      });

      

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      // const data = await response.json();
      console.log('Response from API:', fdata);

      // Reset form after successful submission if needed
      setFormData({
        issueType: '',
        issuedBy: '',
        hostelId: '',
        roomNo: '',
        assignedTo: '',
        status: '',
        details: ''
      });

      // You can add further logic after a successful submission
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle errors here
    }
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Complaints"
        mainTitle="My Complaints"
        title="My Complaints"
      />
      <Card className='p-5'>
        <Form onSubmit={handleSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup row>
                <Label for="issueType" >Issue Type :</Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="issueType"
                    id="issueType"
                    placeholder="Enter Issue Type"
                    value={formData.issueType}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="status" >Status :</Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="status"
                    id="status"
                    placeholder="Enter Status"
                    value={formData.status}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="assignedTo" >Assigned To :</Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="assignedTo"
                    id="assignedTo"
                    placeholder="Enter Assigned To"
                    value={formData.assignedTo}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup row>
                <Label for="issuedBy" >Issued By :</Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="issuedBy"
                    id="issuedBy"
                    placeholder="Enter Issued By"
                    value={formData.issuedBy}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="roomNo" >Room No. :</Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="roomNo"
                    id="roomNo"
                    placeholder="Enter Room No."
                    value={formData.roomNo}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
             
            </Col>
          </Row>
          <FormGroup row>
            <Label for="details" >Details :</Label>
            <Col sm={11}>
              <Input
                type="textarea"
                name="details"
                id="details"
                placeholder="Enter Details"
                value={formData.details}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{ size: 6, offset: 2 }}>
              <Button type="submit">Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </Card>
    </Fragment>
  );
};

export default Complaints;
