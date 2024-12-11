import Subtitle from "./atoms/Subtitle";
import { Button } from "./atoms/Button";

type Props = {
  handleShowModal?: () => void;
  showDeleteModal?: boolean;
  subtitle: string;
  onClick?: () => void;
};

export default function DeleteModal({
  handleShowModal,
  showDeleteModal,
  subtitle,
  onClick,
}: Props) {



  return (
    <div
      className={`fixed w-full h-screen flex justify-center top-0 left-0 ${
        showDeleteModal && " backdrop-blur-sm"
      }`}
    >
      <div
        className={`fixed top-[15%] w-[80%] h-fit z-10 bg-white p-5 rounded-md shadow-md flex flex-col gap-4`}
      >
        {showDeleteModal && (
          <>
            <Subtitle
              variant="default"
              subtitle={subtitle}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={handleShowModal}
              buttonText="Fortryd"
            />
            <Button
              type="button"
              variant="primary"
              onClick={onClick}
              buttonText="Bekræft"
            />
          </>
        )}
      </div>
  </div>
  );
}
