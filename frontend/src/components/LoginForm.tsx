import { Input } from "./atoms/Input";
import { PrimaryButton } from "./atoms/PrimaryButton";
import { useState } from "react";

type Props = {};

export default function LoginForm({}: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    console.log("Email changed to:", event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    console.log("Password changed to:", event.target.value);
  };
  return (
    <>
      <form action="">
        <Input
          onChange={handleEmailChange}
          value={email}
          inputName="email"
          id="email"
          inputPlaceholder="Email"
        />
        <Input
          onChange={handlePasswordChange}
          value={password}
          inputName="password"
          id="password"
          inputPlaceholder="Password"
        />
        <PrimaryButton type="submit" buttonText="Submit" />
      </form>
    </>
  );
}
