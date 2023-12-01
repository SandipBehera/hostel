import React, { Fragment, useState, useEffect } from "react";
import {
  Card,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Breadcrumbs } from "../../AbstractElements";
import Select from "react-select";
import { WebApi } from "../../api";

const NewPatient = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    hostelName: "",
    floorNo: "",
    roomNo: "",
    date: "",
    time: "",
    reason: "",
    doctor: "",
    file: null,
  });
  const [hostelData, sethostelData] = useState([]);
  const [floorData, setFloorData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const roomHostel = async () => {
      const response = await fetch(`${WebApi}/get_rooms`, {
        method: "GET",
      });
      const resproom = await response.json();
      sethostelData(resproom.data);
      console.log(resproom.data);
    };
    roomHostel();
  }, []);

  const hostel_name = hostelData?.map((key) => {
    return { value: key.id, label: key.hostel_name };
  });

  const handleHostelSelect = (hostelid) => {
    setSelectedHostel(hostelid);
    const floors = hostelid
      ? Array.from(
          new Set(
            hostelData
              .find((hostel) => hostel.id === hostelid)
              .room_details.map((room) => room.floor)
          )
        )
      : [];
    const floorOptions = floors.map((floor) => {
      return { value: floor, label: `floor ${floor}` };
    });
    setFloorData(floorOptions);
  };

  const handleFloorSelect = (floor) => {
    setSelectedFloor(floor);
    const rooms = hostelData
      .find((hostel) => hostel.id === selectedHostel)
      .room_details.filter((room) => room.floor === floor)
      .map((room) => {
        return {
          value: room.details.room_no,
          label: `Room ${room.details.room_no}`,
        };
      });
    setRoomData(rooms);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform submit logic here using formData state
    console.log(formData);
    // Reset form after submission
    setFormData({
      studentName: "",
      hostelName: "",
      floorNo: "",
      roomNo: "",
      date: "",
      time: "",
      reason: "",
      file: null,
    });
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  //   const handleHostelSelect = (hostel) => {
  //     setFormData({
  //       ...formData,
  //       hostelName: hostel.name,
  //     });
  //     setDropdownOpen(false);
  //   };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Health Management"
        mainTitle="New Patient"
        title="New Patient"
      />
      <Card>
        <Form onSubmit={handleSubmit} className="p-5">
          <FormGroup row>
            <Col sm={6} style={{ marginBottom: "20px" }}>
              <Label
                for="studentName"
                style={{ marginTop: "13px", marginBottom: "2px" }}
              >
                <strong>Student Name</strong>
              </Label>
              <Input
                type="text"
                name="studentName"
                id="studentName"
                value={formData.studentName}
                onChange={handleChange}
              />
            </Col>
            <Col sm={6} style={{ marginBottom: "15px" }}>
              <div className="mb-2" style={{ width: "100%" }}>
                <Label className="col-form-label">
                  <strong>Select Hostel name</strong>
                </Label>
                <Select
                  options={hostel_name}
                  className="js-example-basic-single col-sm-12"
                  onChange={(selectedOption) =>
                    handleHostelSelect(selectedOption.value)
                  }
                />
              </div>
            </Col>
            <Col sm={6} style={{ marginBottom: "15px" }}>
              <div className="mb-2" style={{ width: "100%" }}>
                <Label className="col-form-label">
                  <strong>Select Floor Name</strong>
                </Label>
                <Select
                  options={floorData}
                  className="js-example-basic-single col-sm-12"
                  onChange={(selectedOption) =>
                    handleFloorSelect(selectedOption.value)
                  }
                />
              </div>
            </Col>
            <Col sm={6} style={{ marginBottom: "15px" }}>
              <div className="mb-2" style={{ width: "100%" }}>
                <Label className="col-form-label">
                  <strong>Select Room No</strong>
                </Label>
                <Select
                  options={roomData}
                  onChange={(selectedOption) =>
                    setSelectedRoom(selectedOption.value)
                  }
                />
              </div>
            </Col>
            <Col sm={6} style={{ marginBottom: "15px" }}>
              <Label for="date">
                <strong>Date</strong>
              </Label>
              <Input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Col>
            <Col sm={6} style={{ marginBottom: "15px" }}>
              <Label for="time">
                <strong>Time</strong>
              </Label>
              <Input
                type="time"
                name="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
              />
            </Col>

            <Col sm={12} style={{ marginBottom: "15px" }}>
              <Label for="reason">
                <strong>Reason for Consultation</strong>
              </Label>
              <Input
                type="textarea"
                name="reason"
                id="reason"
                value={formData.reason}
                onChange={handleChange}
              />
            </Col>

            <Col sm={6} style={{ marginBottom: "15px" }}>
              <Label for="doctor-name">
                <strong>Doctor's Name</strong>
              </Label>
              <Input
                type="text"
                name="doctor"
                id="doctor"
                value={formData.doctor}
                onChange={handleChange}
              />
            </Col>
            <Col sm={6} style={{ marginBottom: "15px" }}>
              <Label for="file">
                <strong>Upload File</strong>
              </Label>
              <Input
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
              />
            </Col>
          </FormGroup>
          <Button color="secondary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </Fragment>
  );
};

export default NewPatient;
