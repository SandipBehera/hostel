import React from "react";
import { Col, Row } from "reactstrap";

import Widgets1 from "../../../Components/Common/CommonWidgets/Widgets1";

const AdminWidgetsWrapper = () => {
  const TotalAmt = "10,50,000";
  const CollectedAmt = "3,00,000";

  const StudentCount = {
    title: "Number of Student",
    gros: 50,
    total: 50,
    color: "orange",
    icon: "customers",
  };
  const Paid = {
    title: "Paid Student",
    gros: 50,
    total:  10,
    color: "success",
    icon: "user-visitor",
  };
  const Unpaid = {
    title: "Unpaid Student",
    total: 40,
    color: "secondary",
    icon: "fill-task",
  };
  const TotalAmount = {
    title: "Total Amount",
    total: `${CollectedAmt}/${TotalAmt}`,
    color: "purple",
    icon: "profit",
  };
  const Fine = {
    title: "Hostel Fine Paid",
    gros: 70,
    total: 5000,
    color: "success",
    icon: "profile-check",
  };
  const TotalFine = {
    title: "Total Hostel Fine",
    gros: 70,
    total:8500,
    color: "warning",
    icon: "fill-sample-page",
  };

  return (
    <>
      <Col xxl="auto" xl="12" md="6" className="box-col-6">
        <Row>
          <Col xl="6" md="12">
            <Widgets1 data={StudentCount} />
          </Col>
          <Col xl="6" md="12">
            <Widgets1 data={Paid} />
          </Col>
        </Row>
      </Col>
      <Col xxl="auto" xl="12" md="6" className="box-col-6">
        <Row>
          <Col xl="6" md="12">
            <Widgets1 data={Unpaid} />
          </Col>
          <Col xl="6" md="12">
            <Widgets1 data={TotalAmount} />
          </Col>
        </Row>
      </Col>
      <Col xxl="auto" xl="12" md="6" className="box-col-6">
        <Row>
          <Col xl="6" md="12">
            <Widgets1 data={Fine} />
          </Col>
          <Col xl="6" md="12">
            <Widgets1 data={TotalFine} />
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default AdminWidgetsWrapper;
