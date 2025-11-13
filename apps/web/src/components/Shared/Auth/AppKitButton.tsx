import { useAppKit } from "@reown/appkit/react";

/**
 * AppKit WalletConnect button using Reown AppKit
 * This provides an alternative wallet connection UI with additional features
 */
export const AppKitConnectButton = () => {
  const { open } = useAppKit();

  return (
    <button
      className="text-brand-500 hover:bg-brand-100 dark:hover:bg-brand-900/20 flex items-center space-x-1.5 rounded-full px-3 py-1 text-xs font-bold transition duration-200"
      onClick={() => open()}
      type="button"
    >
      <span>Connect with AppKit</span>
    </button>
  );
};

/**
 * Network switcher button using AppKit
 */
export const AppKitNetworkButton = () => {
  const { open } = useAppKit();

  return (
    <button
      className="text-brand-500 hover:bg-brand-100 dark:hover:bg-brand-900/20 flex items-center space-x-1.5 rounded-full px-3 py-1 text-xs font-bold transition duration-200"
      onClick={() => open({ view: "Networks" })}
      type="button"
    >
      <span>Switch Network</span>
    </button>
  );
};

/**
 * AppKit's built-in button component (web component)
 * This can be used as a drop-in replacement for custom buttons
 */
export const AppKitButton = () => {
  return <appkit-button />;
};

/**
 * AppKit's built-in network button component
 */
export const AppKitNetworkSwitcher = () => {
  return <appkit-network-button />;
};
