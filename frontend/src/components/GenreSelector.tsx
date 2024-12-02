import { useEffect, useState } from "react";
import Label from "./atoms/Label";
import Select from "./atoms/Select";

type GenreSelectorProps = {
  genres: string[];
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
};

export default function GenreSelector({
  genres,
  selectedGenres,
  setSelectedGenres,
}: GenreSelectorProps) {
  const [genre, setGenre] = useState<string>("");

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(event.target.value);
  };

  useEffect(() => {
    if (genre && !selectedGenres.includes(genre)) {
      setSelectedGenres((prevSelectedGenres) => [...prevSelectedGenres, genre]);
    }
  }, [genre, selectedGenres, setSelectedGenres]);

  const handleRemoveGenre = (genreToRemove: string) => {
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.filter((genre) => genre !== genreToRemove)
    );
  };

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
      <div className="flex flex-wrap gap-3">
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
