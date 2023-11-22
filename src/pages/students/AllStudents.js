import React, { useContext, useEffect, useState } from "react";
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
import { H5, Image, H1, Btn } from "../../AbstractElements";
import TableContext from "../../_helper/Table";
import { BasicColorData } from "../../Components/Common/Data/Ui-kits/index";
import CommonDropDown from "../../Components/UiKits/Dropdown/Common/CommonDropDown";
import { useNavigate } from "react-router-dom";
import PopUpButton from "./PopUpButton";
import { LocalApi, WebApi } from "../../api";
import { set } from "date-fns";

const roomNumberOptions = [
  { value: "room1", label: "Room 1" },
  { value: "room2", label: "Room 2" },
  { value: "room3", label: "Room 3" },
  // Add more room number options as needed
];

const AllStudents = () => {
  const [tableData, setTableData] = useState([]);

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

  const toggleAssignRoomModal = (rowId) => {
    setAssignRoomModalOpen(!assignRoomModalOpen);
    setSelectedRowId(rowId);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`${WebApi}/get_all_users`, {
        method: "GET",
      });
      const respdata = await response.json();
      const data = respdata.data.filter((item) => item.user_type === "student");
      setTableData(data);
    };
    getData();
  }, []);

  useEffect(() => {
    const roomHostel = async () => {
      const response = await fetch(`${WebApi}/get_rooms`, {
        method: "GET",
      });
      const resproom = await response.json();
      sethostelData(resproom.data);
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
    };

    const response = await fetch(`${WebApi}/assign_rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resproom = await response.json();
    console.log(resproom);

    // Close the modal after assigning the room
    setAssignRoomModalOpen(false);
  };

  const handleHostelSelect = (hostelName) => {
    console.log(hostelName);
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

  const handleOptionSelect = (option, id) => {
    if (option === "Edit") {
      setModalOpen(true);
    } else if (option === "Assign Room") {
      toggleAssignRoomModal(id);
      setUserid(id);
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  console.log(tableData);
  return (
    <div className="page-wrapper" id="pageWrapper">
      <div className="text-center">
        <H1 style={{ color: "#61A3BA" }}>All Students</H1>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="mb-2" style={{ width: "30%" }}>
          <Label className="col-form-label"></Label>
          <Select
            options={options2}
            className="js-example-basic-single col-sm-12"
          />
        </div>

        <div className="" style={{ width: "30%" }}>
          <Label className="col-form-label"></Label>
          <Select
            options={options2}
            className="js-example-basic-single col-sm-12"
          />
        </div>
        <div className="">
          <Label className="col-form-label"></Label>
          <InputGroup>
            <InputGroupText>
              <FaSearch />
            </InputGroupText>

            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleChange}
            />
          </InputGroup>
        </div>
      </div>

      <div className="mt-5">
        <Col sm="12">
          <Card>
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
                  {tableData
                    // .filter((item) => {
                    //   return searchTerm.toLowerCase() === " "
                    //     ? item
                    //     : item.first_name.toLowerCase().includes(searchTerm);
                    // })
                    .map((item) => (
                      <tr
                        key={item.id}
                        className={`border-bottom-${item.color}`}
                      >
                        <th scope="row">{item.id}</th>
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
                          {item.room_id !== null
                            ? `${item?.hostel_name}:${item.room_id}`
                            : "need to assign"}
                        </td>
                        <td>
                          <PopUpButton />
                        </td>
                        <td>
                          <Dropdown
                            isOpen={activeDropdown === item.id}
                            toggle={() => toggleDropdown(item.id)}
                          >
                            <DropdownToggle caret>{Action}</DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                onClick={() => handleOptionSelect("Edit")}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                onClick={() =>
                                  handleOptionSelect(
                                    "Assign Room",
                                    item.username
                                  )
                                }
                              >
                                Assign Room
                              </DropdownItem>
                              <DropdownItem onClick={() => setActive(!active)}>
                                {active ? "ACTIVE" : "IN ACTIVE"}
                              </DropdownItem>
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

              {/* popup modal view */}

              <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Popup Modal</ModalHeader>
                <ModalBody>
                  {/* Content for the modal */}
                  <p>Popup content goes here.</p>
                  <Button color="primary" onClick={toggleModal}>
                    Close
                  </Button>
                </ModalBody>
              </Modal>
            </div>
          </Card>
        </Col>
      </div>
    </div>
  );
};

export default AllStudents;
