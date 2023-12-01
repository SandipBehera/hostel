import React, { Fragment, useState } from 'react';
import {Card, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import Papa from 'papaparse';

const AllPatient = () => {
  // Sample data (you can replace this with your own data)
  const data = [
    {
      id: 1,
      studentName: 'Dhananjaya Patnaik',
      doctorName:'Dr. Sandeep',
      hostelName: 'Hostel A',
      floorNo: 2,
      roomNo: 'A12',
      date: '2023-12-01',
      time: '10:00 AM'
    },
    {
        id: 2,
        studentName: 'Sanu ',
        doctorName:'Dr. Siddharth',
        hostelName: 'Hostel B',
        floorNo: 2,
        roomNo: 'B1',
        date: '2023-12-05',
        time: '01:00 pM'
      },
    // Add more data as needed...
  ];

  const [modal, setModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const toggleModal = (rowData) => {
    setSelectedData(rowData);
    setModal(!modal);
  };

  const closeModal = () => {
    setSelectedData(null);
    setModal(false);
  };
  const handleExport = () => {
    if (selectedData) {
      const csv = Papa.unparse([selectedData]);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <Fragment>
         <Breadcrumbs
             parent="Health Management"
             mainTitle="All Patient"
             title="All Patient"
             />
             <Card >
    <div >
      <Table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Doctor Name</th>
            <th>Hostel Name</th>
            <th>Floor No.</th>
            <th>Room No.</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.studentName}</td>
              <td>{item.doctorName}</td>
              <td>{item.hostelName}</td>
              <td>{item.floorNo}</td>
              <td>{item.roomNo}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>
                <Button color="primary" onClick={() => toggleModal(item)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Details</ModalHeader>
        <ModalBody>
          {selectedData && (
            <div>
              {/* Display details of selected data in the modal */}
              <p>Student Name: {selectedData.studentName}</p>
              <p>Doctor Name: {selectedData.doctorName}</p>
              <p>Hostel Name: {selectedData.hostelName}</p>
              <p>Floor No.: {selectedData.floorNo}</p>
              <p>Room No.: {selectedData.roomNo}</p>
              <p>Date: {selectedData.date}</p>
              <p>Time: {selectedData.time}</p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeModal}>
            Close
          </Button>
          {/* Export button in the modal */}
          <Button color="success" on onClick={handleExport}>Export</Button>
        </ModalFooter>
      </Modal>
    </div>
    </Card>
    </Fragment>
  );
};

export default AllPatient;

