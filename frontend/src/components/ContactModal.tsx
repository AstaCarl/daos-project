import Subtitle from "./atoms/Subtitle";
import { Button } from "./atoms/Button";
import Icon from "./atoms/Icon";

// component for displaying a modal with contact info of the user

type Props = {
  // props to hide and show the modal
  handleShowModal?: () => void;
  showContactModal?: boolean;
  // user to display contact info of
  user: any;
};

export default function ContactModal({
  handleShowModal,
  showContactModal,
  user,
}: Props) {

  // if user is not defined, return null
  if (!user) {
    return null; 
  }

  return (
    <div
      className={`fixed top-[-20px] left-0  w-full h-screen flex justify-center ${
        showContactModal && " backdrop-blur-sm"
      }`}
    >
      <div
        className={`relative top-[15%] w-[80%] h-fit z-10 bg-white p-5 rounded-md shadow-md flex flex-col gap-4`}
      >
        {showContactModal && (
          <>
            <div className="flex flex-col justify-center rounded-lg">
              <div className="flex justify-center py-2">
                <Icon variant="contactIcon" />
              </div>
              <div className="flex justify-center">
                <Subtitle
                  variant="contact"
                  subtitle={`Kontakt ${user.name} ${user.lastname}`}
                />
              </div>
            </div>
            <Button
              type="button"
              variant="primary"
              buttonText={`${user.email}`}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={handleShowModal}
              buttonText="Tilbage"
            />
          </>
        )}
      </div>
    </div>
  );
}
