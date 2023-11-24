import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, LogIn, Mail, User } from "react-feather";
import man from "../../../assets/images/dashboard/profile.png";

import { LI, UL, Image, P } from "../../../AbstractElements";
import CustomizerContext from "../../../_helper/Customizer";
import { Account, Admin, Inbox, LogOut, Taskboard } from "../../../Constant";
import { WebApi } from "../../../api";

const UserHeader = () => {
  const history = useNavigate();
  const [profile, setProfile] = useState("");
  const [name, setName] = useState(localStorage.getItem("Name"));
  const { layoutURL } = useContext(CustomizerContext);
  const authenticated = JSON.parse(localStorage.getItem("authenticated"));
  const userId = localStorage.getItem("userId");
  // const auth0_profile = JSON.parse(localStorage.getItem("auth0_profile"));

  useEffect(() => {
    setProfile(localStorage.getItem("profileURL") || man);
    setName(localStorage.getItem("Name") ? localStorage.getItem("Name") : name);
  }, []);

  const Logout = async () => {
    const loggedOut = await fetch(`${WebApi}/logout/${userId}`, {
      method: "GET",
    });
    const data = await loggedOut.json();
    if (data) {
      localStorage.removeItem("profileURL");
      localStorage.removeItem("token");
      localStorage.removeItem("auth0_profile");
      localStorage.removeItem("Name");
      localStorage.setItem("authenticated", false);
      localStorage.setItem("login", false);
      history(`/login`);
    }
  };

  const UserMenuRedirect = (redirect) => {
    history(redirect);
  };

  return (
    <li className="profile-nav onhover-dropdown pe-0 py-0">
      <div className="media profile-media">
        <Image
          attrImage={{
            className: "b-r-10 m-0",
            // src: `${authenticated ? auth0_profile.picture : profile}`,
            src: `${profile}`,
            alt: "",
          }}
        />
        <div className="media-body">
          <span>{authenticated ? name : ""}</span>
          <P attrPara={{ className: "mb-0 font-roboto" }}>
            {Admin} <i className="middle fa fa-angle-down"></i>
          </P>
        </div>
      </div>
      <UL
        attrUL={{ className: "simple-list profile-dropdown onhover-show-div" }}
      >
        <LI
          attrLI={{
            onClick: () => UserMenuRedirect(`/app/users/profile/${layoutURL}`),
          }}
        >
          <User />
          <span>{Account} </span>
        </LI>
        <LI
          attrLI={{
            onClick: () => UserMenuRedirect(`/app/email-app/${layoutURL}`),
          }}
        >
          <Mail />
          <span>{Inbox}</span>
        </LI>
        <LI
          attrLI={{
            onClick: () => UserMenuRedirect(`/app/todo-app/todo/${layoutURL}`),
          }}
        >
          <FileText />
          <span>{Taskboard}</span>
        </LI>
        <LI attrLI={{ onClick: Logout }}>
          <LogIn />
          <span>{LogOut}</span>
        </LI>
      </UL>
    </li>
  );
};

export default UserHeader;
