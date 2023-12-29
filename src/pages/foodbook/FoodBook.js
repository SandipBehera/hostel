import React, { useState, Fragment, useEffect } from "react";
import { Table, Row, Col, Card, CardHeader, Button } from "reactstrap";
import { H5 } from "../../AbstractElements";
import Papa from "papaparse";
import { LocalApi, WebApi } from "../../api";
import DataTable from "react-data-table-component";

const FoodBook = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${WebApi}/today_booking`, {
          method: "GET",
        });
        const respData = await response.json();
        console.log(respData.data);
        setData(
          respData.data.map((item, i) => ({
            id: i + 1,
            reg: item.regd_no,
            name: item.name,
            breakfast: item.break_fast,
            lunch: item.lunch,
            dinner: item.dinner,
            payment: item.payment,
            type: item.user_from,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error, for example, set an error state
      }
    };

    fetchData(); // Call the async function immediately
  }, []);

  const colData = [
    {
      name: "S.No.",
      selector: (row) => 
        row.id,
      
      center: false,
      sortable: true,
    },
    {
      name: "St. Reg. No.",
      selector: (row) => row.reg,
      center: false,
      sortable: true,
    },
    {
      name: "St. Name",
      selector: (row) =>    row.name,
      center: false,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) =>  row.type,
      center: false,
      sortable: true,
    },
    {
      name: "Breakast",
      selector: (row) =>   row.breakfast===1? "Food Taken" : "Food Not Taken",
      center: false,
      sortable: true,
    },
    {
      name: "Lunch",
      selector: (row) =>  row.lunch==="1"? "Food Taken" : "Food Not Taken",
      center: false,
      sortable: true,
    },
    {
      name: "Dinner",
      selector: (row) =>   row.dinner===1? "Food Taken" : "Food Not Taken",
      center: false,
      sortable: true,
    },
    {
      name: "Payment",
      selector: (row) =>   row.type==="hostel"? "Not Required": item.payment,
      center: false,
      sortable: true,
    },
  ];

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
            <DataTable
              data={data}
              columns={colData}
              striped={true}
              center={true}
              pagination
              className="text-center"
            />
          </div>
        </Card>
      </Col>
    </Fragment>
  );
};

export default FoodBook;

{
  /* <Table>
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
  {data.length > 0 ? (
    data.map((item, index) => (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.regd_no}</td>
        <td>{item.name}</td>
        <td>{item.user_from}</td>
        <td>
          {item.break_fast === "1"
            ? "Food Taken"
            : "Food Not Taken"}
        </td>
        <td>
          {item.lunch === "1" ? "Food Taken" : "Food Not Taken"}
        </td>
        <td>
          {item.dinner === "1" ? "Food Taken" : "Food Not Taken"}
        </td>
        <td>
          {" "}
          {item.user_from === "hostel"
            ? "Not Required"
            : item.payment}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="8" style={{ textAlign: "center" }}>
        <p style={{ color: "red" }}>No Data Found</p>
      </td>
    </tr>
  )}
</tbody>
</Table> */
}
