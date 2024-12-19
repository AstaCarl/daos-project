import Anchor from "../atoms/Anchor";
import Icon from "../atoms/Icon";
import { Input } from "../atoms/Input";
import Paragraf from "../atoms/Paragraf";
import { Button } from "../atoms/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../../hooks/use-post";

type RegisterResponse = {
  message: string;
  user: {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    // Add other properties that your user object might have
  };
};

export function RegisterForm({}) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [type, setType] = useState("password");
  const [errors, setErrors] = useState<string>("");
  const navigate = useNavigate();

  const { data, error, loading, postData } = usePost<
    RegisterResponse,
    { email: string; password: string; name: string; lastname: string }
  >(
    "/user", // API endpoint
    { email: email, password: password, name: name, lastname: lastname } // Body data to be sent in the POST request
  );

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
    setErrors(""); // Reset errors on submit
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
    await postData();
  };

  useEffect(() => {
    if (data) {
      console.log("Data", data);
      alert("Bruger oprettet");
      navigate("/login");
    }

    if (error) {
      setErrors(error);
    }
  }, [data, error]);

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
            className="absolute cursor-pointer top-[44%] right-[30px]"
          >
            <Icon variant="showPassword" />
          </div>
        </span>
      </div>
      <Paragraf variant="body-small" paragrafText="Har du allerede en profil? ">
        <Anchor href="/login" anchorText="Log ind her" variant="default" />
      </Paragraf>
      <Button type="submit" buttonText="Opret profil" variant="primary" />
    </form>
  );
}
