import React, { Fragment, useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import { WebApi, WebStore } from "../../api";
import { toast } from "react-toastify";
import Select from "react-select";

const UpdateEmployee = ({ isOpen, toggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employeeDetails } = location.state || {};
  console.log(location.state);
  const userType = localStorage.getItem("userType");
  const branch = localStorage.getItem("branchId");

  // Create state variables for form data
  const [name, setName] = useState(employeeDetails?.name || "");
  const [email, setEmail] = useState(employeeDetails?.email || "");
  const [regNo, setRegNo] = useState(employeeDetails?.regNo || "");

  const [currentDes, setCurrentDes] = useState("");
  const [address, setAddress] = useState(employeeDetails?.address || "");
  const [contact, setContact] = useState(employeeDetails?.contact || "");
  const [pan, setPan] = useState(employeeDetails?.pan || "");
  const [aadhar, setAadhar] = useState(employeeDetails?.aadhar || "");
  const [bank, setBank] = useState(employeeDetails?.bank || "");
  const [bankNo, setBankNo] = useState(employeeDetails?.bankNo || "");
  const [ifsc, setIfsc] = useState(employeeDetails?.ifsc || "");
  const [image, setImage] = useState(employeeDetails?.image || "");
  const [doj, setDoj] = useState(employeeDetails.doj || "");
  const [preview, setPreview] = useState("");

  const userId = localStorage.getItem("userId");
  const [designation, setDesignation] = useState([]);

  const fetchDesignation = async (type) => {
    try {
      const response = await fetch(`${WebApi}/get_config_by_type/${type}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: document.cookie,
        },
      });
      const respData = await response.json();
      console.log(respData.data);
      return respData.data;
    } catch (error) {
      console.error("Error fetching room config:", error);
      throw error; // Re-throw the error to handle it outside this function if needed
    }
  };
  useEffect(() => {
    fetchDesignation("designation").then((data) => {
      setDesignation(
        data[0].config_type_name.data.map((item) => {
          return { value: item, label: item };
        })
      );
    });
    console.log(userType);
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateContactNumber = (contact) => {
    const regex = /^\d{10}$/;
    return regex.test(contact);
  };

  const validateAadharNumber = (aadhar) => {
    const regex = /^\d{12}$/;
    return regex.test(aadhar);
  };

  const validateBankAccountNumber = (account) => {
    const regex = /^\d{9,18}$/;
    return regex.test(account);
  };

  const validateBankName = (bank) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(bank);
  };

  const validateIFSCCode = (ifsc) => {
    const regex = /^[A-Za-z0-9]{11}$/;
    return regex.test(ifsc);
  };

  const validatePanCard = (pan) => {
    const regex = /^[A-Za-z0-9]{10}$/;
    return regex.test(pan);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const nameRegex = /^[A-Za-z\s]+$/;
      const idRegex = /^[A-Za-z0-9]+$/;
      if (
        name === "" ||
        email === "" ||
        contact === "" ||
        regNo === "" ||
        address === "" ||
        designation === "" ||
        aadhar === "" ||
        pan === "" ||
        bankNo === "" ||
        bank === "" ||
        ifsc === "" ||
        doj === ""
      ) {
        const emptyFields = [];

        if (name === "") emptyFields.push("Name");
        if (email === "") emptyFields.push("Email");
        if (contact === "") emptyFields.push("Contact");
        if (regNo === "") emptyFields.push("Registration Number");
        if (address === "") emptyFields.push("Address");
        if (designation === "") emptyFields.push("Designation");
        if (aadhar === "") emptyFields.push("Aadhar Number");
        if (pan === "") emptyFields.push("PAN Number");
        if (bankNo === "") emptyFields.push("Bank Account Number");
        if (bank === "") emptyFields.push("Bank Name");
        if (ifsc === "") emptyFields.push("IFSC Code");
        if (doj === "") emptyFields.push("Date of Joining");

        const emptyFieldsString = emptyFields.join(", ");
        toast.warning(
          `Please fill in the following fields: ${emptyFieldsString}`
        );
      } else if (!nameRegex.test(name)) {
        toast.warning(
          "Employee name should not contain numbers or special characters "
        );
      } else if (!validateEmail(email)) {
        toast.warning("Invalid email address");
      } else if (!validateContactNumber(contact)) {
        toast.warning("Contact number should be 10 digits");
      } else if (!idRegex.test(regNo)) {
        toast.warning("Employee ID should not contain special characters");
      } else if (!validateAadharNumber(aadhar)) {
        toast.warning("Aadhar number should be 12 digit number");
      } else if (!validatePanCard(pan)) {
        toast.warning("Invalid PAN number");
      } else if (!validateBankAccountNumber(bankNo)) {
        toast.warning("Invalid bank account number");
      } else if (!validateBankName(bank)) {
        toast.warning("Invalid bank name");
      } else if (!validateIFSCCode(ifsc)) {
        toast.warning("Invalid IFSC code");
      } else {
        const formData = new FormData();

        // Append form data fields
        formData.append("name", name);
        formData.append("email", email);
        formData.append("contact", contact);
        formData.append("employeeId", employeeDetails?.empId);
        formData.append("address", address);
        formData.append("employee_reg_no", regNo);
        formData.append("pan", pan);
        formData.append("aadhar", aadhar);
        formData.append("bank", bank);
        formData.append("account", bankNo);
        formData.append("ifsc", ifsc);
        formData.append("userType", "employee");
        formData.append("branch_id", branch);
        formData.append("doj", doj);
        if (currentDes === "") {
          formData.append("designation", employeeDetails?.designation);
        } else {
          formData.append("designation", currentDes);
        }
        if (
          image === undefined ||
          image === null ||
          image === "" ||
          image === "undefined"
        ) {
          formData.append("file", employeeDetails?.image);
        } else {
          formData.append("file", image);
        }
        const response = await fetch(`${WebApi}/updateEmployee`, {
          method: "POST",
          credentials: "include",
          headers: {
            Cookie: document.cookie,
          },
          body: formData,
        });

        const data = await response.json();

        if (data.status === "success") {
          toast.success("Employee Details Updated Successfully");
          navigate(`/admin/${userId}/allemployee`);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Faild to update employee details");
    }
  };
  useEffect(() => {
    if (preview) {
      setImage(preview);
    }
  }, [preview]);

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
            {employeeDetails.image === "" ||
            employeeDetails.image === "undefined" ||
            employeeDetails.image === null ? (
              <img
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                alt="Profile"
                style={{ height: "10rem", width: "10rem", borderRadius: "50%" }}
              />
            ) : (
              <img
                src={
                  preview
                    ? URL.createObjectURL(preview)
                    : `${WebStore}employee/${employeeDetails?.image}`
                }
                alt="Profile"
                style={{ height: "10rem", width: "10rem", borderRadius: "50%" }}
              />
            )}

            <input
              id="upload-input"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                setPreview(e.target.files[0]);
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
          <Label className="col-form-label">Employee Designation</Label>{" "}
          <Select
            onChange={(value) => setCurrentDes(value.value)}
            defaultValue={
              {
                label: employeeDetails?.designation,
                value: employeeDetails?.designation,
              } || "Select Designation"
            }
            options={designation}
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
          <Input
            defaultValue={
              employeeDetails.doj
                ? new Date(employeeDetails.doj).toISOString().split("T")[0]
                : ""
            }
            type="date"
            onChange={(e) => setDoj(e.target.value)}
          />
        </Col>
        <Col></Col>
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
        Update
      </Button>
    </Fragment>
  );
};

export default UpdateEmployee;
