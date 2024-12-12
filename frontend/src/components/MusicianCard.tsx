import { Button } from "./atoms/Button";
import Label from "./atoms/Label";
import Paragraf from "./atoms/Paragraf";
import Subtitle from "./atoms/Subtitle";
import { Title } from "./atoms/Title";
import { UserIcon } from "./atoms/UserIcon";

interface User {
  _id: string;
  name: string;
  createdAt: Date;
  myInstruments: any[];
  lastname: string;
}
type Props = {
  user: User;
};

export default function MusicianCard({ user }: Props) {
  const createdAt = user.createdAt;
  const date = new Date(createdAt);
  const month = date.toLocaleString("da-DK", { month: "long" });
  const year = date.getFullYear();

  return (
    <>
      <div className="flex flex-col bg-white border border-accent shadow-md rounded-md">
        <div className="flex justify-between items-start border border-accent gap-7 bg-gray-50 rounded-sm p-2">
          <div className="flex gap-4">
            <div className="flex w-[30%]">
              <UserIcon />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1">
                <Title variant="red" title={user.name} />
                <Title variant="red" title={user.lastname} />
              </div>
              <div>
                <Paragraf
                  variant="body-small"
                  paragrafText={`Medlem siden ${month} ${year}`}
                />
              </div>
            </div>
          </div>
          <div className="flex p-1">
            <Button variant="secondary" buttonText="Kontakt" size="small" />
          </div>
        </div>

        {/* <p>{user.email}</p> */}
        <div className="flex flex-col bg-white gap-2 p-2">
          {user.myInstruments.map((instrument: any, index: number) => (
            <>
              <div className="flex flex-col border-b border-accent">
                <Subtitle
                  key={index}
                  variant="instrument"
                  subtitle={instrument.name}
                />
                <div className="flex py-2 gap-2">
                  <Label variant="grey" labelText="Kammermusik" />
                  <Label variant="grey" labelText="Barok" />
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
