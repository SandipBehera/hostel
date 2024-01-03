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
import DataTable from "react-data-table-component";
import { fetchHealthData } from "../../Hooks/fetch_student_data";

const AllPatient = () => {
  const [modal, setModal] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    async function fetchData() {
      setData(await fetchHealthData());
    }

    fetchData();
  }, []);
  let colData = [
    {
      name: "Student Name",
      selector: (row) => row.name,
      sortable: true,
      center: false,
    },

    {
      name: "Doctor Name",
      selector: (row) => row.doc,
      sortable: true,
      center: false,
    },
    {
      name: "Hostel Name",
      selector: (row) => row.hostel,
      sortable: true,
      center: true,
    },
    {
      name: "Floor No.",
      selector: (row) => row.floor,
      sortable: true,
      center: false,
    },
    {
      name: "Room No.",
      selector: (row) => row.room,
      sortable: true,
      center: false,
    },
    {
      name: "Date",
      selector: (row) => {
        const dateObject = new Date(row.date);
        const formattedDate = dateObject.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
        return formattedDate;
      },
      sortable: true,
      center: false,
    },

    {
      name: "Action",
      cell: (row) => (
        <Button color="primary" onClick={() => toggleModal(row)}>
          View
        </Button>
      ),
      center: true,
    },
  ];

  console.log(data);
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
  const userType = localStorage.getItem("userType");
  console.log(userType);
  const dataByUType =
    localStorage.getItem("userType") === "admin" ||
    localStorage.getItem("userType") === "employee"
      ? data
      : data?.filter(
          (key) => key.patient_regdno === localStorage.getItem("userId")
        );
  return (
    <Fragment>
      {(userType === "admin" || userType === "employee") && (
        <Breadcrumbs
          parent="Health Management"
          mainTitle="All Patient"
          title="All Patient"
        />
      )}
      {userType === "student" && (
        <Breadcrumbs
          parent="Health Report"
          mainTitle="My Report"
          title="My Report"
        />
      )}

      <Card>
        <div>
          <DataTable
            data={data}
            columns={colData}
            striped={true}
            center={true}
            pagination
            className="text-center"
          />
          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Details</ModalHeader>
            <ModalBody>
              {selectedData && (
                <div>
                  {/* Display details of selected data in the modal */}
                  <p>Student Name: {selectedData.name}</p>
                  <p>Doctor Name: {selectedData.doc}</p>

                  <p>Date: {`${new Date(selectedData.date)}`.slice(4, 15)}</p>
                  <p>Time: {selectedData.time}</p>
                  <p>Preception Copy</p>
                  <img
                    src={`${WebStore}${selectedData.pres}`}
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

{
  /* <Table className="text-center">
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
  {dataByUType?.map((item) => (
    <tr key={item.id}>
      <td>{item.patientname}</td>
      <td>{item.doctorname}</td>
      <td>{item.hostelid}</td>
      <td>{item.floorid}</td>
      <td>{item.roomno}</td>
      <td>{`${new Date(item.date)}`.slice(4, 15)}</td>
      <td>{item.time}</td>
      <td>
        <Button color="primary" onClick={() => toggleModal(item)}>
          View
        </Button>
      </td>
    </tr>
  ))}
</tbody>
</Table> */
}
