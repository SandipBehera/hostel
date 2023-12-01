// HostelTable.js
import React, { useState, Fragment } from 'react';
import { Table, Button, Card } from 'reactstrap';
import { Breadcrumbs, H5 } from "../../AbstractElements";

const dummyData = [
  { id: 1, name: 'Abhishek Gupta', hostelName: 'A Block', roomNo: '101' },
  { id: 2, name: 'Rahul Mishra', hostelName: 'B Block', roomNo: '202' },
];

const Outing = () => {
  const handleApprove = (id) => {
    // Implement approve logic here
    console.log(`Approved: ${id}`);
  };

  const handleReject = (id) => {
    // Implement reject logic here
    console.log(`Rejected: ${id}`);
  };

  return (
   <Fragment>
   <Breadcrumbs
   parent="Employee"
   mainTitle="Outing"
   title="Outing"
 />
   <Card>
   <Table className='text-center'>
   <thead>
     <tr>
       <th>ID</th>
       <th>Name</th>
       <th>Hostel Name</th>
       <th>Room No</th>
       <th>Action</th>
     </tr>
   </thead>
   <tbody>
     {dummyData.map((item) => (
       <tr key={item.id}>
         <td>{item.id}</td>
         <td>{item.name}</td>
         <td>{item.hostelName}</td>
         <td>{item.roomNo}</td>
         <td>
           <Button color="success" onClick={() => handleApprove(item.id)}>
             Approve
           </Button>{' '}
           <Button color="danger" onClick={() => handleReject(item.id)}>
             Reject
           </Button>
         </td>
       </tr>
     ))}
   </tbody>
 </Table>
   </Card>
   </Fragment>
  );
};

export default Outing;
