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
  const [empId, setEmpId] = useState("");
  const[contactNo, setContactNo] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [empAddress, setEmpAddress] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [bank, setBank] = useState("");
  const [bankAccount, setBankAccount] = useState('');
  const [ifsc, setIfsc] = useState("");
  const [pan, setPan] = useState("");
  


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
          setName(fetchedUserData.name || fetchedUserData.emp_name);
          setRegistrationNo(fetchedUserData.username || fetchedUserData.employee_reg_no);
          setBranch(fetchedUserData.campus_branch || 'Not Assigned');
          setSemester(fetchedUserData.semesterYear || 'Not Assigned');
          setCurrentHostelName(fetchedUserData.hostel_name || '');
          setCurrentRoomNo(fetchedUserData.room_id || '');
        
          setProfileImage(fetchedUserData.image || "");
          setEmpId(fetchedUserData.emp_id || "Not filled");
          setContactNo(fetchedUserData.emp_phone || "Not filled");
          setDob(fetchedUserData.emp_dob || "");
          setEmail(fetchedUserData.emp_email || "Not filled");
          setEmpAddress(fetchedUserData.address || "Not filled");
          setAadhar(fetchedUserData.aadhar_no || "Not filled");
          setBank(fetchedUserData.bank_ac_name || "Not filled");
          setBankAccount(fetchedUserData.bank_ac_no || "Not filled");
          setIfsc(fetchedUserData.bank_ifsc || "Not filled");
          setPan(fetchedUserData.pan_no || "Not filled");
      


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
                accept="image/png, image/jpeg"
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
            
           {(userType ==="student") ?  
           <div>
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
            
            </div>
           :
         (
          <div>
          <Row>
           <Col>
             <FormGroup>
               <Row>
                 <Col sm="6">
                   <Label for="currentHostel">Employee Id</Label>
                   <Input
                     type="text"
                     name="currentHostel"
                     id="currentHostel"
                     value={empId}
                     onChange={(e) => setEmpId(e.target.value)}
                   />
                 </Col>
                 <Col sm="6">
                   <Label for="currentRoom">Contact No.</Label>
                   <Input
                     type="text"
                     name="currentRoom"
                     id="currentRoom"
                     value={contactNo}
                     onChange={(e) => setContactNo(e.target.value)}
                   />
                 </Col>
               </Row>
             </FormGroup>
           </Col>
         </Row>

         <Row>
         <Col>
           <FormGroup>
             <Row>
               <Col sm="6">
                 <Label for="currentHostel">Employee DOB</Label>
                 <Input
                   type="text"
                   name="currentHostel"
                   id="currentHostel"
                   value={`${new Date(dob)}`.slice(4,15)}
                   onChange={(e) => setDob(e.target.value)}
                 />
               </Col>
               <Col sm="6">
                 <Label for="currentRoom">Employee Email</Label>
                 <Input
                   type="text"
                   name="currentRoom"
                   id="currentRoom"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                 />
               </Col>
             </Row>
           </FormGroup>
         </Col>
       </Row>

       <Row>
       <Col>
         <FormGroup>
           <Row>
             <Col sm="6">
               <Label for="currentHostel">Employee Address</Label>
               <Input
                 type="text"
                 name="currentHostel"
                 id="currentHostel"
                 value={empAddress}
                 onChange={(e) => setEmpAddress(e.target.value)}
               />
             </Col>
             <Col sm="6">
               <Label for="currentRoom">Aadhar No.</Label>
               <Input
                 type="text"
                 name="currentRoom"
                 id="currentRoom"
                 value={aadhar}
                 onChange={(e) => setAadhar(e.target.value)}
               />
             </Col>
           </Row>
         </FormGroup>
       </Col>
     </Row>

     <Row>
     <Col>
     <H5>Bank Account Details</H5>
       <FormGroup>
         <Row>
           <Col sm="6">
             <Label for="currentHostel">Bank Name</Label>
             <Input
               type="text"
               name="currentHostel"
               id="currentHostel"
               value={bank}
               onChange={(e) => setBank(e.target.value)}
             />
           </Col>
           <Col sm="6">
             <Label for="currentRoom">A/C No.</Label>
             <Input
               type="text"
               name="currentRoom"
               id="currentRoom"
               value={bankAccount}
               onChange={(e) => setBankAccount(e.target.value)}
             />
           </Col>
         </Row>
       </FormGroup>
     </Col>
   </Row>


   <Row>
     <Col>
       <FormGroup>
         <Row>
           <Col sm="6">
             <Label for="currentHostel">IFSC</Label>
             <Input
               type="text"
               name="currentHostel"
               id="currentHostel"
               value={ifsc}
               onChange={(e) => setIfsc(e.target.value)}
             />
           </Col>
           <Col sm="6">
             <Label for="currentRoom">PAN No.</Label>
             <Input
               type="text"
               name="currentRoom"
               id="currentRoom"
               value={pan}
               onChange={(e) => setPan(e.target.value)}
             />
           </Col>
         </Row>
       </FormGroup>
     </Col>
   </Row>


          </div>
         
         )

        }
        
          </Form>
        </Card>
      </Container>
    </Fragment>
  );
};

export default MyProfile;
