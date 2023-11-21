import React, { useState, Fragment } from 'react';
import {Card,CardHeader, Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { H5 } from '../../../../AbstractElements';
const AllPlanner = () => {
  // Sample data for the table
  const data = [
    { id: 1, month: 'January', views: 100 },
    { id: 2, month: 'February', views: 150 },
    { id: 3, month: 'March', views: 200 },
    { id: 4, month: 'April', views: 220 },
    { id: 5, month: 'May', views: 230 },
    { id: 6, month: 'June', views: 250 },
    { id: 7, month: 'July', views: 200 },
    { id: 8, month: 'August', views: 100 },
    { id: 9, month: 'September', views: 250 },
    { id: 10, month: 'October', views: 200 },
    { id: 11, month: 'November', views: 240 },
    { id: 12, month: 'December', views: 200 },
    // Add more data as needed
  ];

  // Dropdown State for individual rows
  const [dropdownOpen, setDropdownOpen] = useState({});

  // Function to toggle dropdown for a specific row
  const toggleDropdown = itemId => {
    setDropdownOpen(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
  };
   // Modal State for Edit/Delete confirmation
   const [modalOpen, setModalOpen] = useState(false);
   const toggleModal = () => setModalOpen(!modalOpen);
   const [selectedAction, setSelectedAction] = useState('');
   const [selectedItemId, setSelectedItemId] = useState(null);

 // Function to handle actions (Edit or Delete)
 const handleAction = (action, itemId) => {
    setSelectedAction(action);
    setSelectedItemId(itemId);
    toggleModal();
  };
  
  // Function to perform edit or delete based on the user's choice
  const performAction = () => {
    if (selectedAction === 'Edit') {
      // Perform Edit action based on the selected item ID
      console.log(`Editing item with ID: ${selectedItemId}`);
      // Add your logic for editing here
    } else if (selectedAction === 'Delete') {
      // Perform Delete action based on the selected item ID
      console.log(`Deleting item with ID: ${selectedItemId}`);
      // Add your logic for deleting here
    }
    toggleModal();
  };

  return (
    <Fragment>
    <Card>
      <CardHeader>
        <H5>All Planner</H5>
        
      </CardHeader>
    <div>

    <Table >
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
            <td>{item.views}</td>
            <td>
              <Dropdown isOpen={dropdownOpen[item.id]} toggle={() => toggleDropdown(item.id)}>
                <DropdownToggle caret>
                  Actions
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => handleAction('Edit', item.id)}>Edit</DropdownItem>
                  <DropdownItem onClick={() => handleAction('Delete', item.id)}>Delete</DropdownItem>
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
       {selectedAction === 'Edit' ? 'Edit Confirmation' : 'Delete Confirmation'}
     </ModalHeader>
     <ModalBody>
       {selectedAction === 'Edit' ? `Are you sure you want to edit this item?` : `Are you sure you want to delete this item?`}
     </ModalBody>
     <ModalFooter>
       <Button color="primary" onClick={performAction}>Confirm</Button>{' '}
       <Button color="secondary" onClick={toggleModal}>Cancel</Button>
     </ModalFooter>
   </Modal>
   </div>
   </Card>
   </Fragment>
  );
};

export default AllPlanner;
