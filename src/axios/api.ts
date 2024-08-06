import api from "@/axios";
import { pidsignApiUrl, spiApiUrl } from "@/axios/url";

export const getPidList = () => {
	return api.post(`${spiApiUrl}/v1/Registered?length=all`);
};

export const getPidSign = () => {
	return api.post(`${pidsignApiUrl}/sign`);
};
export const getPiWeb3lLogin = () => {
	return api.post(`${pidsignApiUrl}/v1/web3login`);
};
