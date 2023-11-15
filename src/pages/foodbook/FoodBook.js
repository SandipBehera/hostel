import React, { useState,Fragment } from 'react';
import { Table, Row, Col, Card, CardHeader, Button, Input, ModalFooter, ModalBody, ModalHeader, Modal, FormGroup, Label } from 'reactstrap';
import { H5 } from '../../AbstractElements';

const mockData = [
    {
      sNo: 1,
      registrationNo: 'REG001',
      studentName: 'Rahul',
      type: 'hostler',
      breakfast: 'Cereal',
      lunch: 'Sandwich',
      dinner: 'Pasta',
      payment: '$50'
    },
    {
      sNo: 2,
      registrationNo: 'REG002',
      studentName: 'Sanu',
      type: 'Day Scholar',
      breakfast: 'Toast',
      lunch: 'Salad',
      dinner: 'Chicken',
      payment: '$40'
    },
    {
        sNo: 3,
        registrationNo: 'REG003',
        studentName: 'Sangram',
        type: 'hostler',
        breakfast: 'Cereal',
        lunch: 'Sandwich',
        dinner: 'Pasta',
        payment: '$90'
      },
      {
        sNo: 4,
        registrationNo: 'REG004',
        studentName: 'Sandy',
        type: 'Day Scholar',
        breakfast: 'Toast',
        lunch: 'Salad',
        dinner: 'Chicken',
        payment: '$100'
      },
    // Add more objects as needed
  ];
  

const FoodBook = () => {
    const [data, setData] = useState(mockData);
    const [modalOpen, setModalOpen] = useState(false);
  const [exportType, setExportType] = useState(''); // State to hold the selected export type

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleExport = () => {
    toggleModal();
  };
  const handleExportSubmit = () => {
    // Handle the selected export type (PDF or CSV)
    console.log('Selected export type:', exportType);
    // Additional logic for exporting (e.g., fetching data in selected format)
    toggleModal(); // Close modal after submission
  };
  return (
    <Fragment>
        <Col sm='12'>
        <Card>
        {/* <CardHeader>
            <H5>Food Book</H5>
          </CardHeader> */}
          <CardHeader>
           <Row className="align-items-center justify-content-between">
                <Col xs="auto">
                  <H5 className="mb-0">Food Book</H5>
                </Col>
                <Col xs="auto" >
                  <Button onClick={handleExport}>Export</Button>
                </Col>
              </Row>
              </CardHeader>
     <div>
      {/* <h1 className="text-center" style={{color:'#61A3BA'}}>Food Book</h1> */}
      <Table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>St. Reg. No.</th>
            <th>St. Name</th>
            <th>Type</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.sNo}</td>
              <td>{item.registrationNo}</td>
              <td>{item.studentName}</td>
              <td>{item.type}</td>
              <td>{item.breakfast}</td>
              <td>{item.lunch}</td>
              <td>{item.dinner}</td>
              <td > {item.type==="hostler"?"paid":item.payment}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </Card>
    </Col>
     {/* Export Modal */}
     <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Choose Export type</ModalHeader>
        <ModalBody>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="exportType"
                value="PDF"
                onChange={(e) => setExportType(e.target.value)}
              />{' '}
              PDF
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="exportType"
                value="CSV"
                onChange={(e) => setExportType(e.target.value)}
              />{' '}
              CSV
            </Label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleExportSubmit}>Submit</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      
    </Fragment>
  )
}

export default FoodBook
