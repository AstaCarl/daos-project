import { useEffect, useState } from "react";
import Select from "../atoms/Select";
import { Button } from "../atoms/Button";
import { useFetch } from "../../hooks/use-fetch";

type Props = {
  instruments: any;
};

export default function SearchForm({ instruments }: Props) {
  const [searchParam, setSearchParam] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");


  
  const queryParams = new URLSearchParams({
    instrumentId: searchQuery,
  }).toString();

  const {data: searchData} = useFetch<[]>(`/user/search?${queryParams}`, "GET")

    useEffect(() => {
      if (searchData) {
        console.log("Search data:", searchData);
      }
    }, [searchData]);

  const handleSearchParamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParam(e.target.value);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchQuery(searchParam);
  };

  return (
    <form className="flex flex-col gap-3 pb-6" onSubmit={handleSearch}>
      <Select
        name="instrument"
        defaultValue="Vælg et instrument"
        onChange={handleSearchParamChange}
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
