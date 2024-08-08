import { useEffect } from "react";

import Header from "@/components/header";
import Router from "@/router";

import { requestPiLogin } from "./axios/api";
import BgAnimation from "./components/animation/bg";
import Message from "./components/message";
import useInitialize from "./hook/initialize";
import { getCookieKey } from "./util";

export default function App() {
  useInitialize();

  useEffect(() => {
    const isPi = navigator.userAgent.indexOf("PiBrowser") > -1;
    if (isPi) {
      // 派系浏览器支付未完成
      const onIncompletePaymentFound = () => {
        // console.log(payment);
      };
      // 派系浏览器登录
      const signIn = async () => {
        const scopes = ["payments", "username"];
        const authResponse = await window.Pi.authenticate(
          scopes,
          onIncompletePaymentFound
        );
        // alert("测试登录" + JSON.stringify(authResponse));
        await requestPiLogin(
          {
            uid: authResponse.user.uid,
            username: authResponse.user.username,
            accessToken: authResponse.accessToken,
          },
          // getCatchKey()
          getCookieKey(authResponse.user.uid)
        )
          .then((res: any) => {
            if (res.code === 200) {
              alert(JSON.stringify(res.data.uid))
              // setUid(res.data.uid);
              // setBadgeId(res.data.badge_id);
              // setInviterStatus(res.data.inviter);
              // setUserAddress(res.data.address);
              // setPriority(res.data.priority);
              // setExp(res.data.exp);

              // message.success(props?.connectionSuccess);
            } else {
              // message.error(props?.connectionFailed);
            }
          })
          .catch(() => {
            // alert(JSON.stringify(error))
            // message.error(props?.connectionFailed);
          });
      };

      signIn()
    }
  }, []);
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
