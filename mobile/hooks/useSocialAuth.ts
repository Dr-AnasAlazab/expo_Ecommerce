/** @format */

import { Alert } from "react-native";
import { useState } from "react";
import { useSSO } from "@clerk/clerk-expo";

const useSocialAuth = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    setLoadingStrategy(strategy);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (error) {
      console.error("😢Error during social authentication:", error);
      const provider = strategy === "oauth_google" ? "Google" : "Apple";
      Alert.alert(`${provider} Authentication Failed`, "Please try again.");
    } finally {
      setLoadingStrategy(null);
    }
  };
  return { loadingStrategy, handleSocialAuth };
};

export default useSocialAuth;
