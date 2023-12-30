import React, { Fragment, useEffect, useState } from "react";
import { WebApi } from "../../api";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Table,
} from "reactstrap";
import { toast } from "react-toastify";
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const EditFoodplanner = ({
  isOpen,
  toggle,
  data,
  selectedItem,
  updateRecord,
}) => {
  console.log("data", data.length);
  const [mealData, setMealData] = useState();
  useEffect(() => {
    if (data.length > 0) {
      setMealData(data[0]?.menu_data);
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
    }
  }, [data]);

  const handleInputChange = (e, day, mealType, field) => {
    mealData[day][mealType][field] = e?.target?.value;
    setMealData(mealData);
  };
  async function handleSubmit() {
    const updatedData = [...data];
    updatedData.forEach((item, index) => {
      if (item.id === selectedItem) {
        updatedData[index] = { ...item, menu_data: mealData };
      }
    });
    // Prepare the updated menu_data
    const updatedMenuData = {
      id: selectedItem,
      menu_data: mealData,
    };
    updatedMenuData.menu_data = JSON.stringify(updatedMenuData.menu_data);
    // Send the update request to the API
    try {
      const response = await fetch(`${WebApi}/update_menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMenuData),
      });
      const resp = await response.json();
      if (resp.status === "success") {
        updateRecord();
        toast.success(resp.message);
        // Handle state updates after a successful update
        //   setData((prevData) =>
        //   prevData.map((item) =>
        //     item.id === selectedItem ? { ...item, menu_data: mealData } : item
        //   )
        // );
      } else {
        toast.error("Failed to uodate food menu"); // Handle errors or show an error message to the user
      }
    } catch (error) {
      console.error("Error during update:", error);
      // Handle network errors or other exceptions
    }

    toggle();
  }

  return (
    <Fragment>
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Edit Item</ModalHeader>
        <ModalBody>
          {/* Display form fields based on the structure of your item */}
          {/* For example, if the item has a 'name' and 'description', you can do: */}
          <Table bordered>
            <thead style={{ textAlign: "center" }}>
              <tr>
                <th>Days</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {days.map((day) => (
                <tr key={day}>
                  <th scope="row">{day}</th>
                  {["Breakfast", "Lunch", "Dinner"].map((mealType) => (
                    <React.Fragment key={mealType}>
                      {data.map((item) =>
                        selectedItem === item.id ? (
                          <>
                            <td>
                              <Input
                                type="text"
                                placeholder="Food Menu Items"
                                defaultValue={
                                  item.menu_data[day][mealType]?.Description
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    day,
                                    mealType,
                                    "Description"
                                  )
                                }
                              />
                              <br />
                              <label>From:</label>
                              <Input
                                type="time"
                                defaultValue={
                                  item.menu_data[day][mealType]?.From
                                }
                                // onChange={(e)=>setFrom(e.target.value)}
                                onChange={(e) =>
                                  handleInputChange(e, day, mealType, "From")
                                }
                              />
                              <label>To:</label>
                              <Input
                                type="time"
                                defaultValue={item.menu_data[day][mealType]?.To}
                                onChange={(e) =>
                                  handleInputChange(e, day, mealType, "To")
                                }
                              />
                              <br />
                              <Input
                                type="text"
                                placeholder="Price"
                                defaultValue={
                                  item.menu_data[day][mealType]?.Price
                                }
                                onChange={(e) =>
                                  handleInputChange(e, day, mealType, "Price")
                                }
                              />
                            </td>
                          </>
                        ) : (
                          ""
                        )
                      )}
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Add more fields as needed */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default EditFoodplanner;