import React, { Fragment, useEffect, useState } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  CardHeader,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
import { Action, Hometxt, PillTabs } from "../../Constant";
import Select from "react-select";
import { WebApi } from "../../api";
import { toast } from "react-toastify";
import HeaderCard from "../../Components/Common/Component/HeaderCard";
import MonthlyAttendanceReport from "./MonthlyAttendenceReport";
import { Link } from "react-router-dom";

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

  const branchId = localStorage.getItem("branchId");

  const handleExport = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "food_book.csv";
    link.click();
  };

  const toggleDropdown = (id) => {
    // setDropdownOpen(!dropdownOpen);
    setID(id);
    setModalOpen(!modalOpen);
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
      console.log(resproom.data);
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
    console.log(resproom.data);
  };

  const handleActionSelect = async (action, comment) => {
    const datas = {
      id: ID,
      status: action,
      comments: comment,
    };
    datas.comments = JSON.stringify({ comments: datas.comments });
    console.log(datas);
    try {
      const response = await fetch(`${WebApi}/update_attendence`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datas),
      });

      const respData = await response.json();
      if (respData.status === "success") {
        setModalOpen(!modalOpen);
        setDropdownOpen(!dropdownOpen);
        handleHostelSelect(hostelId);
        toast.success("Attendance Updated Successfully");
      } else {
        toast.error("Something went wrong");
        setModalOpen(!modalOpen);
        setDropdownOpen(!dropdownOpen);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

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
                          <Table>
                            <thead>
                              <tr>
                                <th>S.No.</th>
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
                                data.map((item) => (
                                  <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.name}</td>
                                    <td>{item.hostel_name}</td>
                                    <td>{item.room_id}</td>
                                    <td>
                                      {item.status === 1 ? "present" : "absent"}
                                    </td>
                                    <td>
                                      {
                                        <Input
                                          type="select"
                                          className="w-75 bg-primary"
                                          onChange={(e) =>
                                            e.target.value !== "" &&
                                            toggleDropdown(item.id)
                                          }
                                        >
                                       
                                          {item.status == 1 ? (
                                            <option value={0}>Absent</option>
                                          ) : (
                                            <option value={1}>Present</option>
                                          )}
                                        </Input>
                                      }
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
                Where are you....
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="exampleText">Write here</Label>
                  <Input
                    type="textarea"
                    name="text"
                    id="exampleText"
                    rows="5"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                  />
                </FormGroup>

                <FormGroup tag="fieldset">
                  <legend>Status</legend>
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

