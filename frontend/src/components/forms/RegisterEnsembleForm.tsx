import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/use-fetch";
import { Button } from "../atoms/Button";
import { Title } from "../atoms/Title";
import Select from "../atoms/Select";
import Subtitle from "../atoms/Subtitle";
import useAuthStore from "../../hooks/store/auth-store";
import { Ensemble } from "../../routes/profile";

type Props = {
  onEnsembleCreated: (newEnsemble: Ensemble) => void;
  handleOpenRegisterEnsembleForm: () => void;
};

export default function RegisterEnsembleForm({
  onEnsembleCreated,
  handleOpenRegisterEnsembleForm
}: Props) {
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);
  const [ensembleId, setEnsembleId] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const { accessToken } = useAuthStore();


  const { data: ensemblesData } = useFetch<Ensemble[]>(
    `/ensemble`,
  );

  useEffect(() => {
    if(ensemblesData) {
      setEnsembles(ensemblesData);
    }
  }, [ensemblesData]);

  const handleEnsembleIdChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEnsembleId(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/ensemble/${ensembleId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Register ensemble successful:", data);
      onEnsembleCreated(data);
      handleOpenRegisterEnsembleForm();
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
            defaultValue="Vælg et ensemble"
            {...(errors.includes(
              "User already registered in this ensemble"
            ) && {
              errorMessage: "Du er allerede registreret i dette ensemble",
            })}
          >
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
