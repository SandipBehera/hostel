import React, { useContext,useState } from "react";
import { Box } from "react-feather/dist";
import { Label, FormGroup,DropdownMenu, DropdownItem,Dropdown,CardBody } from "reactstrap";
import Select from "react-select";
import { options2 } from "../../Components/Forms/FormWidget/FormSelect2/OptionDatas";
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
import CommonDropDown from '../../Components/UiKits/Dropdown/Common/CommonDropDown'
const AllStudents = () => {
  const { data } = useContext(TableContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Select an option');

   const handleChange=(e)=>{
    setSearchTerm(e.target.value)
   }

   const toggleDropdown = (id) => {

    setActiveDropdown(activeDropdown === id ? null : id);
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };
  return (
    <>
      <div className="page-wrapper" id="pageWrapper">
      <div className="text-center">
      <H1 style={{color:"#61A3BA"}}>All Students</H1>
      </div>
      
        <div style={{ display: "flex", justifyContent :"space-between"}}>
          <div className="mb-2" style={{ width: "30%" }}>
            <Label className="col-form-label"></Label>
            <Select
              options={options2}
              className="js-example-basic-single col-sm-12"
            />
          </div>

          <div className="" style={{ width: "30%" }}>
            <Label className="col-form-label"></Label>
            <Select
              options={options2}
              className="js-example-basic-single col-sm-12"
            />
          </div>
          <div className="">
          <Label className="col-form-label"></Label>
            <InputGroup>
              <InputGroupText>
                <FaSearch />
              </InputGroupText>

              <Input type="text" placeholder="Search" value={searchTerm} onChange={handleChange} />
            </InputGroup>
          </div>

          
        </div>
        
        <div className="mt-5">
          <Col sm="12">
            <Card>
             
              <div className="table-responsive">
                <Table>
                  <thead>
                    <tr className="border-bottom-primary">
                      <th scope="col">{"Id"}</th>
                      <th scope="col">{" Name"}</th>
                      <th scope="col">{"Username"}</th>
                      <th scope="col">{"Assigned Floor"}</th>
                      <th scope="col">{"View"}</th>
                      <th scope="col">{"Action"}</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {data.filter((item)=>{
                        return searchTerm.toLowerCase() === " " ? item
                       : item.first_name.toLowerCase().includes(searchTerm)
                        
                    }).map((item) => (
                      <tr
                        key={item.id}
                        className={`border-bottom-${item.color}`}
                      >
                        <th scope="row">{item.id}</th>
                        <td>
                          <Image
                            attrImage={{
                              className: "img-30 me-2",
                              src: require(`../../assets/images/user/${item.image}`),
                              alt: "user",
                            }}
                          />
                          {item.first_name}
                        </td>
                       
                        <td>{item.user_name}</td>
                        <td>{item.role}</td>
                        <td>{item.company}</td>
                        <td>
                        <Dropdown isOpen={activeDropdown === item.id} toggle={()=>toggleDropdown(item.id)}>
                        <DropdownToggle caret>{Action}</DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={() => handleOptionSelect('Option 1')}>
                            Edit
                          </DropdownItem>
                          <DropdownItem onClick={() => handleOptionSelect('Option 2')}>
                         Assign Room
                        </DropdownItem>
                        <DropdownItem onClick={() => handleOptionSelect('Option 2')}>
                         Active
                        </DropdownItem>
                         
                        </DropdownMenu>
                      </Dropdown>
                     </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
        </div>
      </div>
    </>
  );
};

export default AllStudents;


// <Dropdown className="dropdown">
// <Btn attrBtn={{ color: 'primary', className: 'dropbtn' }} >{DropdownButton} <span><i className="icofont icofont-arrow-down"></i></span></Btn>
// <DropdownMenu className="dropdown-content">
//   <DropdownItem href="#">{Action}</DropdownItem>
//   <DropdownItem href="#">{AnotherAction}</DropdownItem>
//   <DropdownItem href="#">{SomethingElseHere}</DropdownItem>
// </DropdownMenu>
// </Dropdown>

// <Dropdown>
// <div className="btn-group mb-0">
//   <Btn attrBtn={{ color: 'primary', className: 'dropbtn' }} >{Action} <span><i className="icofont icofont-arrow-down"></i></span></Btn>
//   <DropdownMenu className="dropdown-content">
//     <DropdownItem href="#">1</DropdownItem>
//     <DropdownItem href="#">{AnotherAction}</DropdownItem>
//     <DropdownItem href="#">{SomethingElseHere}</DropdownItem>
//     <DropdownItem divider />
//     <DropdownItem href="#">{'Separated Link'}</DropdownItem>
//   </DropdownMenu>
// </div>
// </Dropdown>