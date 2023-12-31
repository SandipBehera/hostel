import React, { useState, Fragment, useEffect } from "react";
import {
  Card,
  CardHeader,
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
} from "reactstrap";
import { Breadcrumbs, H5 } from "../../AbstractElements";
import { LocalApi, WebApi } from "../../api";
import ViewModal from "./Component/modal";
import EditFoodplanner from "./EditFoodplanner";
import { toast } from "react-toastify";
const AllPlanner = () => {
  // Sample data for the table
  const [data, setData] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  // Function to fetch data from the API
  const branchID = localStorage.getItem("branchId");

  const fetchData = async () => {
    const response = await fetch(`${WebApi}/get_all_menu`);
    const respData = await response.json();

    setData(
      respData.data?.filter((key) => key.branch_id === parseInt(branchID))
    );
  };
  //edit feture
  const editItem = async (itemId) => {
    try {
      setEditModalOpen(true);
      setSelectedItem(itemId);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await fetch(`${WebApi}/delete_menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: itemId }),
      });

      if (response.ok) {
        toast.success("Food plan deleted successfully");
        fetchData(); // Update the data after successful deletion
      } else {
        toast.error("Failed to delete food menu");
        // Handle errors or show an error message to the user
      }
    } catch (error) {
      console.error("Error during delete:", error);
      // Handle network errors or other exceptions
    }

    toggleModal();
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
                      <td>
                        {item.month}-{item.year}
                      </td>
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
                            <DropdownItem onClick={() => editItem(item.id)}>
                              Edit
                            </DropdownItem>
                            <DropdownItem onClick={() => deleteItem(item.id)}>
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <EditFoodplanner
                data={data.filter((key) => key.id === selectedItem)}
                setData={setData}
                isOpen={editModalOpen}
                toggle={() => setEditModalOpen(!editModalOpen)}
                selectedItem={selectedItem}
                updateRecord={fetchData}
              />
            </div>
          </Card>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AllPlanner;
