// eslint-disable-next-line no-unused-vars
import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Routeguard from "../components/Routeguard";
import CreateContact from "../pages/CreateContact";
import UserInfo from "../pages/UserInfo";

const Path = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Routeguard>
              <Dashboard />
            </Routeguard>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateContact/>} />
        <Route path="/user/:id" element={<UserInfo/>} />
      </Routes>
    </div>
  );
};

export default Path;
