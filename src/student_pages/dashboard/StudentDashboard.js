import React, { Fragment } from "react";
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import { Breadcrumbs, H5 } from "../../AbstractElements";
import ActivityCard from "../../pages/Dashboard/ActivityCard";
import GreetingCard from "../../pages/Dashboard/GreetingCard";
import { ActivityData } from "../../Data/DefaultDashboard";
import WidgetsWrapper from "../../pages/Dashboard/WidgetsWraper";

const StudentDashboard = () => {
  // Simulated data (you'll fetch this data from API/backend)
  const studentInfo = {
    daysPresent: 65,
    daysAbsent: 15,
    outingInfo: {
      planned: 5,
      unplanned: 2,
    },
    feeData: {
      totalFees: 5000,
      feesPaid: 4000,
      feesPending: 1000,
    },
    complaints: {
      totalComplaints: 10,
      pendingIssues: 5,
      issueResolved: 10,
    },

    academicInfo: {
      grade: "A",
      rank: 5,
    },
  };

  const healthInfo = {
    bloodPressure: "120/80",
    heartRate: "72 bpm",
    temperature: "98.6°F",
    weight: "65 kg",
    height: "175 cm",
  };

  const cardStyle = {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.3)",
    transition: "transform 0.3s, box-shadow 0.3s",
    borderRadius: "10px",
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 8px 16px 0 rgba(0,0,0,0.4)";
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.3)";
  };

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Student Dashboard"
        parent="Dashboard"
        title="Student Dashboard"
      />
      <Container className="mt-4">
        <Row className="widget-grid">
          <GreetingCard
            name={localStorage.getItem("Name")}
            college={"Vaagdevi"}
          />
          <WidgetsWrapper />
          <ActivityCard
            ActivityData={ActivityData}
            columnHeadder={"Complaint Tracker"}
          />
        </Row>
      </Container>
    </Fragment>
  );
};

export default StudentDashboard;
