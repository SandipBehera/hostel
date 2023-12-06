import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Breadcrumbs } from "../../AbstractElements";
import Papa from "papaparse";
import { LocalApi, LocalStore, WebApi, WebStore } from "../../api";

const AllPatient = () => {
  // Sample data (you can replace this with your own data)
  // const data = [
  //   {
  //     id: 1,
  //     studentName: 'Dhananjaya Patnaik',
  //     doctorName:'Dr. Sandeep',
  //     hostelName: 'Hostel A',
  //     floorNo: 2,
  //     roomNo: 'A12',
  //     date: '2023-12-01',
  //     time: '10:00 AM'
  //   },
  //   {
  //       id: 2,
  //       studentName: 'Sanu ',
  //       doctorName:'Dr. Siddharth',
  //       hostelName: 'Hostel B',
  //       floorNo: 2,
  //       roomNo: 'B1',
  //       date: '2023-12-05',
  //       time: '01:00 pM'
  //     },
  //   // Add more data as needed...
  // ];

  const [modal, setModal] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      const response = await fetch(`${WebApi}/getAllPatient`);
      const respData = await response.json();
      setData(respData.data);
    };
    fetchData();
  }, []);

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
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "data.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };
  const dataByUType =
    localStorage.getItem("userType") === "admin" ||
    localStorage.getItem("userType") === "employee"
      ? data
      : data.filter(
          (key) => key.patient_regdno === localStorage.getItem("userId")
        );
  return (
    <Fragment>
      <Breadcrumbs
        parent="Health Management"
        mainTitle="All Patient"
        title="All Patient"
      />
      <Card>
        <div>
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
              {dataByUType.map((item) => (
                <tr key={item.id}>
                  <td>{item.patientname}</td>
                  <td>{item.doctorname}</td>
                  <td>{item.hostelid}</td>
                  <td>{item.floorid}</td>
                  <td>{item.roomno}</td>
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
                  <p>Student Name: {selectedData.patientname}</p>
                  <p>Doctor Name: {selectedData.doctorname}</p>
                  <p>Hostel Name: {selectedData.hostelid}</p>
                  <p>Floor No.: {selectedData.floorid}</p>
                  <p>Room No.: {selectedData.roomno}</p>
                  <p>Date: {selectedData.date}</p>
                  <p>Time: {selectedData.time}</p>
                  <p>Preception Copy</p>
                  <img
                    src={`${WebStore}${selectedData.upload_preception}`}
                    alt="prescription"
                    style={{ width: "-webkit-fill-available" }}
                  />
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={closeModal}>
                Close
              </Button>
              {/* Export button in the modal */}
              <Button color="success" on onClick={handleExport}>
                Export
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </Card>
    </Fragment>
  );
};

export default AllPatient;
