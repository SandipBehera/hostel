import React,{useState} from 'react'
import { Table, Row, Col, Card, CardHeader, Button,  Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { H5 } from '../../AbstractElements';
import Papa from 'papaparse';
import { Action } from '../../Constant';
const mockData = [
  {
    sNo: 1,
    registrationNo: 'REG001',
    studentName: 'Rahul',
    HName: 'Aravali',
    Rno: '100',
    available: 'present',
   
  },
  {
    sNo: 2,
    registrationNo: 'REG002',
    studentName: 'Sanu',
    HName: 'Nilgiri',
    Rno: '101',
    available: 'absent',
   
  },
  {
      sNo: 3,
      registrationNo: 'REG003',
      studentName: 'Sangram',
      HName: 'sivalik',
      Rno: '102',
      available: 'absent',
    
    },
    {
      sNo: 4,
      registrationNo: 'REG004',
      studentName: 'Sandy',
      HName: 'Udayagiri',
      Rno: '103',
      available: 'present',
    
    },
  // Add more objects as needed
];
const AttendenceReport = ({attendanceData}) => {
  const [data, setData] = useState(mockData);
    console.log(attendanceData)
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedAction, setSelectedAction] = useState('');
  const handleExport = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'food_book.csv';
    link.click();
  };
  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleActionSelect = (action, index) => {
    // Create a copy of the data array
    const newData = [...data];
    // Update the 'available' property of the selected row
    newData[index].available = action;
    // Update the state with the modified data
    setData(newData);
    // Close the dropdown
    setActiveDropdown(null);
  };

  return (
    <>
        <Col sm='12'>
        <Card>
          <CardHeader>
           <Row className="align-items-center justify-content-between">
                <Col xs="auto">
                  <H5 className="mb-0">Attendence Report</H5>
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
            <th>Room No</th>
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
            <td>{item.HName}</td>
            <td>{item.Rno}</td>
            <td>{item.available}</td>
            <td>
            <Dropdown
              isOpen={activeDropdown === item.sNo} toggle={() => toggleDropdown(item.sNo)}>
             
              <DropdownToggle caret>{selectedAction || Action}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => handleActionSelect('present', index)}>
                  present
                </DropdownItem>
                <DropdownItem onClick={() => handleActionSelect('absent', index)}>absent</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </td>   
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