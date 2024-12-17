import { Title } from "./atoms/Title";
import { Button } from "./atoms/Button";
import StatusLabel from "./atoms/StatusLabel";
import { useEffect, useState } from "react";

// component for displaying profile status section(hardcode if we need)

type Props = {
  user: any;
};

export default function ProfileStatus({ user }: Props) {
  const [name, setName] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<boolean>(false);
  const [email, setEmail] = useState<boolean>(false);
  const [address, setAddress] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<boolean>(false);
  const [profileText, setProfileText] = useState<boolean>(false);
  const [date, setDate] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setName(true), setProfileImage(true), setEmail(true), setAddress(true), setPhoneNumber(true), setProfileText(true), setDate(true);
    }
  }, [name, profileImage, email, address]);

  return (
    <div className="flex flex-col gap-4 padding bg-white border-y border-accent-grey">
      <Title variant="default" title="Din profilstatus" />
      <StatusLabel labelText="Navn" varient={name ? "true" : "false"} />
      <StatusLabel
        labelText="Profilbillede"
        varient={profileImage ? "true" : "false"}
      />
      <StatusLabel labelText="E-mail" varient={email ? "true" : "false"} />
      <StatusLabel labelText="Adresse" varient={address ? "true" : "false"} />
      <StatusLabel labelText="Mobilnummer" varient={phoneNumber ? "true" : "false"} />
      <StatusLabel labelText="Profiltekst" varient={profileText ? "true" : "false"} />
      <StatusLabel labelText="Fødselsdato" varient={date ? "true" : "false"} />

      <Button variant="primary" buttonText="Udfyld profil" />
    </div>
  );
}
