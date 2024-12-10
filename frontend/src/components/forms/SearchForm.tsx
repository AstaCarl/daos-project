import { useState } from "react";
import Select from "../atoms/Select";
import { Button } from "../atoms/Button";

type Props = {
  instruments: any;
};

export default function SearchForm({ instruments }: Props) {
  const [searchParam, setSearchParam] = useState<string>("");

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const queryParams = new URLSearchParams({
      instrumentId: searchParam,
    }).toString();

    const response = await fetch(
      `http://localhost:3000/user/search?${queryParams}`
    );
    if (response.ok) {
      const data = await response.json();
      console.log("Search successful:", data);
    } else {
      console.error("Search error:", response);
    }
  };

  return (
    <form className="flex flex-col gap-3 pb-6" onSubmit={handleSearch}>
      <Select
        name="instrument"
        defaultValue="Vælg et instrument"
        onChange={(e) => setSearchParam(e.target.value)}
      >
        {instruments.map((instrument: any) => (
          <option key={instrument._id} value={instrument._id}>
            {instrument.name}
          </option>
        ))}
      </Select>
      <Button buttonText="Søg" type="submit" variant="primary" />
    </form>
  );
}
