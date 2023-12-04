import React, { Fragment, useState, useEffect } from "react";
import { Button, Table, Card, CardHeader, Row, Col, Input } from "reactstrap";
import { Breadcrumbs, H5 } from "../../AbstractElements";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalApi, WebApi } from "../../api";
import { getMealTimings, getMealType } from "../../Hooks/getMealTimings";

const StudentFoodBook = () => {
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

  const fetchedData = async () => {
    const response = await fetch(`${WebApi}/get_all_menu`);
    const respData = await response.json();
    const fetched_data = respData.data.filter(
      (item) => item.month === monthName
    );
    setMealData(fetched_data);
  };

  useEffect(() => {
    fetchedData(); // Set fetched data to state (Replace this with actual API fetch)
    setSelectedDay(now.toLocaleString("default", { weekday: "long" }));
  }, []);

  console.log(mealData);

  const handleBookButtonClick = async () => {
    // const breakfastStart = new Date();
    // breakfastStart.setHours(7, 0, 0); // Set breakfast start time (7 am)
    // const breakfastEnd = new Date();
    // breakfastEnd.setHours(9, 0, 0); // Set breakfast end time (9 am)

    // const lunchStart = new Date();
    // lunchStart.setHours(12, 0, 0); // Set lunch start time (12 pm)
    // const lunchEnd = new Date();
    // lunchEnd.setHours(14, 0, 0); // Set lunch end time (1 pm)

    // const dinnerStart = new Date();
    // dinnerStart.setHours(18, 0, 0); // Set dinner start time (6 pm)
    // const dinnerEnd = new Date();
    // dinnerEnd.setHours(20, 0, 0); // Set dinner end time (8 pm)

    const day = now.toLocaleString("default", { weekday: "long" });
    console.log(day);
    const mealTimings = getMealTimings(mealData[0].menu_data, day);
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
      setGeneratedCode(code);
      setIsCodeValid(true);
      setIsButtonClicked(true);

      // Set timeout for code expiration after 30 minutes (grace period)
      const expirationTime = new Date(now.getTime() + 30 * 60000); // 30 minutes
      setTimeout(() => {
        setIsCodeValid(false);
        setGracePeriodExpired(true);
      }, expirationTime - now);
      const currentMeal = getMealType(now);
      const response = await fetch(`${WebApi}/bookFood`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth_code: generatedCode,
          regd_no: localStorage.getItem("userId"),
          meal_type: currentMeal,
        }),
      });
      const respData = await response.json();
      console.log(respData);
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

  useEffect(() => {
    if (gracePeriodExpired) {
      toast.error("Mess is closed");
    }
  }, [gracePeriodExpired]);

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
                  disabled={isCodeValid || gracePeriodExpired}
                >
                  {isCodeValid ? "Code Generated" : "Book Food"}
                </Button>
                {isCodeValid && (
                  <p style={{ textAlign: "center" }}>
                    Generated Code: {generatedCode}
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

export default StudentFoodBook;
