import React, { Component } from "react";
import "./app.css";
import { Home } from "./pages/Home.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/user-context.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import PrivateRoute from "./pages/PrivateRoute.js";

export default function app() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/index.html" element={<Home />} />
            <Route path="/index" element={<Home />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}
