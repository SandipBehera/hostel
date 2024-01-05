import React, { Fragment, useState, useEffect } from "react";
import { Button, Table, Card, CardHeader, Row, Col, Input } from "reactstrap";
import { Breadcrumbs, H5 } from "../../AbstractElements";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalApi, WebApi } from "../../api";
import { getMealTimings, getMealType } from "../../Hooks/getMealTimings";
import { set } from "date-fns";

const Book = () => {
  const [mealData, setMealData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(""); // Default day
  const [generatedCode, setGeneratedCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [gracePeriodExpired, setGracePeriodExpired] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const branchId = localStorage.getItem("branchId");
  const [disabledBtn, setDisabledBtn] = useState(false);
  //get this month name

  const now = new Date();
  const monthName = now.toLocaleString("default", { month: "long" });
  const yearName = now.getFullYear();

  const fetchedData = async () => {
    try {
      const response = await fetch(`${WebApi}/get_all_menu`);
      const respData = await response.json();
      const filteredData = respData.data.filter(
        (key) =>
          key.branch_id === parseInt(branchId) &&
          key.month === monthName &&
          key.year === yearName.toString()
      );
      console.log(filteredData);
      setMealData(filteredData);
      setDisabledBtn(filteredData.length === 0 ? true : false);
      setSelectedDay(now.toLocaleString("default", { weekday: "long" }));
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  const getCode = async () => {
    const response = await fetch(`${WebApi}/getCodes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        regd_no: localStorage.getItem("userId"),
      }),
    });
    const respData = await response.json();

    if (respData.status === "success") {
      setGeneratedCode(respData?.data?.auth_code);
      setIsCodeValid(true);
      setIsButtonClicked(true);
    } else {
      setGeneratedCode("");
      setIsCodeValid(false);
      setIsButtonClicked(false);
      toast.error("Code Not Generated");
    }
  };
  useEffect(() => {
    fetchedData();
    getCode();
  }, []);
  console.log(generatedCode);

  const handleBookButtonClick = async () => {
    const day = now.toLocaleString("default", { weekday: "long" });
    const mealTimings = getMealTimings(mealData[0]?.menu_data, day);

    const breakfastStart = mealTimings.breakfastStart;
    const breakfastEnd = mealTimings.breakfastEnd;

    const lunchStart = mealTimings.lunchStart;
    const lunchEnd = mealTimings.lunchEnd;

    const dinnerStart = mealTimings.dinnerStart;
    const dinnerEnd = mealTimings.dinnerEnd;

    if (
      (now >= breakfastStart && now <= breakfastEnd) ||
      (now >= lunchStart && now <= lunchEnd) ||
      (now >= dinnerStart && now <= dinnerEnd)
    ) {
      // Code generation during meal time
      const code = generateCode();
      // Set timeout for code expiration after 30 minutes (grace period)
      const expirationTime = new Date(now.getTime() + 30 * 60000); // 30 minutes
      setTimeout(() => {
        setIsCodeValid(false);
        setGracePeriodExpired(true);
      }, expirationTime - now);
      const currentMeal = getMealType(
        now,
        breakfastStart,
        breakfastEnd,
        lunchStart,
        lunchEnd,
        dinnerStart,
        dinnerEnd
      );
      const response = await fetch(`${WebApi}/food_booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth_code: code,
          regd_no: localStorage.getItem("userId"),
          meal_type: currentMeal,
          branch_id: branchId,
        }),
      });
      const respData = await response.json();
      console.log(respData);
      if (respData.status === "success") {
        setGeneratedCode(code);
        setIsCodeValid(true);
        setIsButtonClicked(true);
        toast.success("Food Booked");
      } else {
        toast.error("Food Not Booked");
      }
    } else {
      setGeneratedCode("");
      setIsCodeValid(false);
      setGracePeriodExpired(true);
      setIsButtonClicked(true);
    }
  };

  const generateCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit code
    return code.toString().substring(0, 6); // Ensure 6-digit code format
  };
  const calculateGracePeriod = () => {
    if (mealData.length > 0) {
      const day = now.toLocaleString("default", { weekday: "long" });
      const mealTimings = getMealTimings(mealData[0]?.menu_data, day);
      console.log(mealTimings);
      const breakfastStart = mealTimings.breakfastStart;
      const breakfastEnd = mealTimings.breakfastEnd;

      const lunchStart = mealTimings.lunchStart;
      const lunchEnd = mealTimings.lunchEnd;

      const dinnerStart = mealTimings.dinnerStart;
      const dinnerEnd = mealTimings.dinnerEnd;

      if (
        (now >= breakfastStart && now <= breakfastEnd) ||
        (now >= lunchStart && now <= lunchEnd) ||
        (now >= dinnerStart && now <= dinnerEnd)
      ) {
        return false; // Grace period is active
      } else {
        return true; // Grace period has expired
      }
    }
    return true; // Default to grace period expired if no mealData
  };

  // Usage
  const isGracePeriodExpired = calculateGracePeriod();

  // Check if the state needs to be updated before setting it
  if (gracePeriodExpired !== isGracePeriodExpired) {
    setGracePeriodExpired(isGracePeriodExpired);
  }

  console.log(mealData);
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
            {isButtonClicked && !isCodeValid && gracePeriodExpired ? (
              <p>Mess is closed</p>
            ) : (
              <Fragment>
                <Button
                  color="secondary"
                  size="lg"
                  block
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                  onClick={handleBookButtonClick}
                  disabled={isCodeValid || gracePeriodExpired || disabledBtn}
                >
                  {isCodeValid ? "Code Generated" : "Book Food"}
                </Button>
                {isCodeValid && (
                  <p style={{ textAlign: "center" }}>
                    Generated Code: {generatedCode}
                  </p>
                )}
                {disabledBtn && (
                  <p style={{ textAlign: "center" }}>
                    No Menu Available for this month
                  </p>
                )}
              </Fragment>
            )}
          </Col>
        </Row>
        <Table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Dinner</th>
            </tr>
          </thead>
          <tbody>
            {/* Render meal data fetched from the backend */}
            {mealData.map((meal, index) => (
              <tr key={index}>
                {/* Replace 'selectedDay' with the actual selected day */}
                <td>{selectedDay}</td>
                <td>
                  {meal.menu_data[selectedDay].Breakfast.Description}
                  <br />
                  {meal.menu_data[selectedDay].Breakfast.From} -{" "}
                  {meal.menu_data[selectedDay].Breakfast.To}
                </td>
                <td>
                  {meal.menu_data[selectedDay].Lunch.Description}
                  <br />
                  {meal.menu_data[selectedDay].Lunch.From} -{" "}
                  {meal.menu_data[selectedDay].Lunch.To}
                </td>
                <td>
                  {meal.menu_data[selectedDay].Dinner.Description}
                  <br />
                  {meal.menu_data[selectedDay].Dinner.From} -{" "}
                  {meal.menu_data[selectedDay].Dinner.To}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* New Table */}
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "20px",
          }}
        >
          <H5>Month</H5>
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Check In</th>
              </tr>
            </thead>
            <tbody>
              {/* Render month's data fetched from the backend */}
              {/* {mealData.map((dataItem, index) => (
                <tr key={index}>
                  <td>{dataItem.date}</td>
                  <td>{dataItem.type}</td>
                  <td>{dataItem.checkIn}</td>
                </tr>
              ))} */}
              {/* Add more rows as needed */}
            </tbody>
          </Table>
        </div>
      </Card>
    </Fragment>
  );
};

export default Book;
