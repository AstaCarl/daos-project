import { useState } from "react";
import { Input } from "./atoms/Input";
import { Button } from "./atoms/Button";
import { useFetch } from "../hooks/use-fetch";
import { Title } from "./atoms/Title";
import Subtitle from "./atoms/Subtitle";
import { TextArea } from "./atoms/TextArea";
import Select from "./atoms/Select";
import GenreSelector from "./GenreSelector";

interface Ensemble {
  _id: string;
  title: string;
  activeUsers: string[];
  city?: string;
  description?: string;
  zipcode?: string;
}

type Props = {
  onEnsembleCreated: (newEnsemble: Ensemble) => void;
  onEnsembleFormClosed: () => void;
};

const CreateEmsembleForm: React.FC<Props> = ({
  onEnsembleCreated,
  onEnsembleFormClosed,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [rehearsalFrequency, setRehearsalFrequency] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [checkboxStatus, setCheckboxStatus] = useState<string | null> (null);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (checkboxStatus === value) {
      setCheckboxStatus(null);
    } else {
      setCheckboxStatus(value);
    }
  }

  const genres = [
    "Barok",
    "Senmoderne",
    "Jazz",
    "Klassisk",
    "Folkemusik",
    "Kammermusik",
    "Romantisk",
    "Senromantisk",
    "Symfonisk",
  ];

  const rehearsalFrequencys = [
    "Flere gange om ugen",
    "1 gang om ugen",
    "1 gang hver anden uge",
    "1 gang om måneden",
    "1 hver anden måned",
  ];

  // type ensembleType = "Projekt baseret" | "Kontinuerlig";

  enum playTypes {
    projectBased = "Projekt baseret",
    continous = "Kontinuerlig",
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrors([]);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
    setErrors([]);
  };

  const handleWebsiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(event.target.value);
    setErrors([]);
  };

  const handleZipcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipcode(event.target.value);
    setErrors([]);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
    setErrors([]);
  };

  const handleRehearsalFrequencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRehearsalFrequency(event.target.value);
    setErrors([]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    const ensembleData = {
      title: title,
      description: description,
      website: website,
      zipcode: zipcode,
      city: city,
      genre: selectedGenres,
      rehearsalFrequency: rehearsalFrequency,
      playType: checkboxStatus,
    };

    const response = await useFetch(
      "/ensemble",
      "POST",
      {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      ensembleData
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Create ensemble successful:", data);
      onEnsembleCreated(data);
    } else {
      const errorData = await response.json();
      // console.error("Create ensemble error:", response.statusText);
      console.error("Create ensemble error:", errorData.message);
      setErrors(errorData.message || ["An error occurred."]);
    }
  };

  return (
    <div className="absolute bg-light-grey h-fit w-screen flex flex-col gap-6 pb-16 padding">
      <div>
        <Button
          buttonText="Tilbage"
          variant="secondary"
          size="small"
          onClick={onEnsembleFormClosed}
        />
      </div>
      <Title variant="default" title="Opret ensemble" />
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <Input
          onChange={handleTitleChange}
          inputName="title"
          value={title}
          id="title"
          type="text"
          inputPlaceholder="Ensemblets navn"
          {...(errors.includes("title should not be empty") && {
            errorMessage: "Navnet skal udfyldes",
          })}
        />
        <div>
          <Subtitle variant="default" subtitle="Beskrivelse" />
          <TextArea
            onChange={handleDescriptionChange}
            inputName="description"
            value={description}
            id="description"
            inputPlaceholder="Beskrivelse"
            {...(errors.includes("description should not be empty") && {
              errorMessage: "Beskrivelse skal udfyldes",
            })}
          />
        </div>
        <div>
          <Subtitle variant="default" subtitle="Hjemmeside" />
          <Input
            onChange={handleWebsiteChange}
            inputName="website"
            value={website}
            id="website"
            type="text"
            inputPlaceholder="Hjemmeside"
            {...(errors.includes("website should not be empty") && {
              errorMessage: "Hjemmeside skal udfyldes",
            })}
          />
        </div>
        <div>
          <Subtitle variant="default" subtitle="Område" />
          <div className="flex gap-2">
            <Input
              onChange={handleZipcodeChange}
              inputName="zipcode"
              value={zipcode}
              id="zipcode"
              type="text"
              inputPlaceholder="Postnr."
              {...(errors.includes("zipcode should not be empty") && {
                errorMessage: "Postnummer skal udfyldes",
              })}
            />
            <Input
              onChange={handleCityChange}
              inputName="By"
              value={city}
              id="by"
              type="text"
              inputPlaceholder="By"
              {...(errors.includes("city should not be empty") && {
                errorMessage: "By skal udfyldes",
              })}
            />
          </div>
        </div>

        <div>
          <Subtitle variant="default" subtitle="Genrer" />
          <GenreSelector
            errors={errors}
            genres={genres}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />
        </div>
        <div>
          <Subtitle variant="default" subtitle="Øvefrekvens" />
          <Select
            name="frequency"
            defaultValue="Vælg øvefrekvens"
            onChange={handleRehearsalFrequencyChange}
            {...(errors.includes("rehearsalFrequency should not be empty") && {
              errorMessage: "Øvefrekvens skal udfyldes",
            })}
          >
            {rehearsalFrequencys.map((rehearsalFrequency) => (
              <option
                className="font-sans text-dark-grey"
                key={rehearsalFrequency}
                value={rehearsalFrequency}
              >
                {rehearsalFrequency}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Subtitle variant="default" subtitle="Ensemblet spiller..." />
          <Input
            onChange={handleCheckboxChange}
            labelText="Projekt baseret"
            inputName="By"
            value={playTypes.projectBased}
            checked={checkboxStatus === playTypes.projectBased}
            id="playType"
            type="checkbox"
            {...(errors.includes("playType should not be empty") && {
              errorMessage: "Der skal vælges en spille type",
            })}
          />
          <Input
            labelText="Kontinuerlig"
            onChange={handleCheckboxChange}
            inputName="playType"
            value={playTypes.continous}
            checked={checkboxStatus === playTypes.continous}
            id="playType"
            type="checkbox"
            
            {...(errors.includes("playType should not be empty") && {
              errorMessage: "Der skal vælges en spille type",
            })}
          />
        </div>
        <Button
          buttonText="Opret ensemble"
          variant="primary"
          size="medium"
          type="submit"
        />
      </form>
    </div>
  );
};

export default CreateEmsembleForm;
