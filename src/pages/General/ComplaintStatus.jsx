import React, { Fragment, useState } from 'react'
import { Card, CardBody, CardText, CardTitle, FormGroup, Input, Label } from 'reactstrap'

export default function ComplaintStatus() {
    const [data, setData] = useState([ {
        id: 4,
        text: "Rahul",
        room: 104,
        hostel: "Hostel-4",
        assignedEmployee: "Abhishek Gupta",
        complaintDetails: "There have been instances where the quality of ingredients used in the preparation of meals has been questionable. Freshness and hygiene are crucial aspects of a healthy diet, and I believe ensuring the procurement of high-quality ingredients is essential."
      }])
  return (
    <Fragment>
    <div className="page-wrapper " id="pageWrapper" >
    <Card className="my-2 complaint-card">
    
    <CardBody>
      <CardTitle tag="h5" style={{textAlign:"center"}}>
        Complaint Status
      </CardTitle>
      <CardText>
        {data.map((complaint)=>(
            <>
            <div key={complaint.id} className=''>
            <p>Name: {complaint.text}</p>
            <p>Room: {complaint.room}</p>
            <p>Hostel: {complaint.hostel}</p>
            <p>Assigned Employee: {complaint.assignedEmployee}</p>
            <h6>Complaint Description</h6>
            <p>{complaint.complaintDetails}</p>
            <FormGroup>
            <Label for="status">Status</Label>
            <Input type="textarea" name="text" id="status" />
          </FormGroup>
            </div>
            </>
        )
            )}
      </CardText>
      <CardText>
        
      </CardText>
    </CardBody>
  </Card>
    </div>
    
  
    </Fragment>
  )
}
