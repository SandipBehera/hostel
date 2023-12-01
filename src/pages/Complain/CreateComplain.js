import React, { Fragment, useState } from "react";
import { Breadcrumbs, H5 } from "../../AbstractElements";
import {
  Button,
  Card,
  Input,
  Label,
  FormGroup,
  Container,
  Row,
  Col,
  CardBody,
  Toast,
} from "reactstrap";
import "./Complaints.css";
import CKEditors from "react-ckeditor-component";
import { LocalApi, WebApi, WebSocketAPI } from "../../api";
import socketIOClient from "socket.io-client";
import { toast } from "react-toastify";
import SimpleMDE from "react-simplemde-editor";
import { set } from "date-fns";

export default function CreateComplain() {
  const [content, setContent] = useState("");
  const onChange = (evt) => {
    setContent(evt.target.value);
  };

  const role = localStorage.getItem("userType");

  const [issueType, setIssueType] = useState("");
  const [hostelNumber, setHostelNumber] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [assignTo, setAssignTo] = useState(""); // Updated state for Assign To dropdown
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [complaint, setComplaint] = useState("");
  const [status, setStatus] = useState("");
  const userid = localStorage.getItem("userId");
  const socket = socketIOClient(WebSocketAPI);

  const issueTypes = ["Hostel Issue", "Mess Issue", "General Issue"];
  const hostels = ["Hostel 1", "Hostel 2", "Hostel 3"]; // Replace with your actual hostel numbers
  const rooms = ["Room 101", "Room 102", "Room 103"]; // Replace with your actual room numbers
  const employees = ["Employee 1", "Employee 2", "Employee 3"]; // Replace with your actual employee list

  const wardenNames = {
    "Hostel 1": "Warden A",
    "Hostel 2": "Warden B",
    "Hostel 3": "Warden C",
  };

  const complaint_stages = [
    {
      label: "New",
      value: "New",
    },
    {
      label: "In Progress",
      value: "In Progress",
    },
    {
      label: "Resolved",
      value: "Resolved",
    },
  ];

  const handleHostelNumberChange = (value) => {
    setHostelNumber(value);
    setAssignTo(wardenNames[value] || "");
  };

  const handleSubmit = async () => {
    const data = {
      issue_type: issueType,
      issued_by: userid,
      hostel_id: hostelNumber,
      floor_no: roomNumber,
      assigned_to: assignTo,
      details: { content: content.replace(/\n/g, "\\n").replace(/\t/g, "\\t") },
      status: status,
    };
    data.details = JSON.stringify(data.details);
    try {
      const response = await fetch(`${WebApi}/create_complaint`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log("response", response);
      if (response.status === 200) {
        // Emit the "newComplaint" event directly without wrapping in an extra object
        socket.emit("newComplaint", data);

        toast.success("Complaint Created Successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="General"
        mainTitle="Create Complain"
        title="Create Complain"
      />

      <Card className="p-5">
        <FormGroup>
          <label>Issue Type:</label>
          <Input
            className="form-control form-control-secondary-fill btn-square w-50"
            name="select"
            type="select"
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
          >
            <option value="">Select an issue type</option>
            {issueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Input>
        </FormGroup>

        {issueType === "Hostel Issue" && (
          <div>
            <FormGroup>
              <label>Hostel Name:</label>
              <Input
                className="form-control form-control-secondary-fill btn-square w-50"
                name="select"
                type="select"
                value={hostelNumber}
                onChange={(e) => handleHostelNumberChange(e.target.value)}
              >
                <option value="">Select a hostel number</option>
                {hostels.map((hostel) => (
                  <option key={hostel} value={hostel}>
                    {hostel}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <label>Room Number:</label>
              <Input
                className="form-control form-control-secondary-fill btn-square w-50"
                name="select"
                type="select"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              >
                <option value="">Select a room number</option>
                {rooms.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </Input>
            </FormGroup>

            {role === "employee" ? (
              <FormGroup>
                <label>Assign To:</label>
                <Input
                  className="form-control form-control-secondary-fill btn-square w-50"
                  name="select"
                  type="select"
                  value={assignTo}
                  onChange={(e) => setAssignTo(e.target.value)}
                >
                  <option value="">Select a person to assign</option>
                  {Object.values(wardenNames).map((warden) => (
                    <option key={warden} value={warden}>
                      {warden}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            ) : (
              ""
            )}
          </div>
        )}

        <FormGroup>
          <label>Status</label>
          <Input
            className="form-control form-control-secondary-fill btn-square w-50"
            name="select"
            type="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {complaint_stages.map((item) => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </Input>
        </FormGroup>

        {(issueType === "Mess Issue" || issueType === "General Issue") && (
          <div>
            {role === "employee" ? (
              <FormGroup>
                <label>Assign To:</label>
                <Input
                  className="form-control form-control-secondary-fill btn-square w-50"
                  name="select"
                  type="select"
                  value={assignTo}
                  onChange={(e) => setAssignTo(e.target.value)}
                >
                  <option value="">Select a person to assign</option>
                  {Object.values(wardenNames).map((warden) => (
                    <option key={warden} value={warden}>
                      {warden}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            ) : (
              ""
            )}
          </div>
        )}

        <Container fluid={true}>
          <Row>
            <Col sm="12">
              Complaint
              <SimpleMDE
                id="editor_container"
                onChange={(e) => setContent(e)}
                value={content}
                options={{
                  autofocus: true,
                  spellChecker: false,
                }}
              />
              {/* <CKEditors
                  activeclassName="p10"
                  content={content}
                  events={{
                    change: onChange,
                  }}
                /> */}
            </Col>
          </Row>
        </Container>

        <div className="complaint-status-footer">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </Card>
    </Fragment>
  );
}
