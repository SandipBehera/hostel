
import React, { Fragment, useState, useEffect } from "react";
import {
  Table,
  CardHeader,
  Card,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Breadcrumbs, H5 } from "../../AbstractElements";
import { LocalApi, WebApi } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FoodPlanner = () => {
  const [month, setMonth] = useState("January");
  const [showDropdown, setShowDropdown] = useState(false);
  const [copyPrevMonthData, setCopyPrevMonthData] = useState(false);
  const [mealData, setMealData] = useState({
    Monday: { Breakfast: {}, Lunch: {}, Dinner: {} },
    Tuesday: { Breakfast: {}, Lunch: {}, Dinner: {} },
    Wednesday: { Breakfast: {}, Lunch: {}, Dinner: {} },
    Thursday: { Breakfast: {}, Lunch: {}, Dinner: {} },
    Friday: { Breakfast: {}, Lunch: {}, Dinner: {} },
    Saturday: { Breakfast: {}, Lunch: {}, Dinner: {} },
    Sunday: { Breakfast: {}, Lunch: {}, Dinner: {} },
  });
  const [prevMonthData, setPrevMonthData] = useState(null);

  const branchId = localStorage.getItem("branchId");
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  // Function to handle input changes
  const handleInputChange = (e, day, mealType, field) => {
    const updatedMealData = { ...mealData };
    updatedMealData[day][mealType][field] = e.target.value;
    setMealData(updatedMealData);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    // Validate input fields
    for (const day of Object.keys(mealData)) {
      for (const mealType of ["Breakfast", "Lunch", "Dinner"]) {
        const description = mealData[day][mealType]?.Description || "";
        const from = mealData[day][mealType]?.From || "";
        const to = mealData[day][mealType]?.To || "";
        const price = mealData[day][mealType]?.Price || "";

        if (!description.trim() || !from.trim() || !to.trim() || !price.trim()) {
          toast.warning("All fields are required");
          return; // Stop submission if any field is empty
        }
      }
    }

    // Display the updated meal data in the console
    const year = new Date().getFullYear();
    const data = {
      month: month,
      year: year,
      food_menu: mealData,
      branch_id: branchId,
    };
    data.food_menu = JSON.stringify(data.food_menu);

    const response = await fetch(`${WebApi}/create_food_menu`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const respdata = await response.json();
    if (respdata.status === "success") {
      toast.success("Food Menu Created");
      navigate(`/admin/${userId}/allplanner`);
    } else {
      toast.warning("Failed to create food menu");
    }
  };

  // Function to handle month change
  const handleMonthChange = (selectedMonth) => {
    setMonth(selectedMonth);
    setShowDropdown(false);
    setMealData({
      Monday: { Breakfast: {}, Lunch: {}, Dinner: {} },
      Tuesday: { Breakfast: {}, Lunch: {}, Dinner: {} },
      Wednesday: { Breakfast: {}, Lunch: {}, Dinner: {} },
      Thursday: { Breakfast: {}, Lunch: {}, Dinner: {} },
      Friday: { Breakfast: {}, Lunch: {}, Dinner: {} },
      Saturday: { Breakfast: {}, Lunch: {}, Dinner: {} },
      Sunday: { Breakfast: {}, Lunch: {}, Dinner: {} },
    });
  };

  // Function to handle copying previous month's data
  const handleCopyPrevMonthData = async () => {
    if (!copyPrevMonthData) {
      const response = await fetch(`${WebApi}/get_last_menu`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const respdata = await response.json();
      console.log(respdata);
      if (respdata.status === "success") {
        setPrevMonthData(respdata.data.menu_data);
        setMealData(respdata.data.menu_data);
        setCopyPrevMonthData(true);
      }
    } else {
      setMealData({
        Monday: { Breakfast: {}, Lunch: {}, Dinner: {} },
        Tuesday: { Breakfast: {}, Lunch: {}, Dinner: {} },
        Wednesday: { Breakfast: {}, Lunch: {}, Dinner: {} },
        Thursday: { Breakfast: {}, Lunch: {}, Dinner: {} },
        Friday: { Breakfast: {}, Lunch: {}, Dinner: {} },
        Saturday: { Breakfast: {}, Lunch: {}, Dinner: {} },
        Sunday: { Breakfast: {}, Lunch: {}, Dinner: {} },
      });
      setPrevMonthData(null);
      setCopyPrevMonthData(false);
    }
  };

  // Function to handle cancellation
  const handleCancel = () => {
    setMealData({
      Monday: { Breakfast: {}, Lunch: {}, Dinner: {} },
      Tuesday: { Breakfast: {}, Lunch: {}, Dinner: {} },
      Wednesday: { Breakfast: {}, Lunch: {}, Dinner: {} },
      Thursday: { Breakfast: {}, Lunch: {}, Dinner: {} },
      Friday: { Breakfast: {}, Lunch: {}, Dinner: {} },
      Saturday: { Breakfast: {}, Lunch: {}, Dinner: {} },
      Sunday: { Breakfast: {}, Lunch: {}, Dinner: {} },
    });
    setCopyPrevMonthData(false);
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday", 
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (prevMonthData && copyPrevMonthData) {
      setMealData(prevMonthData);
    }
  }, [prevMonthData, copyPrevMonthData]);

  return (
    <Fragment>
      <Breadcrumbs
        parent="Settings"
        mainTitle="Create Food Planner "
        subParent="Food Planner"
        title="Create Food Planner"
      />
      <Card>
        <CardHeader>
          <H5>Create Food Planner</H5>
        </CardHeader>
        <div
          style={{
            margin: "auto",
            padding: "auto",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <label>Select Month: </label>
          <Dropdown
            isOpen={showDropdown}
            toggle={() => setShowDropdown(!showDropdown)}
          >
            <DropdownToggle caret>{month}</DropdownToggle>
            <DropdownMenu>
              {months.map((m) => (
                <DropdownItem key={m} onClick={() => handleMonthChange(m)}>
                  {m}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
              border: "1px solid #ccc",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            <input
              type="checkbox"
              onChange={handleCopyPrevMonthData}
              checked={copyPrevMonthData}
              style={{ marginRight: "5px" }}
            />
            <label>Copy the previous month data</label>
          </div>
        </div>
        <Table bordered>
          <thead>
            <tr>
              <th>Days</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Dinner</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <th scope="row">{day}</th>
                {["Breakfast", "Lunch", "Dinner"].map((mealType) => (
                  <React.Fragment key={mealType}>
                    <td>
                      <Input
                        type="text"
                        placeholder="Food Menu Items"
                        value={mealData[day][mealType]?.Description || ""}
                        onChange={(e) =>
                          handleInputChange(e, day, mealType, "Description")
                        }
                      />
                      <br />
                      <label>From:</label>
                      <Input
                        type="time"
                        value={mealData[day][mealType]?.From || ""}
                        onChange={(e) =>
                          handleInputChange(e, day, mealType, "From")
                        }
                      />
                      <label>To:</label>
                      <Input
                        type="time"
                        value={mealData[day][mealType]?.To || ""}
                        onChange={(e) =>
                          handleInputChange(e, day, mealType, "To")
                        }
                      />
                      <br />
                      <Input
                        type="text"
                        placeholder="Price"
                        value={mealData[day][mealType]?.Price || ""}
                        onChange={(e) =>
                          handleInputChange(e, day, mealType, "Price")
                        }
                      />
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          <Button onClick={handleSubmit}>Submit</Button>
          <Button
            color="danger"
            style={{ marginLeft: "10px" }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </Card>
    </Fragment>
  );
};

export default FoodPlanner;
