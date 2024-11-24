import { useEffect, useState } from "react";
import { useFetch } from "../hooks/use-fetch";
import { PrimaryButton } from "./atoms/PrimaryButton";
import { Title } from "./atoms/Title";
import Select from "./atoms/Select";

interface Ensemble {
  _id: string;
  title: string;
  activeUsers: string[];    
}

type Props = {
    onEnsembleRegistered: (newEnsemble: Ensemble) => void;
    onEnsembleFormClosed: () => void;
};

export default function RegisterEnsembleForm({onEnsembleFormClosed, onEnsembleRegistered,}: Props) {
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);
  const [ensembleId, setEnsembleId] = useState<string>("");

  useEffect(() => {
    getEnsembles();
  }, []);

  const getEnsembles = async () => {
    try {
      const response = await useFetch(`/ensemble`, "GET", {
        "Content-Type": "application/json",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Getting ensembles successful:", data);
        setEnsembles(data);
        return ensembles;
      } else {
        console.error("Create ensemble error:", response.statusText);
      }
    } catch (error) {
      console.error("Create ensemble error:", error);
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

    try {
      const response = await useFetch(`/ensemble/${ensembleId}`, "PATCH", {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Create ensemble successful:", data);
        onEnsembleRegistered(data);
        onEnsembleFormClosed();
      } else {
        const errorData = await response.json();
        console.error("Create ensemble error:", errorData.message);
        alert(`${errorData.message}`);
      }
    } catch (error) {
      console.error("Create ensemble error:", error);
    }
  };

  return (
    <div className="absolute bg-light-gray h-screen w-screen flex flex-col gap-6 padding">
      <div>
        <PrimaryButton
          buttonText="Tilbage"
          variant="secondary"
          size="small"
          onClick={onEnsembleFormClosed}
        />
      </div>
      <Title title="Registrer dig i et eksisterende ensemble" />
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <Select
          name="ensembles"
          label="Vælg ensemble"
          onChange={hanldeEnsembleIdChange}
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
        <PrimaryButton type="submit" variant="primary" buttonText="Registrer" />
      </form>
    </div>
  );
}
