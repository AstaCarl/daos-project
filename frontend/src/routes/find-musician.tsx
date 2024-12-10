import { useEffect, useState } from "react";
import { useFetch } from "../hooks/use-fetch";
import { Title } from "../components/atoms/Title";
import Paragraf from "../components/atoms/Paragraf";
import MusicianCard from "../components/MusicianCard";

function FindMusician() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await useFetch(`/user`, "GET", {
      "Content-Type": "application/json",
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Get users successful:", data);
      setUsers(data);
      return users;
    } else {
      console.error("Get users error:", response.statusText);
    }
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
        <div className="flex flex-col gap-6">
          {users.map((user) => (
            <MusicianCard user={user} />
          ))}
        </div>
      </main>
    </>
  );
}

export default FindMusician;
