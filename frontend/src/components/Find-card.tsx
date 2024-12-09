import Icon from "./atoms/Icon";
import { Title } from "./atoms/Title";

export default function FindCard() {
  return (
    <div className="flex justify-between pb-[80px] px-2">
      <div className="border accent-grey shadow-md rounded-lg flex flex-col items-center w-[170px] h-[93px] py-3">
        <div className="w-10 h-10 pb-[8px] flex items-center justify-center">
          <Icon variant="musicUserIcon" />
        </div>
        <Title variant="findCardTitle" title="Find musiker" />
      </div>
      <div className="border accent-grey shadow-md rounded-lg flex flex-col items-center w-[170px] h-[93px] py-3">
        <div className="w-10 h-10 pb-[8px] flex items-center justify-center">
          <Icon variant="musicUserIcon" />
        </div>
        <Title variant="findCardTitle" title="Find ensemble" />
      </div>
    </div>
  );
}
