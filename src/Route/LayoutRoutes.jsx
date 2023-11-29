import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes, studentRoutes } from "./Routes";
import AppLayout from "../Layout/Layout";
import { Fragment } from "react";

const LayoutRoutes = () => {
  const [userType, setUserType] = React.useState();

  React.useEffect(() => {
    setUserType(localStorage.getItem("userType"));
  }, []);

  console.log(userType);
  return (
    <>
      <Routes>
        {userType === "employee"
          ? routes.map(({ path, Component }, i) => (
              <Fragment key={i}>
                <Route element={<AppLayout />} key={i}>
                  <Route exact path={path} element={Component} />
                </Route>
              </Fragment>
            ))
          : studentRoutes.map(({ path, Component }, i) => (
              <Fragment key={i}>
                <Route element={<AppLayout />} key={i}>
                  <Route exact path={path} element={Component} />
                </Route>
              </Fragment>
            ))}
      </Routes>
    </>
  );
};

export default LayoutRoutes;
