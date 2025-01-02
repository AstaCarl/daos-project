import { useEffect, useState } from "react";
import Label from "../atoms/Label";
import Select from "../atoms/Select";

// Component for the input element for selecting genres

type GenreSelectorProps = {
  genres: string[];
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
  errors: string[];
};

export default function GenreSelector({
  genres,
  selectedGenres,
  setSelectedGenres,
  errors,
}: GenreSelectorProps) {
  const [genre, setGenre] = useState<string>("");

  // Function to handle the genre change
  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(event.target.value); // Update the genre state with the selected value
  };

  // Effect to add the selected genre to the selectedGenres array
  useEffect(() => {
    // Check if the genre is not empty and not already in the selectedGenres array
    if (genre && !selectedGenres.includes(genre)) {
      // Update the selectedGenres state by adding the new genre
      setSelectedGenres((prevSelectedGenres) => [...prevSelectedGenres, genre]);
    }
    // runs when genre changes
  }, [genre, setSelectedGenres]);


  // Function to handle removing a genre from the selectedGenres array
  const handleRemoveGenre = (genreToRemove: string) => {
    // Update the selectedGenres state by filtering out the genre to be removed
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.filter((genre) => genre !== genreToRemove)
    );
  };

  // Filter the genres to exclude the ones that are already selected
  const availableGenres = genres.filter(
    (genre) => !selectedGenres.includes(genre)
  );

  return (
    <div>
      <Select
        name="genre"
        defaultValue="Vælg genre"
        onChange={handleGenreChange}
        {...(errors.includes("genre should not be empty") && {
          errorMessage: "Genre skal udfyldes",
        })}
      > 
      {/* Maps over the available genres */}
        {availableGenres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </Select>
      {/* Maps over the selected genres */}
      {selectedGenres.length > 0 && (
        <div className="flex flex-wrap gap-3 pt-4">
          {selectedGenres.map((selectedGenre) => {
            console.log("Selected genres:", selectedGenres);
            return (
              <Label
                variant="default"
                key={selectedGenre}
                labelText={selectedGenre}
                // onclick to remove the genre from the selectedGenres array
                onClick={() => handleRemoveGenre(selectedGenre)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
