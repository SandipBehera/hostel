import React,{useState} from 'react'
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
const AttendenceReport = () => {
  const [data, setData] = useState(mockData);
  const handleExport = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'food_book.csv';
    link.click();
  };
  return (
    <>
        <Col sm='12'>
        <Card>
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
      <Table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>St. Reg. No.</th>
            <th>St. Name</th>
            <th>H-Name</th>
            <th>Present/Absent</th>
            <th>Action</th>
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
    </>
  )
}

export default AttendenceReport