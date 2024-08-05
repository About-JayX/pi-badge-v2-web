import Header from "@/components/header";
import Router from "@/router";

import BgAnimation from "./components/animation/bg";
import Message from "./components/message";

export default function App() {
  return (
    <>
      <Message />
      <Header />
      <BgAnimation />
      <main className="container pt-[16px] sm:pt-[60px] pb-[16px] sm:pb-[60px]">
        <Router />
      </main>
    </>
  );
}
