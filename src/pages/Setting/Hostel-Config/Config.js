import React, { Fragment, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { Breadcrumbs, H5, P } from "../../../AbstractElements";
import { WebApi } from "../../../api";
const PillPrimaryTab = () => {
  const [primarycolorTab, setprimarycolorTab] = useState("1");
  const [designation, setDesignation] = useState([]);
  const [roomType, setRoomType] = useState([]);
  const [aminites, setAminities] = useState([]);

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
      return respData.data.filter(
        (key) => key.branch_id === parseInt(localStorage.getItem("branchId"))
      );
    } catch (error) {
      console.error("Error fetching room config:", error);
      throw error;
    }
  };
  useEffect(() => {
    fetchDesignation("designation").then((data) => {
      setDesignation(data[0].config_type_name.data);
    });
  }, []);

  useEffect(() => {
    fetchDesignation("room_type").then((data) => {
      setRoomType(data[0].config_type_name.data);
    });
  }, []);
  useEffect(() => {
    fetchDesignation("ammenities").then((data) => {
      setAminities(data[0].config_type_name.data);
    });
  }, []);

  console.log(aminites);

  return (
    <Fragment>
      <Breadcrumbs
        parent="Room Config"
        mainTitle="All Room Configs"
        title="All Room Configs"
      />
      <Col sm="12" xl="12" className="xl-12">
        <Card>
          <CardHeader></CardHeader>
          <CardBody>
            <Nav className="nav-primary" tabs>
              <NavItem>
                <NavLink
                  href="#javascript"
                  className={primarycolorTab === "1" ? "active" : ""}
                  onClick={() => setprimarycolorTab("1")}
                >
                  Ammenities
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#javascript"
                  className={primarycolorTab === "2" ? "active" : ""}
                  onClick={() => setprimarycolorTab("2")}
                >
                  Room Type
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#javascript"
                  className={primarycolorTab === "3" ? "active" : ""}
                  onClick={() => setprimarycolorTab("3")}
                >
                  Designation
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={primarycolorTab}>
              <TabPane className="fade show" tabId="1">
                <P attrPara={{ className: "mb-0 m-t-30" }}>
                  {aminites !== undefined && aminites !== null ? (
                    aminites.map((item, i) => (
                      <Badge
                        color="success"
                        style={{ padding: "0.5rem 1rem" }}
                        className="m-2"
                        key={i}
                      >
                        {item !== "" ? item : <></>}
                      </Badge>
                    ))
                  ) : (
                    <>No Ammenities found</>
                  )}
                </P>
              </TabPane>
              <TabPane tabId="2">
                <P attrPara={{ className: "mb-0 m-t-30" }}>
                  {roomType !== undefined && roomType !== null ? (
                    roomType.map((item, i) => (
                      <Badge
                        color="success"
                        style={{ padding: "0.5rem 1rem" }}
                        className="m-2"
                        key={i}
                      >
                        {item !== "" ? item : <></>}
                      </Badge>
                    ))
                  ) : (
                    <>No Room Type found</>
                  )}
                </P>
              </TabPane>
              <TabPane tabId="3">
                <P attrPara={{ className: "mb-0 m-t-30" }}>
                  {designation !== undefined && designation !== null ? (
                    designation.map((item, i) => (
                      <Badge
                        color="success"
                        style={{ padding: "0.5rem 1rem" }}
                        className="m-2"
                        key={i}
                      >
                        {item !== "" ? item : <></>}
                      </Badge>
                    ))
                  ) : (
                    <>No Designation found</>
                  )}
                </P>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </Fragment>
  );
};

export default PillPrimaryTab;
