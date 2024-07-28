"use client";

import { Database } from "@/types/database-types";
import { ReactNode } from "react";

interface ConsoleProps {
  contacts: Database["public"]["Views"]["contact_view"]["Row"][];
  children: ReactNode
}

export default function Console({children}: ConsoleProps) {
  return <>{children}</>
};
