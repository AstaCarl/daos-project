import { PrimaryButton } from "./atoms/PrimaryButton";
import Subtitle from "./atoms/Subtitle";
import EnsembleCard from "../components/EnsembleCard";
// import RegisterEnsembleForm from "./RegisterEnsembleForm";
// import { useState } from "react";
// import { on } from "events";

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
  onOpenCreateEnsembleForm: () => void;
  onOpenRegisterEnsembleForm: () => void;
};

export default function MyEnsembles({ ensembles, onOpenCreateEnsembleForm, onOpenRegisterEnsembleForm }: Props) {

  return (
    <>
      <section className="bg-white flex flex-col gap-7 padding border-y border-border-gray">
        <div className="flex justify-between">
          <Subtitle variant="default" subtitle="Mine ensembler" />
          <div className="flex gap-2">
            <PrimaryButton
              variant="secondary"
              buttonText="Tilføj"
              size="small"
              onClick={onOpenRegisterEnsembleForm}
            />
            <PrimaryButton
              variant="secondary"
              buttonText="Opret"
              size="small"
              onClick={onOpenCreateEnsembleForm}
            />
          </div>
        </div>
        {ensembles.map((ensemble) => (
          <EnsembleCard key={ensemble._id} title={ensemble.title} />
        ))}
      </section>
    </>
  );
}
