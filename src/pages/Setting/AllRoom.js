import React, { useContext,useState } from "react";
import { Box } from "react-feather/dist";
import { Label, FormGroup,DropdownMenu, DropdownItem,Dropdown,CardBody,  Modal,  ModalHeader,
    ModalBody, Button,} from "reactstrap";
import Select from "react-select";

import {
  Col,
  Card,
  CardHeader,
  Table,
  InputGroup,
  InputGroupText,
  Input,
  InputGroupAddon,
  DropdownToggle
} from "reactstrap";
import {
  BasicInputGroups,
  LeftAddon,
  RightAddon,
  JointAddon,
  LeftRightAddon,
  SolidStyle,
  FlatStyle,
  RaiseStyle,
  Action,
  AnotherAction,
  SomethingElseHere
} from "../../Constant";
import { FaSearch } from "react-icons/fa";
import { H5, Image,H1,Btn } from "../../AbstractElements";
import TableContext from "../../_helper/Table";
import { BasicColorData } from '../../Components/Common/Data/Ui-kits/index';
import CommonDropDown from '../../Components/UiKits/Dropdown/Common/CommonDropDown';
import {useNavigate} from 'react-router-dom';
import PopUp from "./PopUp";
import EditForm from "./EditForm";
import { it } from "date-fns/locale";

const studentData=[
    {   "sl_no":1,
        "name":"aravali",
        "floors":"2",      
},
{   "sl_no":2,
"name":"nilgiri",
"floors":"3",      
},
{   "sl_no":3,
"name":"sivalik",
"floors":"4",      
},
{   "sl_no":4,
"name":"udayagiro",
"floors":"5",      
},
]
const AllRoom = () => {
   
  const [data,setData]=useState(studentData)
   const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
const [edit,setEdit]=useState(-1)

  
//    const toggleDropdown = (id) => {
//    setActiveDropdown(activeDropdown === id ? null : id);
//     setDropdownOpen(!dropdownOpen);
//   };
 const toggleDropdown = (id) => {
    setData((prevData) =>
      prevData.map((item) => ({
        ...item,
        activeDropdown: item.sl_no === id ? !item.activeDropdown : false,
      }))
    );
  };

  const handleOptionSelect = (option,id) => {
    if (option === 'Edit') {
        setModalOpen(true);
      }
    toggleModal()
    setEdit(id)
    console.log(id)
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

//   function edit(id){
//     const edit=data.filter((id)=>(
//         id===data.id
//     ))
//   }
function handleDelete(id){
   const updated=data.filter((item)=>(
       item.sl_no!==id
   ))
   setData(updated)
}
  return (
    <>
     
      <div className="text-center">
      <H1 style={{color:"#61A3BA"}}>All Room</H1>
      </div> 
        <div className="mt-5">
          <Col sm="12">
            <Card>
             
              <div className="table-responsive">
                <Table>
                  <thead>
                    <tr className="border-bottom-primary">
                      <th scope="col">{"SL.NO"}</th>
                      <th scope="col">{" H-Name"}</th>
                      <th scope="col">{"No of Floor"}</th>
                      <th scope="col">{"View"}</th>
                      <th scope="col">{"Action"}</th>
                     
                    </tr>
                  </thead>
                  <tbody>
        {data.map((item) => (
         edit===item.sl_no? <EditForm item={item} data={data} setData={setData} isOpen={toggleModal} setEdit={setEdit}/> :
          <tr key={item.sl_no} className={`border-bottom-${item.color}`}>
            <th scope="row">{item.sl_no}</th>
            <td>{item.name}</td>
            <td>{item.floors}</td>
            <td><PopUp/></td>
            <td>
              <Dropdown
                isOpen={item.activeDropdown}
                toggle={() => toggleDropdown(item.sl_no)}
              >
                <DropdownToggle caret>{Action}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => handleOptionSelect('Edit',item.sl_no)}>
                    Edit
                  </DropdownItem>
                  <DropdownItem onClick={()=>handleDelete(item.sl_no)}>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>

                </Table>

       {/* popup modal */}

        
              </div>
            </Card>
          </Col>
        </div>
    
    </>
  );
};

export default AllRoom;


