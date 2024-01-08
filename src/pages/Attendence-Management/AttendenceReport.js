import React, { Fragment, useEffect, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Row,
  Col,
  Card,
  CardHeader,
  Button,
  Container,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Input,
  ModalFooter,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { Breadcrumbs, H5, P } from "../../AbstractElements";
import Papa from "papaparse";
import Select from "react-select";
import { WebApi } from "../../api";
import { toast } from "react-toastify";

import MonthlyAttendanceReport from "./MonthlyAttendenceReport";

const AttendenceReport = ({ attendanceData }) => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpenMap, setDropdownOpenMap] = useState({});
  const [hostelData, setHostelData] = useState([]);
  const [msg, setMsg] = useState("");
  const [ID, setID] = useState("");
  const [status, setStatus] = useState("");
  const [pillTab, setPillTab] = useState("1");
  const [hostelId, setHostelId] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  console.log(msg);
  console.log(selectedItem);

  const branchId = localStorage.getItem("branchId");

  const toggleCommentModal = () => {
    setCommentModalOpen(!commentModalOpen);
  };

  useEffect(() => {
    const roomHostel = async () => {
      const response = await fetch(`${WebApi}/get_rooms`, {
        method: "GET",
      });
      const resproom = await response.json();
      setHostelData(
        resproom.data.filter((key) => key.branch_id === parseInt(branchId))
      );
    };
    roomHostel();
  }, []);
  console.log(hostelData);
  const handleExport = () => {
    const exportData = data.map((item, i) => ({
      "S.No.": i+1,
      "St. Reg. No.": item.registration_no,
      "St. Name": item.name,
      "H-Name": item.hostel_name,
      "Room No": item.room_id,
      "Present/Absent": item.status === 1 ? "present" : "absent"
    }));
    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Hostel_Attendance_${new Date().toLocaleDateString()}.csv`;
    link.click();
  };

  const hostel_name = hostelData?.map((key) => {
    return { value: key.id, label: key.hostel_name };
  });

  const toggleDropdown = (id) => {
    setDropdownOpenMap((prevState) => ({
      ...prevState,
      [id]: !prevState[id] || false,
    }));
  };

  const handleHostelSelect = async (hostelId) => {
    const response = await fetch(`${WebApi}/get_attendence`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostel_id: hostelId }),
    });
    const resproom = await response.json();
    console.log(resproom);
    setData(
      resproom.data.filter((key) => key.branch_id === parseInt(branchId))
    );
  };
  console.log(data);
  const handleMarkAttendance = async (itemId, newStatus, comm) => {
    try {
      const response = await fetch(`${WebApi}/update_attendence`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: itemId,
          status: newStatus,
          comments: JSON.stringify({ comments: comm }),
        }),
      });

      const respData = await response.json();
      if (respData.status === "success") {
        handleHostelSelect(hostelId);
        toast.success("Attendance Updated Successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
  console.log(data);
  return (
    <Fragment>
      <Breadcrumbs
        parent="Student"
        mainTitle="Attendance"
        subParent="Attendance Report"
        title="Attendance Report"
      />
      <Col className="xl-100 box-col-12">
        <Card>
          <CardBody>
            <Nav className="nav-pills">
              <NavItem>
                <NavLink
                  href="#"
                  className={pillTab === "1" ? "active" : ""}
                  onClick={() => setPillTab("1")}
                >
                  Daily Report
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={pillTab}>
              <TabPane className="fade show" tabId="1">
                <P attrPara={{ className: "mb-0 m-t-30" }}>
                  <Container>
                    <Col>
                      <H5 className="text-center">Daily Attendance Report </H5>
                      <CardHeader>
                        <Row className="align-items-center justify-content-between">
                          <Col xs="auto">
                            <div className="mb-2" style={{ width: "100%" }}>
                              <Label className="col-form-label">
                                Select Hostel name
                              </Label>
                              <Select
                                options={hostel_name}
                                className="js-example-basic-single col-sm-12"
                                onChange={(selectedOption) => {
                                  handleHostelSelect(selectedOption.value),
                                    setHostelId(selectedOption.value);
                                }}
                              />
                            </div>
                          </Col>
                          <Col xs="auto">
                            <Button onClick={handleExport}>Export</Button>
                          </Col>
                        </Row>
                      </CardHeader>
                      <div className="table-responsive">
                        <Table className="table-responsive text-center">
                          <thead>
                            <tr>
                              <th>S.No.</th>
                              <th>Image</th>
                              <th>St. Reg. No.</th>
                              <th>St. Name</th>
                              <th>H-Name</th>
                              <th>Room No</th>
                              <th>Present/Absent</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.length > 0 ? (
                              data.map((item, index) => (
                                <tr
                                  key={item.id}
                                  onClick={() => setSelectedItem(item)}
                                >
                                  <td>{index + 1}</td>
                                  <td>
                                    <img
                                      src={item.image}
                                      alt="image"
                                      style={{
                                        height: "4rem",
                                        width: "4rem",
                                        borderRadius: "50%",
                                      }}
                                    />
                                  </td>
                                  <td>{item.registration_no}</td>
                                  <td style={{ padding: "26px" }}>
                                    {item.name}
                                  </td>
                                  <td style={{ padding: "26px" }}>
                                    {item.hostel_name}
                                  </td>
                                  <td style={{ padding: "26px" }}>
                                    {item.room_id}
                                  </td>
                                  <td style={{ paddingTop: "26px" }}>
                                    {item.status === 1 ? "present" : "absent"}
                                  </td>
                                  <td style={{ paddingTop: "26px" }}>
                                    <Dropdown
                                      isOpen={dropdownOpenMap[item.id]}
                                      toggle={() => toggleDropdown(item.id)}
                                    >
                                      <DropdownToggle caret>
                                        {item.status === 1
                                          ? "Absent"
                                          : "Present"}
                                      </DropdownToggle>
                                      <DropdownMenu>
                                        {item.status === 0 ? (
                                          <>
                                            <DropdownItem
                                              onClick={toggleCommentModal}
                                            >
                                              View Reason
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={() =>
                                                handleMarkAttendance(
                                                  item.id,
                                                  1
                                                )
                                              }
                                              disabled={item.status === 1}
                                            >
                                              Present
                                            </DropdownItem>
                                          </>
                                        ) : (
                                          <DropdownItem
                                            onClick={() =>
                                              setModalOpen(!modalOpen)
                                            }
                                          >
                                            Absent
                                          </DropdownItem>
                                        )}
                                      </DropdownMenu>
                                    </Dropdown>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan="8"
                                  style={{ textAlign: "center" }}
                                >
                                  <p style={{ color: "red" }}>
                                    Please Select the hostel Name
                                  </p>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Container>
                </P>
              </TabPane>
            </TabContent>
            <Modal isOpen={commentModalOpen} toggle={toggleCommentModal}>
              <ModalHeader toggle={toggleCommentModal}>
                Reason for Absence
              </ModalHeader>
              <ModalBody>
                <p>{selectedItem?.comments?.comment || selectedItem?.comments?.comments }</p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={toggleCommentModal}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
              <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
                Mark Absent
              </ModalHeader>
              <ModalBody>
                {selectedItem?.status === 1 && (
                  <FormGroup>
                    <Label for="exampleText">Reason for marking absent</Label>
                    <Input
                      type="textarea"
                      name="text"
                      id="exampleText"
                      rows="5"
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                    />
                  </FormGroup>
                )}
                <FormGroup tag="fieldset">
                  <legend>Status</legend>
                  {selectedItem?.status === 1 && (
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="status"
                          value="0"
                          checked={status === 0}
                          onChange={() => setStatus(0)}
                        />{" "}
                        Mark Absent
                      </Label>
                    </FormGroup>
                  )}
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                {status === "" || msg === "" ? (
                  <Button disabled>Send</Button>
                ) : (
                  <Button
                    color="secondary"
                    onClick={() => {
                      handleMarkAttendance(selectedItem.id, 0, msg);
                      setModalOpen(!modalOpen);
                    }}
                  >
                    Send
                  </Button>
                )}
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
      </Col>
    </Fragment>
  );
};

export default AttendenceReport;
