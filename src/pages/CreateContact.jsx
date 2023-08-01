// eslint-disable-next-line no-unused-vars
import React from "react";
import { Button, Loader, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useCreateContactsMutation } from "../redux/api/contactApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const CreateContact = () => {
  const [creatContacts, { isLoading }] = useCreateContactsMutation();
  const token = Cookies.get("token");
    const navigate  = useNavigate() 

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: hasLength({ min: 9, max: 11 }),
      address: (value) =>
        value.length < 5 ? "address must have at least 5 letters" : null,
    },
  });
  return (
    <div className=" h-screen flex justify-center items-center">
      <div>
        <form
          action=""
          onSubmit={form.onSubmit(async (values) => {
            try {
              const { data } = await creatContacts({ token, contact: values });
              if (data?.success === true) {
                return navigate('/');
              }
            } catch (error) {
              console.log(error);
            }
          })}
          className=" w-96 p-7 border rounded-md shadow-lg flex flex-col gap-6 "
        >
          <h1 className=" text-xl text-center">Create Contact</h1>
          <TextInput
            name="name"
            {...form.getInputProps("name")}
            variant="filled"
            placeholder="Your name"
          />
          <TextInput
            name="email"
            {...form.getInputProps("email")}
            variant="filled"
            placeholder="Your email"
          />
          <TextInput
            name="phone"
            {...form.getInputProps("phone")}
            variant="filled"
            placeholder="Your phone"
          />
          <TextInput
            name="address"
            {...form.getInputProps("address")}
            variant="filled"
            placeholder="Your address"
          />
          <Button
            disabled={isLoading && true}
            type="submit"
            className=" bg-blue-700"
          >
            {isLoading ? <Loader color="lime" size="sm" /> : "Create"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateContact;
