import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/use-fetch";
import { Button } from "../atoms/Button";
import { Title } from "../atoms/Title";
import Select from "../atoms/Select";
import Subtitle from "../atoms/Subtitle";
import useAuthStore from "../../hooks/store/auth-store";

interface Ensemble {
  _id: string;
  title: string;
  activeUsers: string[];
}

type Props = {
  onEnsembleRegistered: (newEnsemble: Ensemble) => void;
  onEnsembleFormClosed: () => void;
};

export default function RegisterEnsembleForm({
  onEnsembleFormClosed,
  onEnsembleRegistered,
}: Props) {
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);
  const [ensembleId, setEnsembleId] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const { accessToken } = useAuthStore();

  useEffect(() => {
    getEnsembles();
  }, []);

  const getEnsembles = async () => {
    const response = await useFetch(`/ensemble`, "GET", {
      "Content-Type": "application/json",
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Getting all ensembles successful:", data);
      setEnsembles(data);
      return ensembles;
    } else {
      console.error("Get all ensembles error:", response.statusText);
    }
  };

  const hanldeEnsembleIdChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEnsembleId(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await useFetch(`/ensemble/${ensembleId}`, "PATCH", {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Create ensemble successful:", data);
      onEnsembleRegistered(data);
      onEnsembleFormClosed();
    } else {
      const errorData = await response.json();
      console.error("Create ensemble error:", errorData.message);
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
          onClick={onEnsembleFormClosed}
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
            onChange={hanldeEnsembleIdChange}
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
