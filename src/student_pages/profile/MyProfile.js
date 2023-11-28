import React, { Fragment,useState } from 'react';
import { Card, CardHeader,Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { H5 } from '../../AbstractElements';

const MyProfile = () => {
  const [name, setName] = useState('');
  const [registrationNo, setRegistrationNo] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [currentHostelName, setCurrentHostelName] = useState('');
  const [currentRoomNo, setCurrentRoomNo] = useState('');
  const [previousHostelName, setPreviousHostelName] = useState('');
  const [previousRoomNo, setPreviousRoomNo] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  
  const formStyles = {
    margin: '20px', // Adjust margin as needed
    padding: '20px', // Adjust padding as needed
  };

  
  const handleImageChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  return (
    <Fragment>
    <Container>
        <Card style={formStyles}>
            <CardHeader>
                <H5>Student Profile</H5>
            </CardHeader>
      <Form >
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <label htmlFor="upload-input">
              <img
                src={profileImage || 'https://via.placeholder.com/150'}
                alt="Profile"
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                }}
              />
              <input
                id="upload-input"
                type="file"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </label>
          </div>
        <Row>
          <Col sm="6"  >
            <FormGroup >
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Label for="regNo">Registration No.</Label>
              <Input
                type="text"
                name="regNo"
                id="regNo"
                value={registrationNo}
                onChange={(e) => setRegistrationNo(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="6">
            <FormGroup>
              <Label for="branch">Branch</Label>
              <Input
                type="text"
                name="branch"
                id="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Label for="semester">Semester</Label>
              <Input
                type="text"
                name="semester"
                id="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <H5>Current Hostel</H5>
            <FormGroup>
              <Row>
                <Col sm="6">
                  <Label for="currentHostel">Hostel Name</Label>
                  <Input
                    type="text"
                    name="currentHostel"
                    id="currentHostel"
                    value={currentHostelName}
                    onChange={(e) => setCurrentHostelName(e.target.value)}
                  />
                </Col>
                <Col sm="6">
                  <Label for="currentRoom">Room No.</Label>
                  <Input
                    type="text"
                    name="currentRoom"
                    id="currentRoom"
                    value={currentRoomNo}
                    onChange={(e) => setCurrentRoomNo(e.target.value)}
                  />
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <H5>Previous Hostel</H5>
            <FormGroup>
              <Row>
                <Col sm="6">
                  <Label for="previousHostel">Hostel Name</Label>
                  <Input
                    type="text"
                    name="previousHostel"
                    id="previousHostel"
                    value={previousHostelName}
                    onChange={(e) => setPreviousHostelName(e.target.value)}
                  />
                </Col>
                <Col sm="6">
                  <Label for="previousRoom">Room No.</Label>
                  <Input
                    type="text"
                    name="previousRoom"
                    id="previousRoom"
                    value={previousRoomNo}
                    onChange={(e) => setPreviousRoomNo(e.target.value)}
                  />
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>
      </Form>
      </Card>
    </Container>
    </Fragment>
  );
};

export default MyProfile;

