import Subtitle from "../atoms/Subtitle";
import { Button } from "../atoms/Button";
import useAuthStore from "../../hooks/store/auth-store";
import { Input } from "../atoms/Input";
import { useState } from "react";

// Component for the password modal

type Props = {
  handleShowPasswordModal: () => void;
  showPasswordModal?: boolean;
};

export default function PasswordModal({
  showPasswordModal,
  handleShowPasswordModal,
}: Props) {
  const { user, accessToken } = useAuthStore();
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  // Function to handle the form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userId = user._id;
    // Send a PUT request to the endpoint /user/:id to update the user's password
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/user/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`, // send access token in the header
        },
        // Send the current password and new password in the request body
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
        }),
      }
    );
    // if the response is ok, log the success message and alert the user
    if (response.ok) {
      alert("Din adgangskode er blevet ændret");
      handleShowPasswordModal(); // close the modal
    } else {
      const errorData = await response.json();
      console.error("Create post error:", errorData.message);
      setErrors(errorData.message || ["An error occurred."]);
    }
  };

  return (
    <div
      className={`absolute top-0 left-0  w-full h-screen flex justify-center ${
        showPasswordModal && " backdrop-blur-sm"
      }`}
    >
      <div
        className={`relative top-[10%] w-[80%] h-fit z-10 bg-white p-5 rounded-md shadow-md flex flex-col gap-5`}
      >
        <>
          <div className="w-fit">
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={handleShowPasswordModal}
              buttonText="Fortryd"
            />
          </div>
          <Subtitle
            variant="default"
            subtitle="Du er ved at ændre din adgangskode, er du sikker?"
          />
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              labelText="Skriv din nuværende adgangskode"
              onChange={(e) => setCurrentPassword(e.target.value)}
              inputName="currentPassword"
              value={currentPassword}
              id="currentPassword"
              type="text"
              inputPlaceholder="Nuværende adgangskode"
              {...(errors.includes("currentPassword should not be empty") && {
                errorMessage: "Du skal udfylde din nuværende adgangskode",
              },
              {
                ...(errors.includes("Passwords do not match") && {
                  errorMessage: "Den nuværende adgangskode er forkert",
                }),
              })}
            />
            <Input
              labelText="Skriv din nye adgangskode"
              onChange={(e) => setNewPassword(e.target.value)}
              inputName="newPassword"
              value={newPassword}
              id="newPassword"
              type="text"
              inputPlaceholder="Ny adgangskode"
              {...(errors.includes("newPassword should not be empty") && {
                errorMessage: "Du skal udfylde din nye adgangskode",
              })}
            />
            <Button type="submit" variant="primary" buttonText="Bekræft" />
          </form>
        </>
      </div>
    </div>
  );
}
