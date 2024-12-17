import Subtitle from "./atoms/Subtitle";
import { Button } from "./atoms/Button";

// component for displaying a modal with delete confirmation

type Props = {
  // props to hide and show the modal
  handleShowModal?: () => void;
  showDeleteModal?: boolean;
  subtitle: string;
  // function to run when confirm button is clicked
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
