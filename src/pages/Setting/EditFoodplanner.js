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
   

    const [mealData, setMealData] = useState(data[0]?.menu_data)
     
    console.log("Hello Data:",data[0]?.menu_data);
    console.log("meal data",mealData)
    console.log( "type is",typeof selectedItem)
    // const [editedData, setEditedData] = useState(data.menu_data);

  const handleInputChange = (e, day, mealType, field) => {
    
    mealData[day][mealType][field] = e?.target?.value;
    setMealData(mealData);
  };
  
  
  
  console.log("Edit Food Selected ID", selectedItem)

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
     menu_data:mealData ,
    };
  updatedMenuData.menu_data=JSON.stringify(updatedMenuData.menu_data)
    // Send the update request to the API
    try {
      const response = await fetch(`${WebApi}/update_menu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMenuData),
       
      });
      const  resp= await response.json();
      if (resp.status==="success") {

        toast.success(resp.message)
        // Handle state updates after a successful update
    //   setData((prevData) =>
    //   prevData.map((item) =>
    //     item.id === selectedItem ? { ...item, menu_data: mealData } : item
    //   )
    // );
  
      } else {
          toast.error("Failed to uodate food menu")        // Handle errors or show an error message to the user
      }
    } catch (error) {
      console.error('Error during update:', error);
      // Handle network errors or other exceptions
    }
   
    toggle();
  }

  // async function handleSubmit() {
  //   // Find the index of the selected item in the data array
  //   const selectedItemIndex = data.findIndex((item) => item.id === selectedItem);
  
  //   // If the selected item is found, update its menu_data
  //   if (selectedItemIndex !== -1) {
  //     const updatedData = data.map((item) =>
  //       item.id === selectedItem
  //         ? { ...item, menu_data: { ...item.menu_data, ...mealData } }
  //         : item
  //     );
  
  //     // Prepare the updated menu_data
  //     const updatedMenuData = {
  //       id: selectedItem,
  //       menu_data: { ...data[selectedItemIndex].menu_data, ...mealData },
  //     };
  
  //     // Send the update request to the API
  //     try {
  //       const response = await fetch(`${WebApi}/update_menu`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(updatedMenuData),
  //       });
  
  //       if (response.ok) {
  //         toast.success("Food Item Updated Successfully");
  
  //         // Handle state updates after a successful update
  //         setData(updatedData);
  //       } else {
  //         toast.error("Failed to update food menu");
  //       }
  //     } catch (error) {
  //       console.error('Error during update:', error);
  //       // Handle network errors or other exceptions
  //     }
  //   } else {
  //     // Handle case where selected item is not found
  //     console.error("Selected item not found in the data array");
  //   }
  
  //   toggle();
  // }
  
  // async function handleSubmit() {
  //   // Find the index of the selected item in the data array
  //   const selectedItemIndex = data.findIndex((item) => item.id === selectedItem);
  
  //   // If the selected item is found, update its menu_data
  //   if (selectedItemIndex !== -1) {
  //     const updatedData = [];
  
  //     data.forEach((item, index) => {
  //       if (index === selectedItemIndex) {
  //         // Update the menu_data of the selected item
  //         const updatedItem = {
  //           ...item,
  //           menu_data: { ...item.menu_data, ...mealData },
  //         };
  //         updatedData.push(updatedItem);
  //       } else {
  //         // Keep the other items unchanged
  //         updatedData.push(item);
  //       }
  //     });
  
  //     // Prepare the updated menu_data
  //     const updatedMenuData = {
  //       id: selectedItem,
  //       menu_data: { ...data[selectedItemIndex].menu_data, ...mealData },
  //     };
  
  //     // Send the update request to the API
  //     try {
  //       const response = await fetch(`${WebApi}/update_menu`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(updatedMenuData),
  //       });
  
  //       if (response.ok) {
  //         toast.success("Food Item Updated Successfully");
  
  //         // Handle state updates after a successful update
  //         setData(updatedData);
  //       } else {
  //         toast.error("Failed to update food menu");
  //       }
  //     } catch (error) {
  //       console.error('Error during update:', error);
  //       // Handle network errors or other exceptions
  //     }
  //   } else {
  //     // Handle case where selected item is not found
  //     console.error("Selected item not found in the data array");
  //   }
  
  //   toggle();
  // }
  
  
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
                       
                        onChange={(e) =>
                          handleInputChange(e, day, mealType, "To")
                        }
                      />
                      <br />
                      <Input
                        type="text"
                        placeholder="Price"
                        defaultValue={item.menu_data[day][mealType]?.Price}
                        
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




