/** @format */

import React from "react";

export const useStripe = () => ({
  initPaymentSheet: async () => ({ error: null }),
  presentPaymentSheet: async () => ({ error: null }),
});

export const StripeProvider = ({ children }: { children: React.ReactNode }) =>
  children;
