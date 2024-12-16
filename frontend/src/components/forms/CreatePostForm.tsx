import React, { useEffect, useState } from "react";
import { Button } from "../atoms/Button";
import { Title } from "../atoms/Title";
import { Input } from "../atoms/Input";
import Subtitle from "../atoms/Subtitle";
import { TextArea } from "../atoms/TextArea";
import Select from "../atoms/Select";
import { Ensemble } from "../../routes/profile";
import { Instrument } from "../../routes/profile";
import { useFetch } from "../../hooks/use-fetch";
import useAuthStore from "../../hooks/store/auth-store";
import Paragraf from "../atoms/Paragraf";

type Props = {
  handlePostsOpen: () => void;
  ensembles: Ensemble[];
};

export default function CreatePostForm({ handlePostsOpen, ensembles }: Props) {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [ensembleId, setEnsembleId] = useState<string>("");
  const [instrumentId, setInstrumentId] = useState<string>("");
  const { user } = useAuthStore();
  const [errors, setErrors] = useState<string[]>([]);

  const { data: instrumentsData } = useFetch<Instrument[]>(
    `/instruments`,
  );

  useEffect(() => {
    if (instrumentsData) {
      setInstruments(instrumentsData);
      console.log(instrumentsData);
    }
  }, [instrumentsData]);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleInstrumentIdChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInstrumentId(e.target.value);
    console.log(e.target.value);
  };

  const handleEnsembleIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEnsembleId(e.target.value);
    console.log(e.target.value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        instrument: instrumentId,
        ensemble: ensembleId,
        user: user._id,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Create post successful:", data);
      alert("Opslag oprettet");
      handlePostsOpen();
    } else {
      const errorData = await response.json();
      console.error("Create post error:", errorData.message);
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
          onClick={handlePostsOpen}
        />
      </div>
      <Title variant="default" title="Opret opslag" />
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <Input
          onChange={handleTitleChange}
          inputName="title"
          value={title}
          id="title"
          type="text"
          inputPlaceholder="Titel"
          {...(errors.includes("title should not be empty") && {
            errorMessage: "Titel skal udfyldes",
          })}
        />
        <div>
          <Subtitle variant="default" subtitle="Beskrivelse" />
          <TextArea
            onChange={handleDescriptionChange}
            inputName="description"
            value={description}
            id="description"
            inputPlaceholder="Skriv en kort beskrivelse af hvad du søger..."
            {...(errors.includes("description should not be empty") && {
              errorMessage: "Beskrivelse skal udfyldes",
            })}
          />
        </div>

        <div>
          <Subtitle variant="default" subtitle="Instrument" />
          <Select
            name="instrument"
            defaultValue="Vælg instrument"
            onChange={handleInstrumentIdChange}
            {...(errors.includes("instrument should not be empty") && {
              errorMessage: "Instrument skal udfyldes",
            })}
          >
            {instruments.map((instrument) => (
              <option
                className="font-sans text-dark-grey"
                key={instrument._id}
                value={instrument._id}
              >
                {instrument.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Subtitle variant="default" subtitle="Ensemble" />
          <Paragraf
            variant="body-small"
            paragrafText="Du skal være medlem, eller have oprettet et ensemble, for at kunne skrive en opslag."
          />
          <Select
            name="ensemble"
            defaultValue="Vælg ensemble"
            onChange={handleEnsembleIdChange}
            {...(errors.includes("ensemble should not be empty") && {
              errorMessage: "Ensemble skal udfyldes",
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

        <Button
          buttonText="Opret opslag"
          variant="primary"
          size="medium"
          type="submit"
        />
      </form>
    </>
  );
}
