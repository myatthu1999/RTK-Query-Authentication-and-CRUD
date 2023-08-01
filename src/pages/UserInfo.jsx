// eslint-disable-next-line no-unused-vars
import React from "react";
import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";
import { useSingleContactQuery } from "../redux/api/contactApi";
import { Loader } from "@mantine/core";

const UserInfo = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const { data , isLoading } = useSingleContactQuery({ id, token });
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center ">
        <Loader color="lime" />
      </div>
    );
  }
  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" p-5 border rounded-md shadow-md">
        <img
          src={
            data?.contact?.photo === null
              ? "https://s.wowkorea.jp/upload/news/339043/98670BEF-9EF2-4141-8C78-10FB0A8CAD97.jpeg"
              : data?.contact?.photo
          }
          width={'120px'}
          alt=""
        />
        <div>
          <p>{data?.contact?.name}</p>
          <p>{data?.contact?.email}</p>
          <p>{data?.contact?.phone}</p>
          <p>{data?.contact?.address}</p>
        </div>
        <Link to={'/'}>
          <button className="mt-2 px-4 py-1 rounded bg-green-500 text-white">back</button>
        </Link>
      </div>
    </div>
  );
};

export default UserInfo;
