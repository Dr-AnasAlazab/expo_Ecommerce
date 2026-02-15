/** @format */

import React from "react";
import { LoaderIcon } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoaderIcon className="animate-spin size-12" />
    </div>
  );
}
