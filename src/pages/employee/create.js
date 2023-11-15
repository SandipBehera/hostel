import React, { Fragment } from "react";
import HeaderCard from "../../Components/Common/Component/HeaderCard";

import FooterCard from "../../Components/Forms/FormControl/Common/FooterCard";
import { Col, Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { H6 } from '../../AbstractElements';
import { EmailAddress, Website, BillingInformation, CompanyInformation, MegaForm, AccountInformation, ContactNumber, CompanyName, YourName } from '../../Constant';


export default function CreateEmployee() {
  return (
    <Fragment>
      <div className="page-wrapper" id="pageWrapper">
        <h1 style={{ color:'#61A3BA', textAlign:'center'}}>Create Employee</h1>
      </div>
      <Col sm="12">
                <Card>
                    
                    <CardBody>
                        <Form className="theme-form mega-form">
                            <H6>{AccountInformation}</H6>
                            <FormGroup>
                                <Label className="col-form-label">{YourName}</Label>
                                <Input className="form-control" type="text" placeholder="your Name" />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label">{EmailAddress}</Label>
                                <Input className="form-control" type="email" placeholder="Enter email" />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label">{ContactNumber}</Label>
                                <Input className="form-control" type="Number" placeholder="Enter contact number" />
                            </FormGroup>
                            <hr className="mt-4 mb-4" />
                            <H6>{CompanyInformation}</H6>
                            <FormGroup>
                                <Label className="col-form-label">CompanyName</Label>
                                <Input className="form-control" type="text" placeholder="Company Name" />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-form-label">{Website}</Label>
                                <Input className="form-control" type="text" placeholder="Website" />
                            </FormGroup>
                        </Form>
                        <hr className="mt-4 mb-4" />
                        <H6 attrH6={{ className: 'pb-2' }}>{BillingInformation}</H6>
                        <Form className="row theme-form billing-form">
                            <FormGroup className="col-auto">
                                <Input className="form-control" type="text" placeholder="Name On Card" />
                            </FormGroup>
                            <FormGroup className="col-auto">
                                <Input className="form-control" type="text" name="inputPassword" placeholder="Card Number" />
                            </FormGroup>
                            <FormGroup className="col-auto">
                                <Input className="form-control" type="text" name="inputPassword" placeholder="Zip Code" />
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <FooterCard />
                </Card>
            </Col>
    </Fragment>
  );
}
