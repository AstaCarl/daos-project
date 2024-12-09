import Anchor from "./atoms/Anchor";
import { Button } from "./atoms/Button";
import Icon from "./atoms/Icon";
import { Title } from "./atoms/Title";

export default function FindCard() {
  return (
    <div className="flex justify-between pb-[80px] px-2">
      <div className="border accent-grey shadow-md rounded-lg flex flex-col items-center w-[170px] h-[93px] py-3">
          <Anchor
            href="/find-musician"
            anchorText="Find musiker"
            variant="iconAnchor"
          >
            <Icon variant="musicUserIcon" />
          </Anchor>
      </div>
      <div className="border accent-grey shadow-md rounded-lg flex flex-col items-center w-[170px] h-[93px] py-3">
      <Anchor
            href="/find-musician"
            anchorText="Find ensemble"
            variant="iconAnchor"
          >
            <Icon variant="musicUserIcon" />
          </Anchor>
      </div>
    </div>
  );
}
