import { useEffect, useState } from "react";
import { useFetch } from "../hooks/use-fetch";
import { Title } from "../components/atoms/Title";
import Paragraf from "../components/atoms/Paragraf";
import MusicianCard from "../components/MusicianCard";
import SearchForm from "../components/forms/SearchForm";

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
}

function FindMusician() {
  const [users, setUsers] = useState<User[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);

  const {data: userData} = useFetch<User[]>(`/user`, "GET")

  const { data: instrumentsData} = useFetch<Instrument[]>("/instruments", "GET");


  useEffect(() => {
    if (instrumentsData) {
    setInstruments(instrumentsData)
    console.log("Get instruments successful:", instrumentsData);
    }
  }, [instrumentsData])

  useEffect(() => {
    if (userData) {
    setUsers(userData)
    console.log("Get users successful:", userData);
    }
  }, [userData])


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
        <SearchForm
        instruments={instruments}
        />
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
