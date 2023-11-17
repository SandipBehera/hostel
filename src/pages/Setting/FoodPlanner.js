// import React, { Fragment, useState } from 'react';
// import { CardHeader,Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
// import { H5 } from '../../AbstractElements';
// import { FaRegClock } from 'react-icons/fa'; // Assuming you're using react-icons for the time icon



// const FoodPlanner = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('');
//   const [timeFrom, setTimeFrom] = useState('');
//   const [timeTo, setTimeTo] = useState('');


//   const toggleDropdown = () => {
//     setDropdownOpen(prevState => !prevState);
//   };

//   const handleSelect = (option) => {
//     setSelectedOption(option);
//     setDropdownOpen(false);
//   };
  
//   const handleTimeFromChange = (e) => {
//     setTimeFrom(e.target.value);
//   };

//   const handleTimeToChange = (e) => {
//     setTimeTo(e.target.value);
//   };

//   return (
//     <Fragment>
//       <CardHeader>
//         <H5>Food Planner</H5>
//       </CardHeader> 
      
//       <Col sm="12" className="text-center mt-4">
//         <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
//           <Input
//             type="text"
//             value={selectedOption}
//             onChange={() => {}}
//             onClick={toggleDropdown}
//             placeholder="Select an Option"
//           />
//           <DropdownToggle className="position-absolute" style={{ right: '8px', top: '8px' }} caret />
//           <DropdownMenu>
//             <DropdownItem onClick={() => handleSelect('Breakfast')}>Breakfast</DropdownItem>
//             <DropdownItem onClick={() => handleSelect('Lunch')}>Lunch</DropdownItem>
//             <DropdownItem onClick={() => handleSelect('Dinner')}>Dinner</DropdownItem>
//           </DropdownMenu>
//         </Dropdown>
//       </Col>
//     </Fragment>
//   );
// };
//  const FoodPlanner =()=>{
//   return(
//     <Fragment>
//       <Card>
//       <CardHeader>
//          <H5>Food Planner</H5>
//       </CardHeader> 
        

//       </Card>

//     </Fragment>
//   )
//  }

// export default FoodPlanner;

//trial 2
import React,{Fragment} from 'react';
import { Table,CardHeader,Card } from 'reactstrap';
import { H5 } from '../../AbstractElements';

const FoodPlanner = () => {
  return (
    <Fragment>
       <Card>
            <CardHeader>
              <H5>Food Planner</H5>
            </CardHeader>
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
        <tr>
          <th scope="row">Monday</th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row">Tuesday</th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row">Wednesday</th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row">Thursday</th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row">Friday</th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row">Saturday</th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row">Sunday</th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
    </Card>
    </Fragment>
  );
};

export default FoodPlanner;

