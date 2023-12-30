import React, { Fragment } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import { Container, Row } from "reactstrap";
import GreetingCard from "../../pages/Dashboard/GreetingCard";

const WardenDashboard = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Default" parent="Dashboard" title="Default" />
      <Container fluid={true}>
        <Row className="widget-grid">
          <GreetingCard name={localStorage.getItem("Name")} />
        </Row>
      </Container>
    </Fragment>
  );
};

export default WardenDashboard;
