import React, { Fragment,useState } from 'react';
import { Card,Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Breadcrumbs, H5 } from '../../AbstractElements';
import image from "./images/pexels-pixabay-36717.jpg"

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
      <Breadcrumbs
            parent="My Profile"
            mainTitle="Student Profile"
            title="Student Profile"
            />
    <Container>
        <Card >
            
      
      <div  style={{
              textAlign: 'center',
              marginTop: '0px',
              borderTopLeftRadius:'18px',
              borderTopRightRadius:'18px',
              backgroundImage: `url(${image})`, // Add your background image URL here
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%', // Cover the entire width of the container
              height: '250px', // Adjust the height as per your requirement
             
              cursor: 'pointer',
              position: 'relative',
            }}>
            <label htmlFor="upload-input">
              <img
                src={profileImage || 'https://via.placeholder.com/200'}
                alt="Profile"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '50%', // Position the image in the center vertically
                  left: '50%', // Position the image in the center horizontally
                  transform: 'translate(-50%, -50%)', // Center the image
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
          <Form className='p-3'>
        <Row>
          <Col sm="6"  >
            <FormGroup >
              <Label for="name" className='mt-3' >Name</Label>
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
              <Label for="regNo" className='mt-3'>Registration No.</Label>
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
            <H5 >Current Hostel</H5>
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

