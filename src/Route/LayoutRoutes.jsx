import { Route, Routes } from "react-router-dom";
import { routes } from "./Routes";
import AppLayout from "../Layout/Layout";
import { Fragment } from "react";

const LayoutRoutes = () => {
  return (
    <>
      <Routes>
        {routes.map(({ path, Component }, i) => (
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
