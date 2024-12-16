import { useEffect, useState } from "react";
import { useFetch } from "../hooks/use-fetch";
import { Title } from "../components/atoms/Title";
import Paragraf from "../components/atoms/Paragraf";
import MusicianCard from "../components/MusicianCard";
import Select from "../components/atoms/Select";
import { Button } from "../components/atoms/Button";
import useAuthStore from "../hooks/store/auth-store";
import { useNavigate } from "react-router-dom";

interface Instrument {
  _id: string;
  name: string;
}

interface User {
  _id: string;
  name: string;
  createdAt: Date;
  myInstruments: any[];
  lastname: string;
  email: string;
}

function FindMusician() {
  const [users, setUsers] = useState<User[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [searchParam, setSearchParam] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      alert("Du skal være logget ind for at finde musikere");
      navigate("/login");
    }
  }, []);

  const { data: instrumentsData } = useFetch<Instrument[]>(
    "/instruments",
  );
  const queryParams = new URLSearchParams({
    instrumentId: searchQuery,
  }).toString();

  const { data: searchData } = useFetch<[]>(
    `/user/search?${queryParams}`,
  );

  useEffect(() => {
    if (instrumentsData) {
      setInstruments(instrumentsData);
      console.log("Get instruments successful:", instrumentsData);
    }
  }, [instrumentsData]);

  useEffect(() => {
    if (searchData) {
      setUsers(searchData);
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
    <>
      <main className="padding flex flex-col gap-6">
        <section className="space-y-3">
          <Title variant="default" title="Find Musiker" />
          <Paragraf
            variant="body"
            paragrafText={`${users.length} musikere fundet`}
          />
        </section>
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

        <div className="flex flex-col gap-6">
          {users.map((user, index: number) => (
            <MusicianCard key={index} user={user} />
          ))}
        </div>
      </main>
    </>
  );
}

export default FindMusician;
