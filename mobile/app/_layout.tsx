/** @format */

import { Stack } from "expo-router";
import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/expo/token-cache";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </QueryClientProvider>
    </ClerkProvider>
  );
}
