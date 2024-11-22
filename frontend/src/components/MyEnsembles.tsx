import { PrimaryButton } from "./atoms/PrimaryButton";
import Subtitle from "./atoms/Subtitle";
import EnsembleCard from "../components/EnsembleCard";
import Register from "../routes/register";
import RegisterEnsembleForm from "./RegisterEnsembleForm";
import { useState } from "react";

interface Ensemble {
  _id: string;
  title: string;
  activeUsers: string[];
  city?: string;
  description?: string;
  zipCode?: string;
  __v?: number;
}

type Props = {
  ensembles: Ensemble[];
  onOpenEnsembleForm: () => void;
};

export default function MyEnsembles({ ensembles, onOpenEnsembleForm }: Props) {
  const [openRegisterEnsembleForm, setOpenRegisterEnsembleForm] =
    useState(false);

  const handleToggleEnsembleForm = () => {
    setOpenRegisterEnsembleForm(true);
  };

  return (
    <section className="bg-white flex flex-col gap-7 padding border-y border-border-gray">
      <div className="flex justify-between">
        <Subtitle variant="default" subtitle="Mine ensembler" />
        <div className="flex gap-2">
          <PrimaryButton variant="secondary" buttonText="Tilføj" size="small" onClick={handleToggleEnsembleForm} />
          <PrimaryButton
            variant="secondary"
            buttonText="Opret"
            size="small"
            onClick={onOpenEnsembleForm}
          />
        </div>
      </div>
      {ensembles.map((ensemble) => (
        <EnsembleCard key={ensemble._id} title={ensemble.title} />
      ))}
      {openRegisterEnsembleForm && <RegisterEnsembleForm />}
    </section>
  );
}
