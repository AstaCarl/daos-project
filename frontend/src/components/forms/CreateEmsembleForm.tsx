import { useState } from "react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { Title } from "../atoms/Title";
import Subtitle from "../atoms/Subtitle";
import { TextArea } from "../atoms/TextArea";
import Select from "../atoms/Select";
import GenreSelector from "./GenreSelector";
import useAuthStore from "../../hooks/store/auth-store";
import { Ensemble } from "../../routes/profile";

// form to handle post request for creating an ensemble

type Props = {
  handleOpenCreateEnsembleForm: () => void;
  onEnsembleCreated: (newEnsemble: Ensemble) => void;
};

const CreateEmsembleForm: React.FC<Props> = ({
  handleOpenCreateEnsembleForm,
  onEnsembleCreated,
}) => {
  // states to handle form input and errors
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [rehearsalFrequency, setRehearsalFrequency] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [checkboxStatus, setCheckboxStatus] = useState<string | null>(null);
  const { accessToken } = useAuthStore();

  // hardcoded genres, rehearsal frequencies and playtypes
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

  // Enum for play types, defining the possible values for the type of play
  // This helps in maintaining type safety and readability in the code
  enum playTypes {
    projectBased = "Projekt baseret",
    continous = "Kontinuerlig",
  }

  // functions to handle change events for each of the input fields, and reset the errors when the input changes

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (checkboxStatus === value) {
      setCheckboxStatus(null);
    } else {
      setCheckboxStatus(value);
    }
  };

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

  // function to handle submitting the form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Create the data object to be sent in the POST request
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

    // POST to endpoint /ensemble
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/ensemble`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // send the auth token in the authorization header
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(ensembleData), // send the ensemble data as the body
    });

    // If respone is ok, and update the page with the new ensemble data 
    if (response.ok) {
      const newEnsemble = await response.json();
      onEnsembleCreated(newEnsemble);
      handleOpenCreateEnsembleForm(); // close the form
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
          onClick={handleOpenCreateEnsembleForm}
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
            {/*  map over the hardcoded array of rehearsalFrequency */}
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
            // value is the enum value .projectBased
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
    </>
  );
};

export default CreateEmsembleForm;
