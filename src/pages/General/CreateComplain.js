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
} from "reactstrap";
import "./Complaints.css";
import CKEditors from "react-ckeditor-component";

export default function CreateComplain() {

  const [content, setContent] = useState("");
  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
  };

  const [issueType, setIssueType] = useState("");
  const [hostelNumber, setHostelNumber] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [assignTo, setAssignTo] = useState(""); // Updated state for Assign To dropdown
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [complaint, setComplaint] = useState("");

  const issueTypes = ["Hostel Issue", "Mess Issue", "General Issue"];
  const hostels = ["Hostel 1", "Hostel 2", "Hostel 3"]; // Replace with your actual hostel numbers
  const rooms = ["Room 101", "Room 102", "Room 103"]; // Replace with your actual room numbers
  const employees = ["Employee 1", "Employee 2", "Employee 3"]; // Replace with your actual employee list

  const wardenNames = {
    "Hostel 1": "Warden A",
    "Hostel 2": "Warden B",
    "Hostel 3": "Warden C",
  };

  

  const handleHostelNumberChange = (value) => {
    setHostelNumber(value);
    setAssignTo(wardenNames[value] || "");
  };

  const handleSubmit = () => {
 
    console.log("Complaint submitted:", complaint, "Assigned to:", assignTo, "Complaint", content);
  
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

            <FormGroup>
              <label>Assign To:</label>
              <Input
                className="form-control form-control-secondary-fill btn-square w-50"
                name="select"
                type="select"
                value={assignTo}
                onChange={(e) => setAssignTo (e.target.value)}
              >
                <option value="">Select a person to assign</option>
                {Object.values(wardenNames).map((warden) => (
                  <option key={warden} value={warden}>
                    {warden}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </div>
        )}

        {(issueType === "Mess Issue" || issueType === "General Issue") && (
          <div>
            <FormGroup>
              <Label>
                {issueType === "Mess Issue"
                  ? "Assign Employee:"
                  : "Assign Employee:"}
              </Label>
              <Input
                className="form-control form-control-secondary-fill btn-square w-50"
                name="select"
                type="select"
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                <option value="">Select an employee</option>
                {employees.map((employee) => (
                  <option key={employee} value={employee}>
                    {employee}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </div>
        )}

        <Container fluid={true}>
          <Row>
            <Col sm="12">
              
                Complaint
                <CardBody>
                  <CKEditors
                    activeclassName="p10"
                    content={content}
                    events={{
                      change: onChange,
                    }}
                  />
                </CardBody>
              
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
