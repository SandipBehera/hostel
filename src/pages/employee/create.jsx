import React, { Fragment, useEffect } from "react";

// import FooterCard from "../../Components/Forms/FormControl/Common/FooterCard";
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
import { set } from "date-fns";

export default function CreateEmployee() {
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
  const fetchDesignation = async (type) => {
    try {
      const response = await fetch(`${WebApi}/get_config_by_type/${type}`);
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
      setDesignation(data[0].config_type_name.data);
    });
    console.log(branch_id, userType);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      await fetch(`${WebApi}/addEmployee`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            toast.success(data.message);
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
            toast.error(data.message);
          }
        })
        .catch((err) => console.log(err));
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
                  />
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
                    {designation.map((item) => (
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
                      value={formData.file}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          file: e.target.files[0],
                        }))
                      }
                    />
                  </Col>
                </FormGroup>
                <Button type="submit" color="primary">
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
