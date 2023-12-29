import React, { Fragment, useEffect, useState } from "react";
import {
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hostelData, setHostelData] = useState([]);
  const [msg, setMsg] = useState("");
  const [ID, setID] = useState("");
  const [status, setStatus] = useState("");
  const [pillTab, setPillTab] = useState("1");
  const [hostelId, setHostelId] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const branchId = localStorage.getItem("branchId");

  const handleExport = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Hostel_Attendance_${new Date().toLocaleDateString()}.csv`;
    link.click();
  };

  const toggleDropdown = (id) => {
    console.log(id);
    setID(id);
    setModalOpen(!modalOpen);
  };
  console.log(ID);

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

  const hostel_name = hostelData?.map((key) => {
    return { value: key.id, label: key.hostel_name };
  });

  const handleHostelSelect = async (hostelId) => {
    const response = await fetch(`${WebApi}/get_attendence`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostel_id: hostelId }),
    });
    const resproom = await response.json();
    setData(
      resproom.data.filter((key) => key.branch_id === parseInt(branchId))
    );
  };

  const handleMarkAttendance = async (itemId, newStatus) => {
    try {
      const response = await fetch(`${WebApi}/update_attendence`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: itemId,
          status: newStatus,
          comments: JSON.stringify({ comments: "" }),
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
      />{" "}
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
              {/* <NavItem>
                <NavLink
                  href="#"
                  className={pillTab === "2" ? "active" : ""}
                  onClick={() => setPillTab("2")}
                >
                  Monthly Report
                </NavLink>
              </NavItem> */}
            </Nav>
            <TabContent activeTab={pillTab}>
              <TabPane className="fade show" tabId="1">
                <P attrPara={{ className: "mb-0 m-t-30" }}>
                  <Container>
                    <Col>
                      <Card>
                        <H5 className="text-center">
                          Daily Attendance Report{" "}
                        </H5>
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
                        <div>
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
                                      {/* <Image
                                        attrImage={{
                                          className: "img-30 me-2",
                                          src: require(item.image),
                                          alt: "user",
                                        }}
                                      /> */}
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
                                      {item.status === 0 && (
                                        <Button
                                          size="sm"
                                          color="success"
                                          style={{ padding: "5px" }}
                                          onClick={() =>
                                            handleMarkAttendance(item.id, 1)
                                          }
                                          disabled={item.status === 1}
                                        >
                                          Present
                                        </Button>
                                      )}
                                      {item.status === 1 && (
                                        <Button
                                          size="sm"
                                          color="danger"
                                          style={{ padding: "5px" }}
                                          onClick={() =>
                                            handleMarkAttendance(item.id, 0)
                                          }
                                          disabled={item.status === 0}
                                        >
                                          Absent
                                        </Button>
                                      )}
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
                      </Card>
                    </Col>
                  </Container>
                </P>
              </TabPane>
              <TabPane tabId="2">
                <P attrPara={{ className: "mb-0 m-t-30" }}>
                  <MonthlyAttendanceReport />
                </P>
              </TabPane>
            </TabContent>
            {/* Modal outside the loop */}
            <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
              <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
                Change Attendance Status
              </ModalHeader>
              <ModalBody>
                {selectedItem?.status === 1 && (
                  <FormGroup>
                    <Label for="exampleText">
                      Reason for marking{" "}
                      {selectedItem?.status === 0 ? "present" : "absent"}
                    </Label>
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
                  {selectedItem?.status === 0 && (
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="status"
                          value="1"
                          checked={status === 1}
                          onChange={() => setStatus(1)}
                        />{" "}
                        Mark Present
                      </Label>
                    </FormGroup>
                  )}
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
                <Button
                  color="secondary"
                  onClick={() => handleActionSelect(status, msg)}
                >
                  Send
                </Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
      </Col>
    </Fragment>
  );
};

export default AttendenceReport;

// <Dropdown
//   isOpen={dropdownOpen && ID === item.id}
//   toggle={() => toggleDropdown(item.id)}
// >
//   <DropdownToggle caret>{Action}</DropdownToggle>
//   <DropdownMenu>
//     {item.status === 1 ? (
//       <DropdownItem
//         onClick={() => {
//           setStatus(item.status);
//         }}
//       >
//         Make Absent
//       </DropdownItem>
//     ) : (
//       <DropdownItem
//         onClick={() => {
//           setStatus(item.status);
//         }}
//       >
//         Make Present
//       </DropdownItem>
//     )}
//   </DropdownMenu>
// </Dropdown>
