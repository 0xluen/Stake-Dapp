import "../styles/globals.scss";

import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [
    {
      ...bscTestnet,
      rpcUrls: {
        default: {
          http: ["https://bsc-testnet.publicnode.com"],
        },
        public: {
          http: ["https://bsc-testnet.publicnode.com"],
        }
      }
    }
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "stake",
  projectId: "1ed84070cf42fe3fc70b4c1c9244ce8b",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function MyApp({ Component, pageProps }) {
  return <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
      <Component {...pageProps} />
    </RainbowKitProvider>
  </WagmiConfig>;
}

export default MyApp;
