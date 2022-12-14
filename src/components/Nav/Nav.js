import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { APP_BASE_URL as baseURL } from "../../env.js";
import { Button } from "@mui/material";
import { UserContext } from "../../contexts/user-context.js";

export const Nav = ({ public_key, private_key }) => {
  const [project, setProject] = useState("");
  const [pub_key, setPubKey] = useState(null);
  const [priv_key, setPrivKey] = useState(null);

  const { logOutUser } = useContext(UserContext);

  const handlePubKeyChange = (event) => {
    setPubKey(event.target.value);
  };

  const handlePrivKeyChange = (event) => {
    setPrivKey(event.target.value);
  };

  const handleClick = (event) => {
    if (pub_key === null || priv_key === null) return;
    public_key = pub_key;
    private_key = priv_key;
    window.location.href = `/index.html?public_key=${pub_key}&private_key=${priv_key}`;
  };

  useEffect(() => {
    async function getProject() {
      const instance = axios.create({
        baseURL: baseURL,
        params: {
          public_key: public_key,
          private_key: private_key,
        },
      });

      await instance
        .get("/projects")
        .catch(function(error) {
          console.log(error);
        })
        .then((response) => {
          setProject(response.data.results[0]);
        });
    }

    if (project == "" && public_key != null && private_key != null) {
      console.log("public key: " + public_key);
      console.log("private key: " + private_key);
      getProject();
    }
  });

  const logOut = async () => {
    console.log("Logout !!!");
    try {
      const loggedOut = await logOutUser();
      if (loggedOut) {
        window.location.href = "/";
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <form className="d-none d-sm-inline-block form-inline navbar-search">
        <div className="input-group mr-auto ml-md-3 my-2 my-md-0 mw-100">
          <input
            type="text"
            name="publicKey"
            className="form-control bg-light border-1 small"
            placeholder="API Public Key"
            aria-label="API Public Key"
            aria-describedby="basic-addon2"
            onChange={handlePubKeyChange}
          />
          <input
            type="password"
            name="privateKey"
            className="form-control bg-light border-1 small"
            placeholder="API Private Key"
            aria-label="API Private Key"
            aria-describedby="basic-addon2"
            onChange={handlePrivKeyChange}
          />
          <div className="input-group-append">
            <div
              className="btn btn-primary btn-user btn-block"
              onClick={(e) => handleClick(e)}
            >
              Submit
            </div>
          </div>
        </div>
      </form>

      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>

        <li className="nav-item dropdown no-arrow">
          <a className="nav-link nav-item" href="#">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {project.name}
            </span>
            <img
              className="img-profile rounded-circle"
              src="img/undraw_rocket.svg"
            />
          </a>
        </li>
        <div className="topbar-divider d-none d-sm-block"></div>
        <li className="nav-item dropdown no-arrow">
          <a className="nav-link nav-item" href="#">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              <Button variant="contained" onClick={logOut}>
                Logout
              </Button>
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
