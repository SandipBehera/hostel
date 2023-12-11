import React, { useState, useEffect, Fragment } from "react";
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  Input,
  CardTitle,
  Label,
  Button,
  Container,
  CardBody,
  CardSubtitle,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Toast,
} from "reactstrap";
import Select from "react-select";
import { Breadcrumbs, H5 } from "../../AbstractElements";
import "../styles/take_attendence.css";
import { data } from "./data";
import AttendenceReport from "./AttendenceReport";
import { WebApi } from "../../api";
import { toast } from "react-toastify";

const Take_Attendence = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [student, setStudent] = useState(data);
  const [absentDetails, setAbsentDetails] = useState(null);
  const [presentDetails, setPresentDetails] = useState(null);
  const [msg, setMsg] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);

  const [hostelData, sethostelData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [floorData, setFloorData] = useState([]);
  const [roomData, setRoomData] = useState([]);

  const [selectedHostel, setSelectedHostel] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [studentData, setStudentData] = useState([]);

  const [presentButtonDisabled, setPresentButtonDisabled] = useState(false);
  const [absentButtonDisabled, setAbsentButtonDisabled] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const [otherMessage, setOtherMessage] = useState("");

  const reasons = ["Reason 1", "Reason 2", "Reason 3", "Other"];

  const resetButtonStates = () => {
    setPresentButtonDisabled(false);
    setAbsentButtonDisabled(false);
  };
  const branchId = localStorage.getItem("branchId");

  useEffect(() => {
    const roomHostel = async () => {
      const response = await fetch(`${WebApi}/get_rooms`, {
        method: "GET",
      });
      const resproom = await response.json();
      sethostelData(
        resproom.data.filter((key) => key.branch_id === parseInt(branchId))
      );
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

  const currentDate = new Date();
  const time = currentDate.toTimeString();

  const openModal = () => {
    setModalOpen(!modalOpen);
    resetButtonStates();
  };

  const handleSubmit = async () => {
    const response = await fetch(`${WebApi}/get_student_by_room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hostel_id: selectedHostel,
        floor_id: selectedFloor,
        room_id: selectedRoom,
        branch_id: branchId,
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.data.length === 0) {
      toast.error("Room is not assigned to any person");
    } else {
      toast.success("Room is data fetched Successfully");
      setStudentData(result.data);
      console.log(result.data);
    }
  };

  const makeAttandance = async (studentregistration, status, comments) => {
    if (status === 1) {
      setPresentButtonDisabled(true);
      setAbsentButtonDisabled(false);
    } else if (status === 0) {
      setPresentButtonDisabled(false);
      // setAbsentButtonDisabled(true);
    }

    console.log(status);
    const processAttendance = async () => {
      let comment = "";
      if (comments === null) {
        comment = "{}";
      } else {
        comment = JSON.stringify({ comment: comments });
      }
      // console.log({
      //   user_id: studentregistration,
      //   hostel_id: selectedHostel,
      //   room_id: selectedRoom,
      //   status: status,
      //   comments: comment,
      // })
      try {
        const response = await fetch(`${WebApi}/mark_attendance`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: studentregistration,
            hostel_id: selectedHostel,
            room_id: selectedRoom,
            status: status,
            comments: comment,
            branch_id: localStorage.getItem("branchId"),
          }),
        });

        const responseData = await response.json();
        if (responseData.status === "success") {
          setAttendanceData((prevData) => [
            ...prevData,
            { ...responseData.data, type: status === 1 ? "present" : "absent" },
          ]);

          console.log(
            `Response Data: ${JSON.stringify(responseData)}, i am ${
              status === 1 ? "Present" : "Absent"
            } `
          );
          console.log("Response Data:", responseData);
          toast.success("Attendance marked successfully");
        } else {
          toast.error("Something went wrong!!");
        }
      } catch (error) {
        console.error("Error Making Attendance Request:", error.message);
      }
    };

    // Call the async function
    await processAttendance();
  };
  console.log(absentButtonDisabled);

  return (
    <Fragment>
      <Breadcrumbs
        parent="Student"
        mainTitle="Attandance"
        subParent="Take Attandance"
        title="Take Attandance"
      />
      <Card>
        <CardBody>
          <Row>
            <Col md="3">
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
            <Col md="3">
              <div className="mb-2" style={{ width: "100%" }}>
                <Label className="col-form-label">Select Floor Name</Label>
                <Select
                  options={floorData}
                  className="js-example-basic-single col-sm-12"
                  onChange={(selectedOption) =>
                    handleFloorSelect(selectedOption.value)
                  }
                />
              </div>
            </Col>
            <Col md="3">
              <div className="mb-2" style={{ width: "100%" }}>
                <Label className="col-form-label">Select Room No</Label>
                <Select
                  options={roomData}
                  onChange={(selectedOption) =>
                    setSelectedRoom(selectedOption.value)
                  }
                />
              </div>
            </Col>
            <Col md="3">
              <div
                className="mb-2"
                style={{ width: "100%", marginTop: "35px" }}
              >
                <Button onClick={handleSubmit}>submit</Button>
              </div>
            </Col>
          </Row>
        </CardBody>
        <hr></hr>
        {/*student available in room */}
        <Container className="mt-4" style={{ margintop: "10px" }}>
          <Row>
            {studentData.length === 0 ? (
              <p style={{ color: "red", textAlign: "center" }}>
                Room is not assigned to any person
              </p>
            ) : (
              <table className="table text-center">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Regd No</th>
                    <th>Room No</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((stud, index) => (
                    <tr key={index}>
                      <td>{stud.id}</td>
                      <td>{stud.name}</td>
                      <td>{stud.user_id}</td>
                      <td>{selectedRoom}</td>
                      <td>
                        <div>
                          <Modal
                            isOpen={modalOpen}
                            toggle={openModal}
                            onClose={resetButtonStates}
                          >
                            <ModalHeader toggle={openModal}>Reason</ModalHeader>
                            <ModalBody>
                              <FormGroup>
                                <div>
                                  <Label check>
                                    <Input
                                      type="radio"
                                      name="reason"
                                      value="Reason 1"
                                      checked={msg === "Reason 1"}
                                      onChange={() => setMsg("Reason 1")}
                                    />
                                    {" Reason 1"}
                                  </Label>
                                </div>
                                <div>
                                  <Label check>
                                    <Input
                                      type="radio"
                                      name="reason"
                                      value="Reason 2"
                                      checked={msg === "Reason 2"}
                                      onChange={() => setMsg("Reason 2")}
                                    />
                                    {" Reason 2"}
                                  </Label>
                                </div>
                                {/* Add more radio button options as needed */}
                                <div>
                                  <Label check>
                                    <Input
                                      type="radio"
                                      name="reason"
                                      value="Others"
                                      checked={msg === "Others"}
                                      onChange={() => setMsg("Others")}
                                    />
                                    {" Others"}
                                  </Label>
                                </div>
                                {msg === "Others" && (
                                  <Input
                                    value={otherMessage}
                                    onChange={(e) =>
                                      setOtherMessage(e.target.value)
                                    }
                                    type="text"
                                    className="mt-3"
                                    placeholder="Write a reason"
                                  />
                                )}
                              </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="secondary"
                                onClick={() => {
                                  makeAttandance(stud.user_id, 0, msg);
                                  openModal();
                                  setAbsentButtonDisabled(true);
                                }}
                              >
                                Submit
                              </Button>
                              {/* Additional buttons or actions can be added here */}
                            </ModalFooter>
                          </Modal>
                        </div>
                        {absentButtonDisabled && selectedId === stud.userId ? (
                          ""
                        ) : (
                          <Button
                            color="success"
                            onClick={() => {
                              makeAttandance(stud.userId, 1, null),
                                setSelectedId(stud.userId);
                            }}
                            disabled={
                              selectedId === stud.username
                                ? presentButtonDisabled
                                : ""
                            }
                          >
                            Present
                          </Button>
                        )}{" "}
                        {presentButtonDisabled && selectedId === stud.userId ? (
                          ""
                        ) : (
                          <Button
                            color="danger"
                            onClick={() => {
                              openModal();
                              setMsg("");
                              setSelectedId(stud.userId);
                            }}
                            disabled={
                              selectedId === stud.userId
                                ? absentButtonDisabled
                                : ""
                            }
                          >
                            Absent
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Row>
        </Container>
      </Card>
    </Fragment>
  );
};

export default Take_Attendence;
