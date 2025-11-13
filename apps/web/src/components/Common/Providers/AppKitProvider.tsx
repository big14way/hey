import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  BASE_RPC_URL,
  CHAIN,
  IS_MAINNET,
  WALLETCONNECT_PROJECT_ID
} from "@hey/data/constants";
import { familyAccountsConnector } from "family";
import type { ReactNode } from "react";
import { http } from "viem";
import { base } from "viem/chains";
import { createConfig, WagmiProvider } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";
import getRpc from "@/helpers/getRpc";

// Get project ID from constants
const projectId = WALLETCONNECT_PROJECT_ID;

// Create connectors for wagmi
const connectors = [
  familyAccountsConnector(),
  walletConnect({ projectId }),
  injected()
];

// Create wagmi config
const config = createConfig({
  chains: [CHAIN, base],
  connectors,
  transports: {
    [CHAIN.id]: getRpc({ mainnet: IS_MAINNET }),
    [base.id]: http(BASE_RPC_URL, { batch: { batchSize: 30 } })
  }
});

// Metadata for AppKit
const metadata = {
  name: "Hey",
  description: "Hey - Web3 Social powered by Lens Protocol",
  url: typeof window !== "undefined" ? window.location.origin : "https://hey.xyz",
  icons: ["https://hey.xyz/logo.png"]
};

// Create WagmiAdapter for AppKit
const wagmiAdapter = new WagmiAdapter({
  networks: [CHAIN, base] as any,
  projectId
});

// Initialize AppKit with proper configuration
if (typeof window !== "undefined") {
  createAppKit({
    adapters: [wagmiAdapter],
    networks: [CHAIN, base] as any,
    projectId,
    metadata,
    features: {
      analytics: true, // Enable analytics
      email: false, // Disable email login (Hey uses Lens Protocol auth)
      socials: [], // Disable social logins (Hey uses Lens Protocol auth)
      emailShowWallets: true
    },
    themeMode: "dark",
    themeVariables: {
      "--w3m-accent": "#FB3A5D" // Hey brand color
    }
  });
}

interface AppKitProviderProps {
  children: ReactNode;
}

/**
 * Enhanced Web3 Provider with AppKit integration
 * This provides WalletConnect v2 with enhanced modal and additional features
 */
const AppKitProvider = ({ children }: AppKitProviderProps) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

export default AppKitProvider;
