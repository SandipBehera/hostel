import React, { Fragment, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  ModalFooter,
  Button,
  Table,
  Row,
  Col,
} from "reactstrap";
import { Breadcrumbs, H5 } from "../../AbstractElements";
import { useLocation } from "react-router-dom";
import { WebApi } from "../../api";
import { toast } from "react-toastify";

const UpdateEmployee = ({ isOpen, toggle }) => {
  const location = useLocation();
  const { employeeDetails } = location.state || {};
  console.log(location.state);
  const userType = localStorage.getItem("userType");
  const branch = localStorage.getItem("branchId");

  // Create state variables for form data
  const [name, setName] = useState(employeeDetails?.name || "");
  const [email, setEmail] = useState(employeeDetails?.email || "");
  const [regNo, setRegNo] = useState(employeeDetails?.regNo || "");
  const [designation, setDesignation] = useState(
    employeeDetails?.designation || ""
  );
  const [address, setAddress] = useState(employeeDetails?.address || "");
  const [contact, setContact] = useState(employeeDetails?.contact || "");
  const [pan, setPan] = useState(employeeDetails?.pan || "");
  const [aadhar, setAadhar] = useState(employeeDetails?.aadhar || "");
  const [bank, setBank] = useState(employeeDetails?.bank || "");
  const [bankNo, setBankNo] = useState(employeeDetails?.bankNo || "");
  const [ifsc, setIfsc] = useState(employeeDetails?.ifsc || "");
  const [image, setImage] = useState(employeeDetails?.image || "");
  const [doj, setDoj] = useState(employeeDetails.doj || "");

  const handleSave = async () => {
    try {
      const formData = new FormData();

      // Append form data fields
      formData.append("name", name);
      formData.append("email", email);
      formData.append("contact", contact);
      formData.append("employeeId", employeeDetails?.empId);
      formData.append("address", address);
      formData.append("employee_reg_no", regNo);
      formData.append("designation", designation);
      formData.append("pan", pan);
      formData.append("aadhar", aadhar);
      formData.append("bank", bank);
      formData.append("account", bankNo);
      formData.append("ifsc", ifsc);
      formData.append("userType", userType);
      formData.append("branch_id", branch);
      formData.append("doj", doj);
      if (image) {
        formData.append("file", image);
      }

      console.log("Request Payload:", formData);

      const response = await fetch(`${WebApi}/updateEmployee`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (data.status === "success") {
        toast.success("Employee Details Updated Successfully");
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Faild to update employee details");
    }
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Employee"
        mainTitle="Update Employee Details"
        title="Update Employee Details"
      />
      <Table className="text-center">
        <tr style={{ height: "40px", width: "40px" }}>
          <label htmlFor="upload-input">
            <img
              src={employeeDetails?.image || "https://via.placeholder.com/200"}
              alt="Profile"
              style={{ height: "40px", width: "40px" }}
            />
            <input
              id="upload-input"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              accept="image/*"
            />
          </label>
        </tr>
      </Table>
      <Row>
        <Col>
          <Label className="mt-1">Employee Name</Label>
          <Input
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
        <Col>
          <Label className="mt-1">Email</Label>
          <Input
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label className="mt-1">Registration No</Label>
          <Input
            defaultValue={regNo}
            onChange={(e) => setRegNo(e.target.value)}
          />
        </Col>
        <Col>
          <Label className="mt-1">Designation</Label>
          <Input
            defaultValue={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label className="mt-1">Address</Label>
          <Input
            defaultValue={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Col>
        <Col>
          <Label className="mt-1">Contact</Label>
          <Input
            defaultValue={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label className="mt-1">Pan No</Label>
          <Input defaultValue={pan} onChange={(e) => setPan(e.target.value)} />
        </Col>
        <Col>
          <Label className="mt-1">Aadhar No</Label>
          <Input
            defaultValue={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label className="mt-1">Date of Join</Label>
          <span className="text-secondary px-2">
            {`${new Date(employeeDetails.doj)}`.slice(4, 15)}
          </span>
          <Input
            defaultValue={doj}
            type="date"
            onChange={(e) => setDoj(e.target.value)}
          />
        </Col>
        <Col>
        
        
        </Col>
      </Row>

      <div className="mt-3 text-center">
        <H5>Bank Details</H5>
      </div>
      <Row>
        <Col>
          <Label className="mt-1">Bank Name</Label>
          <Input
            defaultValue={bank}
            onChange={(e) => setBank(e.target.value)}
          />
        </Col>
        <Col>
          <Label className="mt-1">Account No</Label>
          <Input
            defaultValue={bankNo}
            onChange={(e) => setBankNo(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label className="mt-1">IFSC No</Label>
          <Input
            defaultValue={ifsc}
            onChange={(e) => setIfsc(e.target.value)}
          />
        </Col>
        <Col></Col>
      </Row>
      <Button
        className="mt-4 mb-4 d-flex justify-end flex-end"
        onClick={handleSave}
      >
        Save
      </Button>
    </Fragment>
  );
};

export default UpdateEmployee;

// {
//     name: 'Test12',
//     email: 'test12@gmail.com',
//     contact: '9876543210',
//     employeeId: '12345',
//     address: 'Tadong',
//     employee_reg_no: '12345',
//     designation: 'Incharge',
//     aadhar: '1234567890',
//     pan: '123456',
//     account: '12345678',
//     bank: 'BOI',
//     ifsc: '123456A',
//     doj: '2023-12-26',
//     userType: 'employee',
//     branch_id: '35'
//   }

// {
//     name: 'Test12',
//     email: 'test12@gmail.com',
//     regNo: '12345',
//     designation: 'Incharge',
//     address: 'Tadong',
//     contact: '9876543210',
//     pan: 'DB123456',
//     aadhar: '2023-12-19',
//     bank: 'BOI',
//     bankNo: '12345678',
//     ifsc: '123456A',
//     userType: 'admin',
//     branch_id: '35',
//     emp_dob: '2023-12-26T00:00:00.000Z',
//     image: '1702879138850_image (10).png',
//     employeeId: '12345'
//   }
