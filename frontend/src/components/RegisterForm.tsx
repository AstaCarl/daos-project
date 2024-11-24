import { useFetch } from "../hooks/use-fetch";
import Anchor from "./atoms/Anchor";
import Icon from "./atoms/Icon";
import { Input } from "./atoms/Input";
import Paragraf from "./atoms/Paragraf";
import { PrimaryButton } from "./atoms/PrimaryButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function RegisterForm({}) {
  // Define the state variables for the form fields.
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [type, setType] = useState("password");
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  // Define the event handlers for the form fields.
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setErrors([]); // Reset errors on submit
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
      // Prepare the register data
      const registerData = {
        name: name,
        lastname: lastname,
        email: email,
        password: password,
      };

      // Call the useFetch function to send the post request
      const response = await useFetch(
        "/user",
        "POST",
        {
          "Content-Type": "application/json",
        },
        registerData
      );
      // Check if the response is successful
      if (response.ok) {
        alert("Din profil er oprettet");
        navigate("/login");
      } else {
        // Handle error response
        const errorData = await response.json();
        setErrors(errorData.message || ["An error occurred."]);
      }
  };

  return (
    <form
      className="flex flex-col gap-6 pt-6 w-full"
      onSubmit={handleSubmit}
      action=""
    >
      <div className="space-y-4">
        <div className="flex w-full gap-5">
          <Input
            type="text"
            onChange={handleNameChange}
            value={name}
            inputName="name"
            id="name"
            inputPlaceholder="Fornavn"
            {...(errors.includes("name should not be empty") && {
              errorMessage: "Fornavn skal udfyldes",
            })}
          />
          <Input
            type="text"
            onChange={handleLastnameChange}
            value={lastname}
            inputName="lastname"
            id="lastname"
            inputPlaceholder="Efternavn"
            {...(errors.includes("lastname should not be empty") && {
              errorMessage: "Efternavn skal udfyldes",
            })}
          />
        </div>
        <Input
          type="text"
          onChange={handleEmailChange}
          value={email}
          inputName="email"
          id="email"
          inputPlaceholder="E-mail"
          errorMessage={
            errors && errors.includes("email should not be empty")
              ? "Email skal udfyldes"
              : errors && errors.includes("email must be an email")
              ? "Email skal være en gyldig email"
              : errors && errors.includes("User with this email already exists")
              ? "En bruger med denne email eksisterer allerede."
              : undefined
          }
        />
        <Input
          type={type}
          onChange={handlePasswordChange}
          value={password}
          inputName="password"
          id="password"
          inputPlaceholder="Adgangskode"
          {...(errors.includes("password should not be empty") && {
            errorMessage: "Adgangskode skal udfyldes",
          })}
        />
        <span className="flex justify-around items-center">
          <div
            onClick={handleToggle}
            className="absolute cursor-pointer top-[43.5%] right-[27px]"
          >
            <Icon variant="showPassword" />
          </div>
        </span>
      </div>
      <Paragraf variant="body-small" paragrafText="Har du allerede en profil? ">
        <Anchor href="/login" anchorText="Log ind her" variant="default" />
      </Paragraf>
      <PrimaryButton
        type="submit"
        buttonText="Opret profil"
        variant="primary"
      />
    </form>
  );
}
