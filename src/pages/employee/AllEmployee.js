import React, { Fragment, useEffect, useState } from "react";
import {
  Col,
  Card,
  CardHeader,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  ModalFooter,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { Breadcrumbs, H5 } from "../../AbstractElements";
import { Link } from "react-router-dom";
import { LocalApi, WebApi } from "../../api";
import Select from "react-select";
import { toast } from "react-toastify";

const AllEmployee = () => {
  const [empData, setEmpData] = useState([]);
  const [modal, setModal] = useState(false);
  const [hostelName, setHostelName] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const userId = localStorage.getItem("userId");
  const branchId = localStorage.getItem("branchId");

  const getHostelName = async () => {
    try {
      const response = await fetch(`${WebApi}/get_rooms`, {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          `Error: ${response.status} - ${response.statusText}`,
          errorData
        );
        return;
      }

      const res = await response.json();
      const fetchedData = res.data;
      setHostelName(
        fetchedData
          .filter((key) => key.branch_id === parseInt(branchId))
          .map((item) => {
            return { value: item.id, label: item.hostel_name };
          })
      );
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    const getAllEmployee = async () => {
      try {
        const response = await fetch(`${WebApi}/getEmployee`, {
          method: "GET",
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error(
            `Error: ${response.status} - ${response.statusText}`,
            errorData
          );
          return;
        }

        const res = await response.json();
        const fetchedData = res.data.filter(
          (key) =>
            key.branch_id === parseInt(branchId) && key.user_type === "employee"
        );
        setEmpData(
          fetchedData.map((item, index) => ({
            id: index + 1,
            name: item.emp_name,
            email: item.emp_email,
            contact: item.emp_phone,
            address: item.address,
            designation: item.emp_designation,
            image: item.emp_pic,
            aadhar: item.aadhar_no,
            pan: item.pan_no,
            regNo: item.employee_reg_no,
            bank: item.bank_ac_name,
            bankNo: item.bank_ac_no,
            ifsc: item.bank_ifsc,
            empId: item.emp_id,
            doj: item.emp_dob,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    getAllEmployee();
    getHostelName();
  }, []);

  const handleAssignHostel = (empID) => {
    setModal(!modal);
    setSelectedEmployee(empID);
  };
  const colData = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      center: false,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      center: false,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      center: false,
    },
    {
      name: "Contact No.",
      selector: (row) => row.contact,
      sortable: true,
      center: false,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
      center: false,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: true,
      center: false,
    },
    {
      name: "Action",
      cell: (row) => (
        <Fragment>
          <div>
            <Link
              to={`/admin/${userId}/edit/${row.id}`}
              state={{ employeeDetails: row }}
            >
              <Button
                size="sm"
                style={{ padding: ".1rem .5rem", marginRight: ".2rem" }}
                color="primary"
              >
                Edit
              </Button>
            </Link>
          </div>
          <div>
            <Button
              size="sm"
              style={{ padding: ".1rem .5rem" }}
              onClick={() => handleAssignHostel(row.empId)}
              color="success"
            >
              Assign
            </Button>
          </div>
        </Fragment>
      ),
      center: true,
      sortable: true,
    },
  ];
  const AssignHostel = async () => {
    const data = {
      employeeId: selectedEmployee,
      hostel_id: selectedHostel,
      branch_id: parseInt(branchId),
    };
    try {
      const response = await fetch(`${WebApi}/assignHostel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          `Error: ${response.status} - ${response.statusText}`,
          errorData
        );
        return;
      }
      const res = await response.json();
      if (res.status === "success") {
        toast.success(res.message);
        setModal(!modal);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Employee"
        mainTitle="All Employee"
        title="All Employee"
      />
      <div className="page-wrapper" id="pageWrapper">
        <Col sm="12">
          <Card>
            <CardHeader>
              <Row className="align-items-center justify-content-between">
                <Col xs="auto" className="px-4">
                  <H5 className="mb-0">All Employee</H5>
                </Col>
                <Col xs="auto" className="px-4"></Col>
              </Row>
            </CardHeader>
            <div className="table-responsive">
              <DataTable
                data={empData}
                columns={colData}
                striped={true}
                center={true}
                pagination
              />
            </div>
          </Card>
        </Col>
        <Modal isOpen={modal} toggle={handleAssignHostel}>
          <ModalHeader toggle={handleAssignHostel}>
            Assign Hostel to Employee
          </ModalHeader>
          <ModalBody>
            <Label>Hostel Name</Label>
            <Select
              id="hostelSelect"
              options={hostelName}
              onChange={(selectedOption) =>
                setSelectedHostel(selectedOption.value)
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={AssignHostel}>
              Assign
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </Fragment>
  );
};

export default AllEmployee;
