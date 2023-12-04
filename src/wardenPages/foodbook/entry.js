import React, { Fragment, useState, useEffect } from "react";
import { Button, Table, Card, CardHeader, Row, Col, Input } from "reactstrap";
import { Breadcrumbs, H5 } from "../../AbstractElements";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalApi, WebApi } from "../../api";
import { getMealTimings, getMealType } from "../../Hooks/getMealTimings";

const FoodBookEntry = () => {
  const [mealData, setMealData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(""); // Default day
  const [generatedCode, setGeneratedCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [gracePeriodExpired, setGracePeriodExpired] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  //get this month name
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const [monthName, setMonthName] = useState(month);
  const now = new Date();
  const [studentData, setStudentData] = useState([]);
  const [authCode, setAuthCode] = useState("");

  const checkCode = async () => {
    const response = await fetch(`${WebApi}/checkcode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_code: authCode,
      }),
    });
    const respData = await response.json();
    setStudentData(respData.data.result[0]);
  };
  const FoodStatus = async (status) => {
    const response = await fetch(`${WebApi}/foodstatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_code: authCode,
        status: status,
      }),
    });
    const respData = await response.json();
    console.log(respData);
  };
  return (
    <Fragment>
      <Breadcrumbs
        parent="Student FoodBook"
        mainTitle="Book Food"
        title="Book Food"
      />
      <Card>
        <Row>
          <Col sm="3" className="mx-auto">
            <Input
              type="Text"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              placeholder="Enter Auth Code"
              className="mt-3"
            />
            <Button
              color="primary "
              className="btn-block  mt-3"
              onClick={checkCode}
              style={{ marginLeft: "60px" }}
            >
              Book Food
            </Button>
          </Col>
        </Row>
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "20px",
          }}
        >
          <H5>Student Info</H5>
          {/* {studentData.length > 0 && ( */}
          <Table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Student Name</th>
                <th>Regd No</th>
                <th>User Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Render month's data fetched from the backend */}

              <tr>
                <td>
                  <img src="" />
                </td>
                <td>{studentData?.name}</td>
                <td>{studentData?.username}</td>
                <td>{studentData?.user_from}</td>
                <td>
                  <Button
                    className="btn-block btn-success"
                    onClick={FoodStatus("approved")}
                  >
                    Approve
                  </Button>

                  <Button
                    className="btn-block btn-danger m-l-5"
                    onClick={FoodStatus("rejected")}
                  >
                    Reject
                  </Button>
                </td>
              </tr>

              {/* Add more rows as needed */}
            </tbody>
          </Table>
          {/* )} */}
        </div>
      </Card>
    </Fragment>
  );
};

export default FoodBookEntry;
