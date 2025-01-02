import { Button } from "./atoms/Button";
import Subtitle from "./atoms/Subtitle";
import EnsembleCard from "../components/EnsembleCard";

interface Ensemble {
  _id: string;
  title: string;
  activeUsers: string[];
  city: string;
  website: string;
  description: string;
  zipcode: string;
}

type Props = {
  data: Ensemble[];
  handleOpenCreateEnsembleForm: () => void;
  handleOpenRegisterEnsembleForm: () => void;
};

export default function MyEnsembles({
  data,
  handleOpenCreateEnsembleForm,
  handleOpenRegisterEnsembleForm,
}: Props) {
  return (
    <>
      <section className="bg-white flex flex-col gap-7 padding border-y accent-grey">
        <div className="flex justify-between">
          <Subtitle variant="default" subtitle="Mine ensembler" />
          <div className="flex gap-2">
            <Button
              variant="secondary"
              buttonText="Tilføj"
              size="small"
              onClick={handleOpenRegisterEnsembleForm}
            />
            <Button
              variant="secondary"
              buttonText="Opret"
              size="small"
              onClick={handleOpenCreateEnsembleForm}
            />
          </div>
        </div>
        {data.map((ensemble) => (
          <EnsembleCard
            key={ensemble._id}
            title={ensemble.title}
            description={ensemble.description}
            zipcode={ensemble.zipcode}
            city={ensemble.city}
            activeUsers={ensemble.activeUsers.length}
          />
        ))}
      </section>
    </>
  );
}
