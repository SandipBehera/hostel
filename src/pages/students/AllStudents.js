import React, { Fragment, useContext, useEffect, useState } from "react";
import { Box } from "react-feather/dist";
import {
  Label,
  FormGroup,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Container,
  Row,
} from "reactstrap";
import Select from "react-select";
import { options2 } from "../../Components/Forms/FormWidget/FormSelect2/OptionDatas";
import {
  Col,
  Card,
  CardHeader,
  Table,
  InputGroup,
  InputGroupText,
  Input,
  InputGroupAddon,
  DropdownToggle,
} from "reactstrap";
import {
  BasicInputGroups,
  LeftAddon,
  RightAddon,
  JointAddon,
  LeftRightAddon,
  SolidStyle,
  FlatStyle,
  RaiseStyle,
  Action,
  AnotherAction,
  SomethingElseHere,
} from "../../Constant";
import { FaSearch } from "react-icons/fa";
import { H5, Image, H1, Btn, Breadcrumbs } from "../../AbstractElements";
import TableContext from "../../_helper/Table";
import { BasicColorData } from "../../Components/Common/Data/Ui-kits/index";
import CommonDropDown from "../../Components/UiKits/Dropdown/Common/CommonDropDown";
import { useNavigate } from "react-router-dom";
import PopUpButton from "./PopUpButton";
import { LocalApi, LocalSocketAPI, WebApi, WebSocketAPI } from "../../api";
import socketIOClient from "socket.io-client";
import { toast } from "react-toastify";
import { el } from "date-fns/locale";
import { get } from "react-hook-form";

const roomNumberOptions = [
  { value: "room1", label: "Room 1" },
  { value: "room2", label: "Room 2" },
  { value: "room3", label: "Room 3" },
  // Add more room number options as needed
];

const AllStudents = () => {
  const [tableData, setTableData] = useState([]);
  const socket = socketIOClient(WebSocketAPI);

  // const { data } = useContext(tableData);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [assignRoomModalOpen, setAssignRoomModalOpen] = useState(false);
  const [hostelData, sethostelData] = useState([]);
  const [floorData, setFloorData] = useState([]);
  const [roomData, setRoomData] = useState([]);

  const [userid, setUserid] = useState(null);

  const [selectedHostel, setSelectedHostel] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reassignPopupOpen, setReassignPopupOpen] = useState(false);
  const toggleAssignRoomModal = (rowId) => {
    setAssignRoomModalOpen(!assignRoomModalOpen);
    setSelectedRowId(rowId);
  };
  const branchId = localStorage.getItem("branchId");
  const getData = async () => {
    const response = await fetch(`${WebApi}/get_all_users`, {
      method: "GET",
    });
    const respdata = await response.json();
    console.log(respdata);
    const data = respdata.data.filter(
      (item) => item.campus_branch === parseInt(branchId)
    );
    setTableData(data);
    console.log(data);
  };
  useEffect(() => {
    getData();
    socket.on("newUserOnBoard", getData());
    // Cleanup the socket listener when the component unmounts
    return () => {
      socket.off("newUserOnBoard", getData());
    };
  }, []);

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

  const handleAssignRoom = async () => {
   
    const data = {
      user_id: userid,
      hostel_id: selectedHostel,
      floor_id: selectedFloor,
      room_id: selectedRoom,
      branch_id: branchId,
    };

    const response = await fetch(`${WebApi}/assign_rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resproom = await response.json();

    if (resproom.status === "success") {
      getData();
      setAssignRoomModalOpen(false);
      toast.success(resproom.message);
    } else {
      toast.error(resproom.message);
    }
  };

  const handleHostelSelect = (hostelName) => {
    setSelectedHostel(hostelName);
    const floors = hostelName
      ? Array.from(
          new Set(
            hostelData
              .find((hostel) => hostel.id === hostelName)
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
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
    setDropdownOpen(!dropdownOpen);
  };

  const toggleReassignPopup = () => {
    setReassignPopupOpen(!reassignPopupOpen);
  };
  // const handleOptionSelect = (option, id) => {
  //   if (option === "Assign Room") {
  //     toggleAssignRoomModal(id);
  //     setUserid(id);
  //   } else if (option === "View") {
  //     const student = tableData.find((item) => item.id === id);
  //     setSelectedStudent(student);
  //     toggleModal();
  //   }
  // };
  const handleOptionSelect = (option, id) => {
    if (option === "Assign Room") {
      toggleAssignRoomModal(id);
      setUserid(id);
    } else if (option === "Reassign Room") {
      toggleReassignPopup();
      setUserid(id);
    } else if (option === "View") {
      const student = tableData.find((item) => item.id === id);
      setSelectedStudent(student);
      toggleModal();
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  console.log(userid);

  return (
    <Fragment>
      <Breadcrumbs
        parent="Student"
        mainTitle="All Hostel Students "
        subParent="Hostel Students"
        title="All Hostel Students"
      />
      <Container fluid={true}>
        <Card>
          <CardBody>
            

            <Col sm="12">
              <Card className="h-auto">
                <div className="table-responsive">
                  <Table>
                    <thead>
                      <tr className="border-bottom-primary">
                        <th scope="col">{"Id"}</th>
                        <th scope="col">{" Name"}</th>
                        <th scope="col">{"Semester Year"}</th>
                        <th scope="col">{"Branch"}</th>
                        <th scope="col">{"Assigned Hostel"}</th>
                        <th scope="col">{"View"}</th>
                        <th scope="col">{"Action"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((item, index) => (
                        <tr
                          key={item.id}
                          className={`border-bottom-${item.color}`}
                        >
                          <th scope="row">{index+1}</th>
                          <td>
                            {/* <Image
                              attrImage={{
                                className: "img-30 me-2",
                                src: require(`../../assets/images/user/${item.image}`),
                                alt: "user",
                              }}
                            /> */}
                            {item.name}
                          </td>

                          <td>{item.semesterYear}</td>
                          <td>{item.branch}</td>
                          <td>
                            {item.room_id !== null ? (
                              <>
                                <p>Hostel Name: {item?.hostel_name}</p>
                                <p>Room No: {item?.room_id}</p>
                              </>
                            ) : (
                              "need to assign"
                            )}
                          </td>
                          <td>
                            <PopUpButton
                              student={item}
                              onViewClick={() =>
                                handleOptionSelect("View", item.id)
                              }
                            />
                          </td>
                          <td>
                            <Dropdown
                              isOpen={activeDropdown === item.id}
                              toggle={() => toggleDropdown(item.id)}
                            >
                              <DropdownToggle caret>{Action}</DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem
                                  onClick={() =>
                                    handleOptionSelect(
                                      "Assign Room",
                                      item.userId
                                    )
                                  }
                                >
                                  {item.hostel_name
                                    ? "Reassign Room"
                                    : "Assign Room"}
                                </DropdownItem>
                                {/* <DropdownItem
                                  onClick={() => setActive(!active)}
                                >
                                  {active ? "ACTIVE" : "IN ACTIVE"}
                                </DropdownItem> */}
                              </DropdownMenu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  {assignRoomModalOpen && (
                    <Modal
                      isOpen={assignRoomModalOpen}
                      toggle={() => toggleAssignRoomModal(null)}
                    >
                      <ModalHeader toggle={() => toggleAssignRoomModal(null)}>
                        Assign Room
                      </ModalHeader>
                      <ModalBody>
                        <FormGroup>
                          <Label for="hostelSelect">Hostel Name</Label>
                          <Select
                            id="hostelSelect"
                            options={hostel_name}
                            onChange={(selectedOption) =>
                              handleHostelSelect(selectedOption.value)
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="floorSelect">Floor</Label>
                          <Select
                            id="floorSelect"
                            options={floorData}
                            onChange={(selectedOption) =>
                              handleFloorSelect(selectedOption.value)
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="roomNumberSelect">Room Number</Label>
                          <Select
                            id="roomNumberSelect"
                            options={roomData}
                            onChange={(selectedOption) =>
                              setSelectedRoom(selectedOption.value)
                            }
                          />
                        </FormGroup>
                        <Button color="primary" onClick={handleAssignRoom}>
                          Assign Room
                        </Button>
                      </ModalBody>
                    </Modal>
                  )}
     
                </div>
              </Card>
            </Col>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default AllStudents;
