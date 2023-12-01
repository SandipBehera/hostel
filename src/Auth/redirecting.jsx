import React, { useState, useEffect } from "react";
import { useHistory, useNavigate, useParams } from "react-router-dom";
import { LocalApi, WebApi, api } from "../api";

const RedirectionPage = () => {
  const navigation = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call to check if the user exists in the database
    const checkUserInDatabase = async () => {
      try {
        // Replace the following with your actual API call to check user existence
        const response = await fetch(`${WebApi}/users/${userId}`, {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);
        if (data.status === "success") {
          // User exists, redirect to the dashboard
          localStorage.setItem("login", JSON.stringify(true));
          localStorage.setItem("authenticated", JSON.stringify(true));
          localStorage.setItem("userId", data.data.user_id);
          localStorage.setItem("Name", data.data.name);
          localStorage.setItem("userType", data.data.user_type);
          if (data.data.user_type === "admin" && data.data.user_id !== null) {
            localStorage.setItem("roles", "no data");
            const dashboardLink = `/${data.data.user_type}/${data.data.user_id}/dashboard`;
            window.location.href = dashboardLink;
          } else if (data.data.user_type === "employee") {
            localStorage.setItem("roles", data.data.roles.data.role);
            const dashboardLink = `/${data.data.user_type}/${data.data.user_id}/dashboard`;
            window.location.href = dashboardLink;
          } else if (
            data.data.user_type === "student" &&
            data.data.user_id !== null
          ) {
            localStorage.setItem("roles", "no data");
            const dashboardLink = `/${data.data.user_type}/${data.data.user_id}/dashboard`;
            window.location.href = dashboardLink;
          } else {
            navigation("/login");
          }
        } else {
          // User does not exist, redirect to the login page
          navigation("/login");
        }
      } catch (error) {
        console.error("Error checking user in database:", error);
        // Handle error, for example, redirect to an error page
        navigation("/error");
      } finally {
        // Set loading to false once the check is complete
        setLoading(false);
      }
    };

    // Call the function to check user existence
    checkUserInDatabase();
  }, []);

  return <div>{loading ? <p>Loading...</p> : <p>Redirecting...</p>}</div>;
};

export default RedirectionPage;
