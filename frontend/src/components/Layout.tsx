import Footer from "./Footer";

type Props = {
    children: React.ReactNode;
}

export default function Layout({children}: Props) {
  return (
    <div>
        <main className="bg-light-gray px-[15px] pb-[80px] pt-[32px]">
            {children}
        </main>
        <Footer/>
    </div>
  )
}