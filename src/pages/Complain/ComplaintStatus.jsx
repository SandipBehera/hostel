import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

import { Breadcrumbs, H5, H6, LI, P, UL } from "../../AbstractElements";
import { useNavigate, useParams } from "react-router";
import { LocalApi, WebApi } from "../../api";
import SimpleMDE from "react-simplemde-editor";
import { toast } from "react-toastify";
import ActivityCard from "../Dashboard/ActivityCard";
import ComplaintActivity from "../../Components/complaints/complaintActivity";

export default function ComplaintStatus() {
  const { id } = useParams();
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
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  const [empData, setEmpData] = useState([]);
  const branch_id = parseInt(localStorage.getItem("branchId"));
  const [assignedEmployee, setAssignedEmployee] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${LocalApi}/get_complaints_by_id/${id}`, {
          method: "GET",
        });
        const respData = await response.json();
        setData(respData.data);
        setAssignedEmployee(respData.data[0].assignedEmployee);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error, for example, set an error state
      }
    };
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`${WebApi}/getEmployee`, {
          method: "GET",
        });
        const respData = await response.json();
        setEmpData(respData.data.filter((emp) => emp.branch_id === branch_id));
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error, for example, set an error state
      }
    };
    fetchData();
    fetchEmployee();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const prevContent = data[0].details;
    const newContent = [
      ...prevContent,
      { status: newStatus, content: content, date: formattedDate },
    ];
    const updatedata = {
      complaint_id: id,
      status: newStatus,
      content: newContent,
      assignedEmployee: assignedEmployee,
    };
    updatedata.content = JSON.stringify(updatedata.content);
    const response = await fetch(`${WebApi}/update_complaint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedata),
    });
    const respData = await response.json();
    if (respData.status === "success") {
      toast.success(respData.message);
      setContent("");
      setAssignedEmployee("");
      setNewStatus("");
      navigate(-1);
    } else {
      toast.error(respData.message);
    }
  };
  return (
    <Fragment>
      <Breadcrumbs
        parent="General"
        mainTitle="Complaint Status"
        title="Complaint Status"
      />
      <div className="page-wrapper " id="pageWrapper">
        <Card className="my-2 complaint-card">
          <CardBody>
            <CardTitle tag="h5" style={{ textAlign: "center" }}>
              Complaint Status
            </CardTitle>
            <CardText>
              {data?.map((complaint) => (
                <>
                  <div key={complaint.id} className="">
                    <p>
                      Name: <b>{complaint.issued_by_name}</b>
                    </p>
                    {complaint.floor_no !== null && (
                      <p>Room: {complaint.floor_no}</p>
                    )}
                    {complaint.hostel_name !== null && (
                      <p>Hostel: {complaint.hostel_name}</p>
                    )}
                    {complaint.assigned_to_name !== null ? (
                      <p>Assigned Employee: {complaint.assigned_to_name}</p>
                    ) : (
                      <Col sm="12" md="6">
                        <FormGroup>
                          <Label for="exampleSelect">Select Employee</Label>
                          <Input
                            type="select"
                            name="assignedEmployee"
                            id="exampleSelect"
                            onChange={(e) =>
                              setAssignedEmployee(e.target.value)
                            }
                          >
                            <option>Select Employee</option>
                            {empData?.map((emp) => (
                              <option value={emp.emp_id}>{emp.emp_name}</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                    )}
                    <ComplaintActivity complaint={complaint} />

                    <div>
                      <Container fluid={true}>
                        <Row>
                          <Col sm="12">
                            <Card>
                              <H5>Update Status</H5>

                              <CardBody>
                                <FormGroup>
                                  <Label for="exampleSelect">
                                    Select Status
                                  </Label>
                                  <Input
                                    type="select"
                                    name="update_status"
                                    id="exampleSelect"
                                    onChange={(e) =>
                                      setNewStatus(e.target.value)
                                    }
                                  >
                                    <option>New</option>
                                    <option>Inprocess</option>
                                    <option>Resolved</option>
                                    <option>Rejected</option>
                                    <option>Cancelled</option>
                                    <option>Completed</option>
                                  </Input>
                                </FormGroup>
                                <SimpleMDE
                                  id="editor_container"
                                  onChange={(e) => setContent(e)}
                                  value={content}
                                  options={{
                                    autofocus: true,
                                    spellChecker: false,
                                  }}
                                />
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </Container>
                    </div>

                    <div></div>
                  </div>
                </>
              ))}
            </CardText>
            <CardText></CardText>
          </CardBody>
          <CardFooter className="complaint-status-footer">
            <Button onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        </Card>
      </div>
    </Fragment>
  );
}
