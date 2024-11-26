import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      <main className="bg-light-grey">
        {children}
      </main>
      <Footer />
    </div>
  );
}
