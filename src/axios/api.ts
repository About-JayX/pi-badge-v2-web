import api from "@/axios";
import { pidsignApiUrl, spiApiUrl } from "@/axios/url";
import { deviceType, getBrowserFingerprint, getOS } from "@/util";

export const getPidList = () => {
  return api.post(`${spiApiUrl}/v1/Registered?length=all`);
};

export const getPidSign = () => {
  return api.post(`${pidsignApiUrl}/sign`);
};
export const getPiWeb3lLogin = () => {
  return api.post(`${pidsignApiUrl}/v1/web3login`);
};

export const requestPiLogin = async (param: any, key?: any) => {
  const os = getOS();
  const keys = getBrowserFingerprint(key);

  const os_type = deviceType();

  return await api.post(`${spiApiUrl}/v1/login`, param, {
    headers: {
      key: key,
      os: os + " " + os_type,
      coes: keys,
    },
  });
};
