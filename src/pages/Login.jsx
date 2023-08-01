import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useLoginMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/services/authSlice";
import { useForm } from "@mantine/form";
import { Loader } from "@mantine/core";

const Login = () => {
  const [login, { isFetching, isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "password must have at least 8 letters" : null,
    },
  });

  // const loginHandler = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const user = { email, password };
  //     const { data } = await login(user);
  //     dispatch(addUser({ user: data?.user, token: data?.token }));
  //     if (data?.success) navigate("/");
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
              const { data } = await login(values);
              dispatch(addUser({ user: data?.user, token: data?.token }));
              if (data?.success === true) {
                navigate("/");
              }
            } catch (error) {
              console.log(error);
            }
          })}
          className=" w-96 p-7 border rounded-md shadow-lg flex flex-col gap-6 "
        >
          <h1 className=" text-xl text-center">Login Form</h1>

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
          <Button
            disabled={isLoading && true}
            type=" submit"
            className=" bg-blue-700"
          >
            {isLoading ? <Loader color="lime" size="sm" /> : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
