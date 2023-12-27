import React, { Fragment, useContext, useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { LocalApi, WebApi } from "../../api";
import UpdateEmployee from "./UpdateEmployee";

const AllEmployee = () => {
  const navigate = useNavigate();

  // const { data } = useContext(TableContext);

  const [empData, setEmpData] = useState([]);
  const branchID = localStorage.getItem("branchId");
  const [editModal, setEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
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
        const fetchedData = res.data;
        setEmpData(
          fetchedData
            ?.filter((key) => key.branch_id === parseInt(branchID))
            .map((item, index) => ({
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
        console.log(empData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    getAllEmployee();
  }, []);

  // const viewEditModal = (row) => {
  //   setSelectedEmployee(row);
  //   setEditModal(true);
  //   console.log("Edit modal state:", editModal);
  // };
  // const CustomButton = ({ onClick, text, row }) => (
  //   <Button color="primary" onClick={() => onClick(row)}>{text}</Button>
  // );

  let colData = [
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
        <Link
          to={`/admin/2079/edit/${row.id}`}
          state={{ employeeDetails: row }}
        >
          <Button color="primary">Edit</Button>
        </Link>
      ),
      center: true,
    },
  ];

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
      </div>
    </Fragment>
  );
};

export default AllEmployee;
