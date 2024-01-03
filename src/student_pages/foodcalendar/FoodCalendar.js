import React, { useState, useEffect, Fragment } from "react";
import { Card, CardHeader, Table, Container, Row } from "reactstrap";
import { Breadcrumbs, H5 } from "../../AbstractElements";
import ViewModal from "../../pages/Setting/Component/modal";
import { WebApi } from "../../api";

const FoodCalendar = () => {
  const [data, setData] = useState([]);
  const branchId = localStorage.getItem("branchId");
  const date = new Date();
  const monthName = date.toLocaleString("default", { month: "long" });
  const yearName = date.getFullYear();
  const fetchData = async () => {
    const response = await fetch(`${WebApi}/get_all_menu`);
    const respData = await response.json();
    setData(
      respData.data.filter(
        (key) =>
          key.branch_id === parseInt(branchId) &&
          key.month === monthName &&
          key.year === yearName
      )
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <Breadcrumbs
        parent="Setting"
        mainTitle="Food Menu List "
        subParent="Food Planner"
        title="Food Menu List"
      />
      <Container fluid={true}>
        <Row>
          <Card>
            <CardHeader>
              <H5>Food Calendar</H5>
            </CardHeader>
            <div>
              <Table className="text-center">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Month</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.length > 0 ? (
                    data?.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.month}</td>
                        <td>
                          <ViewModal data={data} id={item.id} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ color: "red" }}>
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card>
        </Row>
      </Container>
    </Fragment>
  );
};

export default FoodCalendar;
