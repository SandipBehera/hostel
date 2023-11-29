import React, { useState, Fragment, useEffect } from "react";
import {
  Card,
  CardHeader,
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
} from "reactstrap";
import { Breadcrumbs, H5 } from "../../AbstractElements";
import { LocalApi, WebApi } from "../../api";
import ViewModal from "./Component/modal";
const AllPlanner = () => {
  // Sample data for the table
  const [data, setData] = useState([]);
  // Function to fetch data from the API
  const fetchData = async () => {
    const response = await fetch(`${WebApi}/get_all_menu`);
    const respData = await response.json();
    setData(respData.data);
  };
  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);
  // Dropdown State for individual rows
  const [dropdownOpen, setDropdownOpen] = useState({});

  // Function to toggle dropdown for a specific row
  const toggleDropdown = (itemId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };
  // Modal State for Edit/Delete confirmation
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Function to handle actions (Edit or Delete)
  const handleAction = (action, itemId) => {
    setSelectedAction(action);
    setSelectedItemId(itemId);
    toggleModal();
  };

  // Function to perform edit or delete based on the user's choice
  const performAction = () => {
    if (selectedAction === "Edit") {
      // Perform Edit action based on the selected item ID
      console.log(`Editing item with ID: ${selectedItemId}`);
      // Add your logic for editing here
    } else if (selectedAction === "Delete") {
      // Perform Delete action based on the selected item ID
      console.log(`Deleting item with ID: ${selectedItemId}`);
      // Add your logic for deleting here
    }
    toggleModal();
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Setting"
        mainTitle="Food Menu List "
        subParent="Food Planner"
        title="Food Menu List"
      />
      <Container fluid={true}>
        <Row>
          <Card>
            <CardHeader>
              <H5>All Planner</H5>
            </CardHeader>
            <div>
              <Table>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Month</th>
                    <th>View</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.month}</td>
                      <td>
                        <ViewModal data={data} id={item.id} />
                      </td>
                      <td>
                        <Dropdown
                          isOpen={dropdownOpen[item.id]}
                          toggle={() => toggleDropdown(item.id)}
                        >
                          <DropdownToggle caret>Actions</DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              onClick={() => handleAction("Edit", item.id)}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleAction("Delete", item.id)}
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* Modal for Edit/Delete confirmation */}
              <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                  {selectedAction === "Edit"
                    ? "Edit Confirmation"
                    : "Delete Confirmation"}
                </ModalHeader>
                <ModalBody>
                  {selectedAction === "Edit"
                    ? `Are you sure you want to edit this item?`
                    : `Are you sure you want to delete this item?`}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={performAction}>
                    Confirm
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </Card>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AllPlanner;
