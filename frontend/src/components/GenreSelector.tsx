import { useEffect, useState } from "react";
import Label from "./atoms/Label";
import Select from "./atoms/Select";

type GenreSelectorProps = {
  genres: string[];
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function GenreSelector({
  genres,
  selectedGenres,
  setSelectedGenres,
}: GenreSelectorProps) {
  const [genre, setGenre] = useState<string>("");

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
  }, [genre, selectedGenres, setSelectedGenres]);

  const handleRemoveGenre = (genreToRemove: string) => {
    // Update the selectedGenres state by filtering out the genre to be removed
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.filter((genre) => genre !== genreToRemove)
    );
  };
  // Filter the genres to exclude the ones that are already selected
  const availableGenres = genres.filter((g) => !selectedGenres.includes(g));

  return (
    <div>
      <Select name="genre" onChange={handleGenreChange}>
        {availableGenres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </Select>
      <div className="flex flex-wrap gap-3 pt-4">
        {selectedGenres.map((selectedGenre) => (
          <Label
            key={selectedGenre}
            labelText={selectedGenre}
            onClick={() => handleRemoveGenre(selectedGenre)}
          />
        ))}
      </div>
    </div>
  );
}
