import { useEffect, useState } from "react";
import { useGet } from "../../hooks/use-get";
import { Button } from "../atoms/Button";
import { Title } from "../atoms/Title";
import Select from "../atoms/Select";
import Subtitle from "../atoms/Subtitle";
import useAuthStore from "../../hooks/store/auth-store";
import { Ensemble } from "../../routes/profile";

// Component for the register ensemble form

type Props = {
  onEnsembleCreated: (newEnsemble: Ensemble) => void;
  handleOpenRegisterEnsembleForm: () => void;
};

export default function RegisterEnsembleForm({
  onEnsembleCreated,
  handleOpenRegisterEnsembleForm
}: Props) {
  // states for the ensembles, ensembleId, and errors
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);
  const [ensembleId, setEnsembleId] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const { accessToken } = useAuthStore();

 // Use custom hook to send a GET request to the endpoint /ensemble to fill the select element with ensembles
  const { data: ensemblesData } = useGet<Ensemble[]>(
    `/ensemble`,
  );

 // useEffect to update the ensembles state when the ensemblesData changes
  useEffect(() => {
    if(ensemblesData) {
      setEnsembles(ensemblesData);
    }
    // runs when ensemblesData changes
  }, [ensemblesData]);


  // handles the change in the ensembleId select element
  const handleEnsembleIdChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEnsembleId(event.target.value);
    console.log(event.target.value);
  };

  // Function to handle the form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Send a PATCH request to the endpoint /ensemble/:id to register the user in the selected ensemble
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/ensemble/${ensembleId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${accessToken}`, // send access token in the header
      },
    });
    // If respone is ok, update the page with the new ensemble
    if (response.ok) {
      const data = await response.json();
      onEnsembleCreated(data);
      handleOpenRegisterEnsembleForm(); // close the form
    } else {
      const errorData = await response.json();
      console.error("Register ensemble error:", errorData.message);
      setErrors(errorData.message || ["An error occurred."]);
    }
  };

  return (
<>
      <div className="w-fit">
        <Button
          buttonText="Tilbage"
          variant="secondary"
          size="small"
          onClick={handleOpenRegisterEnsembleForm}
        />
      </div>
      <Title
        variant="default"
        title="Registrer dig i et eksisterende ensemble"
      />
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div>
          <Subtitle variant="default" subtitle="Vælg et ensemble fra listen" />
          <Select
            name="ensembles"
            onChange={handleEnsembleIdChange}
            // Shows ""Vælg et ensemble" as default value and is disabled
            defaultValue="Vælg et ensemble"
            {...(errors.includes(
              "User already registered in this ensemble"
            ) && {
              errorMessage: "Du er allerede registreret i dette ensemble",
            })}
          >
            {/* maps the ensembles to show in the options */}
            {ensembles.map((ensemble) => (
              <option
                className="font-sans text-dark-grey"
                key={ensemble._id}
                value={ensemble._id}
              >
                {ensemble.title}
              </option>
            ))}
          </Select>
        </div>
        <Button type="submit" variant="primary" buttonText="Registrer" />
      </form>
    </>
  );
}
