import Paragraf from "./Paragraf";
import { Title } from "./Title";

export function Logo() {
  return (
    <a href="/">
      <Title variant="red" title="Musik Samspil" />
      <Paragraf
        className="text-xs"
        variant="body-small"
        paragrafText="Skabt af DAOS - Dansk amatørorkester Samvirke"
      />
    </a>
  );
}
