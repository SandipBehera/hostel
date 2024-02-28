import React from "react";
import { Col, Row } from "reactstrap";
import {
  Widgets2Data,
  Widgets2Data2,
  WidgetsData,
  WidgetsData2,
  WidgetsData3,
  WidgetsData4,
} from "../../Data/DefaultDashboard";
import Widgets1 from "../../Components/Common/CommonWidgets/Widgets1";
import Widgets2 from "../../Components/Common/CommonWidgets/Widgets2";

const FineWrapper = ({ totalAmount, CollectedAmount, remains }) => {
  const Fines = {
    title: "Total Fine Amount",
    gros: 50,
    total: totalAmount,
    color: "secondary",
    icon: "fill-form",
  };
  const Collected = {
    title: "Total Amount Collected",
    gros: 50,
    total: CollectedAmount,
    color: "warning",
    icon: "fill-form",
  };
  const Remains = {
    title: "Remaining Amount",
    total: remains,
    color: "purple",
    icon: "fill-calender",
  };

  return (
    <>
      <Col xxl="auto" sm="auto" className="box-col-6">
        <Row>
          <Col xl="4" md="4" sm="4">
            <Widgets1 data={Fines} />
          </Col>
          <Col xl="4" md="4" sm="4">
            <Widgets1 data={Collected} />
          </Col>

          <Col xl="4" md="4" sm="4">
            <Widgets1 data={Remains} />
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default FineWrapper;
