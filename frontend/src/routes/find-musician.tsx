import { useEffect, useState } from "react";
import { useFetch } from "../hooks/use-fetch";

function FindMusician() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
      }, []);
    
      const getUsers = async () => {
        // const userId = user._id;
    
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
      <main className="padding">
      </main>
    </>
  );
}

export default FindMusician;
