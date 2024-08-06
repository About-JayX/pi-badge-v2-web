// 网络ID
export const networkId = Number(localStorage.getItem("networkId")) || 56;

// 网络配置接口类型
export interface configType {
	chainId: number;
	chainName: string;
	name: string;
	nativeCurrency: {
		name: string;
		symbol: string;
		decimals: number;
	};
	rpcUrls: string[];
	blockExplorerUrls: string[];
}

// 网络配置
export const config = [
	{
		chainId: 1,
		chainName: "Ethereum",
		name: "eth",
		nativeCurrency: {
			name: "eth",
			symbol: "ETH",
			decimals: 18
		},
		rpcUrls: ["https://eth.llamarpc.com"],
		blockExplorerUrls: ["https://etherscan.io"]
	},
	{
		chainId: 56,
		chainName: "Binance Chain",
		name: "bsc",
		nativeCurrency: {
			name: "bnb",
			symbol: "BNB",
			decimals: 18
		},
		rpcUrls: ["https://binance.llamarpc.com", "https://bsc-dataseed1.defibit.io", "https://bsc-dataseed.binance.org"],
		blockExplorerUrls: ["https://bscscan.com"]
	}
] as configType[];

export function findChainById(chainIdToFind: number) {
	for (let i = 0; i < config.length; i++) {
		if (config[i].chainId === chainIdToFind) {
			return config[i];
		}
	}
	// 如果找不到匹配的chainId，可以返回null或者适当的错误信息
	return null;
}
