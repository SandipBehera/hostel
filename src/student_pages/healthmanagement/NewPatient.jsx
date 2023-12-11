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
import { LocalApi, WebApi } from "../../api";
import { toast } from "react-toastify";

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
  const branch_id = localStorage.getItem("branchId");
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
      sethostelData(
        resproom.data.filter(
          (hostel) => hostel.branch_id === parseInt(branch_id)
        )
      );
      console.log(resproom.data);
    };
    roomHostel();
  }, []);

  const hostel_name = hostelData?.map((key) => {
    return { value: key.id, label: key.hostel_name };
  });
  console.log(hostel_name);
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
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for submission
    const formDataForSubmission = new FormData();
    formDataForSubmission.append("patientname", formData.studentName);
    formDataForSubmission.append("patient_regdno", "110101csr025");
    formDataForSubmission.append("hostelid", selectedHostel);
    formDataForSubmission.append("floorid", selectedFloor);
    formDataForSubmission.append("roomno", selectedRoom);
    formDataForSubmission.append("date", formData.date);
    formDataForSubmission.append("time", formData.time);
    formDataForSubmission.append("reason", formData.reason);
    formDataForSubmission.append("doctorname", formData.doctor);
    formDataForSubmission.append("file", formData.file);
    formDataForSubmission.append("branch_id", branch_id);

    console.log([...formDataForSubmission.entries()]);
    try {
      // Make the API call
      const response = await fetch(`${WebApi}/add_patient`, {
        method: "POST",
        body: formDataForSubmission,
      });

      if (!response.ok) {
        throw new Error("Failed to add patient");
      }

      const result = await response.json();
      toast.success(result.message);
      // Handle the result as needed
      console.log(result);

      // Reset form after successful submission
      setFormData({
        studentName: "",
        date: "",
        time: "",
        reason: "",
        doctor: "",
        file: null,
        branch_id: parseInt(localStorage.getItem("branchId")),
      });

      setSelectedHostel(null);
      setSelectedFloor(null);
      setSelectedRoom(null);

      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error(error);
      // Handle errors (e.g., show an error message)
    }
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Fragment>
      <Breadcrumbs
        parent="Health Management"
        mainTitle="New Patient"
        title="New Patient"
      />
      <Card>
        <Form
          className="p-5"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <FormGroup row>
            <Col sm={6} style={{ marginBottom: "20px" }}>
              <Label
                for="studentName"
                style={{ marginTop: "13px:marginBottom: ,px" }}
              >
                Student Name
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
            <Col sm={6} style={{ marginBottom: "15px" }}>
              <div className="mb-2" style={{ width: "100%" }}>
                <Label className="col-form-label">Select Floor No.</Label>
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
                <Label className="col-form-label">Select Room No.</Label>
                <Select
                  options={roomData}
                  onChange={(selectedOption) =>
                    setSelectedRoom(selectedOption.value)
                  }
                />
              </div>
            </Col>
            <Col sm={6} style={{ marginBottom: "15px" }}>
              <Label for="date">Date</Label>
              <Input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Col>
            <Col sm={6} style={{ marginBottom: "15px" }}>
              <Label for="time">Time</Label>
              <Input
                type="time"
                name="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
              />
            </Col>

            <Col sm={12} style={{ marginBottom: "15px" }}>
              <Label for="reason">Reason for Consultation</Label>
              <Input
                type="textarea"
                name="reason"
                id="reason"
                value={formData.reason}
                onChange={handleChange}
              />
            </Col>

            <Col sm={6} style={{ marginBottom: "15px" }}>
              <Label for="doctor-name">Doctor's Name</Label>
              <Input
                type="text"
                name="doctor"
                id="doctor"
                value={formData.doctor}
                onChange={handleChange}
              />
            </Col>
            <Col sm={6} style={{ marginBottom: "15px" }}>
              <Label for="file">Upload Preception</Label>
              <Input
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
              />
            </Col>
          </FormGroup>
          <Button color="secondary">Submit</Button>
        </Form>
      </Card>
    </Fragment>
  );
};

export default NewPatient;
