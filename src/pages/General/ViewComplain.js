import React, { Fragment, useState } from 'react'
import { Table, Button } from "reactstrap";
import { Breadcrumbs } from "../../AbstractElements";
const ViewComplain = () => {
  const [complaints, setComplaints] = useState([
    { id: 1, text: "pani asuni" },
    { id: 2, text: "Room maintenance" },
    { id: 3, text: "bed required" },
    { id: 4, text: "internet required" },
  
  ]);
  return (
    <Fragment>
    <Breadcrumbs
    parent="General"
    mainTitle="View Complain"
    title="View Complain"
  />
   
    <Table>
      <thead>
        <tr>
          <th>complain no</th>
          <th>Complaint</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {complaints.map((complaint) => (
          <tr key={complaint.id}>
            <th scope="row">{complaint.id}</th>
            <td>{complaint.text}</td>

            <td>  
              <Button color="success" size="sm" className="mr-2">
                Resolve
              </Button>
              <Button color="danger" size="sm">
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Fragment>
  )
}

export default ViewComplain