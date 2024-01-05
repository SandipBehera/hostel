import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Breadcrumbs } from "../../AbstractElements";
import { LocalApi, LocalSocketAPI, WebApi, WebSocketAPI } from "../../api";
import StudentComplaint from "./component/complaint";
import StudentLeave from "./component/leave";
import OutingComponent from "./component/outing";
import { toast } from "react-toastify";
import socketIOClient from "socket.io-client";
import VacantRequest from "./component/Vacant";
import { useNavigate } from "react-router-dom";

const Complaints = () => {
  const studentId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");
  const [hostel, setHostel] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [complaint, setComplaint] = React.useState("");
  const [leaveReason, setLeaveReason] = React.useState("");
  const [leaveFrom, setLeaveFrom] = React.useState("");
  const [leaveTo, setLeaveTo] = React.useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const socket = socketIOClient(WebSocketAPI);
  console.log(complaint);
  const date = new Date();
  const formattedDate = date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
  useEffect(() => {
    const student_info = async () => {
      const response = await fetch(`${WebApi}/profile_info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: studentId, userType: userType }),
      });
      const res = await response.json();
      if (res.status === "success") {
        setHostel(res.data.hostel_name);
        setRoom(res.data.room_id);
      }
    };
    student_info();
  }, []);

  const [formData, setFormData] = useState({
    issueType: "",
    issuedBy: studentId,
    hostelId: hostel,
    roomNo: room,
    assignedTo: "",
    status: "New",
  });
  const branchId = localStorage.getItem("branchId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.issueType === "") {
      toast.warning("Please Select Issue Type");
    } else if (formData.issueType === "Complaint" && complaint === "") {
      toast.warning("Please enter the description of the complaint");
    } else if (
      formData.issueType === "Vacant Hostel Request" &&
      (leaveFrom === "" || leaveReason === "")
    ) {
      toast.warning("All fields are required");
    } else if (
      (formData.issueType === "Night Out Request" ||
        formData.issueType === "Leave Request" ||
        formData.issueType === "Outing Request") &&
      (leaveFrom === "" || leaveTo === "" || leaveReason === "")
    ) {
      toast.warning("All fields are required");
    } 

else{

  if (formData.issueType === "Complaint") {
      
    formData.details = [
      { status: "new", content: complaint, date: formattedDate },
    ];
    formData.details = JSON.stringify(formData.details);
  }
   else if (
    formData.issueType === "Night Out Request" ||
    formData.issueType === "Leave Request"
  ) {
    const leaveData = {
      leave_from: leaveFrom,
      leave_to: leaveTo,
      reason: leaveReason,
    };
    formData.details = leaveData;
    formData.details = JSON.stringify(formData.details);
  } 
  else if(formData.issueType==="Vacant Hostel Request"){
    const vacantData = {
      leave_from:leaveFrom,
      reason: leaveReason,
      hostel_id:hostel,
      floor_no:room
    }
    formData.details=vacantData;
    formData.details=JSON.stringify(formData.details);

  }
  else {
    const outingData = {
      leave_from: leaveFrom,
      leave_to: leaveTo,
      reason: leaveReason,
    };
    formData.details = outingData;
    formData.details = JSON.stringify(formData.details);
  }
  const fdata = {
    issue_type: formData.issueType,
    issued_by: studentId,
    hostel_id: hostel,
    floor_no: room,
    assigned_to: formData.assignedTo,
    status: formData.status,
    details: formData.details,
    branch_id: branchId,
  };
  console.log(fdata);
  try {
    const response = await fetch(`${WebApi}/create_complaint`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fdata),
    });

    const res = await response.json();

    if (res.status === "error") {
      toast.error(res.message);
    } else {
      // const data = await response.json();

      socket.emit("newComplaint", fdata);
      toast.success(res.message);
      // Reset form a fter successful submission if needed
      setFormData({
        issueType: "",
        issuedBy: "",
        hostelId: "",
        roomNo: "",
        assignedTo: "",
        status: "",
        details: "",
      });
      navigate(`/student/${userId}/complaints-report`)
    }
    // You can add further logic after a successful submission
  } catch (error) {
    console.error("Error submitting data:", error);
    // Handle errors here
  }
};

}


   

  return (
    <Fragment>
      <Breadcrumbs
        parent="Complaints"
        mainTitle="My Complaints"
        title="My Complaints"
      />
      <Card className="p-5">
        <Form onSubmit={handleSubmit}>
          <Row form>
            <Col md={12}>
              <FormGroup row>
                <Label for="issueType">Request Type :</Label>
                <Col sm={12}>
                  {/* <Input
                    type="text"
                    name="issueType"
                    id="issueType"
                    placeholder="Enter Issue Type"
                    value={formData.issueType}
                    onChange={handleChange}
                  /> */}
                  <Input
                    type="select"
                    name="issueType"
                    id="issueType"
                    value={formData.issueType}
                    onChange={handleChange}
                  >
                    <option>Select Request Type</option>
                    <option>Night Out Request</option>
                    <option>Outing Request</option>
                    <option>Leave Request</option>
                    <option>Vacant Hostel Request</option>
                    <option>Complaint</option>
                  </Input>
                </Col>
              </FormGroup>

              {formData.issueType === "Complaint" && (
                <StudentComplaint setComplaint={(e) => setComplaint(e)} />
              )}
              {(formData.issueType === "Night Out Request" ||
                formData.issueType === "Leave Request") && (
                <StudentLeave
                  title={formData.issueType}
                  setLeave={(e) => setLeaveReason(e.target.value)}
                  setLeaveFrom={(e) => setLeaveFrom(e.target.value)}
                  setLeaveTo={(e) => setLeaveTo(e.target.value)}
                />
              )}
              {formData.issueType === "Outing Request" && (
                <OutingComponent
                  title={formData.issueType}
                  setLeave={(e) => setLeaveReason(e.target.value)}
                  setLeaveFrom={(e) => setLeaveFrom(e.target.value)}
                  setLeaveTo={(e) => setLeaveTo(e.target.value)}
                />
              )}
              {formData.issueType === "Vacant Hostel Request" && (
                <VacantRequest
                  title={formData.issueType}
                  setLeave={(e) => setLeaveReason(e.target.value)}
                  setLeaveFrom={(e) => setLeaveFrom(e.target.value)}
                  hostelData={hostel}
                  roomData={room}
                
                />
              )}

              {console.log(hostel, room)}

            </Col>
          </Row>
          <FormGroup row>
            <Col sm={{ size: 6, offset: 2 }}>
              <Button type="submit">Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </Card>
    </Fragment>
  );
};

export default Complaints;
