import React, { Fragment, useState } from 'react'
import { WebApi } from "../../api";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Table } from 'reactstrap';
import { toast } from 'react-toastify';
const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
const EditFoodplanner = ({isOpen, toggle,data,setData,selectedItem}) => {
    // const[descript,setDescript]=useState("")
    // const[to,setTo]=useState("")
    // const[from,setFrom]=useState("")
    // const[price,setPrice]=useState("")

    const [mealData, setMealData] = useState({
      // Initialize meal data with empty values for each day
      Monday: { Breakfast: {}, Lunch: {}, Dinner: {} },
      Tuesday: { Breakfast: {}, Lunch: {}, Dinner: {} },
      Wednesday: { Breakfast: {}, Lunch: {}, Dinner: {} },
      Thursday: { Breakfast: {}, Lunch: {}, Dinner: {} },
      Friday: { Breakfast: {}, Lunch: {}, Dinner: {} },
      Saturday: { Breakfast: {}, Lunch: {}, Dinner: {} },
      Sunday: { Breakfast: {}, Lunch: {}, Dinner: {} },
    });
    console.log("Hello Data:",data);
    console.log( "type is",typeof selectedItem)
    // const [editedData, setEditedData] = useState(data.menu_data);

  const handleInputChange = (e, day, mealType, field) => {
    const updatedMealData = { ...mealData };
    updatedMealData[day][mealType][field] = e.target.value;
    setMealData(updatedMealData);
  };
  
  
  
  console.log("Edit Food Selected ID", selectedItem)
  async function handleSubmit() {
    // Prepare the updated menu_data
    const updatedMenuData = {
      id: selectedItem,
     menu_data:mealData ,
    };

    // Send the update request to the API
    try {
      const response = await fetch(`${WebApi}/update_menu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMenuData),
       
      });
      
      if (response.ok) {
        toast.success("Food Item Updated Successfully")
        // Handle state updates after a successful update
      setData((prevData) =>
      prevData.map((item) =>
        item.id === selectedItem ? { ...item, menu_data: mealData } : item
      )
    );
      } else {
          toast.error("Failed to uodate food menu")        // Handle errors or show an error message to the user
      }
    } catch (error) {
      console.error('Error during update:', error);
      // Handle network errors or other exceptions
    }
   
    toggle();
  }
     
  return (
    <Fragment>
      <Modal isOpen={isOpen} toggle={toggle} size='lg'>
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
                    {data.map((item)=>(
                        selectedItem===item.id ?
                         (<>
                            <td>
                      <Input
                        type="text"
                        placeholder="Food Menu Items"
                        defaultValue={item.menu_data[day][mealType]?.Description}
                      // onChange={(e)=>setDescript(e.target.value)}
                      onChange={(e) =>
                        handleInputChange(e, day, mealType, "Description")
                      }
                      />
                      <br />
                      <label>From:</label>
                      <Input
                        type="time"
                        defaultValue={item.menu_data[day][mealType]?.From}
                        // onChange={(e)=>setFrom(e.target.value)}
                        onChange={(e) =>
                          handleInputChange(e, day, mealType, "From")
                        }
                      />
                      <label>To:</label>
                      <Input
                        type="time"
                        defaultValue={item.menu_data[day][mealType]?.To}
                        // onChange={(e)=>setTo(e.target.value)}
                        onChange={(e) =>
                          handleInputChange(e, day, mealType, "To")
                        }
                      />
                      <br />
                      <Input
                        type="text"
                        placeholder="Price"
                        defaultValue={item.menu_data[day][mealType]?.Price}
                        // onChange={(e)=>setPrice(e.target.value)}
                        onChange={(e) =>
                          handleInputChange(e, day, mealType, "Price")
                        }
                      />
                    </td>
                         </>):""
                    ))}
                   
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
          {/* Add more fields as needed */}
        
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>Save Changes</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>

    </Fragment>
      
    
  )
}

export default EditFoodplanner;




