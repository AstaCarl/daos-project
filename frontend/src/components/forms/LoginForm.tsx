import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button.tsx";
import { useEffect, useState } from "react";
import Anchor from "../atoms/Anchor";
import Paragraf from "../atoms/Paragraf";
import Icon from "../atoms/Icon";
import useAuthStore from "../../hooks/store/auth-store.ts";
import { useNavigate } from "react-router-dom";
import { usePost } from "../../hooks/use-post.ts";

// Component for the login form

type LoginResponse = {
  message: string;
  access_token: string;
  user: {
    _id: string;
    name: string;
    lastname: string;
    email: string;
  };
};

export default function LoginForm({}) {
  // states for the email, password, type of password, and errors
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [type, setType] = useState("password");
  const [errors, setErrors] = useState<string[]>([]);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  // Function to toggle the password visibility
  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  // functions to handle change in email and password input fields
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

 // Use custom hook to send a POST request to the endpoint /auth/login
  const { data, error, postData } = usePost<
  LoginResponse,
  { email: string; password: string }
>(
  "/auth/login", // API endpoint
  { email: email, password: password } // data to be sent in the body of the POST request
);

// Function to handle the form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Call the postData function to send the POST request
    postData();
  };

  // useEffect to handle the response from the POST request
  useEffect(() => {
    if (data) {
      // If the data is received, extract the user and token from the response
      const user = data.user;
      const token = data.access_token;
      // Call the login function from the store to set the user and token in the
      login(user, token);
      // Navigate to the profile page
      navigate("/profile");
    }
    // If there is an error, log the error
    if (error) {
      console.error(error);
    if (error) {
      console.error(error === "HTTP error! Status: 401");
      setErrors(["Ugyldig email eller adgangskode."]);
    }
    }
  }, [data, error]);

  return (
    <>
      <form className="flex flex-col gap-6 pt-6" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <Input
            type="email"
            labelText="E-mail"
            onChange={handleEmailChange}
            value={email}
            inputName="email"
            id="email"
            inputPlaceholder="Email"
          />
          <Input
            type={type}
            labelText="Adgangskode"
            onChange={handlePasswordChange}
            value={password}
            inputName="password"
            id="password"
            inputPlaceholder="Password"
            errorMessage={errors[0]}
          />
          <span
            onClick={handleToggle}
            className="cursor-pointer absolute items-center top-[37.5%] right-[30px]"
          >
            <Icon variant="showPassword" />
          </span>
        </div>
        <Paragraf variant="body-small" paragrafText="Har du ikke en bruger? ">
          <Anchor
            href="/register"
            anchorText="Opret bruger"
            variant="default"
          />
        </Paragraf>
        <Button type="submit" buttonText="Log ind" variant="primary" />
      </form>
    </>
  );
}
