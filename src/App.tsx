import { useEffect } from "react";

import Header from "@/components/header";
import Router from "@/router";

import { bindPidAPI } from "./axios/api";
import BgAnimation from "./components/animation/bg";
import Message from "./components/message";
import PiModal from "./components/piModal";
import { useStoreDispatch } from "./hook";
import useInitialize from "./hook/initialize";
import { updatePiUser } from "./store/ethers";

export default function App() {
  useInitialize();
  const dispatch = useStoreDispatch();
  const signPiBrowser = async () => {
    try {
      const scopes = ["payments", "username"];
      const authResponse = await window.Pi.authenticate(scopes, () => {});
      dispatch(updatePiUser({ ...authResponse }));
      alert(authResponse.user.uid);
      if (authResponse && authResponse.user && authResponse.user.uid) {
        try {
          const result = await bindPidAPI({ pid: authResponse.user.uid });
          alert(JSON.stringify(result));
        } catch (error) {
          alert(JSON.stringify(error) + " error");
        }
      }
    } catch (error) {
      console.log(error, "pi_web_error_");
    }
  };

  useEffect(() => {
    signPiBrowser();
  }, []);
  return (
    <>
      <PiModal open setWalletOpen={()=>false}/>
      <Message />
      <Header />
      <BgAnimation />
      <main className="container pt-[16px] sm:pt-[60px] pb-[16px] sm:pb-[60px]">
        <Router />
      </main>
    </>
  );
}
