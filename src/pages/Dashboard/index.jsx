import React, { Fragment } from "react";
import { Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../AbstractElements";

import GreetingCard from "./GreetingCard";
import WidgetsWrapper from "./WidgetsWraper";
import OverallBalance from "./OverallBalance";
import RecentOrders from "./RecentOrders";
import ActivityCard from "./ActivityCard";
import TimelineCard from "./TimelineCard";
import PreAccountCard from "./PreAccountCard";
import TotalUserAndFollower from "./TotalUserAndFollower";
import PaperNote from "./PaperNote";
import RecentSales from "./RecentSales";

const Dashboard = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Default" parent="Dashboard" title="Default" />
      <Container fluid={true}>
        <Row className="widget-grid">
          <GreetingCard />
          <WidgetsWrapper />
          <OverallBalance />
          <RecentOrders />
          <ActivityCard />
          <RecentSales />
          <TimelineCard />
          <PreAccountCard />
          <TotalUserAndFollower />
          <PaperNote />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
