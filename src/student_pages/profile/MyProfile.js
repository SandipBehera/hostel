import React, { Fragment, useEffect, useState } from 'react';
import { Card, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Breadcrumbs, H5 } from '../../AbstractElements';
import image from "./images/pexels-pixabay-36717.jpg"
import { WebApi } from '../../api';

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
  const [profileData, setProfileData] = useState({});

  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${WebApi}/profile_info`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId, userType }),
        });

        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch (error) {
            console.error("Error parsing error response as JSON:", error);
          }

          console.error(`Error: ${response.status} - ${response.statusText}`, errorData);
          return;
        }

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const res = await response.json();
          console.log(res.data);
          const fetchedUserData = res.data
          setProfileData(fetchedUserData);

          // Set predefined data in state variables
          setName(fetchedUserData.name || '');
          setRegistrationNo(fetchedUserData.username || '');
          setBranch(fetchedUserData.campus_branch || 'Not Assigned');
          setSemester(fetchedUserData.semesterYear || 'Not Assigned');
          setCurrentHostelName(fetchedUserData.hostel_name || '');
          setCurrentRoomNo(fetchedUserData.room_id || '');
          setPreviousHostelName(fetchedUserData.previousHostelName || 'Not Assigned ');
          setPreviousRoomNo(fetchedUserData.previousRoomNo || 'Not Assigned');
          setProfileImage(fetchedUserData.image || '');


        } else {
          console.error("Response is not in JSON format");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchProfile();
  }, [userId, userType]);

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
        mainTitle={`${userType} Profile`}
        title={`${userType} Profile`}
      />
      <Container>
        <Card>
          <div style={{
            textAlign: 'center',
            marginTop: '0px',
            borderTopLeftRadius: '18px',
            borderTopRightRadius: '18px',
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '250px',
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
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
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
        
          </Form>
        </Card>
      </Container>
    </Fragment>
  );
};

export default MyProfile;
