import { useEffect, useState } from "react";
import { useGet } from "../hooks/use-get";
import { Title } from "../components/atoms/Title";
import Paragraf from "../components/atoms/Paragraf";
import MusicianCard from "../components/MusicianCard";
import Select from "../components/atoms/Select";
import { Button } from "../components/atoms/Button";
import useAuthStore from "../hooks/store/auth-store";
import { useNavigate } from "react-router-dom";

// Find musician page, that renders a form for searching for musicians

interface Instrument {
  _id: string;
  name: string;
}

export interface User {
  _id: string;
  name: string;
  createdAt: Date;
  myInstruments: any[];
  lastname: string;
  email: string;
}

function FindMusician() {
  // state variables
  const [users, setUsers] = useState<User[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [searchParam, setSearchParam] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();


  // useeffect for checking if the user is logged in
  useEffect(() => {
    if (!accessToken) {
      // alert that remind the user to login
      alert("Du skal være logget ind for at finde musikere");
      navigate("/login");
    }
  }, []);

  // Fetch instruments using the useGet hook
  const { data: instrumentsData } = useGet<Instrument[]>(
    "/instruments",
  );

  useEffect(() => {
    if (instrumentsData) {
      setInstruments(instrumentsData);
    }
    // runs when there is a change in the instrumentsData
  }, [instrumentsData]);
  

  // Fetch search data using the useGet hook, using the serach parameter in the endpoint
  const { data: searchData, error } = useGet<[]>(
    `/user/search?instrumentId=${searchParam}`,
  );

  useEffect(() => {
    if (searchData) {
      // set the users with the fetched search data
      setUsers(searchData);
    }
    if (error) {
      console.log(error);
    }
    // runs when there is a change in the searchData
  }, [searchData]);

  // function for handling the search
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // set the chosen instrument as the search parameter
    setSearchParam(searchQuery);
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
            // Set the chosen instrument as the search query
            onChange={(e) => setSearchQuery(e.target.value)}
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
          {/* Maps over the users to render a musicianCard for every user */}
          {users.map((user, index: number) => (
            <MusicianCard key={index} user={user} />
          ))}
        </div>
      </main>
    </>
  );
}

export default FindMusician;
