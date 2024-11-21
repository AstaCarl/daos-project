import { useState } from "react";
import { Input } from "./atoms/Input";
import { PrimaryButton } from "./atoms/PrimaryButton";
import { useFetch } from "../hooks/use-fetch";

type Props = {};

const CreateEmsembleForm: React.FC<Props> = () => {
  const [title, setTitle] = useState<string>("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    console.log(title);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
        const ensembleData = {
          title: title,
        };

        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        if (!accessToken) {
          throw new Error("Access token is missing");
        }
  
        const response = await useFetch(
          "/ensemble",
          "POST",
          {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
          ensembleData
        );
  
        if (response.ok) {
          const data = await response.json();
          console.log("Create ensemble successful:", data);
        } else {
          console.error("Create ensemble error:", response.statusText);
        }
      } catch (error) {
        console.error("Create ensemble error:", error);
      }
    };

    return (
      <div>
        CreateEmsembleForm
        <form action="" onSubmit={handleSubmit}>
          <Input
            onChange={handleTitleChange}
            inputName="title"
            value={title}
            id="title"
            type="text"
            inputPlaceholder="Ensemblets navn"
          />
          <PrimaryButton
            buttonText="Opret ensemble"
            variant="primary"
            size="medium"
            type="submit"
          />
        </form>
      </div>
    );
}

export default CreateEmsembleForm;
