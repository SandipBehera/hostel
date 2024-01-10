import React, { Fragment, useState, useEffect } from "react";
import { Button, Table, Card, CardHeader, Row, Col, Input } from "reactstrap";
import { Breadcrumbs, H5, P } from "../../AbstractElements";
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
  const monthName = date.toLocaleString("default", { month: "long" });

  const [studentData, setStudentData] = useState([]);
  const [authCode, setAuthCode] = useState("");

  const checkCode = async () => {
    const response = await fetch(`${WebApi}/checkcode`, {
      method: "POST",
      credentials: "include",
      headers: {
        Cookie: document.cookie,
        "Content-Type": "application/json",
      },
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: JSON.stringify({
        auth_code: authCode,
      }),
    });
    const respData = await response.json();
    if (respData.status === "success") {
      setStudentData(respData.data);
      toast.success(respData.message);
    } else {
      toast.error(respData.message);
    }
  };
  const FoodStatus = async (status) => {
    let meal_type;
    if (studentData?.result[0].lunch === "1") {
      meal_type = "lunch";
    } else if (studentData?.result[0].break_fast === "1") {
      meal_type = "breakfast";
    } else {
      meal_type = "dinner";
    }
    const response = await fetch(`${WebApi}/food_allocate`, {
      method: "POST",
      credentials: "include",
      headers: {
        Cookie: document.cookie,
        "Content-Type": "application/json",
      },
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: JSON.stringify({
        auth_code: authCode,
        regd_no: studentData?.result[0].registration_no,
        meal_type: meal_type,
        approved_by: localStorage.getItem("userId"),
        branch_id: localStorage.getItem("branchId"),
        status: status,
      }),
    });
    const respData = await response.json();
    if (respData.status === "success") {
      toast.success(respData.message);
      setIsButtonClicked(true);
    } else {
      toast.error("Something went wrong");
    }
  };
  console.log(studentData);
  return (
    <Fragment>
      <Breadcrumbs
        parent="Student FoodBook"
        mainTitle="Book Food"
        title="Book Food"
      />
      <Card>
        <Row style={{ marginBottom: "10px" }}>
          <Col sm="3" className="mx-auto">
            <p className="ml-3 mt-3" style={{ color: "red" }}>
              Enter the Auth Code to avail food to Student
            </p>
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
        {studentData?.result?.length > 0 && (
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
                    <img
                      src={studentData?.result[0].image}
                      style={{
                        height: "4rem",
                        width: "4rem",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td>{studentData?.result[0].name}</td>
                  <td>{studentData?.result[0].registration_no}</td>
                  <td>{studentData?.result[0].user_from}</td>
                  <td>
                    <Button
                      className="btn-block btn-success"
                      onClick={() => FoodStatus("approved")}
                      disabled={isButtonClicked}
                    >
                      Approve
                    </Button>

                    <Button
                      className="btn-block btn-danger m-l-5"
                      onClick={() => FoodStatus("rejected")}
                      disabled={isButtonClicked}
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
        )}
      </Card>
    </Fragment>
  );
};

export default FoodBookEntry;
