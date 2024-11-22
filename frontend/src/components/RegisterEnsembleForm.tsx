import { useEffect, useState } from "react";
import { useFetch } from "../hooks/use-fetch";
import { PrimaryButton } from "./atoms/PrimaryButton";

interface Ensemble {
    _id: string;
    title: string;
}

type Props = {
};

export default function RegisterEnsembleForm({}: Props) {
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

const hanldeEnsembleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEnsembleId(event.target.value);
    console.log(event.target.value);
};

  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    // const ensembleData = {
    //   ensembleId: ensembleId.
    // };

    try {
      const response = await useFetch(
        `/ensemble/${ensembleId}`,
        "PATCH",
        {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
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
      <form 
      onSubmit={handleSubmit}
      >
        <label htmlFor="hej">Choose a pet:</label>
        <select onChange={hanldeEnsembleIdChange} name="hej" id="hej">
          {ensembles.map((ensemble) => (
            <option  value={ensemble._id}>{ensemble.title}</option>
          ))}
        </select>
        <PrimaryButton type="submit" variant="primary" buttonText="Registrer" />
      </form>
    </div>
  );
}
