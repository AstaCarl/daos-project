import Header from "./Header";
import Footer from "./Footer";

// Layout component, that wraps the Header and Footer components around the children, (children in this case is the content of the page)

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
