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
} from "reactstrap";
import { Breadcrumbs, H5 } from "../../AbstractElements";
import Papa from "papaparse";
import { Action } from "../../Constant";
import Select from "react-select";
import { WebApi } from "../../api";
import { toast } from "react-toastify";

const AttendenceReport = ({ attendanceData }) => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hostelData, setHostelData] = useState([]);
  const [msg, setMsg] = useState("");
  const [ID, setID] = useState("");
  const [status, setStatus] = useState("");

  const handleExport = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "food_book.csv";
    link.click();
  };
  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const roomHostel = async () => {
      const response = await fetch(`${WebApi}/get_rooms`, {
        method: "GET",
      });
      const resproom = await response.json();
      setHostelData(resproom.data);
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
    console.log(resproom);
    setData(resproom.data);
  };

  const handleActionSelect = async (action, index, comment) => {
    const datas = {
      id: index,
      status: action,
      comments: comment,
    };
    datas.comments = JSON.stringify({ comments: datas.comments });
    try {
      const response = await fetch(`${WebApi}/update_attendence`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datas),
      });
      const respData = await response.json();
      if (respData.status === "success") {
        setModalOpen(!modalOpen);
        setActiveDropdown(null);
        toast.success("Attendence Updated Successfully");
      } else {
        toast.error("Something went wrong");
        setModalOpen(!modalOpen);
        setActiveDropdown(null);
      }
    } catch (error) {
      console.error("Error fetching:", error);
      // Handle the error, for example, set an error state
    }

    // Create a copy of the data array
    // const newData = [...data];
    // Update the 'available' property of the selected row
    // newData[index].available = action;
    // Update the state with the modified data
    // setData(newData);
    // Close the dropdown
    // setActiveDropdown(null);
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Employee"
        mainTitle="Attendance"
        title="Attendance"
      />
      <Container>
        <Col sm="12">
          <Card>
            <CardHeader>
              <Row className="align-items-center justify-content-between">
                <Col xs="auto">
                  <div className="mb-2" style={{ width: "100%" }}>
                    <Label className="col-form-label">Select Hostel name</Label>
                    <Select
                      options={hostel_name}
                      className="js-example-basic-single col-sm-12"
                      onChange={(selectedOption) =>
                        handleHostelSelect(selectedOption.value)
                      }
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
                      <>
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.username}</td>
                          <td>{item.name}</td>
                          <td>{item.hostel_name}</td>
                          <td>{item.room_id}</td>
                          <td>{item.status === 1 ? "present" : "absent"}</td>
                          <td>
                            <Dropdown
                              isOpen={activeDropdown === item.id}
                              toggle={() => toggleDropdown(item.id)}
                            >
                              <DropdownToggle caret>{Action}</DropdownToggle>
                              <DropdownMenu>
                                {item.status === 1 ? (
                                  <DropdownItem
                                    onClick={() => {
                                      setID(item.id);
                                      setStatus(item.status);
                                      setModalOpen(!modalOpen);
                                    }}
                                  >
                                    Make Absent
                                  </DropdownItem>
                                ) : (
                                  <DropdownItem
                                    onClick={() => {
                                      setID(item.id);
                                      setStatus(item.status);
                                      setModalOpen(!modalOpen);
                                    }}
                                  >
                                    Make Present
                                  </DropdownItem>
                                )}
                              </DropdownMenu>
                            </Dropdown>
                          </td>
                          <div>
                            <Modal
                              isOpen={modalOpen}
                              toggle={() => setModalOpen(!modalOpen)}
                            >
                              <ModalHeader
                                toggle={() => setModalOpen(!modalOpen)}
                              >
                                where are you ....
                              </ModalHeader>
                              <ModalBody>
                                <FormGroup>
                                  <Label for="exampleText">write here</Label>
                                  <Input
                                    type="textarea"
                                    name="text"
                                    id="exampleText"
                                    rows="5"
                                    value={msg}
                                    onChange={(e) => setMsg(e.target.value)}
                                  />
                                </FormGroup>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="secondary"
                                  onClick={() => {
                                    handleActionSelect(
                                      status === 1 ? "0" : "1",
                                      ID,
                                      msg
                                    );
                                  }}
                                >
                                  send
                                </Button>
                              </ModalFooter>
                            </Modal>
                          </div>
                        </tr>
                      </>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center" }}>
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
    </Fragment>
  );
};

export default AttendenceReport;
