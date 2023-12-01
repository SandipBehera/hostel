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
} from "reactstrap";
import { Breadcrumbs, H5 } from "../../AbstractElements";
import Papa from "papaparse";
import { Action } from "../../Constant";
import Select from "react-select";
import { LocalApi, WebApi } from "../../api";
const mockData = [
  {
    sNo: 1,
    registrationNo: "REG001",
    studentName: "Rahul",
    HName: "Aravali",
    Rno: "100",
    available: "present",
  },
  {
    sNo: 2,
    registrationNo: "REG002",
    studentName: "Sanu",
    HName: "Nilgiri",
    Rno: "101",
    available: "absent",
  },
  {
    sNo: 3,
    registrationNo: "REG003",
    studentName: "Sangram",
    HName: "sivalik",
    Rno: "102",
    available: "absent",
  },
  {
    sNo: 4,
    registrationNo: "REG004",
    studentName: "Sandy",
    HName: "Udayagiri",
    Rno: "103",
    available: "present",
  },
  // Add more objects as needed
];
const Attendence = ({ attendanceData }) => {
  const [data, setData] = useState([]);
  console.log(attendanceData);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [hostelData, setHostelData] = useState([]);
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

  const handleActionSelect = (action, index) => {
    // Create a copy of the data array
    const newData = [...data];
    // Update the 'available' property of the selected row
    newData[index].available = action;
    // Update the state with the modified data
    setData(newData);
    // Close the dropdown
    setActiveDropdown(null);
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Student"
        mainTitle="Attendence Report"
        subParent="Attandance Report"
        title="Attendence Report"
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
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.sNo}</td>
                      <td>{item.registrationNo}</td>
                      <td>{item.studentName}</td>
                      <td>{item.HName}</td>
                      <td>{item.Rno}</td>
                      <td>{item.available}</td>
                      <td>
                        <Dropdown
                          isOpen={activeDropdown === item.sNo}
                          toggle={() => toggleDropdown(item.sNo)}
                        >
                          <DropdownToggle caret>
                            {selectedAction || Action}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              onClick={() =>
                                handleActionSelect("present", index)
                              }
                            >
                              present
                            </DropdownItem>
                            <DropdownItem
                              onClick={() =>
                                handleActionSelect("absent", index)
                              }
                            >
                              absent
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>
        </Col>
      </Container>
    </Fragment>
  );
};

export default Attendence;
