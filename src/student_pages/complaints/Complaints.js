// import React from 'react'

// const Complaints = () => {
//   return (
//     <div>
//       <p>complain</p>
//     </div>
//   )
// }

// export default Complaints


import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { H5 } from '../../AbstractElements';
import ActivityCard from '../../pages/Dashboard/ActivityCard';


const Complaints = () => {
  const [studentIdBiometric, setStudentIdBiometric] = useState('');
  const [studentIdManual, setStudentIdManual] = useState('');

  const handleBiometricCheckIn = () => {
    // Perform actions to record student's check-in using biometric system
    // Update attendance data in the state or database
    console.log(`Student ${studentIdBiometric} checked in.`);
  };

  const handleManualAttendance = () => {
    // Perform actions to manually mark student attendance
    // Update attendance data in the state or database
    console.log(`Attendance marked for Student ${studentIdManual}.`);
  };

  return (
    <Container>
      <Row>
        <Col md="6">
          <h3>Biometric Check-In</h3>
          <Form>
            <FormGroup>
              <Label for="studentIdBiometric">Student ID</Label>
              <Input
                type="text"
                name="studentIdBiometric"
                id="studentIdBiometric"
                placeholder="Enter Student ID"
                value={studentIdBiometric}
                onChange={(e) => setStudentIdBiometric(e.target.value)}
              />
            </FormGroup>
            <Button onClick={handleBiometricCheckIn} color="primary">Check In</Button>
          </Form>
        </Col>
        <Col md="6">
          <h3>Manual Attendance</h3>
          <Form>
            <FormGroup>
              <Label for="studentIdManual">Student ID</Label>
              <Input
                type="text"
                name="studentIdManual"
                id="studentIdManual"
                placeholder="Enter Student ID"
                value={studentIdManual}
                onChange={(e) => setStudentIdManual(e.target.value)}
              />
            </FormGroup>
            <Button onClick={handleManualAttendance} color="success">Mark Attendance</Button>
          </Form>
        </Col>
      </Row>
      {/* Add other dashboard components */}
      <ActivityCard />
    </Container>
   
    
  );
};

export default Complaints;

