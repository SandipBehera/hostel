import React, { Fragment } from "react";
import { Col, Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../AbstractElements";

import GreetingCard from "./GreetingCard";
import AdminWidgetsWrapper from "./Admin_Dashboard/AdminWidgets";

const Dashboard = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Default" parent="Dashboard" title="Default" />
      <Container fluid={true}>
        <Row>
          <Row>
            <GreetingCard
              name={localStorage.getItem("Name")}
              college={localStorage.getItem("campusName")}
            />
          </Row>

          <Row>
            {" "}
            <AdminWidgetsWrapper />{" "}
          </Row>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
