import { Button, PasswordInput, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { Loader } from "@mantine/core";
import { useRegisterMutation } from "../redux/api/authApi";

const Register = () => {
  const [register, { isLoading, isFetching }] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "password must have at least 8 letters" : null,
    },
  });

  // const registerHandler = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const user = { name, email, password, password_confirmation };
  //     const {data} = await register(user);
  //     if(data?.success === true){
  //       navigate('/login')
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className=" h-screen flex justify-center items-center">
      <div>
        <form
          action=""
          onSubmit={form.onSubmit(async (values) => {
            try {
              const { data } = await register(values);
              if (data?.success === true) {
                navigate("/login");
              }
            } catch (error) {
              console.log(error);
            }
          })}
          className=" w-96 p-7 border rounded-md shadow-lg flex flex-col gap-6 "
        >
          <h1 className=" text-xl text-center">Register Form</h1>
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
          <PasswordInput
            name="password"
            {...form.getInputProps("password")}
            variant="filled"
            placeholder="Password"
          />
          <PasswordInput
            name="password_confirmation"
            {...form.getInputProps("password_confirmation")}
            variant="filled"
            placeholder="Confirmed Password"
          />
          <div>
            <span className="text-sm select-none">Already have a account?</span>
            <Link to={"/login"}>
              <span className="text-sm ms-3 cursor-pointer text-blue-600">
                Login
              </span>
            </Link>
          </div>
          <Button
            disabled={isLoading && true}
            type="submit"
            className=" bg-blue-700"
          >
            {isLoading ? <Loader color="lime" size="sm" /> : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
