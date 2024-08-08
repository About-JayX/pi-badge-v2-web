import Header from "@/components/header";
import Router from "@/router";

import { requestPiLogin } from "./axios/api";
import BgAnimation from "./components/animation/bg";
import Message from "./components/message";
import useInitialize from "./hook/initialize";
import { getCookieKey } from "./util";

export default function App() {
  useInitialize();

  const onIncompletePaymentFound = () => {
    // console.log(payment);
  };

  const signIn = async () => {
    const scopes = ["payments", "username"];
    const authResponse = await window.Pi.authenticate(
      scopes,
      onIncompletePaymentFound
    );
    alert(JSON.stringify(authResponse))
    await requestPiLogin(
      {
        uid: authResponse.user.uid,
        username: authResponse.user.username,
        accessToken: authResponse.accessToken,
      },
      getCookieKey(authResponse.user.uid)
    )
      .then((res: any) => {
        if (res.code === 200) {
          alert(JSON.stringify(res.data.uid));
          // 更新状态
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
      .catch((error) => {
        alert(JSON.stringify(error))
        // message.error(props?.connectionFailed);
      });
  };

  return (
    <>
      <button onClick={()=>signIn()}>登陆Pi浏览器</button>
      <Message />
      <Header />
      <BgAnimation />
      <main className="container pt-[16px] sm:pt-[60px] pb-[16px] sm:pb-[60px]">
        <Router />
      </main>
    </>
  );
}
