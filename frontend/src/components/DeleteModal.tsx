import Subtitle from "./atoms/Subtitle";
import { Button } from "./atoms/Button";
import { useFetch } from "../hooks/use-fetch";
import useAuthStore from "../hooks/store/auth-store";

type Props = {
  handleShowModal?: () => void;
  showDeleteModal?: boolean;
  handleShowPasswordModal?: () => void;
  showPasswordModal?: boolean;
};

export default function DeleteModal({
  handleShowModal,
  showDeleteModal,
}: Props) {
  const { user, accessToken, logout } = useAuthStore();

  const handleDeleteProfile = async () => {
    const userId = user._id;

    const response = await useFetch(`/user/${userId}`, "DELETE", {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Deleted profile succesfully", data);
        alert("Profilen er blevet slettet");
      logout();
    } else {
      console.error("Error deleting profile", response.statusText);
    }
  };

  return (
    <div
      className={`absolute top-0 left-0  w-full h-screen flex justify-center ${
        showDeleteModal && " backdrop-blur-sm"
      }`}
    >
      <div
        className={`relative top-[15%] w-[80%] h-fit z-10 bg-white p-5 rounded-md shadow-md flex flex-col gap-4`}
      >
        {showDeleteModal && (
          <>
            <Subtitle
              variant="default"
              subtitle="Du er ved at slette din profil, er du sikker?"
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
              onClick={handleDeleteProfile}
              buttonText="Bekræft"
            />
          </>
        )}
      </div>
    </div>
  );
}
