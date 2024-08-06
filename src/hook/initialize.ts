import { useEffect } from "react";

import { useStoreDispatch, useStoreSelector } from "@/hook";
import { detectNetwork, onWalletAddress, requestRpc, walletProviders } from "@/hook/ethers";

// Hooks初始化
export default function useInitialize() {
	const { providers, rpc, walletId } = useStoreSelector(state => state.ethers);

	const dispatch = useStoreDispatch();

	useEffect(() => {
		dispatch(detectNetwork());
		// 请求RPC
		dispatch(requestRpc());
	}, [dispatch, walletId]);

	useEffect(() => {
		// 判断RPC是否为空
		if (rpc === "") return;
		// 初始化钱包提供者
		dispatch(walletProviders());
	}, [dispatch, rpc]);

	useEffect(() => {
		// 判断提供者是否为空
		if (providers === null) return;
		
		// 触发监听钱包地址变化
		dispatch(onWalletAddress());
		dispatch(detectNetwork());
	}, [dispatch, providers]);
}
