import React, { Fragment, useState, useEffect } from "react";
import { Button, Table, Card, CardHeader, Row, Col, Input } from "reactstrap";
import { Breadcrumbs, H5 } from "../../AbstractElements";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentFoodBook = () => {
  const [mealData, setMealData] = useState([]);
  const [selectedDay, setSelectedDay] = useState("Monday"); // Default day
  const [generatedCode, setGeneratedCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [gracePeriodExpired, setGracePeriodExpired] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    // Mocked meal data representing API response
    const fetchedData = [
      {
        day: "Monday",
        breakfast: {
          description: "Toast",
          from: "07:00",
          to: "09:00",
        },
        lunch: {
          description: "Salad",
          from: "12:00",
          to: "14:00",
        },
        dinner: {
          description: "Pasta",
          from: "18:00",
          to: "20:00",
        },
      },
      // Add data for other days similarly...
    ];

    setMealData(fetchedData); // Set fetched data to state (Replace this with actual API fetch)
  }, []);

  const handleBookButtonClick = () => {
    const now = new Date();

    const breakfastStart = new Date();
    breakfastStart.setHours(7, 0, 0); // Set breakfast start time (7 am)
    const breakfastEnd = new Date();
    breakfastEnd.setHours(9, 0, 0); // Set breakfast end time (9 am)

    const lunchStart = new Date();
    lunchStart.setHours(12, 0, 0); // Set lunch start time (12 pm)
    const lunchEnd = new Date();
    lunchEnd.setHours(14, 0, 0); // Set lunch end time (1 pm)

    const dinnerStart = new Date();
    dinnerStart.setHours(18, 0, 0); // Set dinner start time (6 pm)
    const dinnerEnd = new Date();
    dinnerEnd.setHours(20, 0, 0); // Set dinner end time (8 pm)

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

  useEffect(() => {
    // Function to fetch data from the backend API for the Month's table
    const fetchMonthData = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to fetch month data
        const response = await fetch('YOUR_API_ENDPOINT');
        const data = await response.json();
        setMealData(data); // Set fetched data to state
      } catch (error) {
        console.error('Error fetching month data:', error);
      }
    };

    fetchMonthData(); // Fetch data when the component mounts
  }, []);

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
                <td>{selectedDay}</td>
                <td>
                  {meal.breakfast.description}
                  <br />
                  {meal.breakfast.from} - {meal.breakfast.to}
                </td>
                <td>
                  {meal.lunch.description}
                  <br />
                  {meal.lunch.from} - {meal.lunch.to}
                </td>
                <td>
                  {meal.dinner.description}
                  <br />
                  {meal.dinner.from} - {meal.dinner.to}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
                {/* New Table */}
                <div style={{textAlign:'center',marginTop: '30px', marginBottom: '20px'}} >
          <H5 >Month</H5>
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
              {mealData.map((dataItem, index) => (
                <tr key={index}>
                  <td>{dataItem.date}</td>
                  <td>{dataItem.type}</td>
                  <td>{dataItem.checkIn}</td>
                </tr>
              ))}
              {/* Add more rows as needed */}
            </tbody>
          </Table>
        </div>

      </Card>
    </Fragment>
  );
};

export default StudentFoodBook;
