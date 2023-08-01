// eslint-disable-next-line no-unused-vars
import React from "react";
// import { useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/services/authSlice";

const Navbar = () => {
  const user = JSON.parse(Cookies.get("user"));
  const token = Cookies.get("token");
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const { data } = await logout(token);
    dispatch(removeUser());
    if (data?.success === true) navigate("/login");
  };
  
  return (
    <div className=" flex justify-between items-center my-5 p-5 rounded-lg shadow-lg">
      <h2 className="text-blue-700 font-bold">MMS-IT</h2>
      <div className=" flex gap-3 items-center">
        <div className=" flex gap-3 items-center">
          <span>{user?.name} |</span>
          <span>{user?.email}</span>
        </div>
        <button
          onClick={logoutHandler}
          className=" bg-red-700 text-white px-6 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
