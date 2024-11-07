import { Input } from "./components/atoms/Input";
import { PrimaryButton } from "./components/atoms/PrimaryButton";

function App() {
  return (
    <>
      <Input inputPlaceholder="Email" />
      <Input inputPlaceholder="Password" />
      <PrimaryButton buttonText="Submit" />
    </>
  );
}

export default App;
