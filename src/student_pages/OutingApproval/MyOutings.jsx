import React, { Fragment, useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import { WebApi } from '../../api';

const MyOutings = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

 // ...
 const userId = localStorage.getItem("userId");

const fetchData = async () => {
    try {
      const response = await fetch(`${WebApi}/get_outing`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
  
      if (response.ok) {
        const jsonData = await response.json();
        const updatedData = jsonData.data;
        // Filter the data based on userId
        const userOutings = updatedData.filter(item => item.studentid === item.studentid );
        setData(userOutings);
        // console.log(userOutings);
      } else {
        console.log("Error", response.status);
      }
    } catch (e) {
      console.log("Error", e);
    }
  };
  console.log(data)

  const formatDate = (dateString) => {
    const date = new Date(dateString);  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  

  return (
    <Fragment>
      <Breadcrumbs
        parent="Outing Approval"
        mainTitle="Outing Form"
        title="Outing Form"
      />
      <Table className='text-center'>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Date</th>
            <th>Destination</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.studentid}</td>
              <td>{formatDate(item.date)}</td>
              <td>{item.destination}</td>
              <td>{item.reason}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default MyOutings;
