import Icon from "../atoms/Icon";

// component for displaying user icon, as profile picture

export function UserIcon() {
  return (
    <>
      <div className="bg-grey w-full aspect-square rounded-3xl border-4 flex items-center justify-center border-white shadow-sm">
        <Icon variant="userIcon" />
      </div>
    </>
  );
}
