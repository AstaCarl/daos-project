import frontpageHero from "../assets/frontpage-hero.svg";
import { Title } from "./atoms/Title";
import FindCard from "./Find-card";

// component for frontpage hero section

export default function FrontpageHero() {
  return (
    <div>
      <img className="py-[40px] px-[50px]" src={frontpageHero} alt="" />
      <div className="flex flex-col items-center pb-[32px]">
        <Title
          variant="frontpageHero"
          title="Stedet hvor musikere finder musikere og spiller musik sammen"
        />
      </div>
      <div>
        <FindCard />
      </div>
    </div>
  );
}
