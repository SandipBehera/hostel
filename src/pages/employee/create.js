import React, { Fragment } from "react";
import HeaderCard from "../../Components/Common/Component/HeaderCard";

import FooterCard from "../../Components/Forms/FormControl/Common/FooterCard";
import { Col, Card, CardBody, Form, FormGroup, Label, Input, CardHeader } from 'reactstrap';
import { H6 } from '../../AbstractElements';
import { EmailAddress, Website, BillingInformation, CompanyInformation, MegaForm, AccountInformation, ContactNumber, CompanyName, YourName, UploadFile } from '../../Constant';
import { Upload } from "react-feather";


export default function CreateEmployee() {
    console.log(UploadFile)
  return (
    <Fragment>
        <Card>
        <CardHeader>
      <div className="page-wrapper" id="pageWrapper">
        <h1 style={{ color:'#61A3BA', textAlign:'center'}}>Create Employee</h1>
      </div>
      </CardHeader>
      <Col sm="12">
                <Card>
                    
                    <CardBody>
                        <Form className="theme-form mega-form">
                            <H6>{AccountInformation}</H6>
                            <FormGroup>
                                <Label className="col-form-label"> Employee Name</Label>
                                <Input className="form-control" type="text" placeholder="Employee Name" />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label">Email Address</Label>
                                <Input className="form-control" type="email" placeholder="Enter email" />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label">Contact Number</Label>
                                <Input className="form-control" type="Number" placeholder="Enter contact number" />
                            </FormGroup>
                            <hr className="mt-4 mb-4" />
                            <H6>Employee Information</H6>
                            <FormGroup>
                                <Label className="col-form-label">Employee Address</Label>
                                <Input className="form-control" type="text" placeholder="Address" />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label">Employee Designation</Label>
                                <Input className="form-control" type="select" placeholder="Designation">
                                <option value="">Select Designation</option>
                                <option value="Warden">Warden</option>
                                <option value="House Keeping">House Keeping</option>
                                
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label">Aadhar Number</Label>
                                <Input className="form-control" type="text" placeholder="Aadhar Number" />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label">Pan Card</Label>
                                <Input className="form-control" type="text" placeholder="Enter Your Pan Card" />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label">Bank A/C Number</Label>
                                <Input className="form-control" type="text" placeholder="Enter Your Account Number" />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label">Bank Name</Label>
                                <Input className="form-control" type="text" placeholder="Bank Name" />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label">Bank IFSC </Label>
                                <Input className="form-control" type="text" placeholder="Enter your Ifsc" />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label">Date Of Joining</Label>
                                <Input className="form-control" type="date" placeholder="Date Of Joining" />
                            </FormGroup>
                            <FormGroup className="row">
                                    <Label className="col-sm-3 col-form-label">{UploadFile}</Label>
                                    <Col sm="9">
                                        <Input className="form-control" type="file" />
                                    </Col>
                                </FormGroup>
                     
                        <hr className="mt-4 mb-4" />
                        <H6 attrH6={{ className: 'pb-2' }}>{BillingInformation}</H6>
                        
                            <FormGroup className="col-auto">
                                <Input className="form-control" type="text" placeholder="Name as per bank" />
                            </FormGroup>
                            <FormGroup className="col-auto">
                                <Input className="form-control" type="text" name="inputPassword" placeholder="A/C Number" />
                            </FormGroup>
                            <FormGroup className="col-auto">
                                <Input className="form-control" type="text" name="inputPassword" placeholder="IFSC Code" />
                            </FormGroup>
                            <FormGroup className="col-auto">
                                <Input className="form-control" type="text" name="inputPassword" placeholder="Bank/Branch" />
                            </FormGroup>
                         </Form>
                    </CardBody>
                    <FooterCard />
                </Card>
            </Col>
            </Card>
    </Fragment>
  );
}
