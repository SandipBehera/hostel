import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Row, Button } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { Breadcrumbs, H5 } from '../../AbstractElements';
import { useNavigate } from 'react-router-dom';
import { WebApi } from '../../api';
import TableContext from '../../_helper/Table';

const AllEmployee = () => {
  const navigate = useNavigate();

  // const { data } = useContext(TableContext);

  const [empData, setEmpData] = useState([]);

  useEffect(() => {
    const getAllEmployee = async () => {
      try {
        const response = await fetch(`${WebApi}/getEmployee`, {
          method: 'GET'
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error(`Error: ${response.status} - ${response.statusText}`, errorData);
          return;
        }

        const res = await response.json();
        console.log(res);
        const fetchedData = res.data;
        setEmpData(
          fetchedData.map((item) => ({
            id: item.id,
            name: item.emp_name,
            email: item.emp_email,
            contact: item.emp_phone,
            address: item.address,
            designation: item.emp_designation,
            image: item.emp_pic
          }))
        );
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    getAllEmployee();
  }, []);

  let colData = [
    {
      name: 'Id',
      selector: (row) => row.id,
      sortable: true,
      center: false,
    },
   
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      center: false,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      center: false,
    },
    {
      name: 'Contact No.',
      selector: (row) => row.contact,
      sortable: true,
      center: false,
    },
    {
      name: 'Address',
      selector: (row) => row.address,
      sortable: true,
      center: false,
    },
    {
      name: 'Designation',
      selector: (row) => row.designation,
      sortable: true,
      center: false,
    },
   
  ];

 

  return (
    <Fragment>
    <Breadcrumbs
    parent="Employee"
    mainTitle="All Employee"
    title="All Employee"
  />
      <div className="page-wrapper" id="pageWrapper">
        <Col sm="12">
          <Card>
            <CardHeader>
              <Row className="align-items-center justify-content-between">
                <Col xs="auto" className="px-4">
                  <H5 className="mb-0">All Employee</H5>
                </Col>
                <Col xs="auto" className="px-4">
                 
                </Col>
              </Row>
            </CardHeader>
            <div className="table-responsive">
              <DataTable
                data={empData}
                columns={colData}
                striped={true}
                center={true}
                pagination
              />
            </div>
          </Card>
        </Col>
      </div>
    </Fragment>
  );
};

export default AllEmployee;




// <Table>
//                 <thead>
//                   <tr className="border-bottom-primary">
//                     {colData.map((col) => (
//                       <th key={col.name} scope="col">
//                         {col.name}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {empData.map((item) => (
//                     <tr key={item.id}>
//                       {colData.map((col) => (
//                         <td key={col.name}>{item[col.name.toLowerCase()]}</td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>