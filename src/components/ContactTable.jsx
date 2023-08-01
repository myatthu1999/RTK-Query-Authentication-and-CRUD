// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Input, Table } from "@mantine/core";
import {
  useDeleteContactsMutation,
  useGetContactsQuery,
} from "../redux/api/contactApi";
import Cookies from "js-cookie";
import { Loader } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addContacts, setSearchTerm } from "../redux/services/contactSlice";
import { MdDelete } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import Swal from "sweetalert2";

const ContactTable = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactsQuery(token);
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state.contactSlice);
  const { searchTerm } = useSelector((state) => state.contactSlice);
  const [deleteContacts] = useDeleteContactsMutation();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(addContacts(data?.contacts?.data));
  }, [data]);

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const { data } = await deleteContacts({ id, token });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center ">
        <Loader color="lime" />
      </div>
    );
  }
  return (
    <div className=" ">
      <div className="flex mb-4 items-center  justify-between ">
        <Link to={"/create"}>
          <button className=" px-6 py-2 bg-slate-500 rounded-md shadow-sm text-white">
            Create Contact
          </button>
        </Link>
        <Input
          placeholder="Serach"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>
      <Table highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          {contacts
            ?.filter((item) => {
              if (searchTerm === "") {
                return item;
              } else if (
                item?.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return item;
              }
            })
            .map((contact) => {
              return (
                <tr key={contact?.id}>
                  <td>{contact?.name}</td>
                  <td>
                    {contact?.email === null
                      ? "example@gmail.com"
                      : contact?.email}
                  </td>
                  <td>{contact?.phone}</td>
                  <td>
                    {contact?.address === null ? "yangon" : contact?.address}
                  </td>
                  <td className=" flex gap-2">
                    <span
                      className=" text-red-700 cursor-pointer"
                      onClick={() => deleteHandler(contact?.id)}
                    >
                      <MdDelete />
                    </span>
                    <Link to={`/user/${contact?.id}`}>
                      <span className=" text-yellow-400 cursor-pointer">
                        <BiShow />
                      </span>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default ContactTable;
