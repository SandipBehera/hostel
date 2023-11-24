import React, { useState, Fragment, useEffect } from "react";
import { Table, Row, Col, Card, CardHeader, Button } from "reactstrap";
import { H5 } from "../../AbstractElements";
import Papa from "papaparse";
import { LocalApi, WebApi } from "../../api";

const FoodBook = () => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const response = await fetch(`${WebApi}/today_booking`, {
      method: "GET",
    });
    const respData = await response.json();
    setData(respData.data);
  }, []);

  const handleExport = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "food_book.csv";
    link.click();
  };

  return (
    <Fragment>
      <Col sm="12">
        <Card>
          <CardHeader>
            <Row className="align-items-center justify-content-between">
              <Col xs="auto">
                <H5 className="mb-0">Food Book</H5>
              </Col>
              <Col xs="auto">
                <Button onClick={handleExport}>Export</Button>
              </Col>
            </Row>
          </CardHeader>
          <div>
            <Table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>St. Reg. No.</th>
                  <th>St. Name</th>
                  <th>Type</th>
                  <th>Breakfast</th>
                  <th>Lunch</th>
                  <th>Dinner</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.regd_no}</td>
                    {/* <td>{item.studentName}</td>
              <td>{item.type}</td>
              <td>{item.breakfast}</td>
              <td>{item.lunch}</td>
              <td>{item.dinner}</td>
              <td > {item.type==="hostler"?"paid":item.payment}</td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </Col>
    </Fragment>
  );
};

export default FoodBook;
