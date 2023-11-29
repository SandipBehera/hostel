import React, { Fragment, useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { H5 } from '../../AbstractElements';

const Complaints = () => {
  const [complaint, setComplaint] = useState('');
  const [userComplaints, setUserComplaints] = useState([]);

  // Simulated user ID (replace this with actual user ID if available)
  const userId = 123;

  // Fetch user's complaints (simulated data fetching)
  useEffect(() => {
    // Simulated data for demonstration
    const dummyData = [
      { id: 1, issue: 'Room cleanliness issue', status: 'Pending' },
      { id: 2, issue: 'AC not working', status: 'In Progress' },
      // Add more complaints here
    ];

    setUserComplaints(dummyData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulated API call to add a new complaint
    const newComplaint = {
      id: userComplaints.length + 1,
      issue: complaint,
      status: 'Pending',
    };
    setUserComplaints([...userComplaints, newComplaint]);
    // Clear form after submission
    setComplaint('');
  };

  return (
    <Fragment>
      <H5>Submit Complaint</H5>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="complaintText">Enter Your Complaint:</Label>
          <Input
            type="textarea"
            name="complaintText"
            id="complaintText"
            placeholder="Describe your issue..."
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" color="secondary">Submit</Button>
      </Form>
      <div className="d-flex justify-content-center align-items-center mt-4">
        <Card style={{ minWidth: '300px', maxWidth: '600px', marginTop: '-30px' }}>
          <CardBody>
            <CardTitle tag="h5">My Complaints</CardTitle>
            {userComplaints.length > 0 ? (
              userComplaints.map((complaint) => (
                <CardText key={complaint.id}>
                  <strong>Issue:</strong> {complaint.issue}
                  <br />
                  <strong>Status:</strong> {complaint.status}
                </CardText>
              ))
            ) : (
              <CardText>No complaints found.</CardText>
            )}
          </CardBody>
        </Card>
      </div>
    </Fragment>
  );
};

export default Complaints;


