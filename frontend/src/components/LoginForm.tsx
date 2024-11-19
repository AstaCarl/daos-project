import { Input } from "./atoms/Input";
import { PrimaryButton } from "./atoms/PrimaryButton";
import { useState } from "react";
import { useFetch } from "../hooks/use-fetch.ts";
import Anchor from "./atoms/Anchor";
import Paragraf from "./atoms/Paragraf";
import Icon from "./atoms/Icon";
import useAuthStore from "../hooks/store/auth-store.ts";
import { useNavigate } from "react-router-dom";

export default function LoginForm({}) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [type, setType] = useState("password");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    try {
      // Prepare the login data
      const loginData = {
        email: email,
        password: password,
      };
  
      // Call the useFetch function to send the login request
      const response = await useFetch("/auth/login", "POST", {
        "Content-Type": "application/json",
      }, loginData);
  
      // Check if the response is successful
      if (response.ok) {
        const data = await response.json(); // Parse the response JSON
        console.log("Login successful:", data);
        localStorage.setItem("accessToken", data.access_token);
        login();
        navigate("/profile");
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        alert("Login failed: " + errorData.message);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during login:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };


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
          />
          <span className="flex justify-around items-center">
            <div
              onClick={handleToggle}
              className="absolute cursor-pointer -mt-[80px] right-[27px]"
            >
              <Icon variant="showPassword" />
            </div>
          </span>
        </div>
        <Paragraf variant="body-small" paragrafText="Har du ikke en bruger? ">
          <Anchor
            href="/register"
            anchorText="Opret bruger"
            variant="default"
          />
        </Paragraf>
        <PrimaryButton type="submit" buttonText="Log ind" />
      </form>
    </>
  );
}
