import { Link } from "react-router-dom";
import React, { Fragment, useState } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card } from 'reactstrap';
import { Breadcrumbs,   H5 } from "../../AbstractElements";

const dummyData = [
  { id: 1, name: 'Abhishek Gupta', issueType: 'Technical', description: 'Lorem ipsum...', status: 'Pending' },
  { id: 2, name: 'Rahul Mishra', issueType: 'Technical', description: 'Lorem ipsum...', status: 'Pending' },

  // Add more dummy data as needed
];

const Complaint= () => {
  const [modal, setModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const toggleModal = () => setModal(!modal);

  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
    toggleModal();
  };

  return (
    <Fragment>
    <Breadcrumbs
        parent="Employee"
        mainTitle="View Complaint"
        title="View Complaint"
      />
    <Card>
    <Table className='text-center'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Issue Type</th>
            <th>View</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.id}</td>
              <td>{complaint.name}</td>
              <td>{complaint.issueType}</td>
              <td>
                <Button color="primary" onClick={() => openModal(complaint)}>
                  View
                </Button>
              </td>
              <td>
                <Link to={`/complain-action/${complaint.id}`} className="btn btn-success">Action</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Complaint Details</ModalHeader>
        <ModalBody>
          
          <strong className='text-center'>Complaint Description:</strong> <br></br>
          <p>{selectedComplaint?.description}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      </Card>
      
      </Fragment>
  );
};

export default Complaint;