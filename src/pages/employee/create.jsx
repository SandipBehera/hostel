import React, { Fragment, useEffect } from "react";

import {
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  CardHeader,
  Button,
} from "reactstrap";
import { Breadcrumbs, H6 } from "../../AbstractElements";
import { AccountInformation, UploadFile } from "../../Constant";
import { LocalApi, WebApi } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateEmployee() {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const branch_id = localStorage.getItem("branchId");
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    contact: "",
    employeeId: "",
    address: "",
    designation: "",
    aadhar: "",
    pan: "",
    account: "",
    bank: "",
    ifsc: "",
    doj: "",
    file: "",
  });
  const [designation, setDesignation] = React.useState([]);
  const [disabled, setDisabled] = React.useState(false);
  const [error, setError] = React.useState("");
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
      return ((respData.data).filter((key)=>key.branch_id===parseInt(branch_id)));
    } catch (error) {
      console.error("Error fetching room config:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchDesignation("designation").then((data) => {
      setDesignation((data[0].config_type_name.data));
    });
    console.log(branch_id, userType);
  }, []);
console.log(designation)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameRegex = /^[A-Za-z\s]+$/;
    const idRegex = /^[A-Za-z0-9]+$/;
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.contact === "" ||
      formData.employeeId === "" ||
      formData.address === "" ||
      formData.designation === "" ||
      formData.aadhar === "" ||
      formData.pan === "" ||
      formData.account === "" ||
      formData.bank === "" ||
      formData.ifsc === "" ||
      formData.doj === "" ||
      formData.file === ""
    ) {
      toast.warning("All fields are required");
    } else if (!nameRegex.test(formData.name)) {
      toast.warning(
        "Employee name should not contain numbers or special characters "
      );
    } else if (!validateEmail(formData.email)) {
      toast.warning("Invalid email address");
    } else if (!validateContactNumber(formData.contact)) {
      toast.warning("Contact number should be 10 digits");
    } else if (!idRegex.test(formData.employeeId)) {
      toast.warning("Employee ID should not contain special characters");
    } else if (!validateAadharNumber(formData.aadhar)) {
      toast.warning("Aadhar number should be 12 digit number");
    } else if (!validatePanCard(formData.pan)) {
      toast.warning("Invalid PAN number");
    } else if (!validateBankAccountNumber(formData.account)) {
      toast.warning("Invalid bank account number");
    } else if (!validateBankName(formData.bank)) {
      toast.warning("Invalid bank name");
    } else if (!validateIFSCCode(formData.ifsc)) {
      toast.warning("Invalid IFSC code");
    } else {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("contact", formData.contact);
      data.append("employeeId", formData.employeeId);
      data.append("address", formData.address);
      data.append("employee_reg_no", formData.employeeId);
      data.append("designation", formData.designation);
      data.append("aadhar", formData.aadhar);
      data.append("pan", formData.pan);
      data.append("account", formData.account);
      data.append("bank", formData.bank);
      data.append("ifsc", formData.ifsc);
      data.append("doj", formData.doj);
      data.append("file", formData.file);
      data.append("userType", "employee");
      data.append("branch_id", branch_id);

      const userId = localStorage.getItem("userId");
      try {
        const response = await fetch(`${WebApi}/addEmployee`, {
          method: "POST",
          credentials: "include",
          headers: {
            Cookie: document.cookie,
          },
          body: data,
        });

        const result = await response.json();

        if (result.status === "success") {
          toast.success(result.message);
          console.log(result);
          navigate(`/admin/${userId}/allemployee`);
          // Reset the form after successful submission
          setFormData({
            name: "",
            email: "",
            contact: "",
            employeeId: "",
            address: "",
            designation: "",
            aadhar: "",
            pan: "",
            account: "",
            bank: "",
            ifsc: "",
            doj: "",
            file: "",
          });
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while processing your request");
      }
    }
  };
  const checkEmployeeId = async (e) => {
    try {
      const response = await fetch(
        `${WebApi}/checkEmployeeId/${formData.employeeId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Cookie: document.cookie,
          },
        }
      );
      const result = await response.json();
      if (result.status === "success") {
        setError(result.message);
        setDisabled(!disabled);
      } else {
        setError(result.message);
        setDisabled(!disabled);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while processing your request");
    }
  };
  const handleEvent = async (event) => {
    if (event.type === "keydown" && event.key === "Tab") {
      // Tab key pressed, make API call
      await checkEmployeeId(formData.employeeId);
    } else if (event.type === "mousedown") {
      // Mouse clicked outside, check if it's outside the input and make API call
      const isClickedOutside = !event.target.closest("input");
      if (isClickedOutside && inputValue) {
        await checkEmployeeId(formData.employeeId);
      }
    }
  };
  return (
    <Fragment>
      <Breadcrumbs
        parent="Employee"
        mainTitle="Create Employee"
        title="Create Employee"
      />
      <Card>
        <Col sm="12">
          <Card>
            <CardBody>
              <Form
                className="theme-form mega-form"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <H6>{AccountInformation}</H6>
                <FormGroup>
                  <Label className="col-form-label"> Employee Name</Label>
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Employee Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        name: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">Email Address</Label>
                  <Input
                    className="form-control"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        email: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">Contact Number</Label>
                  <Input
                    className="form-control"
                    type="Number"
                    placeholder="Enter contact number"
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        contact: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <hr className="mt-4 mb-4" />
                <H6>Employee Information</H6>

                <FormGroup>
                  <Label className="col-form-label">Employee Id</Label>
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Employee Id"
                    value={formData.employeeId}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        employeeId: e.target.value,
                      }))
                    }
                    onKeyDown={handleEvent}
                    onMouseDown={handleEvent}
                  />
                  {disabled && <span className="text-danger">{error}</span>}
                </FormGroup>

                <FormGroup>
                  <Label className="col-form-label">Employee Address</Label>
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Address"
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        address: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">Employee Designation</Label>
                  <Input
                    className="form-control"
                    type="select"
                    placeholder="Designation"
                    value={formData.designation}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        designation: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select Designation</option>
                    {designation
                    .filter(option=>option !=="")
                    .map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">Aadhar Number</Label>
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Aadhar Number"
                    value={formData.aadhar}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        aadhar: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">Pan Card</Label>
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Enter Your Pan Card"
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        pan: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">Bank A/C Number</Label>
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Enter Your Account Number"
                    value={formData.account}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        account: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">Bank Name</Label>
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Bank Name"
                    value={formData.bank}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        bank: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">Bank IFSC </Label>
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Enter your Ifsc"
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        ifsc: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">Date Of Joining</Label>
                  <Input
                    className="form-control"
                    type="date"
                    placeholder="Date Of Joining"
                    value={formData.doj}
                    max={new Date().toISOString().split("T")[0]} // Set max attribute to current date
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        doj: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup className="row">
                  <Label className="col-sm-3 col-form-label">
                    {UploadFile}
                  </Label>
                  <Col sm="9">
                    <Input
                      className="form-control"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          file: e.target.files[0],
                        }))
                      }
                    />
                  </Col>
                </FormGroup>
                <Button type="submit" color="primary" disabled={disabled}>
                  Create
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Card>
    </Fragment>
  );
}
