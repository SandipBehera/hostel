import React, { Fragment, useState, useEffect } from "react";
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
import { LocalApi, WebApi, WebSocketAPI } from "../../api";
import socketIOClient from "socket.io-client";
import { toast } from "react-toastify";
import SimpleMDE from "react-simplemde-editor";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

export default function CreateComplain() {
  const [content, setContent] = useState("");
  const onChange = (evt) => {
    setContent(evt.target.value);
  };

  const role = localStorage.getItem("userType");
  const userId=localStorage.getItem("userId");
  const navigate = useNavigate();

  const [issueType, setIssueType] = useState("");
  const [hostelNumber, setHostelNumber] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [status, setStatus] = useState("");
  const userid = localStorage.getItem("userId");
  const socket = socketIOClient(WebSocketAPI);
  const [hostels, setHostels] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const issueTypes = ["Hostel Issue", "Mess Issue", "General Issue"];

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

  const getHostelNames = async () => {
    fetch(`${WebApi}/get_rooms`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        const fetchedData = res.data.filter(
          (item) =>
            item.branch_id === parseInt(localStorage.getItem("branchId"))
        );
        setHostels(fetchedData);
      });
  };
  const getEmployeeNames = async () => {
    fetch(`${WebApi}/getEmployee`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        const fetchedData = res.data.filter(
          (item) =>
            item.branch_id === parseInt(localStorage.getItem("branchId")) &&
            item.user_type === "employee"
        );
        setEmployees(fetchedData);
      });
  };

  useEffect(() => {
    getHostelNames();
    getEmployeeNames();
  }, []);
  console.log(employees);
  const branchId = localStorage.getItem("branchId");
  const handleHostelNumberChange = (value) => {
    setHostelNumber(value);
    console.log("value", value);
    setFilteredEmployee(
      employees
        .filter((item) => item.assigned_hostel_id === parseInt(value))
        .map((item) => {
          return { value: item.emp_id, label: item.emp_name };
        })
    );
  };
  console.log(filteredEmployee);
  

  const handleSubmit = async () => {
    if (
      issueType === "Hostel Issue" &&
      (content === "" || hostelNumber === "" || assignTo === "")
    ) {
      toast.warning("All fields required");
    } else if (
      (issueType === "Mess Issue" || issueType === "General Issue") &&
      content === ""
    ) {
      toast.warning("All fields required");
    } else {
      const data = {
        issue_type: issueType,
        issued_by: userid,
        hostel_id: hostelNumber,
        floor_no: roomNumber,
        assigned_to: assignTo,
        details: [
          { content: content.replace(/\n/g, "\\n").replace(/\t/g, "\\t") },
        ],
        status: status,
        branch_id: branchId,
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
          socket.emit("newComplaint", data);
          toast.success("Complaint Created Successfully");
          navigate(`/admin/${userId}/view-complain`);

        } else {
          toast.error("Something went wrong");
        }
      } catch (err) {
        console.error("Error:", err);
      }
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
                  <option key={hostel.id} value={hostel.id}>
                    {hostel.hostel_name}
                  </option>
                ))}
              </Input>
            </FormGroup>

            {role === "employee" || role === "admin" ? (
              <FormGroup>
                <label>Assign To:</label>
                <Select
                  id="hostelSelect"
                  className="form-control form-control-secondary-fill btn-square w-50"
                  style={{ borderStyle: "none" }}
                  options={filteredEmployee}
                  onChange={(selectedOption) =>
                    setAssignTo(selectedOption.value)
                  }
                />
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
