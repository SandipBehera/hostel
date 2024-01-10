import React, { useState, Fragment, useEffect } from "react";
import { Table, Button, Card } from "reactstrap";
import { Breadcrumbs, H5 } from "../../AbstractElements";
import { WebApi } from "../../api";
import { toast } from "react-toastify";

const AllOuting = () => {
  const [data, setData] = useState([]);
  const [allOuting, setAllOuting] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // ...
  const userId = localStorage.getItem("userId");

  const fetchData = async () => {
    try {
      const response = await fetch(`${WebApi}/get_outing`, {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: document.cookie,
          "Content-Type": "application/json",
           "Access-Control-Allow-Origin": "*",
        },
        // headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "*",
        // },
      });

      if (response.ok) {
        const jsonData = await response.json();
        const updatedData = jsonData.data;

        console.log(updatedData);

        setAllOuting(updatedData);
        // console.log(userOutings);
      } else {
        console.log("Error", response.status);
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  // ...

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`${WebApi}/approve_outing/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: document.cookie,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ status: "1" }), // 1 for approved
      });

      if (response.status === "success") {
        toast.success("Status upated Successfully");
      } else {
        toast.error("Oops Error!!!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`${WebApi}/approve_outing/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: document.cookie,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        // headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "*",
        // },
        body: JSON.stringify({ status: "0" }), // 0 for rejected
      });

      if (response.status === "success") {
        toast.success("Status upated Successfully");
      } else {
        toast.error("Oops Error!!!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Fragment>
      <Breadcrumbs parent="Outing" mainTitle="All Outing" title="All Outing" />
      <Card>
        <Table className="text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Destination</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allOuting.map((item) => (
              <tr key={item.id}>
                <td>{item.studentid}</td>
                <td>{formatDate(item.date)}</td>
                <td>{item.destination}</td>
                <td>{item.reason}</td>
                <td>
                  {/* Approve Button */}
                  <Button
                    color="success"
                    onClick={() => handleApprove(item.id)}
                    disabled={item.status !== null} // Disable if status is not null
                    style={{
                      display: item.status === 0 ? "none" : "inline-block",
                      marginRight: "5px",
                    }}
                  >
                    Approve
                  </Button>

                  {/* Reject Button */}
                  <Button
                    color="danger"
                    onClick={() => handleReject(item.id)}
                    disabled={item.status !== null} // Disable if status is not null
                    style={{
                      display: item.status === 1 ? "none" : "inline-block",
                    }}
                  >
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

export default AllOuting;
