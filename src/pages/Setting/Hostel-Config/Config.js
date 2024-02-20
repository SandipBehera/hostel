import React, { Fragment, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
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
  const [editingBadgeIndex, setEditingBadgeIndex] = useState(null);
  const [updatedConfig, setUpdatedConfig] = useState("");

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
      setDesignation(data[0]?.config_type_name.data);
    });
  }, []);

  useEffect(() => {
    fetchDesignation("room_type").then((data) => {
      setRoomType(data[0]?.config_type_name.data);
    });
  }, []);
  useEffect(() => {
    fetchDesignation("ammenities").then((data) => {
      setAminities(data[0]?.config_type_name.data);
    });
  }, []);
  const handleBadgeClick = (item, i) => {
    setUpdatedConfig(item);
    setEditingBadgeIndex(i)
    console.log(item)
  };

  const branchId = localStorage.getItem("branchId")

  // const handleEdit = (arr, configType) => {
  //   // Handle editing here

  //   let arr1= arr;
  //   arr1.splice(editingBadgeIndex,1,updatedConfig)
  //   let obj = {
  //     "config_type": configType,
  //     "config_type_name": JSON.stringify({data:arr1}),
  //     "branch_id": branchId
  //   }
    
  //   console.log(JSON.stringify(obj));
  //   setEditingBadgeIndex(null);
  //   setUpdatedConfig("");
  // };
  console.log(aminites);
  const handleEdit = (arr, configType) => {
    let arr1= arr;
    arr1.splice(editingBadgeIndex,1,updatedConfig)
    let obj = {
      "config_type": configType,
      "config_type_name": JSON.stringify({data:arr1}),
      "branch_id": branchId
    }
    console.log(JSON.stringify(obj));

    fetch("http://localhost:3001/api/updateConfig", {
      method: "POST",
      credentials: "include",
      headers: {
        Cookie: document.cookie,
      },
      body: JSON.stringify(obj)
    })
    .then(response => response.json())
    .then(data => {
      // Handle response from the API
      console.log(data);
      
    })
    .catch(error => {
      console.error("Error updating config:", error);
    });

    setEditingBadgeIndex(null);
    setUpdatedConfig("");
};


  const handleDelete = (index) => {
    // Handle deletion here
  };

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
                        style={{ padding: "0.5rem 1rem", position: "relative", cursor:"pointer" }}
                        className="m-2"
                        key={i}
                        onClick={() => handleBadgeClick(item, i)}
                      >
                        {editingBadgeIndex === i ? (
                          <>
                            <Input type="text" value={updatedConfig} onChange={(e)=>setUpdatedConfig(()=>e.target.value)} />
                            <Button className="px-2 mx-1 my-1" color="primary" onClick={(e) => handleEdit(aminites, "ammenities", e.stopPropagation())}>Save</Button>
                            <Button className="px-2 mx-1 my-1" color="danger" onClick={() => handleDelete()}>Delete</Button>
                          </>
                        ) : (
                          item
                        )}
                      </Badge>
                    ))
                  ) : (
                    <>No aminites found</>
                  )}
                </P>
              </TabPane>
              <TabPane tabId="2">
              <P attrPara={{ className: "mb-0 m-t-30" }}>
                  {roomType !== undefined && roomType !== null ? (
                    roomType.map((item, i) => (
                      <Badge
                        color="success"
                        style={{ padding: "0.5rem 1rem", position: "relative", cursor:"pointer" }}
                        className="m-2"
                        key={i}
                        onClick={() => handleBadgeClick(item, i)}
                      >
                        {editingBadgeIndex === i ? (
                          <>
                            <Input type="text" value={updatedConfig} onChange={(e)=>setUpdatedConfig(()=>e.target.value)} />
                            <Button className="px-2 mx-1 my-1" color="primary" onClick={(e) => handleEdit(roomType, "room_type", e.stopPropagation())}>Save</Button>
                            <Button className="px-2 mx-1 my-1" color="danger" onClick={() => handleDelete()}>Delete</Button>
                          </>
                        ) : (
                          item
                        )}
                      </Badge>
                    ))
                  ) : (
                    <>No aminites found</>
                  )}
                </P>
              </TabPane>
              <TabPane tabId="3">
              <P attrPara={{ className: "mb-0 m-t-30" }}>
                  {designation !== undefined && designation !== null ? (
                    designation.map((item, i) => (
                      <Badge
                        color="success"
                        style={{ padding: "0.5rem 1rem", position: "relative", cursor:"pointer" }}
                        className="m-2"
                        key={i}
                        onClick={() => handleBadgeClick(item, i)}
                      >
                        {editingBadgeIndex === i ? (
                          <>
                            <Input type="text" value={updatedConfig} onChange={(e)=>setUpdatedConfig(()=>e.target.value)} />
                            <Button className="px-2 mx-1 my-1" color="primary" onClick={(e) => handleEdit(designation, "designation", e.stopPropagation())}>Save</Button>
                            <Button className="px-2 mx-1 my-1" color="danger" onClick={() => handleDelete()}>Delete</Button>
                          </>
                        ) : (
                          item
                        )}
                      </Badge>
                    ))
                  ) : (
                    <>No aminites found</>
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
