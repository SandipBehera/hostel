
import React, { Fragment, useState, useEffect } from 'react';
import { Table, CardHeader, Card, Input, Button,Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { H5 } from '../../AbstractElements';

const FoodPlanner = () => {
  const [month, setMonth] = useState('January'); // Initial month
  const [showDropdown, setShowDropdown] = useState(false);
  const [copyPrevMonthData, setCopyPrevMonthData] = useState(false);
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
  const [prevMonthData, setPrevMonthData] = useState(null);

   // Function to handle input changes
  const handleInputChange = (e, day, mealType, field) => {
    const updatedMealData = { ...mealData };
    updatedMealData[day][mealType][field] = e.target.value;
    setMealData(updatedMealData);
  };
    // Function to handle form submission
  const handleSubmit = () => {
    // Display the updated meal data in the console
    console.log(mealData);
  };
    // Function to handle month change
  const handleMonthChange = (selectedMonth) => {
    setMonth(selectedMonth);
    setShowDropdown(false);
    // Logic to fetch data for the selected month
    // You can fetch data from an API or other sources here
    // For demonstration, I'm setting meal data as empty for simplicity
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
 const handleCopyPrevMonthData = () => {
  if (!copyPrevMonthData) {
    // Logic to copy previous month's data here
    // Replace this logic with your actual data retrieval mechanism
    const prevMonthData = { 
      Monday: {
        Breakfast: {
          Description: 'Previous Month Breakfast Description for Monday',
          From: '08:00',
          To: '09:00',
          Price: '10.99'
        },
        Lunch: {
          Description: 'Previous Month Lunch Description for Monday',
          From: '12:00',
          To: '13:00',
          Price: '15.50'
        },
        Dinner: {
          Description: 'Previous Month Dinner Description for Monday',
          From: '18:00',
          To: '19:30',
          Price: '20.25'
        }
      },
      Tuesday: {
        Breakfast: {
          Description: 'Previous Month Breakfast Description for Tuesday',
          From: '08:30',
          To: '09:30',
          Price: '11.50'
        },
        Lunch: {
          Description: 'Previous Month Lunch Description for Tuesday',
          From: '12:15',
          To: '13:15',
          Price: '16.00'
        },
        Dinner: {
          Description: 'Previous Month Dinner Description for Tuesday',
          From: '18:30',
          To: '20:00',
          Price: '22.00'
        }
        
      },
      Wednesday: {
        Breakfast: {
          Description: 'Previous Month Breakfast Description for Monday',
          From: '08:00',
          To: '09:00',
          Price: '10.99'
        },
        Lunch: {
          Description: 'Previous Month Lunch Description for Monday',
          From: '12:00',
          To: '13:00',
          Price: '15.50'
        },
        Dinner: {
          Description: 'Previous Month Dinner Description for Monday',
          From: '18:00',
          To: '19:30',
          Price: '20.25'
        }
      },
      Thursday: {
        Breakfast: {
          Description: 'Previous Month Breakfast Description for Tuesday',
          From: '08:30',
          To: '09:30',
          Price: '11.50'
        },
        Lunch: {
          Description: 'Previous Month Lunch Description for Tuesday',
          From: '12:15',
          To: '13:15',
          Price: '16.00'
        },
        Dinner: {
          Description: 'Previous Month Dinner Description for Tuesday',
          From: '18:30',
          To: '20:00',
          Price: '22.00'
        }
        
      },
      Friday: {
        Breakfast: {
          Description: 'Previous Month Breakfast Description for Monday',
          From: '08:00',
          To: '09:00',
          Price: '10.99'
        },
        Lunch: {
          Description: 'Previous Month Lunch Description for Monday',
          From: '12:00',
          To: '13:00',
          Price: '15.50'
        },
        Dinner: {
          Description: 'Previous Month Dinner Description for Monday',
          From: '18:00',
          To: '19:30',
          Price: '20.25'
        }
      },
      Saturday: {
        Breakfast: {
          Description: 'Previous Month Breakfast Description for Tuesday',
          From: '08:30',
          To: '09:30',
          Price: '11.50'
        },
        Lunch: {
          Description: 'Previous Month Lunch Description for Tuesday',
          From: '12:15',
          To: '13:15',
          Price: '16.00'
        },
        Dinner: {
          Description: 'Previous Month Dinner Description for Tuesday',
          From: '18:30',
          To: '20:00',
          Price: '22.00'
        }
       
      },
     
      Sunday: {
        Breakfast: {
          Description: 'Previous Month Breakfast Description for Sunday',
          From: '09:00',
          To: '10:00',
          Price: '12.00'
        },
        Lunch: {
          Description: 'Previous Month Lunch Description for Sunday',
          From: '13:00',
          To: '14:00',
          Price: '18.00'
        },
        Dinner: {
          Description: 'Previous Month Dinner Description for Sunday',
          From: '19:00',
          To: '20:30',
          Price: '25.00'
     }
    }};
    setPrevMonthData(prevMonthData);
    setMealData(prevMonthData);
    setCopyPrevMonthData(true);
  } else {
    // Reset meal data and previous month's data
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
    // Reset meal data and copyPrevMonthData state to their initial values
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


  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // UseEffect to update the mealData when prevMonthData changes
  useEffect(() => {
    if (prevMonthData && copyPrevMonthData) {
      setMealData(prevMonthData);
    }
  }, [prevMonthData, copyPrevMonthData]);


  return (
    <Fragment>
      <Card>
        <CardHeader>
          <H5>Create Food Planner</H5>
          
        </CardHeader>
        <div style={{margin: 'auto', padding :'auto', marginTop:'10px', marginBottom:'10px'}}>
            <label>Select Month: </label>
            <Dropdown isOpen={showDropdown} toggle={() => setShowDropdown(!showDropdown)}>
              <DropdownToggle caret>
                {month}
              </DropdownToggle>
              <DropdownMenu>
                {months.map((m) => (
                  <DropdownItem key={m} onClick={() => handleMonthChange(m)}>{m}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <div style={{ display: 'flex', alignItems: 'center', marginTop:'10px', border: '1px solid #ccc', padding: '5px', borderRadius: '5px' }}>
          <input
            type="checkbox"
            onChange={handleCopyPrevMonthData}
            checked={copyPrevMonthData}
            
            style={{ marginRight: '5px' }}
          />
          <label>Copy the previous month data</label>
        </div>
           
            {/* <label style={{ marginLeft: '20px' }}>
              <Input type="checkbox" onChange={handleCopyPrevMonthData} checked={copyPrevMonthData} style={{color:"black"}}/>
              Copy the previous month data
            </label> */}
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
                {['Breakfast', 'Lunch', 'Dinner'].map((mealType) => (
                  <React.Fragment key={mealType}>
                    <td>
                      <Input
                        type="text"
                        placeholder="Description"
                        value={mealData[day][mealType]?.Description || ''}
                        onChange={(e) => handleInputChange(e, day, mealType, 'Description')}
                      />
                      <br />
                      <label>From:</label>
                      <Input
                        type="time"
                        value={mealData[day][mealType]?.From || ''}
                        onChange={(e) => handleInputChange(e, day, mealType, 'From')}
                      />
                      <label>To:</label>
                      <Input
                        type="time"
                        value={mealData[day][mealType]?.To || ''}
                        onChange={(e) => handleInputChange(e, day, mealType, 'To')}
                      />
                      <br />
                      <Input
                        type="text"
                        placeholder="Price"
                        value={mealData[day][mealType]?.Price || ''}
                        onChange={(e) => handleInputChange(e, day, mealType, 'Price')}
                      />
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom:'10px' }}>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button color="danger" style={{ marginLeft: '10px' }} onClick={handleCancel}>Cancel</Button>
        </div>
      </Card>
    </Fragment>
  );
};

export default FoodPlanner;


 