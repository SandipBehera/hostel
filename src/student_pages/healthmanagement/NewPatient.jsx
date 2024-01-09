import React, { Fragment, useState, useEffect } from "react";
import { Card, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Breadcrumbs } from "../../AbstractElements";
import Select from "react-select";
import { LocalApi, WebApi } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SvgIcon from "../../Components/Common/Component/SvgIcon";

const NewPatient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: "",
    hostelName: "",
    floorNo: "",
    roomNo: "",
    date: "",
    time: "",
    reason: "",
    doctor: "",
    regdNo: "",
    file: null,
  });
  const branch_id = localStorage.getItem("branchId");

  const [reg, setReg] = useState("");
  const [userType, setUserType] = useState("");
  const [profileData, setProfileData] = useState([]);
const [err, setErr] =useState("");
  useEffect(() => {
    const roomHostel = async () => {
      const response = await fetch(`${WebApi}/get_rooms`, {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: document.cookie,
        },
      });
      const resproom = await response.json();
    

    };
    roomHostel();
  }, []);

  const fetchProfile = async () => {
   
    try {
      const response = await fetch(`${WebApi}/profile_info`, {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: document.cookie,
          "Content-Type": "application/json",
        },
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify({ user_id: reg, userType: userType }),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (error) {
          console.error("Error parsing error response as JSON:", error);
        }

        console.error(
          `Error: ${response.status} - ${response.statusText}`,
          errorData
        );
        return;
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const res = await response.json();
      
        const fetchedUserData = res.data;
        let obj = {
          studentName: fetchedUserData.name,
          hostelName: fetchedUserData.hostel_name,
          floorNo: "1",
          roomNo: fetchedUserData.room_id,
          date: "",
          time: "",
          reason: "",
          doctor: "",
          regdNo: fetchedUserData.userId,
          file: null,
        }
        setFormData(obj);
        setErr("")
      } else {
        console.error("Response is not in JSON format");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErr("Registration number or user type incorrect!!")

    }
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file: file,
    });
  };

  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {

    e.preventDefault();
  
   
    if (
      studentName === "" ||
      formData.date === "" ||
      formData.time === "" ||
      formData.reason === "" ||
      doctor === "" ||
      formData.file === null ||
      formData.regdNo === ""
    ) {
      toast.warning("Please Fill All The Required Fields");
    } else {
      // Prepare form data for submission
      const formDataForSubmission = new FormData();
      formDataForSubmission.append("patientname", formData.studentName);
      formDataForSubmission.append("patient_regdno", formData.regdNo);
      formDataForSubmission.append("hostelid", formData.hostelName);
      formDataForSubmission.append("floorid", "1");
      formDataForSubmission.append("roomno", formData.roomNo);
      formDataForSubmission.append("date", formData.date);
      formDataForSubmission.append("time", formData.time);
      formDataForSubmission.append("reason", formData.reason);
      formDataForSubmission.append("doctorname", formData.doctor);
      formDataForSubmission.append("file", formData.file);
      formDataForSubmission.append("branch_id", branch_id);

    
 
      try {
        // Make the API call
        const response = await fetch(`${WebApi}/add_patient`, {
          method: "POST",
          credentials: "include",
          headers: {
            Cookie: document.cookie,
          },
          body: formDataForSubmission,
        });

        if (!response.ok) {
          throw new Error("Failed to add patient");
        }

        const result = await response.json();
        toast.success(result.message);
        // Handle the result as needed

        

        // Reset form after successful submission
        setFormData({
          studentName: "",
          date: "",
          time: "",
          reason: "",
          doctor: "",
          regdNo: "",
          file: "",

          branch_id: parseInt(localStorage.getItem("branchId")),
        });
    

        navigate(`/admin/${userId}/all-patient`);
      } catch (error) {
        console.error(error);
        // Handle errors (e.g., show an error message)
      }
    }
  };
  return (
    <Fragment>
      <Breadcrumbs
        parent="Health Management"
        mainTitle="New Patient"
        title="New Patient"
      />
      <Card>
        <Form
          className="p-5"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <FormGroup row>
            <Col sm={6} style={{ marginBottom: "15px" }}>
              <Label
                for="studentName"
                style={{ marginTop: "13px:marginBottom: ,px" }}
              >
                Registration Number
              </Label>
              <Input
                type="text"
                name="regNo"
                id="regNo"
                onChange={(e) => setReg(e.target.value)}
              />
            </Col>
            <Col sm={5} style={{ marginBottom: "15px" }}>
              <Label
                for="studentName"
                style={{ marginTop: "13px:marginBottom: ,px" }}
              >
                User Type
              </Label>
              <Input
                type="select"
                name="usertype"
                id="userType"
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="">Select User Type</option>
                <option value="student">Student</option>
                <option value="employee">Employee</option>
              </Input>
            </Col>
            <Col sm={1} className="d-flex align-items-center justify-content-center fs-3 text-secondary" style={{ marginBottom: "15px", paddingTop: "20px", cursor:"pointer"}}>
  <i className="fa fa-search" aria-hidden="true" onClick={fetchProfile} style={{ transition: 'color 0.3s blue' }}></i>
</Col>
       <p className="text-danger text-center"> {err===""?"":err}</p>
          </FormGroup>
          <hr></hr>
          <FormGroup row>
            <Col sm={6} style={{ marginBottom: "15px", marginTop:"10px" }}>
              <Label
                for="studentName"
              >
                Student Name
              </Label>
              <Input
                type="text"
                name="studentName"
                id="studentName"
                value={formData.studentName}
                disabled
              />
            </Col>

            <Col sm={6} style={{ marginBottom: "20px" }} >
              <Label className="col-form-label">Hostel name</Label>
              <Input
                type="text"
                name="hostel"
                id="hostel"
                value={formData.hostelName}
                disabled
              />
            </Col>

            <Col sm={6} style={{ marginBottom: "15px", marginTop:"-10px" }}>
              <Label className="col-form-label">Room No.</Label>
              <Input
                type="text"
                name="roomNo"
                id="roomNo"
                value={formData.roomNo}
                disabled
              ></Input>
            </Col>

            <Col sm={6} style={{ marginBottom: "15px" }}>
              <Label for="date">Date</Label>
              <Input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Col>

            <Col sm={6} style={{ marginBottom: "15px" }}>
              <Label for="reason">Reason for Consultation</Label>
              <Input
                type="textarea"
                name="reason"
                id="reason"
                value={formData.reason}
                onChange={handleChange}
              />
            </Col>
            <Col sm={6} style={{ marginBottom: "15px" }}>
              <Label for="time">Time</Label>
              <Input
                type="time"
                name="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
              />
            </Col>

            <Col sm={6} style={{ marginBottom: "15px" }}>
              <Label for="doctor-name">Doctor's Name</Label>
              <Input
                type="text"
                name="doctor"
                id="doctor"
                value={formData.doctor}
                onChange={handleChange}
              />
            </Col>
            <Col sm={6} style={{ marginBottom: "15px" }}>
              <Label for="file">Upload Preception</Label>
              <Input
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
              />
            </Col>
          </FormGroup>
          <Button color="secondary">Submit</Button>
        </Form>
      </Card>
    </Fragment>
  );
};

export default NewPatient;
