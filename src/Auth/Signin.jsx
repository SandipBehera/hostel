import React, { Fragment, useState, useEffect, useContext } from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H4, P } from "../AbstractElements";
import { ForgotPassword, Password, SignIn } from "../Constant";

import { useNavigate, useParams } from "react-router-dom";
import CustomizerContext from "../_helper/Customizer";
import { ToastContainer, toast } from "react-toastify";
import { LocalApi, WebApi } from "../api";

const Signin = ({ selected }) => {
  const { campus_name } = useParams();
  const [regd_no, setRegistration] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);

  const loginAuth = async (e) => {
    e.preventDefault();
    fetch(`${WebApi}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: regd_no,
        password,
        slug: campus_name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          localStorage.setItem("login", JSON.stringify(true));
          localStorage.setItem("authenticated", JSON.stringify(true));
          localStorage.setItem("userId", data.data.userId);
          localStorage.setItem("Name", data.data.name);
          localStorage.setItem("userType", data.data.user_type);
          localStorage.setItem("branchId", data.data.branch_id);
          localStorage.setItem("campusName", campus_name);
          toast.success("Successfully logged in!..");
          window.location = `/hms/${data.data.user_type}/${data.data.userId}/dashboard`;
        } else {
          window.location = `campus/${campus_name}/login/student`;
          toast.error("You enter wrong password or username!..");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <Container fluid={true} className="p-0 login-page">
        <Row>
          <Col xs="12">
            <div className="login-card">
              <div className="login-main login-tab">
                <Form className="theme-form">
                  <H4>
                    {selected === "simpleLogin" ? "" : "Sign In with HMS"}
                  </H4>
                  <P>{"Enter your Registration No & password to login"}</P>
                  <FormGroup>
                    <Label className="col-form-label">Registration No</Label>
                    <Input
                      className="form-control"
                      type="text"
                      onChange={(e) => setRegistration(e.target.value)}
                      value={regd_no}
                      placeholder="Enter your Registration No"
                    />
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label className="col-form-label">{Password}</Label>
                    <div className="position-relative">
                      <Input
                        className="form-control"
                        type={togglePassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Enter Password"
                      />
                      <div
                        className="show-hide"
                        onClick={() => setTogglePassword(!togglePassword)}
                      >
                        <span className={togglePassword ? "" : "show"}></span>
                      </div>
                    </div>
                  </FormGroup>
                  <div className="position-relative form-group mb-0">
                    <div className="checkbox">
                      <a className="link" href="#javascript">
                        {ForgotPassword}
                      </a>
                    </div>

                    <Btn
                      attrBtn={{
                        color: "primary",
                        className: "d-block w-100 mt-2",
                        onClick: (e) => loginAuth(e),
                      }}
                    >
                      {SignIn}
                    </Btn>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default Signin;
