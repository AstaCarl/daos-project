import { Feedback } from "../components/Feedback";
import FrontpageHero from "../components/FrontpageHero";

function Index() {
  return (
    <>
      <main className="padding">
        <FrontpageHero />
        <Feedback />
      </main>
    </>
  );
}

export default Index;
