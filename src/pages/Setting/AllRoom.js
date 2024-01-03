import React, { useEffect, useState, Fragment } from "react";
import DataTable from "react-data-table-component";
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
import { Link, useNavigate } from "react-router-dom";
import { WebApi } from "../../api";
import { Breadcrumbs } from "../../AbstractElements";

import { Col, Card, Table, DropdownToggle, Row, Container } from "reactstrap";
import { toast } from "react-toastify";
import PopUp from "./PopUp";
import EditForm from "./EditForm";
import { Action } from "../../Constant";

const AllRoom = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState(-1);

  const branchId = localStorage.getItem("branchId");

  const roomHostel = async () => {
    const response = await fetch(`${WebApi}/get_student_room/${branchId}`, {
      method: "GET",
    });

    const resproom = await response.json();
    const fetchedData = resproom.data;
    setData(fetchedData);
    if (resproom && resproom.status) {
      console.log("data fetched");
    }
  };

  // function handleDelete(id) {
  //   fetch(`${WebApi}/delete_rooms/${id}`, {
  //     method: "DELETE",
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.status === "success") {
  //         toast.success("Room Deleted Successfully");
  //         roomHostel();
  //       } else {
  //         toast.error("Room Not Deleted");
  //       }
  //     });
  // }

  useEffect(() => {
    roomHostel();
  }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const toggleDropdown = (id) => {
    setData((prevData) =>
      prevData.map((item) => ({
        ...item,
        activeDropdown: item.id === id ? !item.activeDropdown : false,
      }))
    );
  };
  const handleOptionSelect = (option, id) => {
    if (option === "Edit") {
      toggleModal(); // Assuming you have a toggleModal function
      setEdit(id);
    } else if (option === "Delete") {
      handleDelete(id);
    }
  };

  const columns = [
    {
      name: "SL.NO",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "H-Name",
      selector: (row) => row.hostel_name,
      sortable: true,
    },
    {
      name: "No of Floor",
      selector: (row) => row.floor_count,
      sortable: true,
    },
    {
      name: "View",
      cell: (row) => <PopUp data={data} id={row.id} />,
    },
    {
      name: "Action",
      cell: (row) => (
        <Dropdown
          isOpen={row.activeDropdown}
          toggle={() => toggleDropdown(row.id)}
        >
          <DropdownToggle caret>{Action}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => handleOptionSelect("Edit", row.id)}>
              Edit
            </DropdownItem>
            <DropdownItem onClick={() => handleDelete(row.id)}>
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ),
    },
  ];

  return (
    <Fragment>
      <Breadcrumbs
        parent="Setting"
        mainTitle="All Room "
        subParent="Room Management"
        title="All Room "
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="table-responsive">
                  <Table>
                    <thead style={{ textAlign: "center" }}>
                      <tr className="border-bottom-primary">
                        <th scope="col">{"SL.NO"}</th>
                        <th scope="col">{" H-Name"}</th>
                        <th scope="col">{"No of Floor"}</th>
                        <th scope="col">{"View"}</th>
                        <th scope="col">{"Action"}</th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                      {data &&
                        data.length > 0 &&
                        data.map((item) => {
                          console.log("item", item);

                          return edit === item.id ? (
                            <EditForm
                              key={item.id}
                              item={item}
                              data={data}
                              setData={setData}
                              isOpen={toggleModal}
                              setEdit={setEdit}
                            />
                          ) : (
                            <tr
                              key={item.id}
                              className={`border-bottom-${item.color}`}
                            >
                              <th scope="row">{item.id}</th>
                              <td>{item.hostel_name}</td>
                              <td>{item.floor_count}</td>
                              <td>
                                <PopUp data={data} id={item.id} />
                              </td>
                              <td>
                                <Dropdown
                                  isOpen={item.activeDropdown}
                                  toggle={() => toggleDropdown(item.id)}
                                >
                                  <DropdownToggle caret>
                                    {Action}
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <Link
                                      to={`/admin/${userId}/editroom/${item.id}`}
                                      state={{ roomDetails: item }}
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          handleOptionSelect("Edit", item.id)
                                        }
                                      >
                                        Edit
                                      </DropdownItem>
                                    </Link>

                                    {/* <DropdownItem
                                      onClick={() => handleDelete(item.id)}
                                    >
                                      Delete
                                    </DropdownItem> */}
                                  </DropdownMenu>
                                </Dropdown>
                              </td>
                            </tr>
                          );
                        })}

                      <tr>
                        <td colSpan="5">Loading...</td>
                      </tr>
                    </tbody>
                  </Table>

                  {/* popup modal */}
                  {edit !== -1 && (
                    <EditForm
                      item={data.find((item) => item.id === edit)}
                      data={data}
                      setData={setData}
                      isOpen={toggleModal}
                      setEdit={setEdit}
                    />
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AllRoom;
